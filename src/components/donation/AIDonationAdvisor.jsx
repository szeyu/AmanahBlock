import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
  Badge,
  Progress,
  Divider,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Collapse,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import {
  FaRegLightbulb,
  FaRegChartBar,
  FaRegCheckCircle,
  FaRegHeart,
  FaInfoCircle,
  FaSchool,
  FaHandHoldingWater,
  FaUtensils,
  FaHandHoldingUsd,
  FaRobot,
  FaBrain,
  FaChartLine,
} from 'react-icons/fa';

const AIDonationAdvisor = ({ 
  donationAmount = 100, 
  donationType = 'sadaqah', 
  selectedPool = 'general',
  onRecommendationSelect = () => {},
  isActive = true
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [customAllocation, setCustomAllocation] = useState({});
  const [impactScores, setImpactScores] = useState({
    ai: 0,
    custom: 0
  });
  
  // Sample current needs data (would come from API in real app)
  const [currentNeeds] = useState({
    general: {
      name: 'General Charity Pool',
      description: 'Funds are distributed based on need across all projects',
      urgency: 'Medium',
      icon: FaHandHoldingUsd,
      color: 'purple'
    },
    school: {
      name: 'School Building',
      description: 'Funding needed for 3 schools in Yemen and Pakistan',
      urgency: 'Medium',
      icon: FaSchool,
      color: 'blue'
    },
    flood: {
      name: 'Flood Relief',
      description: 'Urgent assistance needed for flooding in Bangladesh',
      urgency: 'High',
      icon: FaHandHoldingWater,
      color: 'red'
    },
    food: {
      name: 'Food Bank',
      description: 'Ongoing food security programs in 5 countries',
      urgency: 'Medium-High',
      icon: FaUtensils,
      color: 'orange'
    }
  });

  // Generate AI recommendation based on current needs and donation amount
  const generateRecommendation = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // This would be replaced with actual AI logic in a real implementation
      // For now, we'll use a simple algorithm based on urgency
      
      let recommended = {};
      
      if (selectedPool !== 'general') {
        // If a specific pool is selected, respect the user's choice
        Object.keys(currentNeeds).forEach(key => {
          recommended[key] = key === selectedPool ? 100 : 0;
        });
      } else {
        // For general pool, distribute based on urgency
        const urgencyWeights = {
          "High": 4,
          "Medium-High": 3,
          "Medium": 2,
          "Low": 1
        };
        
        let totalWeight = 0;
        const weights = {};
        
        Object.entries(currentNeeds).forEach(([key, data]) => {
          weights[key] = urgencyWeights[data.urgency] || 2;
          totalWeight += weights[key];
        });
        
        Object.keys(currentNeeds).forEach(key => {
          recommended[key] = Math.round((weights[key] / totalWeight) * 100);
        });
        
        // Ensure total is exactly 100%
        const total = Object.values(recommended).reduce((sum, val) => sum + val, 0);
        if (total !== 100) {
          const diff = 100 - total;
          const highestKey = Object.entries(recommended).sort((a, b) => b[1] - a[1])[0][0];
          recommended[highestKey] += diff;
        }
      }
      
      setRecommendation(recommended);
      setCustomAllocation(recommended);
      setIsLoading(false);
    }, 1500);
  };
  
  // Calculate impact score based on allocation
  const calculateImpactScore = (allocation) => {
    // This would be a more sophisticated algorithm in a real implementation
    const baseScores = {
      school: 85,
      flood: 92,
      food: 78,
      general: 88
    };
    
    // Calculate weighted average of base scores
    let weightedScore = 0;
    let totalWeight = 0;
    
    Object.entries(allocation).forEach(([key, percentage]) => {
      weightedScore += (baseScores[key] * percentage);
      totalWeight += percentage;
    });
    
    return Math.round(weightedScore / totalWeight);
  };
  
  // Handle slider changes for custom allocation
  const handleSliderChange = (value, key) => {
    const newAllocation = { ...customAllocation };
    
    // Calculate how much we need to adjust other values
    const oldValue = newAllocation[key];
    const difference = value - oldValue;
    
    // Adjust the key that changed
    newAllocation[key] = value;
    
    // Distribute the difference proportionally among other keys
    const otherKeys = Object.keys(newAllocation).filter(k => k !== key);
    const totalOtherValues = otherKeys.reduce((sum, k) => sum + newAllocation[k], 0);
    
    if (totalOtherValues > 0) {
      otherKeys.forEach(k => {
        const proportion = newAllocation[k] / totalOtherValues;
        newAllocation[k] = Math.max(0, Math.round(newAllocation[k] - (difference * proportion)));
      });
    }
    
    // Ensure total is exactly 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const diff = 100 - total;
      // Find a non-zero value to adjust
      const adjustKey = otherKeys.find(k => newAllocation[k] > 0) || key;
      newAllocation[adjustKey] += diff;
    }
    
    setCustomAllocation(newAllocation);
  };
  
  // Apply the recommendation
  const applyRecommendation = (allocation) => {
    onRecommendationSelect(allocation);
    onToggle(); // Close the panel
  };
  
  // Generate recommendation on initial load
  useEffect(() => {
    if (isActive && !recommendation) {
      generateRecommendation();
    }
  }, [isActive]);
  
  // Recalculate impact score when allocation changes
  useEffect(() => {
    if (recommendation) {
      const aiScore = calculateImpactScore(recommendation);
      const customScore = calculateImpactScore(customAllocation);
      setImpactScores({
        ai: aiScore,
        custom: customScore
      });
    }
  }, [recommendation, customAllocation]);
  
  if (!isActive) return null;
  
  return (
    <Box 
      bg="rgba(13, 16, 25, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={8}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        bottom: "-1px",
        borderRadius: "xl",
        padding: "1px",
        background: "linear-gradient(135deg, rgba(11, 197, 234, 0.3), rgba(95, 21, 242, 0.3))",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        zIndex: 0,
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        background: "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Flex 
        justify="space-between" 
        align="center" 
        onClick={onToggle} 
        cursor="pointer"
        position="relative"
        zIndex="1"
      >
        <HStack spacing={3}>
          <Box 
            bg="rgba(11, 197, 234, 0.1)" 
            p={2} 
            borderRadius="lg"
            boxShadow="0 0 10px rgba(11, 197, 234, 0.2)"
          >
            <Icon as={FaRobot} color="brand.500" boxSize={5} />
          </Box>
          <Box>
            <Heading size="md" color="white" fontWeight="600">AI Donation Advisor</Heading>
            <Text color="gray.400" fontSize="sm">
              Get personalized recommendations for maximum impact
            </Text>
          </Box>
        </HStack>
        <Button 
          variant="outline" 
          size="sm" 
          leftIcon={<FaBrain />}
          borderColor="brand.500"
          color="brand.400"
          _hover={{
            bg: "rgba(11, 197, 234, 0.1)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
          }}
          transition="all 0.3s ease"
        >
          {isOpen ? 'Hide Advisor' : 'Show Advisor'}
        </Button>
      </Flex>
      
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={6} mt={6} align="stretch" position="relative" zIndex="1">
          {isLoading ? (
            <Flex direction="column" align="center" justify="center" py={10}>
              <Spinner 
                size="xl" 
                color="brand.500" 
                thickness="4px"
                speed="0.8s"
                emptyColor="gray.700"
              />
              <Text color="gray.300" mt={4} fontWeight="medium">
                AI is analyzing current needs...
              </Text>
              <Box 
                mt={3} 
                bg="rgba(26, 32, 44, 0.6)" 
                p={3} 
                borderRadius="md" 
                maxW="md"
              >
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Evaluating urgency levels, funding gaps, and potential impact across all projects
                </Text>
              </Box>
            </Flex>
          ) : recommendation ? (
            <>
              <Box>
                <Heading size="sm" color="white" mb={4}>Current Needs Assessment</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                  {Object.entries(currentNeeds).map(([key, data]) => (
                    <Box 
                      key={key} 
                      bg="rgba(26, 32, 44, 0.6)" 
                      p={4} 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="gray.700"
                      position="relative"
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                      }}
                    >
                      <Flex justify="center" mb={3}>
                        <Box 
                          as={data.icon} 
                          size="40px" 
                          color={`${data.color}.500`}
                          filter={`drop-shadow(0 0 8px var(--chakra-colors-${data.color}-500-rgb))`}
                        />
                      </Flex>
                      <Heading size="xs" textAlign="center" color="white" mb={2}>{data.name}</Heading>
                      <Text fontSize="xs" color="gray.400" textAlign="center" mb={3} noOfLines={2}>
                        {data.description}
                      </Text>
                      <Badge 
                        colorScheme={
                          data.urgency === 'High' ? 'red' : 
                          data.urgency === 'Medium-High' ? 'orange' : 
                          data.urgency === 'Medium' ? 'yellow' : 'green'
                        }
                        px={2}
                        py={1}
                        borderRadius="md"
                        textTransform="uppercase"
                        fontWeight="bold"
                        position="absolute"
                        bottom="3"
                        right="3"
                        minW="80px"
                        textAlign="center"
                        boxShadow={`0 0 10px rgba(var(--chakra-colors-${
                          data.urgency === 'High' ? 'red' : 
                          data.urgency === 'Medium-High' ? 'orange' : 
                          data.urgency === 'Medium' ? 'yellow' : 'green'
                        }-500-rgb), 0.3)`}
                      >
                        {data.urgency}
                      </Badge>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
              
              <Divider borderColor="gray.700" />
              
              <Box>
                <Heading size="sm" color="white" mb={4}>Recommended Allocation</Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
                  <Box display="flex" flexDirection="column" height="100%">
                    <Flex justify="space-between" align="center" mb={3}>
                      <HStack>
                        <Box 
                          bg="rgba(236, 110, 76, 0.1)" 
                          p={1.5} 
                          borderRadius="md"
                        >
                          <Icon as={FaRobot} color="accent.500" boxSize={4} />
                        </Box>
                        <Text color="white" fontWeight="medium">AI Recommendation</Text>
                      </HStack>
                      <HStack 
                        bg="rgba(236, 110, 76, 0.1)" 
                        px={3} 
                        py={1} 
                        borderRadius="full"
                        boxShadow="0 0 10px rgba(236, 110, 76, 0.2)"
                      >
                        <Icon as={FaChartLine} color="accent.500" boxSize={3} />
                        <Text color="white" fontWeight="bold" fontSize="sm">
                          Impact: {impactScores.ai}
                        </Text>
                      </HStack>
                    </Flex>
                    
                    <VStack 
                      spacing={4} 
                      align="stretch" 
                      bg="rgba(26, 32, 44, 0.6)" 
                      p={4} 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="gray.700"
                      flex="1"
                    >
                      {Object.entries(recommendation).map(([key, percentage]) => (
                        <Box key={key}>
                          <Flex justify="space-between" mb={1}>
                            <HStack>
                              <Icon 
                                as={currentNeeds[key].icon} 
                                color={`${currentNeeds[key].color}.500`} 
                                boxSize={3}
                              />
                              <Text color="gray.300" fontSize="sm">{currentNeeds[key].name}</Text>
                            </HStack>
                            <Badge 
                              colorScheme={currentNeeds[key].color}
                              borderRadius="full"
                              px={2}
                              boxShadow={`0 0 8px rgba(var(--chakra-colors-${currentNeeds[key].color}-500-rgb), 0.3)`}
                            >
                              {percentage}%
                            </Badge>
                          </Flex>
                          <Progress 
                            value={percentage} 
                            size="sm" 
                            colorScheme={currentNeeds[key].color} 
                            borderRadius="full"
                            bgColor="gray.700"
                            sx={{
                              "& > div": {
                                background: `linear-gradient(90deg, var(--chakra-colors-${currentNeeds[key].color}-600), var(--chakra-colors-${currentNeeds[key].color}-400))`,
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </VStack>
                    
                    <Button 
                      mt={4} 
                      w="full" 
                      leftIcon={<FaRegCheckCircle />}
                      onClick={() => applyRecommendation(recommendation)}
                      bgGradient="linear(to-r, accent.500, accent.600)"
                      _hover={{
                        bgGradient: "linear(to-r, accent.600, accent.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 20px -10px rgba(236, 110, 76, 0.5)"
                      }}
                      _active={{
                        bgGradient: "linear(to-r, accent.700, accent.800)",
                        transform: "translateY(0)",
                      }}
                      color="white"
                      borderRadius="xl"
                      height="48px"
                    >
                      Apply AI Recommendation
                    </Button>
                  </Box>
                  
                  <Box display="flex" flexDirection="column" height="100%">
                    <Flex justify="space-between" align="center" mb={3}>
                      <HStack>
                        <Box 
                          bg="rgba(11, 197, 234, 0.1)" 
                          p={1.5} 
                          borderRadius="md"
                        >
                          <Icon as={FaRegHeart} color="brand.500" boxSize={4} />
                        </Box>
                        <Text color="white" fontWeight="medium">Custom Allocation</Text>
                      </HStack>
                      <HStack 
                        bg="rgba(11, 197, 234, 0.1)" 
                        px={3} 
                        py={1} 
                        borderRadius="full"
                        boxShadow="0 0 10px rgba(11, 197, 234, 0.2)"
                      >
                        <Icon as={FaChartLine} color="brand.500" boxSize={3} />
                        <Text color="white" fontWeight="bold" fontSize="sm">
                          Impact: {impactScores.custom}
                        </Text>
                      </HStack>
                    </Flex>
                    
                    <VStack 
                      spacing={4} 
                      align="stretch" 
                      bg="rgba(26, 32, 44, 0.6)" 
                      p={4} 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="gray.700"
                      flex="1"
                    >
                      {Object.entries(customAllocation).map(([key, percentage]) => (
                        <Box key={key}>
                          <Flex justify="space-between" mb={1}>
                            <HStack>
                              <Icon 
                                as={currentNeeds[key].icon} 
                                color={`${currentNeeds[key].color}.500`} 
                                boxSize={3}
                              />
                              <Text color="gray.300" fontSize="sm">{currentNeeds[key].name}</Text>
                            </HStack>
                            <Badge 
                              colorScheme={currentNeeds[key].color}
                              borderRadius="full"
                              px={2}
                              boxShadow={`0 0 8px rgba(var(--chakra-colors-${currentNeeds[key].color}-500-rgb), 0.3)`}
                            >
                              {percentage}%
                            </Badge>
                          </Flex>
                          <Slider 
                            aria-label={`${key}-allocation`}
                            value={percentage}
                            min={0}
                            max={100}
                            step={5}
                            onChange={(val) => handleSliderChange(val, key)}
                            colorScheme={currentNeeds[key].color}
                          >
                            <SliderTrack bg="gray.700">
                              <SliderFilledTrack 
                                bgGradient={`linear(to-r, ${currentNeeds[key].color}.600, ${currentNeeds[key].color}.400)`}
                              />
                            </SliderTrack>
                            <SliderThumb 
                              boxSize={5} 
                              bg={`${currentNeeds[key].color}.500`}
                              boxShadow={`0 0 10px rgba(var(--chakra-colors-${currentNeeds[key].color}-500-rgb), 0.5)`}
                              _focus={{
                                boxShadow: `0 0 0 3px rgba(var(--chakra-colors-${currentNeeds[key].color}-500-rgb), 0.3)`
                              }}
                            />
                          </Slider>
                        </Box>
                      ))}
                    </VStack>
                    
                    <Button 
                      mt={4} 
                      w="full" 
                      leftIcon={<FaRegHeart />}
                      onClick={() => applyRecommendation(customAllocation)}
                      bgGradient="linear(to-r, brand.500, brand.600)"
                      _hover={{
                        bgGradient: "linear(to-r, brand.600, brand.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 20px -10px rgba(11, 197, 234, 0.5)"
                      }}
                      _active={{
                        bgGradient: "linear(to-r, brand.700, brand.800)",
                        transform: "translateY(0)",
                      }}
                      color="white"
                      borderRadius="xl"
                      height="48px"
                    >
                      Apply Custom Allocation
                    </Button>
                  </Box>
                </SimpleGrid>
              </Box>
              
              <Box 
                bg="rgba(26, 32, 44, 0.6)" 
                p={4} 
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
                mt={2}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle at bottom right, rgba(11, 197, 234, 0.05), transparent 70%)",
                  zIndex: 0,
                }}
              >
                <Flex align="center" mb={2} position="relative" zIndex="1">
                  <Icon as={FaInfoCircle} color="brand.500" mr={2} />
                  <Text color="white" fontWeight="medium">How This Works</Text>
                </Flex>
                <Text color="gray.400" fontSize="sm" position="relative" zIndex="1">
                  Our AI analyzes real-time data from all projects, including urgency levels, funding gaps, and potential impact. The recommendation balances immediate needs with long-term sustainability to maximize the benefit of your donation.
                </Text>
              </Box>
            </>
          ) : (
            <Text color="gray.400">Unable to generate recommendation. Please try again.</Text>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default AIDonationAdvisor; 
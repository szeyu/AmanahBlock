import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  Badge,
  Progress,
  Divider,
  Tooltip,
  Collapse,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  Icon,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  FaRobot, 
  FaRegLightbulb, 
  FaChartPie, 
  FaInfoCircle, 
  FaSchool, 
  FaHandHoldingWater, 
  FaUtensils, 
  FaHandHoldingUsd,
  FaRegCheckCircle,
  FaRegChartBar,
  FaRegHeart
} from 'react-icons/fa';

const AIDonationAdvisor = ({ 
  donationAmount = 100, 
  donationType = 'sadaqah', 
  selectedPool = 'general',
  onRecommendationSelect = () => {},
  isActive = true
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [customAllocation, setCustomAllocation] = useState({
    school: 25,
    flood: 25,
    food: 25,
    emergency: 25
  });
  const [impactScores, setImpactScores] = useState({
    school: 85,
    flood: 92,
    food: 78,
    emergency: 88
  });
  
  // Mock data for current needs
  const currentNeeds = {
    general: {
      name: "General Charity Pool",
      urgency: "Medium",
      description: "Funds are distributed based on need across all projects",
      icon: FaHandHoldingUsd,
      color: "purple"
    },
    school: {
      name: "School Building",
      urgency: "Medium",
      description: "Funding needed for 3 schools in Yemen and Pakistan",
      icon: FaSchool,
      color: "blue"
    },
    flood: {
      name: "Flood Relief",
      urgency: "High",
      description: "Urgent assistance needed for flooding in Bangladesh",
      icon: FaHandHoldingWater,
      color: "red"
    },
    food: {
      name: "Food Bank",
      urgency: "Medium-High",
      description: "Ongoing food security programs in 5 countries",
      icon: FaUtensils,
      color: "orange"
    },
  };
  
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
      emergency: 88
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
    const score = calculateImpactScore(customAllocation);
    setImpactScores({
      ...impactScores,
      custom: score
    });
  }, [customAllocation]);
  
  if (!isActive) return null;
  
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={8}
      position="relative"
      overflow="hidden"
      _after={{
        content: '""',
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        bg: 'radial-gradient(circle at center, rgba(128, 90, 213, 0.2) 0%, transparent 70%)',
        zIndex: 0,
      }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <HStack>
          {/* <Icon as={FaRobot} color="accent.500" boxSize={6} /> */}
          <Heading size="md" color="white">Donation Allocation</Heading>
        </HStack>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggle}
          rightIcon={isOpen ? <FaRegCheckCircle /> : <FaRegLightbulb />}
        >
          {isOpen ? "Apply Recommendation" : "Get Recommendation"}
        </Button>
      </Flex>
      
      {/* <Text color="gray.300" mb={4} position="relative" zIndex={1}>
        Our AI analyzes current needs, impact potential, and donation patterns to recommend the optimal allocation of your donation.
      </Text> */}
      
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={6} align="stretch">
          {isLoading ? (
            <Flex direction="column" align="center" justify="center" py={10}>
              <Spinner size="xl" color="accent.500" mb={4} />
              <Text color="gray.300">Analyzing current needs and impact potential...</Text>
            </Flex>
          ) : recommendation ? (
            <>
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading size="sm" color="white">Current Needs Assessment</Heading>
                  <Button 
                    size="xs" 
                    leftIcon={<FaRegLightbulb />} 
                    variant="ghost" 
                    onClick={generateRecommendation}
                  >
                    Refresh
                  </Button>
                </Flex>
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
                  {Object.entries(currentNeeds).map(([key, data]) => (
                    <Box 
                      key={key} 
                      p={5} 
                      bg="gray.800" 
                      borderRadius="md" 
                      borderLeftWidth="4px"
                      borderLeftColor={`${data.color}.500`}
                      minH="180px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      boxShadow="md"
                      transition="transform 0.2s"
                      _hover={{ transform: "translateY(-2px)" }}
                      position="relative"
                    >
                      <HStack mb={3}>
                        <Icon as={data.icon} color={`${data.color}.500`} boxSize={5} />
                        <Text color="white" fontWeight="medium">{data.name}</Text>
                      </HStack>
                      
                      <Text color="gray.400" fontSize="sm" noOfLines={2} mb={10}>
                        {data.description}
                      </Text>
                      
                      <Badge 
                        colorScheme={
                          data.urgency === "High" ? "red" : 
                          data.urgency === "Medium-High" ? "orange" : 
                          data.urgency === "Medium" ? "yellow" : 
                          "green"
                        }
                        fontSize="xs"
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
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text color="white" fontWeight="medium">AI Recommendation</Text>
                      <HStack>
                        <Icon as={FaRegChartBar} color="accent.500" />
                        <Text color="white" fontWeight="bold">
                          Impact Score: {calculateImpactScore(recommendation)}
                        </Text>
                      </HStack>
                    </Flex>
                    
                    <VStack spacing={3} align="stretch" bg="gray.800" p={4} borderRadius="md">
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
                            <Badge colorScheme={currentNeeds[key].color}>
                              {percentage}%
                            </Badge>
                          </Flex>
                          <Progress 
                            value={percentage} 
                            size="sm" 
                            colorScheme={currentNeeds[key].color} 
                            borderRadius="full" 
                          />
                        </Box>
                      ))}
                    </VStack>
                    
                    <Button 
                      mt={4} 
                      w="full" 
                      variant="outline" 
                      colorScheme="accent"
                      leftIcon={<FaRegCheckCircle />}
                      onClick={() => applyRecommendation(recommendation)}
                    >
                      Apply Recommendation
                    </Button>
                  </Box>
                  
                  <Box>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text color="white" fontWeight="medium">Custom Allocation</Text>
                      <HStack>
                        <Icon as={FaRegChartBar} color="brand.500" />
                        <Text color="white" fontWeight="bold">
                          Impact Score: {impactScores.custom || 0}
                        </Text>
                      </HStack>
                    </Flex>
                    
                    <VStack spacing={4} align="stretch" bg="gray.800" p={4} borderRadius="md">
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
                            <Badge colorScheme={currentNeeds[key].color}>
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
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={4} />
                          </Slider>
                        </Box>
                      ))}
                    </VStack>
                    
                    <Button 
                      mt={4} 
                      w="full" 
                      variant="gradient"
                      leftIcon={<FaRegHeart />}
                      onClick={() => applyRecommendation(customAllocation)}
                    >
                      Apply Custom Allocation
                    </Button>
                  </Box>
                </SimpleGrid>
              </Box>
              
              <Box bg="gray.800" p={4} borderRadius="md" mt={2}>
                <Flex align="center" mb={2}>
                  <Icon as={FaInfoCircle} color="brand.500" mr={2} />
                  <Text color="white" fontWeight="medium">How This Works</Text>
                </Flex>
                <Text color="gray.400" fontSize="sm">
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
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  SimpleGrid,
  useToast,
  Badge,
  HStack,
  Icon,
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { FaExclamationTriangle, FaClock, FaCoins } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend);

const MotionBox = motion(Box);

const VotingPieChart = ({ 
  title, 
  data, 
  timeframe, 
  category, 
  userTokens, 
  onVote, 
  colorScheme,
  width = "100%" 
}) => {
  const [votingData, setVotingData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
    }],
  });

  // State for the currently selected project's tokens
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState(0);
  const [localVoteCounts, setLocalVoteCounts] = useState({});
  const toast = useToast();

  // Initialize local vote counts
  useEffect(() => {
    if (!data) return;
    const initialCounts = {};
    data.forEach(item => {
      initialCounts[item.id] = item.voteCount;
    });
    setLocalVoteCounts(initialCounts);
  }, [data]);

  // Update chart data whenever the data prop or local vote counts change
  useEffect(() => {
    if (!data) return;

    const labels = data.map(p => p.title);
    const voteData = data.map(p => localVoteCounts[p.id] || p.voteCount);
    
    // Use blue and purple colors for emergency proposals
    const backgroundColors = ['#4299E1', '#9F7AEA']; // Blue and Purple
    const borderColors = ['#2B6CB0', '#6B46C1']; // Darker Blue and Purple

    setVotingData({
      labels,
      datasets: [{
        data: voteData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      }],
    });
  }, [data, localVoteCounts, category]);

  const handleVote = async (projectId) => {
    try {
      if (selectedTokens === 0) {
        toast({
          title: "Please select tokens to vote",
          description: "Use the slider to select how many tokens you want to allocate",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      // Update local vote count immediately
      setLocalVoteCounts(prev => ({
        ...prev,
        [projectId]: (prev[projectId] || 0) + selectedTokens
      }));

      // Call the parent's onVote handler
      await onVote(projectId, selectedTokens);
      
      // Reset selection after successful vote
      setSelectedTokens(0);
      setSelectedProject(null);
      
      toast({
        title: "Vote cast successfully!",
        description: `You allocated ${selectedTokens} tokens to this proposal`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Revert local vote count if the vote fails
      setLocalVoteCounts(prev => ({
        ...prev,
        [projectId]: prev[projectId] - selectedTokens
      }));

      toast({
        title: "Error casting vote",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `Votes: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg="rgba(13, 16, 31, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={6}
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      _hover={{ borderColor: "rgba(0, 224, 255, 0.3)" }}
      width={width}
    >
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaExclamationTriangle} color={colorScheme} />
            <Heading size="md" color="white">
              {title}
            </Heading>
          </HStack>
          <HStack>
            <Icon as={FaClock} color={colorScheme} />
            <Text color="white" fontSize="sm">Time Remaining: {timeframe}</Text>
            <Badge colorScheme={category === 'Emergency' ? 'red' : category === 'Project' ? 'blue' : 'purple'}>
              {category}
            </Badge>
          </HStack>
        </HStack>

        {/* Token Information */}
        <Box 
          bg="rgba(0, 0, 0, 0.2)" 
          p={4} 
          borderRadius="lg"
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.05)"
        >
          <HStack justify="space-between">
            <Stat>
              <StatLabel color="gray.400">Available Voting Power</StatLabel>
              <StatNumber color="white">
                <HStack>
                  <Icon as={FaCoins} color={colorScheme} />
                  <Text>{userTokens} tokens</Text>
                </HStack>
              </StatNumber>
              {selectedTokens > 0 && (
                <StatHelpText color="gray.400">
                  Selected: {selectedTokens} tokens
                </StatHelpText>
              )}
            </Stat>
            {selectedTokens > 0 && (
              <Progress 
                value={(selectedTokens / userTokens) * 100}
                colorScheme={colorScheme === 'red.500' ? 'blue' : colorScheme === 'orange.500' ? 'purple' : 'blue'}
                width="200px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.1)"
              />
            )}
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box height="300px" position="relative">
            <Pie data={votingData} options={chartOptions} />
          </Box>

          <VStack spacing={4} align="stretch">
            {data && data.map((item) => (
              <Box
                key={item.id}
                bg="rgba(0, 0, 0, 0.2)"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.05)"
              >
                <HStack justify="space-between" mb={2}>
                  <Heading size="sm" color="white">
                    {item.title}
                  </Heading>
                  <Text color={colorScheme} fontSize="sm">
                    {localVoteCounts[item.id] || item.voteCount} votes
                  </Text>
                </HStack>

                <Text color="gray.300" fontSize="sm" mb={3}>
                  {item.description}
                </Text>

                <VStack spacing={3}>
                  {selectedProject === item.id && (
                    <>
                      <HStack width="100%" justify="space-between">
                        <Text color="gray.400" fontSize="sm">Select tokens to vote:</Text>
                        <HStack>
                          <Icon as={FaCoins} color={colorScheme} />
                          <Text color="white" fontSize="sm">{selectedTokens}</Text>
                        </HStack>
                      </HStack>
                      
                      <Slider
                        aria-label="token-slider"
                        defaultValue={0}
                        min={0}
                        max={userTokens}
                        value={selectedTokens}
                        onChange={setSelectedTokens}
                        isDisabled={item.hasVoted || userTokens === 0}
                      >
                        <SliderTrack bg="rgba(255, 255, 255, 0.1)">
                          <SliderFilledTrack bg={colorScheme} />
                        </SliderTrack>
                        <SliderThumb boxSize={6} bg={colorScheme}>
                          <Icon as={FaCoins} color="white" w={3} h={3} />
                        </SliderThumb>
                      </Slider>
                    </>
                  )}

                  <Button
                    colorScheme={colorScheme === 'red.500' ? 'blue' : colorScheme === 'orange.500' ? 'purple' : 'blue'}
                    size="sm"
                    onClick={() => {
                      if (selectedProject === item.id) {
                        handleVote(item.id);
                      } else {
                        setSelectedProject(item.id);
                        setSelectedTokens(0);
                      }
                    }}
                    isDisabled={item.hasVoted || userTokens === 0}
                    width="full"
                  >
                    {selectedProject === item.id ? `Vote with ${selectedTokens} tokens` : 'Select to Vote'}
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>
        </SimpleGrid>
      </VStack>
    </MotionBox>
  );
};

export default VotingPieChart;
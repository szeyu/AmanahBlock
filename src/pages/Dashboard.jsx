import React from 'react';
import { Box, Grid, Heading, Flex, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Icon, Divider, HStack, Progress, VStack } from '@chakra-ui/react';
import { FaExternalLinkAlt, FaRegClock, FaCheckCircle, FaRegFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for the dashboard
  const donationStats = {
    total: 3700,
    activeProjects: 7,
    investmentReturns: 215,
    impactScore: 87
  };

  const recentTransactions = [
    { id: '0x1a2b...3c4d', type: 'Waqf', amount: '500 USDT', date: '2023-05-15', status: 'Completed' },
    { id: '0x5e6f...7g8h', type: 'Zakat', amount: '1200 USDT', date: '2023-05-10', status: 'Processing' },
    { id: '0x9i0j...1k2l', type: 'Sadaqah', amount: '300 USDT', date: '2023-05-05', status: 'Completed' },
  ];

  const projectProgress = [
    { name: 'School Building in Yemen', category: 'Education', progress: 65, raised: '32,500', goal: '50,000' },
    { name: 'Emergency Flood Relief', category: 'Disaster', progress: 85, raised: '25,500', goal: '30,000' },
    { name: 'Food Bank Initiative', category: 'Food', progress: 40, raised: '10,000', goal: '25,000' },
  ];

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={6} color="white">Dashboard</Heading>
      
      {/* Stats Overview */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
        <Stat className="card" p={4} borderRadius="md">
          <StatLabel color="gray.300">Total Donations</StatLabel>
          <StatNumber color="white">{donationStats.total} USDT</StatNumber>
          <StatHelpText color="green.400">
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        
        <Stat className="card" p={4} borderRadius="md">
          <StatLabel color="gray.300">Active Projects</StatLabel>
          <StatNumber color="white">{donationStats.activeProjects}</StatNumber>
          <StatHelpText color="gray.300">From 3 pools</StatHelpText>
        </Stat>
        
        <Stat className="card" p={4} borderRadius="md">
          <StatLabel color="gray.300">Investment Returns</StatLabel>
          <StatNumber color="white">{donationStats.investmentReturns} USDT</StatNumber>
          <StatHelpText color="green.400">
            <StatArrow type="increase" />
            5.8%
          </StatHelpText>
        </Stat>
        
        <Stat className="card" p={4} borderRadius="md">
          <StatLabel color="gray.300">Impact Score</StatLabel>
          <StatNumber color="white">{donationStats.impactScore}/100</StatNumber>
          <StatHelpText color="blue.400">Excellent</StatHelpText>
        </Stat>
      </Grid>
      
      {/* Donation Chart Placeholder */}
      <Box className="card" p={6} borderRadius="md" mb={8}>
        <Heading size="md" mb={4} color="white">Your Donation History</Heading>
        <Box h="300px" bg="rgba(11, 197, 234, 0.05)" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
          <Text color="gray.400">Donation chart will be displayed here</Text>
        </Box>
      </Box>
      
      {/* Recent Transactions */}
      <Box className="card" p={6} borderRadius="md" mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="white">Recent Transactions</Heading>
          <Button as={Link} to="/audit-trail" size="sm" rightIcon={<FaExternalLinkAlt />} variant="outline" colorScheme="blue">
            View All
          </Button>
        </Flex>
        
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th color="gray.300">Transaction ID</Th>
                <Th color="gray.300">Type</Th>
                <Th color="gray.300">Amount</Th>
                <Th color="gray.300">Date</Th>
                <Th color="gray.300">Status</Th>
                <Th color="gray.300">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentTransactions.map((tx, idx) => (
                <Tr key={idx}>
                  <Td color="blue.300">{tx.id}</Td>
                  <Td color="white">{tx.type}</Td>
                  <Td color="white">{tx.amount}</Td>
                  <Td color="white">{tx.date}</Td>
                  <Td>
                    <Badge 
                      colorScheme={
                        tx.status === 'Completed' ? 'green' : 
                        tx.status === 'Processing' ? 'yellow' : 'blue'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button size="xs" leftIcon={<FaRegFileAlt />} variant="ghost" colorScheme="blue">
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      
      {/* Project Progress */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        {/* Project Progress */}
        <Box className="card" p={6} borderRadius="md">
          <Heading size="md" mb={4} color="white">Project Progress</Heading>
          <VStack spacing={6} align="stretch">
            {projectProgress.map((project, idx) => (
              <Box key={idx}>
                <Flex justify="space-between" mb={1}>
                  <Text fontWeight="medium" color="white">{project.name}</Text>
                  <Badge colorScheme={
                    project.category === 'Education' ? 'blue' : 
                    project.category === 'Disaster' ? 'red' : 'green'
                  }>
                    {project.category}
                  </Badge>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.400">
                    {project.raised} USDT raised of {project.goal} USDT
                  </Text>
                  <Text fontSize="sm" color="gray.400">{project.progress}%</Text>
                </Flex>
                <Progress 
                  value={project.progress} 
                  size="sm" 
                  colorScheme={
                    project.category === 'Education' ? 'blue' : 
                    project.category === 'Disaster' ? 'red' : 'green'
                  } 
                  borderRadius="full"
                />
              </Box>
            ))}
          </VStack>
        </Box>
        
        {/* Fund Allocation */}
        <Box className="card" p={6} borderRadius="md">
          <Heading size="md" mb={4} color="white">Fund Allocation</Heading>
          <Box h="250px" bg="rgba(128, 90, 213, 0.05)" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
            <Text color="gray.400">Fund allocation chart will be displayed here</Text>
          </Box>
          <Divider my={4} borderColor="gray.700" />
          <Flex justify="space-between" wrap="wrap" gap={2}>
            <HStack>
              <Box w="12px" h="12px" borderRadius="full" bg="blue.500" />
              <Text fontSize="sm" color="gray.300">Education (45%)</Text>
            </HStack>
            <HStack>
              <Box w="12px" h="12px" borderRadius="full" bg="red.500" />
              <Text fontSize="sm" color="gray.300">Disaster Relief (30%)</Text>
            </HStack>
            <HStack>
              <Box w="12px" h="12px" borderRadius="full" bg="green.500" />
              <Text fontSize="sm" color="gray.300">Food & Water (25%)</Text>
            </HStack>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
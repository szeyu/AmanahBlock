import React, { useState } from 'react';
import { Box, Grid, Heading, Flex, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Icon, Divider, HStack, Progress, VStack, SimpleGrid, Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaRegClock, FaCheckCircle, FaRegFileAlt, FaCertificate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DonationFlow from '../components/DonationFlow';
import TransactionFlowModal from '../components/TransactionFlowModal';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Mock data for the dashboard
  const donationStats = {
    total: 3700,
    activeProjects: 7,
    investmentReturns: 215,
    impactScore: 87
  };

  const getFundAllocationData = () => {
    return {
      labels: ['Education', 'Disaster Relief', 'Food & Water'],
      datasets: [
        {
          data: [45, 30, 25], // Percentages
          backgroundColor: ['#04CEEB', '#FF5A5A', '#47BB78'], // blue.500, red.500, green.500
          borderColor: ['#2C5282', '#C53030', '#2F855A'], // Darker versions for borders
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#CBD5E0', // gray.300
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 32, 44, 0.8)', // gray.800 with opacity
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#4A5568', // gray.600
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  // Add NFT data
  const nftCollection = [
    { 
      id: 1, 
      name: "School Building #001", 
      image: "/NFTCard/NFTCard.svg",
      type: "Education", 
      rarity: "Rare", // Added rarity
      issueDate: "2023-04-15"
    },
    { 
      id: 2, 
      name: "Water Well #042", 
      image: "/NFTCard/NFTCard2.svg", 
      type: "Food", 
      rarity: "Common", 
      issueDate: "2023-05-02"
    },
    { 
      id: 3, 
      name: "Food Bank #013", 
      image: "/NFTCard/NFTCard3.svg",
      type: "Food", 
      rarity: "Uncommon",
      issueDate: "2023-03-28"
    },
  ];

  // State for selected NFT and modal
  const [selectedNft, setSelectedNft] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle NFT click
  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    onOpen();
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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

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
      
      {/* Donation Chart */}
      <Box className="card" p={6} borderRadius="md" mb={8}>
        <Heading size="md" mb={4} color="white">Donation Flow</Heading>
        <DonationFlow />
      </Box>

      {/* NFT Collection - Added this section */}
      <Box className="card" p={6} borderRadius="md" mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="white">Impact NFTs</Heading>
          <Button as={Link} to="/nft-gallery" size="sm" rightIcon={<FaExternalLinkAlt />} variant="outline" colorScheme="purple">
            View All
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {nftCollection.map((nft) => (
            <Box 
              key={nft.id}
              bg="gray.800"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ 
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(138, 43, 226, 0.3)"
              }}
              onClick={() => handleNftClick(nft)}
              className="nft-card"
            >
              <Box position="relative">
                <Image 
                  src={nft.image} 
                  alt={nft.name}
                  h="150px"
                  w="100%"
                  objectFit="cover"
                />
                <Badge 
                  position="absolute" 
                  top="2" 
                  right="2" 
                  colorScheme={
                    nft.rarity === 'Common' ? 'gray' : 
                    nft.rarity === 'Uncommon' ? 'green' : 
                    nft.rarity === 'Rare' ? 'blue' : 'purple'
                  }
                >
                  {nft.rarity}
                </Badge>
              </Box>
              <Box p={3}>
                <Text fontWeight="bold" color="white" noOfLines={1}>{nft.name}</Text>
                <Flex justify="space-between" align="center" mt={1}>
                  <Badge colorScheme={
                    nft.type === 'Education' ? 'blue' : 
                    nft.type === 'Water' ? 'cyan' : 
                    nft.type === 'Food' ? 'green' : 'pink'
                  }>
                    {nft.type}
                  </Badge>
                  <HStack spacing={1}>
                    <Icon as={FaCertificate} color="purple.300" />
                    <Text fontSize="xs" color="gray.400">Verified</Text>
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
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
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handleTransactionDetails(tx)}
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* NFT Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="scale">
        <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0,0,0,0.7)"/>
        <ModalContent 
          bg="gray.800" 
          borderWidth="1px" 
          borderColor="purple.500"
          borderRadius="xl"
          overflow="hidden"
          className="modal-content"
        >
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            {selectedNft && (
              <Box>
                <Box 
                  position="relative" 
                  h="300px" 
                  className="nft-animation"
                >
                  <Image 
                    src={selectedNft.image} 
                    alt={selectedNft.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Box 
                    position="absolute" 
                    bottom="0" 
                    left="0" 
                    right="0" 
                    bg="rgba(0,0,0,0.7)" 
                    p={4}
                    backdropFilter="blur(5px)"
                  >
                    <Heading size="md" color="white">{selectedNft.name}</Heading>
                    <Text color="gray.300" fontSize="sm">Impact Certificate</Text>
                  </Box>
                </Box>
                <Box p={6}>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Type</Text>
                      <Text color="white" fontWeight="bold">{selectedNft.type}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Rarity</Text>
                      <Text color="white" fontWeight="bold">{selectedNft.rarity}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Issue Date</Text>
                      <Text color="white">{selectedNft.issueDate}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Token ID</Text>
                      <Text color="white">#{selectedNft.id.toString().padStart(4, '0')}</Text>
                    </Box>
                  </Grid>
                  
                  <Divider my={4} borderColor="gray.700" />
                  
                  <Text color="gray.300" fontSize="sm" mb={4}>
                    This NFT represents your contribution to a real-world impact project. 
                    It's a permanent record on the blockchain of your support.
                  </Text>
                  
                  <Flex justify="space-between">
                    <Button 
                      leftIcon={<FaExternalLinkAlt />} 
                      colorScheme="purple" 
                      variant="outline" 
                      size="sm"
                    >
                      View on Explorer
                    </Button>
                    <Button 
                      colorScheme="brand" 
                      size="sm"
                      onClick={onClose} // Add close function
                    >
                      Close
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      
      {/* Project Progress */}
      {/* <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}> */}
        {/* Project Progress */}
        {/* <Box className="card" p={6} borderRadius="md">
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
        </Box> */}
        
      {/* Fund Allocation */}
      <Box className="card" p={6} borderRadius="md">
        <Heading size="md" mb={4} color="white">Fund Allocation</Heading>
        <Box h="250px" borderRadius="md" position="relative">
          <Pie data={getFundAllocationData()} options={chartOptions} />
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
      {/* </Grid> */}

      <TransactionFlowModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transaction={selectedTransaction}
      />
    </Box>
  );
};

export default Dashboard; 
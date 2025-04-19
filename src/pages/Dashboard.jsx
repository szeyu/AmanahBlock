import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Import extracted components
import StatCards from '../components/dashboard/StatCards';
import DonationFlow from '../components/dashboard/DonationFlow';
import ImpactNFTs from '../components/dashboard/ImpactNFTs';
import NFTModal from '../components/dashboard/NFTModal';
import FundAllocationChart from '../components/dashboard/FundAllocationChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionFlowModal from '../components/dashboard/TransactionFlowModal';
import ReceiptModal from '../components/dashboard/ReceiptModal';
import { mockTransactions } from '../data/receiptData';

const Dashboard = ({userDonate}) => {
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
        backgroundColor: 'rgba(13, 16, 25, 0.9)', // Dark background with opacity
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
      rarity: "Platinum",
      issueDate: "2023-04-15"
    },
    { 
      id: 2, 
      name: "Water Well #042", 
      image: "/NFTCard/NFTCard2.svg", 
      type: "Food", 
      rarity: "Gold", 
      issueDate: "2023-05-02"
    },
    { 
      id: 3, 
      name: "School Donation #013", 
      image: "/NFTCard/NFTCard3.svg",
      type: "Education", 
      rarity: "Bronze",
      issueDate: "2025-04-20"
    },
  ];

  // Recent transactions data
  const recentTransactions = [
    { id: '0x7f2c1a9a1f4e7f6d3b5c8a9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t', receiptNo: 'AB-2025-0001', type: 'Waqf', amount: '500 USDT', date: '2023-05-15', status: 'Completed' },
    { id: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123', receiptNo: 'AB-2025-0012', type: 'Zakat', amount: '1200 USDT', date: '2023-05-10', status: 'Processing' },
    { id: '0x112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00', receiptNo: 'AB-2023-1023', type: 'Sadaqah', amount: '300 USDT', date: '2023-05-05', status: 'Completed' },
  ];

  // State for selected NFT and modal
  const [selectedNft, setSelectedNft] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle NFT click
  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };

  // State for transaction modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // Add state for receipt modal
  const { 
    isOpen: isReceiptModalOpen, 
    onOpen: onOpenReceiptModal, 
    onClose: onCloseReceiptModal 
  } = useDisclosure();

  // Function to handle transaction click
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  return (
    <Box 
      p={5} 
      maxW="container.xl" 
      mx="auto"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Box position="relative" zIndex="1">
        <Flex 
          direction="column" 
          mb={8}
        >
          <Heading 
            mb={2} 
            color="white" 
            size="xl"
            bgGradient="linear(to-r, brand.400, accent.400)"
            bgClip="text"
            fontWeight="bold"
          >
            Dashboard
          </Heading>
          <Text color="gray.400">
            Track your donations, investments, and impact in real-time
          </Text>
        </Flex>
        
        {/* Stat Cards */}
        <StatCards donationStats={donationStats} />
        
        {/* Donation Chart */}
        <Box 
          className="card" 
          p={6} 
          borderRadius="xl"
          mb={8}
          bg="rgba(13, 16, 25, 0.7)"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="gray.700"
          position="relative"
          overflow="hidden"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
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
        >
          <Heading 
            size="md" 
            mb={4} 
            color="white"
            position="relative"
            zIndex="1"
            display="flex"
            alignItems="center"
            _after={{
              content: '""',
              display: 'block',
              width: '30px',
              height: '2px',
              bgGradient: "linear(to-r, brand.500, transparent)",
              ml: 2
            }}
          >
            Donation Flow
          </Heading>
          <Box position="relative" zIndex="1">
            <DonationFlow userDonate={userDonate}/>
          </Box>
        </Box>

        {/* NFT Collection */}
        {/* <ImpactNFTs 
          nftCollection={nftCollection} 
          handleNftClick={handleNftClick} 
          onOpenReceiptModal={onOpenReceiptModal} 
        /> */}
        
        {/* NFT Modal */}
        {/* <NFTModal 
          isOpen={isOpen} 
          onClose={onClose} 
          selectedNft={selectedNft} 
        /> */}
        
        {/* Recent Transactions and Fund Allocation in a grid */}
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          gap={4}
          justify="space-between" // Added to distribute space evenly
          align="flex-start" // Align items at the top
        >
          {/* Recent Transactions */}
          <Box flex="1" maxWidth={{ lg: "65%" }}>
            <RecentTransactions 
              transactions={mockTransactions} 
              handleTransactionClick={handleTransactionClick} 
            />
          </Box>
          
          {/* Fund Allocation Chart */}
          <Box flex="1" maxWidth={{ lg: "32%" }}>
            <FundAllocationChart 
              chartData={getFundAllocationData()} 
              chartOptions={chartOptions} 
            />
          </Box>
        </Flex>

        {/* Transaction Flow Modal */}
        <TransactionFlowModal
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
          transaction={selectedTransaction}
        />

        {/* Add Receipt Modal */}
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={onCloseReceiptModal}
        />
      </Box>
    </Box>
  );
};

export default Dashboard; 
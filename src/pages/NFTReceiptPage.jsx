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
import ImpactNFTs from '../components/dashboard/ImpactNFTs';
import NFTModal from '../components/dashboard/NFTModal';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionFlowModal from '../components/dashboard/TransactionFlowModal';
import ReceiptModal from '../components/dashboard/ReceiptModal';
import { mockTransactions } from '../data/receiptData';

const NFTReceiptPage = ({userDonate, setUserDonate}) => {
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
      name: "Food Bank #013", 
      image: "/NFTCard/NFTCard3.svg",
      type: "Food", 
      rarity: "Bronze",
      issueDate: "2023-03-28"
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
            NFTs & Receipts
          </Heading>
          <Text color="gray.400">
            Track your donations, investments, and impact in real-time
          </Text>
        </Flex>

        {/* NFT Collection */}
        <ImpactNFTs 
          nftCollection={nftCollection} 
          handleNftClick={handleNftClick} 
          onOpenReceiptModal={onOpenReceiptModal} 
          userDonate={userDonate}
          setUserDonate={setUserDonate}
        />
        
        {/* NFT Modal */}
        <NFTModal 
          isOpen={isOpen} 
          onClose={onClose} 
          selectedNft={selectedNft} 
        />
        
        {/* Recent Transactions and Fund Allocation in a grid */}
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          gap={4}
          justify="space-between" // Added to distribute space evenly
          align="flex-start" // Align items at the top
        >
          {/* Recent Transactions */}
            <RecentTransactions 
              transactions={mockTransactions} 
              handleTransactionClick={handleTransactionClick} 
              userDonate={userDonate}
              setUserDonate={setUserDonate}
            />
          
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
          userDonate={userDonate}
          setUserDonate={setUserDonate}
        />
      </Box>
    </Box>
  );
};

export default NFTReceiptPage; 
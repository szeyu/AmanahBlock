import React, { useRef } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { 
  FaExternalLinkAlt, 
  FaWallet, 
  FaHandHoldingUsd, 
  FaMoneyBillWave,
  FaSearch,
  FaReceipt,
  FaDownload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReceiptModal from './ReceiptModal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const RecentTransactions = ({ transactions, handleTransactionClick }) => {
  // Define transaction type icons
  const typeIcons = {
    'waqf': FaHandHoldingUsd,
    'zakat': FaWallet,
    'sadaqah': FaMoneyBillWave,
  };

  const truncateHash = (hash, startLength = 6, endLength = 4) => {
    if (!hash || hash.length <= startLength + endLength) {
      return hash;
    }
    return `${hash.substring(0, startLength)}...${hash.substring(hash.length - endLength)}`;
  };

  // Add state for receipt modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const receiptRef = useRef(null);
  const toast = useToast();

  // Function to handle view receipt
  const handleViewReceipt = (tx) => {
    setSelectedTransaction(tx);
    onOpen();
  };

  // Helper function to calculate total amount from items
  const calculateTotalAmount = (items) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  // Helper function to get primary type from items
  const getPrimaryType = (items) => {
    if (!items || !items.length) return 'Donation';
    return items[0].type || 'Donation';
  };

  // Function to handle download receipt
  const handleDownloadReceipt = (tx) => {
    setSelectedTransaction(tx);
    
    // Open the modal first to render the receipt
    onOpen();
    
    // Use setTimeout to ensure the modal content is rendered
    setTimeout(() => {
      if (receiptRef.current) {
        // Show loading toast
        toast({
          title: "Preparing receipt...",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        // Create a temporary container with exact dimensions
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '595px'; // A4 width in pixels at 72 DPI
        document.body.appendChild(tempContainer);
        
        // Clone the receipt into the temp container
        const receiptClone = receiptRef.current.cloneNode(true);
        receiptClone.style.width = '100%';
        receiptClone.style.margin = '0';
        receiptClone.style.padding = '0';
        tempContainer.appendChild(receiptClone);
          
        html2canvas(receiptClone, {
          scale: 4, // Higher scale for better quality
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff",
          width: 595, // Fixed width
          height: receiptClone.offsetHeight,
          // width: receiptRef.current.offsetWidth,
          // height: receiptRef.current.offsetHeight,
        }).then(canvas => {
          // Remove the temporary container
          document.body.removeChild(tempContainer);
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });
          
          // Calculate dimensions to fit the receipt in the PDF
          const imgWidth = 210; // A4 width in mm (210mm)
          const imgHeight = canvas.height * imgWidth / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          
          // Generate filename based on transaction details
          const primaryType = getPrimaryType(tx.items);
          const filename = `receipt-${tx.id.substring(0, 8)}-${primaryType.toLowerCase()}.pdf`;
          
          pdf.save(filename);
          
          // Show success toast
          toast({
            title: "Receipt downloaded!",
            description: `Saved as ${filename}`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }).catch(error => {
          console.error("Error generating PDF:", error);
          
          // Show error toast
          toast({
            title: "Download failed",
            description: "There was an error generating the receipt PDF.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
      }
    }, 500); // Give the modal time to render
  };

  return (
    <Box 
      p={6} 
      borderRadius="md"
      mb={8}
      height="420px"
      width="100%" // Ensure it takes full width of its container
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
      <Flex 
        justify="space-between" 
        align="center" 
        mb={6}
        position="relative"
        zIndex="1"
      >
        <Heading 
          size="md" 
          color="white"
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
          Recent Transactions
        </Heading>
        <Button 
          as={Link} 
          to="/transactions" 
          size="sm" 
          rightIcon={<FaExternalLinkAlt />} 
          variant="outline" 
          colorScheme="brand"
          borderRadius="full"
          _hover={{
            bg: "rgba(11, 197, 234, 0.1)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
          }}
          transition="all 0.3s ease"
        >
          View All
        </Button>
      </Flex>
      
      {/* Modified to have both vertical and horizontal scrolling */}
      <Box 
        position="relative" 
        zIndex="1" 
        maxHeight="300px" 
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(11, 197, 234, 0.3)',
            borderRadius: '8px',
          },
        }}
      >
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead position="sticky" top={0} bg="rgba(13, 16, 25, 0.9)" zIndex={2}>
              <Tr>
                <Th color="gray.400" borderColor="gray.700">TRANSACTION ID</Th>
                <Th color="gray.400" borderColor="gray.700">TYPE</Th>
                <Th color="gray.400" borderColor="gray.700">AMOUNT</Th>
                <Th color="gray.400" borderColor="gray.700">DATE</Th>
                <Th color="gray.400" borderColor="gray.700">STATUS</Th>
                <Th color="gray.400" borderColor="gray.700">ACTION</Th>
                <Th color="gray.400" borderColor="gray.700">VIEW RECEIPT</Th>
                <Th color="gray.400" borderColor="gray.700">DOWNLOAD RECEIPT</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx) => {
                const primaryType = getPrimaryType(tx.items);
                const typeIcon = typeIcons[primaryType.toLowerCase()] || FaMoneyBillWave;
                const totalAmount = calculateTotalAmount(tx.items);
                
                return (
                  <Tr 
                    key={tx.id}
                    transition="all 0.2s"
                    _hover={{
                      bg: "rgba(11, 197, 234, 0.05)",
                    }}
                  >
                    <Td 
                      color="blue.300" 
                      borderColor="gray.700" 
                      fontFamily="mono"
                      fontWeight="medium"
                      title={tx.id}
                    >
                      {truncateHash(tx.id)}
                    </Td>
                    <Td borderColor="gray.700">
                      <Flex align="center">
                        <Icon 
                          as={typeIcon} 
                          color="brand.400" 
                          mr={2} 
                        />
                        <Text color="gray.300">{primaryType}</Text>
                      </Flex>
                    </Td>
                    <Td color="green.400" borderColor="gray.700" fontWeight="medium">
                      {`${totalAmount.toFixed(2)} USDT`}
                    </Td>
                    <Td color="gray.300" borderColor="gray.700">{tx.date}</Td>
                    <Td borderColor="gray.700">
                      <Badge 
                        colorScheme={tx.status.toLowerCase() === 'completed' ? 'green' : 'yellow'} 
                        borderRadius="full"
                        px={2}
                        py={1}
                        textTransform="uppercase"
                        fontSize="xs"
                      >
                        {tx.status}
                      </Badge>
                    </Td>
                    
                    <Td borderColor="gray.700">
                      <Button 
                        size="xs" 
                        colorScheme="blue"
                        borderRadius="full"
                        leftIcon={<FaSearch size={10} />}
                        onClick={() => handleTransactionClick(tx)}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(11, 197, 234, 0.2)"
                        }}
                        transition="all 0.2s"
                      >
                        Details
                      </Button>
                    </Td>
                    {/* New column for View Receipt */}
                    <Td borderColor="gray.700">
                      <Button 
                        size="xs" 
                        colorScheme="purple"
                        borderRadius="full"
                        leftIcon={<FaReceipt size={10} />}
                        onClick={() => handleViewReceipt(tx)}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(159, 122, 234, 0.2)"
                        }}
                        transition="all 0.2s"
                      >
                        View
                      </Button>
                    </Td>
                    {/* New column for Download Receipt */}
                    <Td borderColor="gray.700">
                      <Button 
                        size="xs" 
                        colorScheme="green"
                        borderRadius="full"
                        leftIcon={<FaDownload size={10} />}
                        onClick={() => handleDownloadReceipt(tx)}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 8px rgba(72, 187, 120, 0.2)"
                        }}
                        transition="all 0.2s"
                      >
                        Download
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isOpen}
        onClose={onClose}
        receiptRef={receiptRef}
        receiptData={{
          receiptNumber: selectedTransaction?.receiptNo || '',
          transactionId: selectedTransaction?.id || '',
          date: selectedTransaction?.date || new Date().toLocaleDateString(),
          donorName: "John Doe", // This would come from user data
          donorEmail: "john.doe@example.com", // This would come from user data
          items: selectedTransaction?.items || [],
          totalAmount: calculateTotalAmount(selectedTransaction?.items || []),
        }}
      />
    </Box>
  );
};

export default RecentTransactions;
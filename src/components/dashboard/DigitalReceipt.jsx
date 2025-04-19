import React, { useRef } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Image,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Flex,
  useColorModeValue,
  Badge,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { 
  FaDownload
} from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { defaultReceiptData } from '../../data/receiptData';
import { mockTransactions } from '../../data/receiptData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DigitalReceipt = ({ 
  receiptNumber, 
  date, 
  donorName, 
  donorEmail, 
  items, 
  totalAmount, 
  transactionId 
}) => {
  // Generate QR code value (typically contains transaction ID or verification URL)
  const qrValue = `https://amanahblock.com/verify-receipt/${transactionId}`;

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
  // Modify the handleDownloadReceipt function to use current receipt data
  // Function to handle download receipt
  const handleDownloadReceipt = () => {
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
      tempContainer.style.backgroundColor = 'white';
      document.body.appendChild(tempContainer);
      
      // Clone the receipt into the temp container
      const receiptClone = receiptRef.current.cloneNode(true);
      
      // Remove scrolling and height limitations
      receiptClone.style.maxHeight = 'none';
      receiptClone.style.height = 'auto';
      receiptClone.style.overflow = 'visible';
      receiptClone.style.width = '100%';
      receiptClone.style.margin = '0';
      receiptClone.style.padding = '20px';
      receiptClone.style.boxShadow = 'none';
      
      // Fix sticky header
      const stickyHeader = receiptClone.querySelector('[position="sticky"]');
      if (stickyHeader) {
        stickyHeader.style.position = 'relative';
        stickyHeader.style.top = '0';
        stickyHeader.style.zIndex = '1';
      }
      
      // Fix sticky elements while preserving table layout
      const allElements = receiptClone.querySelectorAll('*');
      allElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        
        // Apply a consistent font family to table elements
        if (['th', 'td', 'tr', 'thead', 'tbody', 'table'].includes(el.tagName.toLowerCase())) {
          el.style.fontFamily = 'Arial, Helvetica, sans-serif'; // Use a standard font stack
        }

        // Handle table headers specifically
        if (el.tagName.toLowerCase() === 'th') {
          el.style.margin = '0px'; // Explicitly reset margin
          el.style.padding = '0px'; // Explicitly reset padding first
          el.style.paddingLeft = '12px'; // Apply specific padding
          el.style.paddingRight = '12px'; // Apply specific padding
          el.style.height = '30px';     // Keep height consistent with Thead
          el.style.lineHeight = '30px';  // Match line height
          el.style.verticalAlign = 'middle';
          el.style.position = 'static';
          el.style.boxSizing = 'border-box'; // Ensure padding is included in height
          el.style.display = 'table-cell';
        }
        
        // Handle table cells
        if (el.tagName.toLowerCase() === 'td') {
          el.style.position = 'static';
          el.style.verticalAlign = 'middle';
          el.style.padding = '8px 12px'; // Keep cell padding
          el.style.margin = '0px'; // Explicitly reset margin
          el.style.boxSizing = 'border-box';
          
          if (computedStyle.textAlign === 'right') {
            el.style.textAlign = 'right';
          }
        }
        
        // Reset padding/margin on table rows and header section as well
        if (['tr', 'thead', 'tbody'].includes(el.tagName.toLowerCase())) {
          el.style.padding = '0px';
          el.style.margin = '0px';
        }
      });
      
      tempContainer.appendChild(receiptClone);
      
      // Use a timeout to ensure the DOM is fully rendered
      setTimeout(() => {
        html2canvas(receiptClone, {
          scale: 4, // Balance between quality and performance
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: 595,
          height: receiptClone.offsetHeight,
          onclone: (clonedDoc) => {
            // Additional cleanup in the cloned document
            const clonedElement = clonedDoc.body.querySelector('div > div');
            if (clonedElement) {
              clonedElement.style.maxHeight = 'none';
              clonedElement.style.overflow = 'visible';
              
              // Remove background gradients that might cause issues
              const beforeElements = clonedElement.querySelectorAll('[class*="_before"]');
              beforeElements.forEach(el => {
                el.style.content = 'none';
              });
            }
          }
        }).then(canvas => {
          // Remove the temporary container
          document.body.removeChild(tempContainer);
          
          const imgData = canvas.toDataURL('image/png');
          // Calculate dimensions to fit the receipt in the PDF
          const imgWidth = 210; // A4 width in mm (210mm)
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [imgWidth, imgHeight + 10],
          });

          // Add the image to the PDF
          pdf.addImage(
            imgData, 
            'PNG', 
            0, // x position
            5, // y position with a small margin
            imgWidth, 
            imgHeight
          );
          
          // Generate filename based on receipt details
          const filename = `receipt-${receiptNumber}-${transactionId.substring(0, 8)}.pdf`;
          
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
      }, 100); // Small delay to ensure DOM is ready
    }
  };
  
  return (
    <Box
      ref={receiptRef}
      bg="white"
      color="gray.800"
      borderRadius="md"
      boxShadow="lg"
      p={6}
      maxW="100%"
      mx="auto"
      position="relative"
      overflow="auto"
      maxHeight="80vh"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "8px",
        bgGradient: "linear(to-r, brand.500, accent.500)",
      }}
    >
      {/* Logo and Header - Fixed at the top */}
      <Box position="sticky" top="0" bg="white" zIndex="10" pb={4}>
        <VStack spacing={4} mb={2} align="center">
          <Image 
            src="/Amanah Block Logo.png" 
            alt="Amanah Block Logo" 
            h="60px" 
            mb={2}
          />
          <Heading size="lg" textAlign="center">Donation Receipt</Heading>
          <Text fontSize="sm" color="gray.500">
            Thank you for your contribution to make a difference
          </Text>
        </VStack>
        
        <Divider my={4} borderColor="gray.300" />
      </Box>
      
      {/* Receipt Details */}
      <Box mb={6}>
        <Flex justify="space-between" mb={2} flexWrap="wrap">
          <Text fontWeight="bold">Receipt No:</Text>
          <Text fontFamily="mono" maxW="70%" wordBreak="break-all" textAlign="right">{receiptNumber}</Text>
        </Flex>
        <Flex justify="space-between" mb={2} flexWrap="wrap">
          <Text fontWeight="bold">Transaction ID:</Text>
          <Text fontFamily="mono" maxW="70%" wordBreak="break-all" textAlign="right" ml="auto">{transactionId}</Text>
        </Flex>
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Date:</Text>
          <Text>{date}</Text>
        </Flex>
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Donor:</Text>
          <Text>{donorName}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="bold">Email:</Text>
          <Text>{donorEmail}</Text>
        </Flex>
      </Box>
      
      <Divider my={4} borderColor="gray.300" />
      
      {/* Donation Items Table */}
      <Box mb={6} overflowX="auto"> {/* Removed inline style */}
        <Table variant="simple" size="sm">
          <Thead bg="gray.50" height="30px"> {/* Ensure Thead height is set */}
            <Tr>
              {/* Use explicit padding and line height props */}
              <Th p="0 12px" verticalAlign="middle" lineHeight="30px">Type</Th>
              <Th p="0 12px" verticalAlign="middle" lineHeight="30px">Description</Th>
              <Th p="0 12px" verticalAlign="middle" lineHeight="30px" isNumeric>Quantity</Th>
              <Th p="0 12px" verticalAlign="middle" lineHeight="30px" isNumeric>Price</Th>
              <Th p="0 12px" verticalAlign="middle" lineHeight="30px" isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                {/* Use explicit padding and line height props for Td */}
                <Td p="8px 12px" verticalAlign="middle" lineHeight="1.5"> {/* Adjust line height if needed */}
                  <Badge 
                    colorScheme={
                      item.type?.toLowerCase().includes('waqf') ? 'blue' : 
                      item.type?.toLowerCase().includes('zakat') ? 'purple' : 
                      'green'
                    }
                    borderRadius="full"
                    px={3}
                    py={1}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    minW="90px"
                    height="24px"
                    lineHeight="1"
                  >
                    {item.type || (
                      item.description.toLowerCase().includes('waqf') ? 'Waqf' : 
                      item.description.toLowerCase().includes('zakat') ? 'Zakat' : 
                      'Sadaqah'
                    )}
                  </Badge>
                </Td>
                <Td p="8px 12px" verticalAlign="middle" lineHeight="1.5">{item.description}</Td>
                <Td p="8px 12px" verticalAlign="middle" lineHeight="1.5" isNumeric>{item.quantity}</Td>
                <Td p="8px 12px" verticalAlign="middle" lineHeight="1.5" isNumeric>${item.price.toFixed(2)}</Td>
                <Td p="8px 12px" verticalAlign="middle" lineHeight="1.5" isNumeric>${(item.quantity * item.price).toFixed(2)}</Td>
              </Tr>
            ))}
            <Tr fontWeight="bold">
              <Td colSpan={4} textAlign="right" p="8px 12px" verticalAlign="middle" lineHeight="1.5">Total</Td>
              <Td isNumeric p="8px 12px" verticalAlign="middle" lineHeight="1.5">${totalAmount.toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      
      <Divider my={4} borderColor="gray.300" />
      
      {/* Footer with QR Code */}
      <VStack spacing={3} align="center">
        <Text fontSize="sm" fontWeight="medium">
          Scan to verify this donation
        </Text>
        <Box 
          p={3} 
          bg="white" 
          borderRadius="md" 
          boxShadow="sm" 
          border="1px solid" 
          borderColor="gray.200"
        >
          <QRCodeSVG 
            value={qrValue} 
            size={120} 
            level="H" 
          />
        </Box>
        <Button 
          size="xs" 
          colorScheme="green"
          borderRadius="full"
          leftIcon={<FaDownload size={10} />}
          onClick={handleDownloadReceipt}  // Remove the tx parameter
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(72, 187, 120, 0.2)"
          }}
          transition="all 0.2s"
        >
          Download
        </Button>
        <Text fontSize="xs" color="gray.500" mt={2}>
          This receipt was generated by Amanah Block and is valid for tax purposes.
        </Text>
      </VStack>
    </Box>
  );
};

// Default props for testing
DigitalReceipt.defaultProps = {
  receiptNumber: 'AB-2023-0001',
  date: new Date().toLocaleDateString(),
  donorName: 'John Doe',
  donorEmail: 'john.doe@example.com',
  items: [
    { description: 'School Building Project', quantity: 1, price: 100.00, type: 'Sadaqah' },
    { description: 'Annual Zakat Payment', quantity: 1, price: 250.00, type: 'Zakat' },
    { description: 'Water Well Construction', quantity: 1, price: 500.00, type: 'Waqf' },
  ],
  totalAmount: 850.00,
  transactionId: '0x1a2b3c4d5e6f7g8h9i0j00112233445566778899aab',
};

export default DigitalReceipt;
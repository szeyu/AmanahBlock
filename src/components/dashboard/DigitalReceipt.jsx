import React from 'react';
import {
  Box,
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
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import { defaultReceiptData } from '../../data/receiptData';

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
  
  return (
    <Box
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
      <Box mb={6} overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>Type</Th>
              <Th>Description</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Badge 
                    colorScheme={
                      item.type?.toLowerCase().includes('waqf') ? 'blue' : 
                      item.type?.toLowerCase().includes('zakat') ? 'purple' : 
                      'green'
                    }
                    borderRadius="full"
                    px={2}
                    py={1}
                  >
                    {item.type || (
                      item.description.toLowerCase().includes('waqf') ? 'Waqf' : 
                      item.description.toLowerCase().includes('zakat') ? 'Zakat' : 
                      'Sadaqah'
                    )}
                  </Badge>
                </Td>
                <Td>{item.description}</Td>
                <Td isNumeric>{item.quantity}</Td>
                <Td isNumeric>${item.price.toFixed(2)}</Td>
                <Td isNumeric>${(item.quantity * item.price).toFixed(2)}</Td>
              </Tr>
            ))}
            <Tr fontWeight="bold">
              <Td colSpan={4} textAlign="right">Total</Td>
              <Td isNumeric>${totalAmount.toFixed(2)}</Td>
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
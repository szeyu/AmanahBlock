import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Heading, 
  Text, 
  Container, 
  VStack,
  Spinner,
  Center,
  Flex,
  Badge,
} from '@chakra-ui/react';
import DonationFlow from '../components/dashboard/DonationFlow';

const DonationFlowPage = () => {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState(null);
  
  useEffect(() => {
    // Simulate fetching transaction data
    // In a real app, you would fetch this data from your API
    setTimeout(() => {
      // Mock data - replace with actual API call
      setTransactionData({
        id: transactionId,
        type: 'Waqf',
        amount: '500 USDT',
        date: '2023-05-15',
        status: 'Completed',
        donor: 'John Doe',
      });
      setLoading(false);
    }, 1500);
  }, [transactionId]);
  
  if (loading) {
    return (
      <Center h="100vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text>Loading donation flow...</Text>
        </VStack>
      </Center>
    );
  }
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Donation Flow Visualization</Heading>
          <Text color="gray.600">
            See how your donation moves through our transparent Islamic finance system
          </Text>
        </Box>
        
        {transactionData && (
          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Flex justify="space-between" wrap="wrap" gap={4}>
              <Box>
                <Text fontWeight="bold">Transaction ID:</Text>
                <Text fontFamily="mono">{transactionData.id}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Type:</Text>
                <Text>{transactionData.type}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Amount:</Text>
                <Text color="green.500" fontWeight="medium">{transactionData.amount}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Date:</Text>
                <Text>{transactionData.date}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Status:</Text>
                <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                  {transactionData.status}
                </Badge>
              </Box>
            </Flex>
          </Box>
        )}
        
        <Box 
          bg="white" 
          p={6} 
          borderRadius="md" 
          boxShadow="md"
          height="600px"
        >
          <DonationFlow />
        </Box>
        
        <Box p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm" color="gray.600">
            This visualization shows how your donation flows through our system, from initial contribution to final impact.
            The funds are managed transparently on the blockchain, ensuring they reach their intended purpose.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default DonationFlowPage;
import React from 'react';
import {
  Box,
  Heading,
  Divider,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';

const FundAllocationChart = ({ chartData, chartOptions }) => {
  return (
    <Box className="card" p={6} borderRadius="md">
      <Heading size="md" mb={4} color="white">Fund Allocation</Heading>
      <Box h="250px" borderRadius="md" position="relative">
        <Pie data={chartData} options={chartOptions} />
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
  );
};

export default FundAllocationChart; 
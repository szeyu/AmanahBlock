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
    <Box 
      className="card" 
      p={6} 
      borderRadius="md"
      bg="rgba(13, 16, 25, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth="1px"
      borderColor="gray.700"
      height="auto"
      maxHeight="420px"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
      _before={{
        content: '""',
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        bottom: "-1px",
        borderRadius: "md",
        padding: "1px",
        background: "linear-gradient(135deg, rgba(11, 197, 234, 0.3), rgba(95, 21, 242, 0.3))",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        zIndex: 0,
      }}
      position="relative"
      overflow="hidden"
    >
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
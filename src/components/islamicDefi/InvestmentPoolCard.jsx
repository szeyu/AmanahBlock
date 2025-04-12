import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  Divider,
  Progress,
  Badge,
  Icon
} from '@chakra-ui/react';
import { FaChartLine, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const InvestmentPoolCard = ({ pool, onViewDetails }) => {
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      transition="all 0.3s"
      _hover={{ 
        transform: "translateY(-5px)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
        borderColor: "brand.500"
      }}
    >
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Heading size="md" color="white">{pool.name}</Heading>
        <ShariahComplianceBadge level={pool.shariahStatus} scholars={pool.scholars} showDetails={true} />
      </Flex>
      
      <Text color="gray.300" mb={4} noOfLines={2}>
        {pool.description}
      </Text>
      
      <HStack mb={4} spacing={4}>
        <Box>
          <Text color="gray.400" fontSize="sm">Annual Return</Text>
          <Text color="green.400" fontWeight="bold">{pool.expectedReturn}%</Text>
        </Box>
        
        <Box>
          <Text color="gray.400" fontSize="sm">Investment Term</Text>
          <Text color="white">{pool.lockPeriod}</Text>
        </Box>
        
        <Box>
          <Text color="gray.400" fontSize="sm">Risk Profile</Text>
          <Text color="white">{pool.riskLevel}</Text>
        </Box>
      </HStack>
      
      <Divider borderColor="gray.700" mb={4} />
      
      <Text color="gray.400" fontSize="sm" mb={2}>Fund Allocation</Text>
      <VStack align="stretch" spacing={2} mb={4}>
        {pool.assetAllocation.map((asset, idx) => (
          <Box key={idx}>
            <Flex justify="space-between" mb={1}>
              <Text color="gray.300" fontSize="sm">{asset.name}</Text>
              <Text color="gray.300" fontSize="sm">{asset.percentage}%</Text>
            </Flex>
            <Progress 
              value={asset.percentage} 
              size="xs" 
              colorScheme={
                idx === 0 ? "purple" : 
                idx === 1 ? "blue" : 
                idx === 2 ? "green" : 
                "orange"
              } 
              borderRadius="full" 
            />
          </Box>
        ))}
      </VStack>
      
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Text color="gray.400" fontSize="sm">Total Value Locked</Text>
          <Text color="white" fontWeight="bold">${(pool.tvl/1000000).toFixed(2)}M</Text>
        </Box>
        <Box>
          <Text color="gray.400" fontSize="sm">Impact Projects</Text>
          <Text color="white" fontWeight="bold">{pool.projectsSupported || Math.floor(pool.investors/3)}</Text>
        </Box>
      </Flex>
      
      <Button 
        variant="gradient" 
        w="full"
        leftIcon={<FaInfoCircle />}
        onClick={() => onViewDetails(pool)}
      >
        View Details
      </Button>
    </Box>
  );
};

export default InvestmentPoolCard; 
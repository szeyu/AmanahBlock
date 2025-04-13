import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  HStack,
  VStack,
  Badge,
  Progress,
  Tooltip,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const DonationPoolSelector = ({ poolStats, selectedPool, setSelectedPool, showAllocation }) => {
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={8}
    >
      <Heading size="md" color="white" mb={4}>Select Donation Pool</Heading>
      <Text color="gray.300" mb={6}>
        Choose a specific pool for your donation or select the general pool to let us allocate funds where they're needed most.
      </Text>
      
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {Object.entries(poolStats).map(([key, pool]) => (
          <GridItem key={key}>
            <Box 
              bg={selectedPool === key ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
              borderWidth="1px"
              borderColor={selectedPool === key ? "brand.500" : "gray.700"}
              borderRadius="lg"
              p={4}
              cursor="pointer"
              onClick={() => setSelectedPool(key)}
              transition="all 0.3s"
              _hover={{
                borderColor: "brand.500",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
              }}
            >
              <Flex justify="center" mb={4}>
                <Box 
                  as={pool.icon} 
                  size="50px" 
                  color={selectedPool === key ? "brand.500" : "gray.400"}
                />
              </Flex>
              <Heading size="sm" textAlign="center" color="white" mb={2}>{pool.name}</Heading>
              <Text fontSize="sm" color="gray.400" textAlign="center" mb={3} noOfLines={2}>
                {pool.description}
              </Text>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="xs" color="gray.500">Current Balance:</Text>
                <Text fontSize="xs" color="white" fontWeight="bold">${(pool.balance/1000).toFixed(1)}K</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500">Donors:</Text>
                <Text fontSize="xs" color="white" fontWeight="bold">{pool.donors}</Text>
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
      
      {/* Fund Allocation Visualization (for General Pool) */}
      {showAllocation && (
        <Box mt={8} p={4} bg="gray.800" borderRadius="md">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="sm" color="white">General Pool Fund Allocation</Heading>
            <Tooltip label="Funds in the general pool are allocated according to this distribution">
              <Box as={FaInfoCircle} color="gray.400" />
            </Tooltip>
          </Flex>
          <VStack spacing={4} align="stretch">
            {poolStats.general.allocation.map((item, index) => (
              <Box key={index}>
                <Flex justify="space-between" mb={1}>
                  <HStack>
                    <Badge colorScheme={item.color} borderRadius="full" px={2}>
                      {item.percentage}%
                    </Badge>
                    <Text color="gray.300" fontSize="sm">{item.name}</Text>
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    ${((poolStats.general.balance * item.percentage / 100)/1000).toFixed(1)}K
                  </Text>
                </Flex>
                <Progress 
                  value={item.percentage} 
                  size="sm" 
                  colorScheme={item.color} 
                  borderRadius="full" 
                />
              </Box>
            ))}
          </VStack>
          <Text fontSize="xs" color="gray.500" mt={4}>
            Note: 90% of general pool funds are invested in Shariah-compliant DeFi protocols to generate sustainable returns, while 10% is allocated to the emergency fund for immediate needs.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default DonationPoolSelector; 
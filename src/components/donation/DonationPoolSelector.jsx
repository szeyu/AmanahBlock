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
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const DonationPoolSelector = ({ poolStats, selectedPool, setSelectedPool, showAllocation }) => {
  // Web3 style colors and effects
  const glassBackground = "rgba(13, 16, 25, 0.7)";
  const selectedGlow = "0 0 20px rgba(11, 197, 234, 0.4)";
  const hoverGlow = "0 4px 15px rgba(11, 197, 234, 0.3)";
  const borderGradient = "linear-gradient(135deg, rgba(11, 197, 234, 0.5), rgba(95, 21, 242, 0.5))";
  
  return (
    <Box 
      bg={glassBackground}
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={8}
      position="relative"
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
      <Heading size="md" color="white" mb={4} fontWeight="600">Select Donation Pool</Heading>
      <Text color="gray.300" mb={6}>
        Choose a specific pool for your donation or select the general pool to let us allocate funds where they're needed most.
      </Text>
      
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {Object.entries(poolStats).map(([key, pool]) => (
          <GridItem key={key}>
            <Box 
              bg={selectedPool === key ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
              borderWidth="1px"
              borderColor={selectedPool === key ? "brand.500" : "gray.700"}
              borderRadius="xl"
              p={4}
              cursor="pointer"
              onClick={() => setSelectedPool(key)}
              transition="all 0.3s ease"
              position="relative"
              boxShadow={selectedPool === key ? selectedGlow : "none"}
              _hover={{
                borderColor: "brand.400",
                transform: "translateY(-3px)",
                boxShadow: hoverGlow
              }}
              _before={selectedPool === key ? {
                content: '""',
                position: "absolute",
                top: "-1px",
                left: "-1px",
                right: "-1px",
                bottom: "-1px",
                borderRadius: "xl",
                padding: "1px",
                background: borderGradient,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                zIndex: 0,
              } : {}}
            >
              <Flex justify="center" mb={4}>
                <Box 
                  as={pool.icon} 
                  size="50px" 
                  color={selectedPool === key ? "brand.500" : "gray.400"}
                  filter={selectedPool === key ? "drop-shadow(0 0 8px rgba(11, 197, 234, 0.5))" : "none"}
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
        <Box 
          mt={8} 
          p={5} 
          bg="rgba(26, 32, 44, 0.6)" 
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.700"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
            zIndex: 0,
          }}
        >
          <Flex justify="space-between" align="center" mb={4} position="relative" zIndex="1">
            <Heading size="sm" color="white">General Pool Fund Allocation</Heading>
            <Tooltip label="Funds in the general pool are allocated according to this distribution">
              <Box as={FaInfoCircle} color="gray.400" />
            </Tooltip>
          </Flex>
          <VStack spacing={4} align="stretch" position="relative" zIndex="1">
            {poolStats.general.allocation.map((item, index) => (
              <Box key={index}>
                <Flex justify="space-between" mb={1}>
                  <HStack>
                    <Badge 
                      colorScheme={item.color} 
                      borderRadius="full" 
                      px={2}
                      boxShadow={`0 0 10px rgba(var(--chakra-colors-${item.color}-500-rgb), 0.3)`}
                    >
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
                  sx={{
                    "& > div": {
                      background: `linear-gradient(90deg, var(--chakra-colors-${item.color}-600), var(--chakra-colors-${item.color}-400))`,
                    }
                  }}
                />
              </Box>
            ))}
          </VStack>
          <Text fontSize="xs" color="gray.500" mt={4} position="relative" zIndex="1">
            Note: 90% of general pool funds are invested in Shariah-compliant DeFi protocols to generate sustainable returns, while 10% is allocated to the emergency fund for immediate needs.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default DonationPoolSelector; 
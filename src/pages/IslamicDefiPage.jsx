import React, { useState } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  VStack, 
  HStack, 
  Icon, 
  Grid, 
  Badge, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Divider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CircularProgress,
  CircularProgressLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Tooltip
} from '@chakra-ui/react';
import { 
  FaEthereum, 
  FaChartLine, 
  FaExchangeAlt, 
  FaHandHoldingUsd, 
  FaRegClock, 
  FaLock, 
  FaInfoCircle, 
  FaRegCheckCircle, 
  FaShieldAlt, 
  FaWallet,
  FaPlus,
  FaHistory
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';

const IslamicDefiPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePool, setActivePool] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(100);
  
  // Mock data for DeFi stats
  const defiStats = {
    totalValueLocked: 3750000,
    activeInvestors: 1250,
    averageReturn: 5.8,
    projectsFunded: 42,
    totalReturns: 215000
  };
  
  // Mock data for investment pools (reduced to 3)
  const investmentPools = [
    {
      id: 1,
      name: "Mudarabah Growth Fund",
      description: "A profit-sharing investment pool focused on high-growth charitable projects with sustainable revenue models.",
      tvl: 1250000,
      investors: 450,
      expectedReturn: 7.5,
      lockPeriod: "3-12 months",
      minInvestment: 100,
      riskLevel: "Medium",
      assetAllocation: [
        { name: "Education Projects", percentage: 40 },
        { name: "Healthcare Initiatives", percentage: 30 },
        { name: "Sustainable Agriculture", percentage: 20 },
        { name: "Clean Energy", percentage: 10 }
      ],
      shariahStatus: "Fully Compliant",
      scholars: [
        "Dr. Mufti Taqi Usmani",
        "Dr. Akram Nadwi"
      ]
    },
    {
      id: 2,
      name: "Waqf Perpetual Fund",
      description: "A long-term endowment fund that preserves capital while generating sustainable returns for ongoing charitable projects.",
      tvl: 2000000,
      investors: 650,
      expectedReturn: 4.2,
      lockPeriod: "12+ months",
      minInvestment: 500,
      riskLevel: "Low",
      assetAllocation: [
        { name: "Infrastructure Projects", percentage: 45 },
        { name: "Water Resources", percentage: 25 },
        { name: "Education Endowments", percentage: 20 },
        { name: "Healthcare Facilities", percentage: 10 }
      ],
      shariahStatus: "Fully Compliant",
      scholars: [
        "Dr. Ahmed Al-Haddad",
        "Sheikh Mohammed Al-Yaqoubi",
        "Dr. Yasmin Ibrahim"
      ]
    },
    {
      id: 3,
      name: "Sukuk Charity Bond",
      description: "Asset-backed certificates that fund specific charitable projects with fixed terms and expected returns.",
      tvl: 500000,
      investors: 150,
      expectedReturn: 5.5,
      lockPeriod: "6 months",
      minInvestment: 250,
      riskLevel: "Low-Medium",
      assetAllocation: [
        { name: "Refugee Housing", percentage: 35 },
        { name: "Medical Equipment", percentage: 30 },
        { name: "Educational Materials", percentage: 25 },
        { name: "Emergency Response", percentage: 10 }
      ],
      shariahStatus: "Fully Compliant",
      scholars: [
        "Dr. Mufti Taqi Usmani",
        "Dr. Yasmin Ibrahim"
      ]
    }
  ];
  
  const handleInvestClick = (pool) => {
    setActivePool(pool);
    onOpen();
  };
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Islamic DeFi Dashboard</Heading>
      <Text color="gray.400" mb={6}>Shariah-compliant investment opportunities that fund charitable projects</Text>
      
      {/* DeFi Stats */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }} gap={6} mb={8}>
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Total Value Locked</StatLabel>
          <StatNumber color="white">${(defiStats.totalValueLocked/1000000).toFixed(1)}M</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaChartLine} mr={1} />
            Growing steadily
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Active Investors</StatLabel>
          <StatNumber color="white">{defiStats.activeInvestors}</StatNumber>
          <StatHelpText color="green.400">
            Across 45 countries
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Average Return</StatLabel>
          <StatNumber color="white">{defiStats.averageReturn}%</StatNumber>
          <StatHelpText color="green.400">
            Annualized
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Projects Funded</StatLabel>
          <StatNumber color="white">{defiStats.projectsFunded}</StatNumber>
          <StatHelpText color="green.400">
            100% Shariah-compliant
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Total Returns Generated</StatLabel>
          <StatNumber color="white">${(defiStats.totalReturns/1000).toFixed(1)}K</StatNumber>
          <StatHelpText color="green.400">
            For charitable causes
          </StatHelpText>
        </Stat>
      </Grid>
      
      {/* Investment Pools */}
      <Heading size="md" color="white" mb={4}>Shariah-Compliant Investment Pools</Heading>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6} mb={10}>
        {investmentPools.map((pool) => (
          <Box 
            key={pool.id}
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
                <Text color="gray.400" fontSize="sm">Expected Return</Text>
                <Text color="green.400" fontWeight="bold">{pool.expectedReturn}%</Text>
              </Box>
              
              <Box>
                <Text color="gray.400" fontSize="sm">Lock Period</Text>
                <Text color="white">{pool.lockPeriod}</Text>
              </Box>
              
              <Box>
                <Text color="gray.400" fontSize="sm">Risk</Text>
                <Text color="white">{pool.riskLevel}</Text>
              </Box>
            </HStack>
            
            <Divider borderColor="gray.700" mb={4} />
            
            <Text color="gray.400" fontSize="sm" mb={2}>Asset Allocation</Text>
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
                <Text color="gray.400" fontSize="sm">Investors</Text>
                <Text color="white" fontWeight="bold">{pool.investors}</Text>
              </Box>
            </Flex>
            
            <Button 
              variant="gradient" 
              w="full"
              leftIcon={<FaHandHoldingUsd />}
              onClick={() => handleInvestClick(pool)}
            >
              Invest Now
            </Button>
          </Box>
        ))}
      </Grid>
      
      {/* Shariah Compliance Section */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={6}
        borderWidth="1px"
        borderColor="gray.700"
        mb={10}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="md" color="white" mb={1}>Shariah Compliance Framework</Heading>
            <Text color="gray.400">Our investment pools adhere to strict Islamic finance principles</Text>
          </Box>
          <Button 
            leftIcon={<FaShieldAlt />} 
            variant="outline"
            as={Link}
            to="/learn/shariah-finance"
          >
            Learn More
          </Button>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(128, 90, 213, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaRegCheckCircle} color="accent.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">No Riba (Interest)</Heading>
            <Text color="gray.400" fontSize="sm">
              All returns are generated through profit-sharing (Mudarabah) or asset-backed investments (Sukuk), never through interest.
            </Text>
          </VStack>
          
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(11, 197, 234, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaShieldAlt} color="brand.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Scholar Oversight</Heading>
            <Text color="gray.400" fontSize="sm">
              Every investment pool is reviewed and approved by our board of Islamic scholars to ensure Shariah compliance.
            </Text>
          </VStack>
          
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(72, 187, 120, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaHandHoldingUsd} color="green.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Ethical Investments</Heading>
            <Text color="gray.400" fontSize="sm">
              Funds are only invested in projects that benefit humanity and avoid prohibited industries (haram).
            </Text>
          </VStack>
        </Grid>
      </Box>
      
      {/* Investment Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
            Invest in {activePool?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {activePool && (
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text color="gray.400" mb={1}>Investment Pool</Text>
                  <Heading size="md" color="white">{activePool.name}</Heading>
                  <HStack mt={2}>
                    <ShariahComplianceBadge level={activePool.shariahStatus} showDetails={false} />
                    <Badge colorScheme="blue" borderRadius="full" px={2}>
                      {activePool.riskLevel} Risk
                    </Badge>
                    <Badge colorScheme="green" borderRadius="full" px={2}>
                      {activePool.expectedReturn}% Return
                    </Badge>
                  </HStack>
                </Box>
                
                <Divider borderColor="gray.700" />
                
                <FormControl>
                  <FormLabel>Investment Amount (USDT)</FormLabel>
                  <NumberInput 
                    min={activePool.minInvestment} 
                    value={investmentAmount}
                    onChange={(valueString) => setInvestmentAmount(parseFloat(valueString))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="sm" color="gray.400" mt={1}>
                    Minimum investment: {activePool.minInvestment} USDT
                  </Text>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Lock Period</FormLabel>
                  <Select defaultValue="3">
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                  </Select>
                </FormControl>
                
                <Box bg="gray.700" p={4} borderRadius="md">
                  <Heading size="sm" mb={3}>Investment Summary</Heading>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Principal Amount</Text>
                      <Text color="white">{investmentAmount} USDT</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Expected Return</Text>
                      <Text color="green.400">{(investmentAmount * activePool.expectedReturn / 100).toFixed(2)} USDT</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Lock Period</Text>
                      <Text color="white">3 months</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Unlock Date</Text>
                      <Text color="white">Aug 10, 2023</Text>
                    </Box>
                  </Grid>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaWallet />}
            >
              Confirm Investment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default IslamicDefiPage; 
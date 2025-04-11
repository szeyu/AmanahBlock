import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Flex,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  Badge,
  Progress,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  Icon,
  useToast
} from '@chakra-ui/react';
import { 
  FaWallet, 
  FaSchool, 
  FaHandHoldingWater, 
  FaUtensils, 
  FaHandHoldingUsd, 
  FaInfoCircle, 
  FaRegLightbulb, 
  FaRegCheckCircle,
  FaExchangeAlt,
  FaShieldAlt,
  FaChartPie
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';
import AIDonationAdvisor from '../components/AIDonationAdvisor';

const DonationPage = () => {
  const [donationType, setDonationType] = useState('sadaqah');
  const [donationAmount, setDonationAmount] = useState(100);
  const [selectedPool, setSelectedPool] = useState('general');
  const [currency, setCurrency] = useState('USDT');
  const [showAllocation, setShowAllocation] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Mock data for pool stats
  const poolStats = {
    general: {
      name: "General Charity Pool",
      description: "Funds are distributed based on need across all projects",
      balance: 1250000,
      donors: 3500,
      allocation: [
        { name: "DeFi Investment", percentage: 90, color: "purple" },
        { name: "Emergency Fund", percentage: 10, color: "orange" }
      ],
      icon: FaHandHoldingUsd
    },
    school: {
      name: "School Building Pool",
      description: "Dedicated to building and renovating schools in underserved areas",
      balance: 450000,
      donors: 1200,
      allocation: [
        { name: "Construction", percentage: 70, color: "blue" },
        { name: "Educational Materials", percentage: 20, color: "green" },
        { name: "Teacher Training", percentage: 10, color: "purple" }
      ],
      icon: FaSchool
    },
    flood: {
      name: "Flood Relief Pool",
      description: "Emergency assistance for communities affected by flooding",
      balance: 320000,
      donors: 950,
      allocation: [
        { name: "Immediate Aid", percentage: 60, color: "red" },
        { name: "Temporary Shelter", percentage: 25, color: "blue" },
        { name: "Rebuilding", percentage: 15, color: "green" }
      ],
      icon: FaHandHoldingWater
    },
    food: {
      name: "Food Bank Pool",
      description: "Providing nutritious meals to those facing food insecurity",
      balance: 280000,
      donors: 1050,
      allocation: [
        { name: "Food Packages", percentage: 65, color: "orange" },
        { name: "Community Kitchens", percentage: 25, color: "green" },
        { name: "Sustainable Farming", percentage: 10, color: "blue" }
      ],
      icon: FaUtensils
    }
  };

  // Handle donation submission
  const handleDonate = () => {
    // In a real app, this would connect to a wallet and execute a transaction
    setTimeout(() => {
      toast({
        title: "Donation successful!",
        description: `Your ${donationType} of ${donationAmount} ${currency} has been processed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }, 2000);
  };

  // Show allocation details when general pool is selected
  useEffect(() => {
    if (selectedPool === 'general') {
      setShowAllocation(true);
    } else {
      setShowAllocation(false);
    }
  }, [selectedPool]);

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Make a Donation</Heading>
      <Text color="gray.400" mb={6}>Support Shariah-compliant charitable projects with transparent blockchain tracking</Text>
      
      {/* Donation Type Selection */}
      <Tabs variant="soft-rounded" colorScheme="brand" mb={8}>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'brand.500' }}>Sadaqah (Voluntary)</Tab>
          <Tab _selected={{ color: 'white', bg: 'accent.500' }}>Zakat (Obligatory)</Tab>
          <Tab _selected={{ color: 'white', bg: 'green.500' }}>Waqf (Endowment)</Tab>
        </TabList>
        <TabPanels mt={4}>
          <TabPanel px={0}>
            <Text color="gray.300" mb={4}>
              Sadaqah is voluntary charity given to help those in need. It can be given at any time, in any amount, and is a beautiful expression of generosity.
            </Text>
          </TabPanel>
          <TabPanel px={0}>
            <Text color="gray.300" mb={4}>
              Zakat is an obligatory form of charity in Islam, typically 2.5% of one's wealth above a minimum threshold (nisab), given annually.
            </Text>
            <Button 
              as={Link} 
              to="/zakat-calculator" 
              variant="outline" 
              colorScheme="brand" 
              mb={4}
            >
              Calculate Your Zakat
            </Button>
          </TabPanel>
          <TabPanel px={0}>
            <Text color="gray.300" mb={4}>
              Waqf is an endowment made by a Muslim to a religious, educational, or charitable cause. The donated assets are held and preserved for specific purposes indefinitely.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Pool Selection */}
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
      
      {/* AI Donation Advisor */}
      <AIDonationAdvisor 
        donationAmount={donationAmount}
        donationType={donationType}
        selectedPool={selectedPool}
        onRecommendationSelect={(allocation) => {
          // In a real implementation, this would update the donation allocation
          toast({
            title: "Allocation updated",
            description: "Your donation will be distributed according to the recommended allocation",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }}
        isActive={selectedPool === 'general'}
      />
      
      {/* Donation Amount */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={6}
        borderWidth="1px"
        borderColor="gray.700"
        mb={8}
      >
        <Heading size="md" color="white" mb={4}>Donation Amount</Heading>
        
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8}>
          <Box>
            <FormControl mb={6}>
              <FormLabel color="gray.300">Enter Amount</FormLabel>
              <NumberInput 
                value={donationAmount} 
                onChange={(valueString) => setDonationAmount(parseFloat(valueString))}
                min={10}
                max={1000000}
              >
                <NumberInputField bg="gray.800" borderColor="gray.600" />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                  <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl mb={6}>
              <FormLabel color="gray.300">Currency</FormLabel>
              <RadioGroup value={currency} onChange={setCurrency}>
                <Stack direction="row" spacing={5}>
                  <Radio value="USDT" colorScheme="green">USDT</Radio>
                  <Radio value="ETH" colorScheme="purple">ETH</Radio>
                  <Radio value="MYR" colorScheme="blue">MYR</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            
            {currency === 'MYR' && (
              <Box p={4} bg="gray.800" borderRadius="md" mb={6}>
                <Flex align="center" mb={2}>
                  <Box as={FaExchangeAlt} color="brand.500" mr={2} />
                  <Text color="white" fontWeight="medium">P2P Exchange</Text>
                </Flex>
                <Text color="gray.300" fontSize="sm" mb={2}>
                  Your MYR donation will be converted to USDT through our Shariah-compliant P2P exchange to avoid Riba (interest).
                </Text>
                <HStack justify="space-between">
                  <Text color="gray.400" fontSize="sm">Exchange Rate:</Text>
                  <Text color="white" fontSize="sm">1 USDT = 4.65 MYR</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400" fontSize="sm">You're donating:</Text>
                  <Text color="white" fontSize="sm">{donationAmount} MYR ≈ {(donationAmount / 4.65).toFixed(2)} USDT</Text>
                </HStack>
              </Box>
            )}
            
            <Button 
              variant="gradient" 
              size="lg" 
              w="full"
              leftIcon={<FaWallet />}
              onClick={onOpen}
            >
              Donate Now
            </Button>
          </Box>
          
          <VStack spacing={4} align="stretch">
            <Box p={4} bg="gray.800" borderRadius="md">
              <Flex align="center" mb={2}>
                <Box as={FaShieldAlt} color="green.500" mr={2} />
                <Text color="white" fontWeight="medium">Shariah Compliant</Text>
              </Flex>
              <Text color="gray.300" fontSize="sm">
                All donations are handled according to Islamic principles, avoiding Riba (interest) and ensuring ethical fund management.
              </Text>
            </Box>
            
            <Box p={4} bg="gray.800" borderRadius="md">
              <Flex align="center" mb={2}>
                <Box as={FaRegCheckCircle} color="brand.500" mr={2} />
                <Text color="white" fontWeight="medium">100% Transparency</Text>
              </Flex>
              <Text color="gray.300" fontSize="sm">
                Every donation is recorded on the blockchain, allowing you to track exactly how your funds are used.
              </Text>
            </Box>
            
            <Box p={4} bg="gray.800" borderRadius="md">
              <Flex align="center" mb={2}>
                <Box as={FaRegLightbulb} color="yellow.500" mr={2} />
                <Text color="white" fontWeight="medium">AI-Powered Allocation</Text>
              </Flex>
              <Text color="gray.300" fontSize="sm">
                Our AI system analyzes needs across all pools to ensure optimal distribution of general pool funds.
              </Text>
            </Box>
          </VStack>
        </Grid>
      </Box>
      
      {/* Donation Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">Confirm Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text color="gray.400">Donation Type</Text>
                <Text color="white" fontWeight="bold" fontSize="lg" textTransform="capitalize">{donationType}</Text>
              </Box>
              
              <Box>
                <Text color="gray.400">Amount</Text>
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {donationAmount} {currency}
                  {currency === 'MYR' && ` (≈ ${(donationAmount / 4.65).toFixed(2)} USDT)`}
                </Text>
              </Box>
              
              <Box>
                <Text color="gray.400">Destination Pool</Text>
                <Text color="white" fontWeight="bold" fontSize="lg">{poolStats[selectedPool].name}</Text>
              </Box>
              
              <Divider borderColor="gray.700" />
              
              <Box p={4} bg="gray.700" borderRadius="md">
                <Heading size="sm" mb={3}>Transaction Details</Heading>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.400">Network Fee:</Text>
                  <Text fontSize="sm" color="white">~$0.50</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.400">Estimated Confirmation:</Text>
                  <Text fontSize="sm" color="white">~30 seconds</Text>
                </HStack>
              </Box>
              
              <Text fontSize="sm" color="gray.400">
                By proceeding, you agree to our terms of service and privacy policy. Your donation will be processed via blockchain for maximum transparency.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaWallet />}
              onClick={handleDonate}
            >
              Confirm Donation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DonationPage; 
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Button,
  VStack,
  HStack,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
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
  Input,
  Textarea,
  Select,
  Image,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
  SimpleGrid,
  useToast
} from '@chakra-ui/react';
import { 
  FaExclamationTriangle, 
  FaHandHoldingUsd, 
  FaRegClock, 
  FaShieldAlt, 
  FaChartPie, 
  FaEthereum,
  FaRegLightbulb,
  FaMapMarkerAlt,
  FaUsers,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaArrowRight,
  FaFileAlt,
  FaHeartbeat,
  FaWater,
  FaHome,
  FaUtensils
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';
import BlockchainVerification from '../components/BlockchainVerification';

const EmergencyFundPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  // Mock data for emergency fund stats
  const emergencyFundStats = {
    totalBalance: 245000,
    pendingRequests: 3,
    avgResponseTime: 24, // hours
    totalResponses: 28,
    peopleHelped: 15800,
    lastReplenished: '2023-05-10',
    fundAllocation: [
      { name: "Disaster Relief", percentage: 40, color: "red", icon: FaWater },
      { name: "Medical Emergencies", percentage: 30, color: "green", icon: FaHeartbeat },
      { name: "Shelter", percentage: 20, color: "blue", icon: FaHome },
      { name: "Food Crisis", percentage: 10, color: "orange", icon: FaUtensils }
    ]
  };
  
  // Mock data for recent emergency responses
  const recentResponses = [
    {
      id: "ER-2023-12",
      title: "Gaza Medical Aid",
      location: "Gaza, Palestine",
      amount: 50000,
      date: "2023-05-01",
      status: "Completed",
      beneficiaries: 2500,
      category: "Medical",
      description: "Emergency medical supplies and support for hospitals in Gaza during crisis",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
    },
    {
      id: "ER-2023-11",
      title: "Turkey Earthquake Relief",
      location: "Antakya, Turkey",
      amount: 75000,
      date: "2023-04-15",
      status: "Completed",
      beneficiaries: 5000,
      category: "Disaster",
      description: "Emergency shelter, food, and medical aid for earthquake victims",
      txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a"
    },
    {
      id: "ER-2023-10",
      title: "Sudan Flood Response",
      location: "Khartoum, Sudan",
      amount: 35000,
      date: "2023-03-22",
      status: "Completed",
      beneficiaries: 3200,
      category: "Disaster",
      description: "Clean water, food packages, and temporary shelter for flood victims",
      txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b"
    }
  ];
  
  // Mock data for pending requests
  const pendingRequests = [
    {
      id: "ER-2023-15",
      title: "Yemen Food Crisis",
      location: "Sana'a, Yemen",
      requestedAmount: 40000,
      date: "2023-05-12",
      urgency: "High",
      category: "Food",
      description: "Emergency food supplies for communities facing severe food insecurity",
      requester: "Yemen Relief Organization"
    },
    {
      id: "ER-2023-14",
      title: "Afghanistan Earthquake",
      location: "Kabul, Afghanistan",
      requestedAmount: 60000,
      date: "2023-05-11",
      urgency: "Critical",
      category: "Disaster",
      description: "Immediate relief for earthquake victims including shelter, food, and medical aid",
      requester: "Islamic Relief"
    },
    {
      id: "ER-2023-13",
      title: "Somalia Drought Relief",
      location: "Mogadishu, Somalia",
      requestedAmount: 35000,
      date: "2023-05-09",
      urgency: "Medium",
      category: "Water",
      description: "Water supply and food aid for communities affected by prolonged drought",
      requester: "East Africa Aid Foundation"
    }
  ];
  
  // Handle emergency request submission
  const handleSubmitRequest = () => {
    // In a real app, this would submit the request to the blockchain
    setTimeout(() => {
      toast({
        title: "Emergency request submitted",
        description: "Your request has been submitted for review by the emergency committee",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }, 2000);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Pending": return "yellow";
      default: return "gray";
    }
  };
  
  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case "Critical": return "red";
      case "High": return "orange";
      case "Medium": return "yellow";
      case "Low": return "green";
      default: return "gray";
    }
  };
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Emergency Fund</Heading>
      <Text color="gray.400" mb={6}>Rapid response funding for urgent humanitarian needs</Text>
      
      {/* Emergency Fund Stats */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Fund Balance</StatLabel>
          <StatNumber color="white">${emergencyFundStats.totalBalance.toLocaleString()}</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaEthereum} mr={1} />
            Available for immediate use
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
          <StatLabel color="gray.300">Pending Requests</StatLabel>
          <StatNumber color="white">{emergencyFundStats.pendingRequests}</StatNumber>
          <StatHelpText color="yellow.400">
            <Icon as={FaRegClock} mr={1} />
            Awaiting approval
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
          <StatLabel color="gray.300">Average Response Time</StatLabel>
          <StatNumber color="white">{emergencyFundStats.avgResponseTime} hrs</StatNumber>
          <StatHelpText color="green.400">
            From request to disbursement
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
          <StatLabel color="gray.300">People Helped</StatLabel>
          <StatNumber color="white">{emergencyFundStats.peopleHelped.toLocaleString()}</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaUsers} mr={1} />
            Across {emergencyFundStats.totalResponses} emergencies
          </StatHelpText>
        </Stat>
      </Grid>
      
      {/* Fund Allocation and Request Button */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
        {/* Fund Allocation */}
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading size="md" color="white" mb={1}>Emergency Fund Allocation</Heading>
              <Text color="gray.400">How the emergency fund is currently being utilized</Text>
            </Box>
            <ShariahComplianceBadge level="Fully Compliant" showDetails={true} />
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <VStack align="stretch" spacing={4}>
                {emergencyFundStats.fundAllocation.map((item, index) => (
                  <Box key={index}>
                    <Flex justify="space-between" mb={1}>
                      <HStack>
                        <Icon as={item.icon} color={`${item.color}.500`} />
                        <Text color="gray.300">{item.name}</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme={item.color} borderRadius="full" px={2}>
                          {item.percentage}%
                        </Badge>
                        <Text color="white" fontWeight="bold">
                          ${(emergencyFundStats.totalBalance * item.percentage / 100).toLocaleString()}
                        </Text>
                      </HStack>
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
              
              <Box mt={6} p={4} bg="gray.700" borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={FaRegLightbulb} color="yellow.400" mr={2} />
                  <Text color="white" fontWeight="medium">How It Works</Text>
                </Flex>
                <Text color="gray.300" fontSize="sm">
                  The Emergency Fund receives 10% of all untagged Sadaqah donations. It's designed for rapid response to urgent humanitarian crises, with disbursement decisions made within 24 hours by our emergency committee.
                </Text>
              </Box>
            </Box>
            
            <Box>
              <Box 
                bg="gray.700" 
                borderRadius="md" 
                p={4} 
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress 
                  value={100} 
                  size="200px"
                  thickness="4px"
                  color="gray.600"
                  trackColor="transparent"
                >
                  <CircularProgressLabel>
                    <VStack spacing={0}>
                      <Text color="white" fontSize="lg" fontWeight="bold">${emergencyFundStats.totalBalance.toLocaleString()}</Text>
                      <Text color="gray.400" fontSize="xs">Total Balance</Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
                
                <Box position="absolute">
                  {emergencyFundStats.fundAllocation.map((item, index) => (
                    <CircularProgress 
                      key={index}
                      value={item.percentage} 
                      size="200px"
                      thickness="12px"
                      color={`${item.color}.500`}
                      trackColor="transparent"
                    />
                  ))}
                </Box>
                
                <HStack mt={6} spacing={4} wrap="wrap" justify="center">
                  {emergencyFundStats.fundAllocation.map((item, index) => (
                    <HStack key={index}>
                      <Box w="12px" h="12px" borderRadius="full" bg={`${item.color}.500`} />
                      <Text fontSize="xs" color="gray.300">{item.name}</Text>
                    </HStack>
                  ))}
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
          
          <Divider borderColor="gray.700" my={6} />
          
          <Flex justify="space-between" align="center">
            <Box>
              <Text color="gray.400" fontSize="sm">Last Replenished</Text>
              <Text color="white">{new Date(emergencyFundStats.lastReplenished).toLocaleDateString()}</Text>
            </Box>
            
            <HStack>
              <Button 
                as={Link}
                to="/donate?fund=emergency"
                variant="outline" 
                colorScheme="brand"
              >
                Donate to Fund
              </Button>
              <Button 
                variant="gradient" 
                leftIcon={<FaExclamationTriangle />}
                onClick={onOpen}
              >
                Request Emergency Aid
              </Button>
            </HStack>
          </Flex>
        </Box>
        
        {/* Pending Requests */}
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Heading size="md" color="white" mb={4}>Pending Requests</Heading>
          
          <VStack spacing={4} align="stretch">
            {pendingRequests.map((request) => (
              <Box 
                key={request.id}
                p={4}
                bg="gray.700"
                borderRadius="md"
                borderLeftWidth="4px"
                borderLeftColor={getUrgencyColor(request.urgency) + ".500"}
              >
                <Flex justify="space-between" align="flex-start" mb={2}>
                  <Heading size="sm" color="white">{request.title}</Heading>
                  <Badge colorScheme={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </Flex>
                
                <HStack mb={2} color="gray.400" fontSize="sm">
                  <Icon as={FaMapMarkerAlt} />
                  <Text>{request.location}</Text>
                </HStack>
                
                <Text color="gray.300" fontSize="sm" mb={3} noOfLines={2}>
                  {request.description}
                </Text>
                
                <Flex justify="space-between" align="center">
                  <Text color="white" fontWeight="bold">${request.requestedAmount.toLocaleString()}</Text>
                  <HStack>
                    <Badge colorScheme="purple" borderRadius="full">
                      {request.category}
                    </Badge>
                    <Text color="gray.400" fontSize="xs">
                      {new Date(request.date).toLocaleDateString()}
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
          
          <Button 
            mt={4}
            w="full"
            variant="outline"
            rightIcon={<FaArrowRight />}
            as={Link}
            to="/emergency/requests"
          >
            View All Requests
          </Button>
        </Box>
      </Grid>
      
      {/* Recent Emergency Responses */}
      <Heading size="md" color="white" mb={4}>Recent Emergency Responses</Heading>
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.700"
        mb={8}
      >
        <Table variant="simple">
          <Thead bg="gray.800">
            <Tr>
              <Th color="gray.300">ID</Th>
              <Th color="gray.300">Emergency</Th>
              <Th color="gray.300">Location</Th>
              <Th color="gray.300">Amount</Th>
              <Th color="gray.300">Date</Th>
              <Th color="gray.300">Status</Th>
              <Th color="gray.300">Beneficiaries</Th>
              <Th color="gray.300">Verification</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentResponses.map((response) => (
              <Tr key={response.id} _hover={{ bg: 'gray.700' }}>
                <Td color="brand.500">{response.id}</Td>
                <Td color="white">{response.title}</Td>
                <Td color="gray.300">{response.location}</Td>
                <Td color="white">${response.amount.toLocaleString()}</Td>
                <Td color="gray.300">{new Date(response.date).toLocaleDateString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(response.status)}>
                    {response.status}
                  </Badge>
                </Td>
                <Td color="white">{response.beneficiaries.toLocaleString()}</Td>
                <Td>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    colorScheme="brand"
                    as={Link}
                    to={`/audit-trail/tx/${response.txHash}`}
                  >
                    <Icon as={FaEthereum} mr={1} />
                    Verify
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      
      {/* Blockchain Verification */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={6}
        borderWidth="1px"
        borderColor="gray.700"
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="md" color="white" mb={1}>Blockchain-Verified Transparency</Heading>
            <Text color="gray.400">All emergency fund transactions are recorded on the blockchain for complete transparency</Text>
          </Box>
          <Button 
            leftIcon={<FaEthereum />} 
            variant="outline"
            as={Link}
            to="/audit-trail?filter=emergency"
          >
            View Audit Trail
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
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
              <Icon as={FaShieldAlt} color="accent.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Rapid Disbursement</Heading>
            <Text color="gray.400" fontSize="sm">
              Smart contracts enable immediate fund disbursement once approved, ensuring aid reaches those in need without delay.
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
              <Icon as={FaRegCheckCircle} color="brand.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Multi-Signature Approval</Heading>
            <Text color="gray.400" fontSize="sm">
              Emergency fund disbursements require approval from multiple committee members, ensuring proper governance.
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
              <Icon as={FaFileAlt} color="green.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Impact Reporting</Heading>
            <Text color="gray.400" fontSize="sm">
              Beneficiary organizations provide on-chain verification of aid delivery, creating a transparent record of impact.
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>
      
      {/* Emergency Request Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">Request Emergency Aid</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Emergency Title</FormLabel>
                <Input placeholder="Brief description of the emergency" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Organization</FormLabel>
                <Input placeholder="Name of requesting organization" />
              </FormControl>
              
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input placeholder="City, Country" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder="Select category">
                    <option value="disaster">Disaster Relief</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="food">Food Crisis</option>
                    <option value="water">Water Emergency</option>
                    <option value="shelter">Shelter</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Amount Requested (USDT)</FormLabel>
                  <Input type="number" placeholder="Enter amount" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Urgency Level</FormLabel>
                  <Select placeholder="Select urgency">
                    <option value="critical">Critical (24h)</option>
                    <option value="high">High (48h)</option>
                    <option value="medium">Medium (72h)</option>
                    <option value="low">Low (1 week)</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <FormControl isRequired>
                <FormLabel>Detailed Description</FormLabel>
                <Textarea 
                  placeholder="Provide details about the emergency, who is affected, and how the funds will be used" 
                  minH="150px"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Supporting Documentation</FormLabel>
                <Input type="file" pt={1} />
                <Text fontSize="sm" color="gray.400" mt={1}>
                  Upload any supporting documents (PDF, max 10MB)
                </Text>
              </FormControl>
              
              <Box p={4} bg="gray.700" borderRadius="md">
                <Flex align="center" mb={2}>
                  <Icon as={FaRegLightbulb} color="yellow.400" mr={2} />
                  <Text color="white" fontWeight="medium">Request Process</Text>
                </Flex>
                <Text color="gray.300" fontSize="sm">
                  Emergency requests are reviewed by our committee within 24 hours. If approved, funds are disbursed immediately via blockchain. You will need to provide verification of aid delivery within 7 days of receiving funds.
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaExclamationTriangle />}
              onClick={handleSubmitRequest}
            >
              Submit Emergency Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmergencyFundPage; 
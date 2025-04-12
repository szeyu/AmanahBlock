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
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td, 
  Input,
  Center,
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
  FaChartPie,
  FaRegFilePdf,
  FaRegFileImage,
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaMoneyBillWave,
  FaBitcoin,
  FaClock,
  FaQrcode,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';
import AIDonationAdvisor from '../components/AIDonationAdvisor';

const DonationPage = () => {
  const [donationType, setDonationType] = useState('sadaqah');
  const [donationAmount, setDonationAmount] = useState(100);
  const [selectedPool, setSelectedPool] = useState('general');
  const [currency, setCurrency] = useState('USDT');
  const [showAllocation, setShowAllocation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isQRCodeOpen, onOpen: onQRCodeOpen, onClose: onQRCodeClose } = useDisclosure();
  const toast = useToast();

  const [donationMode, setDonationMode] = useState('money'); // 'money' or 'food'
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [foodItems] = useState([
    { id: 1, name: 'Rice (5kg bag)', price: 15, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=jpg' },
    { id: 2, name: 'Cooking Oil (1L)', price: 8, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=jpg' },
    { id: 3, name: 'Flour (2kg)', price: 6, image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?q=80&w=2683&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Canned Beans (400g)', price: 3, image: 'https://images.unsplash.com/photo-1669655139685-1daf4fd4afd8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Dates (500g)', price: 10, image: 'https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, name: 'Milk Powder (900g)', price: 12, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=jpg' },
    { id: 7, name: 'Lentils (1kg)', price: 5, image: 'https://images.unsplash.com/photo-1612869538502-b5baa439abd7?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, name: 'Tea (100 bags)', price: 7, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=jpg' },
  ]);
  
  // Add new state for Waqf form
  const [waqfRequests, setWaqfRequests] = useState([]);
  const [waqfForm, setWaqfForm] = useState({
    name: '',
    assetType: '',
    location: '',
    purpose: ''
  });

  // Handle form input changes
  const handleWaqfFormChange = (e) => {
    const { name, value } = e.target;
    setWaqfForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Waqf request submission
  const handleWaqfSubmit = (e) => {
    e.preventDefault();
    
    // Add new request to the list with a unique ID
    const newRequest = {
      id: Date.now(),
      ...waqfForm,
      documents: uploadedFiles.length,
      status: 'Pending Review',
      submittedDate: new Date().toLocaleDateString()
    };
    
    setWaqfRequests(prev => [...prev, newRequest]);
    
    // Reset form
    setWaqfForm({
      name: '',
      assetType: '',
      location: '',
      purpose: ''
    });
    setUploadedFiles([]);
    
    // Show success toast
    toast({
      title: "Waqf request submitted",
      description: "Our team will review your request and contact you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  // First, add a new state for file uploads
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Add a function to handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => {
      const fileType = file.type;
      return fileType === 'image/png' || 
            fileType === 'image/jpeg' || 
            fileType === 'application/pdf';
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Only PNG, JPEG, and PDF files are allowed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    
    // Add valid files to state
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  // Add a function to remove uploaded files
  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

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

  // Update this function to handle donation type changes
  const handleDonationTypeChange = (index) => {
    // Set donation type based on tab index
    const types = ['sadaqah', 'zakat', 'waqf'];
    setDonationType(types[index]);
    
    // Reset donation mode to 'money' and clear selected food items when switching tabs
    if (types[index] !== 'sadaqah') {
      setDonationMode('money');
      setSelectedFoodItems([]);
    }
  };

  // Add a function to handle adding food items
  const handleAddFoodItem = (item) => {
    const existingItem = selectedFoodItems.find(i => i.id === item.id);
    
    if (existingItem) {
      setSelectedFoodItems(
        selectedFoodItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedFoodItems([...selectedFoodItems, { ...item, quantity: 1 }]);
    }
  };

  // Add a function to handle removing food items
  const handleRemoveFoodItem = (itemId) => {
    setSelectedFoodItems(selectedFoodItems.filter(item => item.id !== itemId));
  };

  // Add a function to update food item quantity
  const handleUpdateFoodQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFoodItem(itemId);
      return;
    }
    
    setSelectedFoodItems(
      selectedFoodItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate total food donation amount
  const calculateFoodTotal = () => {
    return selectedFoodItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Show allocation details when general pool is selected
  useEffect(() => {
    if (selectedPool === 'general') {
      setShowAllocation(true);
    } else {
      setShowAllocation(false);
    }
  }, [selectedPool]);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'ewallet') {
      onQRCodeOpen();
    }
  };

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Make a Donation</Heading>
      <Text color="gray.400" mb={6}>Support Shariah-compliant charitable projects with transparent blockchain tracking</Text>
      
      {/* Donation Type Selection - Modified to use the new handler */}
      <Tabs 
        variant="soft-rounded" 
        colorScheme="brand" 
        mb={8}
        onChange={handleDonationTypeChange}
      >
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
            
            {/* Waqf Donation Form */}
            <Box 
              bg="rgba(26, 32, 44, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              p={6}
              borderWidth="1px"
              borderColor="gray.700"
              mb={8}
            >
              <Heading size="md" color="white" mb={4}>Waqf Asset Donation Request</Heading>
              <Text color="gray.300" mb={6}>
                Please provide details about the asset you wish to donate as Waqf. Our team will review your request and contact you to complete the process.
              </Text>
              
              <form onSubmit={handleWaqfSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Full Name</FormLabel>
                    <Input
                      name="name"
                      value={waqfForm.name}
                      onChange={handleWaqfFormChange}
                      bg="gray.800" 
                      borderColor="gray.600"
                      type="text"
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Asset Type</FormLabel>
                    <Select 
                      name="assetType"
                      value={waqfForm.assetType}
                      onChange={handleWaqfFormChange}
                      bg="gray.800" 
                      borderColor="gray.600"
                      placeholder="Select asset type"
                    >
                      <option value="Land">Land</option>
                      <option value="Building">Building</option>
                      <option value="School">School</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Farm">Farm</option>
                      <option value="Business">Business</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Location</FormLabel>
                    <Input
                      name="location"
                      value={waqfForm.location}
                      onChange={handleWaqfFormChange}
                      bg="gray.800" 
                      borderColor="gray.600"
                      type="text"
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Purpose</FormLabel>
                    <Select 
                      name="purpose"
                      value={waqfForm.purpose}
                      onChange={handleWaqfFormChange}
                      bg="gray.800" 
                      borderColor="gray.600"
                      placeholder="Select intended purpose"
                    >
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Poverty Relief">Poverty Relief</option>
                      <option value="Religious Services">Religious Services</option>
                      <option value="Community Development">Community Development</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  {/* Add the new Ownership Documents upload box */}
                  <FormControl mt={4}>
                    <FormLabel color="gray.300">Ownership Documents</FormLabel>
                    <Box
                      border="2px dashed"
                      borderColor="gray.600"
                      borderRadius="md"
                      p={4}
                      bg="gray.800"
                      mb={3}
                    >
                      <VStack spacing={2}>
                        <Text color="gray.300" fontSize="sm" textAlign="center">
                          Upload proof of ownership documents (PNG, JPEG, or PDF)
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="brand"
                          onClick={() => document.getElementById('file-upload').click()}
                        >
                          Select Files
                        </Button>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileUpload}
                          display="none"
                        />
                      </VStack>
                    </Box>
                    
                    {/* Display uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <Box mt={3}>
                        <Text color="gray.300" fontSize="sm" mb={2}>
                          Uploaded Documents ({uploadedFiles.length})
                        </Text>
                        <VStack spacing={2} align="stretch">
                          {uploadedFiles.map((file, index) => (
                            <Flex
                              key={index}
                              bg="gray.700"
                              p={2}
                              borderRadius="md"
                              justify="space-between"
                              align="center"
                            >
                              <HStack>
                                <Icon 
                                  as={file.type.includes('pdf') ? FaRegFilePdf : FaRegFileImage} 
                                  color={file.type.includes('pdf') ? "red.400" : "blue.400"} 
                                />
                                <Text color="white" fontSize="sm" noOfLines={1}>
                                  {file.name}
                                </Text>
                                <Badge colorScheme="gray" fontSize="xs">
                                  {(file.size / 1024).toFixed(0)} KB
                                </Badge>
                              </HStack>
                              <Button
                                size="xs"
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => handleRemoveFile(index)}
                              >
                                ✕
                              </Button>
                            </Flex>
                          ))}
                        </VStack>
                      </Box>
                    )}
                    <Text color="gray.500" fontSize="xs" mt={2}>
                      Please ensure all documents are clear and legible. Maximum file size: 5MB per file.
                    </Text>
                  </FormControl>
                  
                  <Button 
                    type="submit"
                    variant="gradient" 
                    size="lg" 
                    mt={4}
                    colorScheme="green"
                  >
                    Submit Waqf Request
                  </Button>
                </VStack>
              </form>
            </Box>
            
            {/* Waqf Requests Table */}
            {waqfRequests.length > 0 && (
              <Box 
                bg="rgba(26, 32, 44, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                p={6}
                borderWidth="1px"
                borderColor="gray.700"
              >
                <Heading size="md" color="white" mb={4}>Your Waqf Requests</Heading>
                <Box overflowX="auto">
                  <Table variant="simple" colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th color="gray.400">Asset Type</Th>
                        <Th color="gray.400">Location</Th>
                        <Th color="gray.400">Purpose</Th>
                        <Th color="gray.400">Documents</Th>
                        <Th color="gray.400">Status</Th>
                        <Th color="gray.400">Submitted Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {waqfRequests.map(request => (
                        <Tr key={request.id}>
                          <Td color="white">{request.assetType}</Td>
                          <Td color="white">{request.location}</Td>
                          <Td color="white">{request.purpose}</Td>
                          <Td color="white">
                            {request.documents > 0 ? (
                              <Badge colorScheme="blue">{request.documents} files</Badge>
                            ) : (
                              <Badge colorScheme="gray">None</Badge>
                            )}
                          </Td>
                          <Td>
                            <Badge colorScheme="yellow">{request.status}</Badge>
                          </Td>
                          <Td color="white">{request.submittedDate}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Pool Selection */}
      {/* <Box 
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
        </Grid> */}
        
        {/* Fund Allocation Visualization (for General Pool) */}
        {/* {showAllocation && (
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
      </Box> */}
      
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
        
        {/* Donation Mode Selector */}
        <Tabs variant="soft-rounded" colorScheme="brand" mb={6} onChange={(index) => setDonationMode(index === 0 ? 'money' : 'food')} index={donationMode === 'money' ? 0 : 1}>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'brand.500' }}>Donate Money</Tab>
            {donationType === 'sadaqah' && (
              <Tab _selected={{ color: 'white', bg: 'accent.500' }}>Donate Food</Tab>
            )}
          </TabList>
      
          <TabPanels>
            <TabPanel px={0}>
              {/* Money Donation UI */}
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

              {/* Payment Method Selection */}
              <Box mb={6}>
                <Text color="gray.300" mb={4}>Select payment method</Text>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                  {/* Card Payment */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'card' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'card' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('card')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaCreditCard} boxSize="24px" color={paymentMethod === 'card' ? "brand.500" : "gray.400"} />
                      <Text color="white">Card Payment</Text>
                    </HStack>
                  </Box>

                  {/* Online Banking */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'banking' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'banking' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('banking')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaUniversity} boxSize="24px" color={paymentMethod === 'banking' ? "brand.500" : "gray.400"} />
                      <Text color="white">Online Banking</Text>
                    </HStack>
                  </Box>

                  {/* e-Wallet */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'ewallet' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'ewallet' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('ewallet')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaMobileAlt} boxSize="24px" color={paymentMethod === 'ewallet' ? "brand.500" : "gray.400"} />
                      <Text color="white">e-Wallet</Text>
                    </HStack>
                  </Box>

                  {/* Cash */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'cash' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'cash' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('cash')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaMoneyBillWave} boxSize="24px" color={paymentMethod === 'cash' ? "brand.500" : "gray.400"} />
                      <Text color="white">Cash</Text>
                    </HStack>
                  </Box>

                  {/* Crypto */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'crypto' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'crypto' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('crypto')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaBitcoin} boxSize="24px" color={paymentMethod === 'crypto' ? "brand.500" : "gray.400"} />
                      <Text color="white">Crypto</Text>
                    </HStack>
                  </Box>

                  {/* Buy Now Pay Later */}
                  <Box
                    p={4}
                    bg={paymentMethod === 'bnpl' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                    borderWidth="1px"
                    borderColor={paymentMethod === 'bnpl' ? "brand.500" : "gray.700"}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handlePaymentMethodSelect('bnpl')}
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaClock} boxSize="24px" color={paymentMethod === 'bnpl' ? "brand.500" : "gray.400"} />
                      <Text color="white">Buy Now Pay Later</Text>
                    </HStack>
                  </Box>
                </Grid>
                {/* Card Payment Details */}
                {paymentMethod === 'card' && (
                  <Box mt={4} p={4} bg="gray.800" borderRadius="md">
                    <Text color="white" fontWeight="medium" mb={3}>Card Payment Details</Text>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Card Type</FormLabel>
                      <RadioGroup defaultValue="credit">
                        <Stack direction="row" spacing={5}>
                          <Radio value="credit" colorScheme="brand">Credit Card</Radio>
                          <Radio value="debit" colorScheme="brand">Debit Card</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Card Network</FormLabel>
                      <RadioGroup defaultValue="visa">
                        <Stack direction="row" spacing={5}>
                          <Radio value="visa" colorScheme="brand">Visa</Radio>
                          <Radio value="mastercard" colorScheme="brand">Mastercard</Radio>
                          <Radio value="amex" colorScheme="brand">American Express</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Card Number</FormLabel>
                      <Input 
                        placeholder="XXXX XXXX XXXX XXXX" 
                        bg="gray.700" 
                        borderColor="gray.600"
                      />
                    </FormControl>
                    
                    <Grid templateColumns="1fr 1fr" gap={3}>
                      <FormControl>
                        <FormLabel color="gray.300" fontSize="sm">Expiry Date</FormLabel>
                        <Input 
                          placeholder="MM/YY" 
                          bg="gray.700" 
                          borderColor="gray.600"
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel color="gray.300" fontSize="sm">CVV</FormLabel>
                        <Input 
                          placeholder="XXX" 
                          bg="gray.700" 
                          borderColor="gray.600"
                          type="password"
                          maxLength={4}
                        />
                      </FormControl>
                    </Grid>
                    
                    <FormControl mt={3}>
                      <FormLabel color="gray.300" fontSize="sm">Cardholder Name (Optional)</FormLabel>
                      <Input 
                        placeholder="Name as it appears on card" 
                        bg="gray.700" 
                        borderColor="gray.600"
                      />
                    </FormControl>
                    
                    <Text color="gray.400" fontSize="xs" mt={3}>
                      Your payment information is securely processed and we do not store your card details.
                    </Text>
                  </Box>
                )}
                
                {/* Online Banking Details */}
                {paymentMethod === 'banking' && (
                  <Box mt={4} p={4} bg="gray.800" borderRadius="md">
                    <Text color="white" fontWeight="medium" mb={3}>Online Banking Details</Text>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Select Bank</FormLabel>
                      <Select 
                        placeholder="Choose your bank" 
                        bg="gray.700" 
                        borderColor="gray.600"
                      >
                        <option value="maybank">Maybank</option>
                        <option value="cimb">CIMB Bank</option>
                        <option value="publicbank">Public Bank</option>
                        <option value="rhb">RHB Bank</option>
                        <option value="hongleong">Hong Leong Bank</option>
                        <option value="ambank">AmBank</option>
                        <option value="bsn">Bank Simpanan Nasional</option>
                        <option value="bankislam">Bank Islam</option>
                        <option value="ocbc">OCBC Bank</option>
                        <option value="hsbc">HSBC Bank</option>
                        <option value="standardchartered">Standard Chartered</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Account Number</FormLabel>
                      <Input 
                        placeholder="Enter your account number" 
                        bg="gray.700" 
                        borderColor="gray.600"
                      />
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Account Holder Name</FormLabel>
                      <Input 
                        placeholder="Enter account holder name" 
                        bg="gray.700" 
                        borderColor="gray.600"
                      />
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Transfer Amount</FormLabel>
                      <NumberInput 
                        value={donationAmount} 
                        onChange={(valueString) => setDonationAmount(parseFloat(valueString))}
                        min={10}
                        max={1000000}
                      >
                        <NumberInputField bg="gray.700" borderColor="gray.600" />
                        <NumberInputStepper>
                          <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                          <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl mb={3}>
                      <FormLabel color="gray.300" fontSize="sm">Reference/Description</FormLabel>
                      <Input 
                        placeholder="e.g., Donation for AmanahBlock" 
                        bg="gray.700" 
                        borderColor="gray.600"
                        defaultValue={`${donationType.toUpperCase()} Donation`}
                      />
                    </FormControl>
                    
                    <Text color="gray.400" fontSize="xs" mt={2}>
                      You will be redirected to your bank's secure login page to complete the payment after clicking "Donate Now".
                    </Text>
                  </Box>
                )}
              </Box>

              <Button 
                variant="gradient" 
                size="lg" 
                w="full"
                leftIcon={<FaWallet />}
                onClick={onOpen}
                isDisabled={!paymentMethod}
              >
                Donate Now
              </Button>
            </TabPanel>
            
            <TabPanel px={0}>
              {/* Food Donation UI */}
              <Text color="gray.300" mb={4}>
                Select food items to donate. These will be purchased and distributed to those in need through our partner organizations.
              </Text>
              
              {/* Food Items Grid */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4} mb={6}>
                {foodItems.map(item => (
                  <Box 
                    key={item.id}
                    bg="gray.800"
                    borderRadius="lg"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor="gray.700"
                    transition="all 0.3s"
                    _hover={{
                      borderColor: "brand.500",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                    }}
                  >
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      h="120px"
                      w="100%"
                      objectFit="cover"
                    />
                    <Box p={3}>
                      <Heading size="sm" color="white" mb={1}>{item.name}</Heading>
                      <Text color="brand.500" fontWeight="bold" mb={3}>${item.price.toFixed(2)}</Text>
                      
                      {selectedFoodItems.find(i => i.id === item.id) ? (
                        <Flex align="center" justify="space-between">
                          <NumberInput 
                            size="sm" 
                            maxW="100px" 
                            min={0} 
                            value={selectedFoodItems.find(i => i.id === item.id).quantity}
                            onChange={(valueString) => handleUpdateFoodQuantity(item.id, parseInt(valueString))}
                          >
                            <NumberInputField bg="gray.700" borderColor="gray.600" />
                            <NumberInputStepper>
                              <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                              <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                            </NumberInputStepper>
                          </NumberInput>
                          <Text color="white" fontWeight="bold">
                            ${(item.price * selectedFoodItems.find(i => i.id === item.id).quantity).toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Button 
                          size="sm" 
                          colorScheme="brand" 
                          variant="outline" 
                          w="full"
                          onClick={() => handleAddFoodItem(item)}
                        >
                          Add to Donation
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </Grid>
              
              {/* Selected Food Items Summary */}
              {selectedFoodItems.length > 0 && (
                <Box 
                  bg="gray.800" 
                  borderRadius="lg" 
                  p={4} 
                  mb={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                >
                  <Heading size="sm" color="white" mb={4}>Your Food Donation</Heading>
                  
                  <VStack spacing={3} align="stretch" mb={4}>
                    {selectedFoodItems.map(item => (
                      <Flex key={item.id} justify="space-between" align="center">
                        <HStack>
                          <Text color="white">{item.name}</Text>
                          <Badge colorScheme="brand">x{item.quantity}</Badge>
                        </HStack>
                        <HStack>
                          <Text color="white">${(item.price * item.quantity).toFixed(2)}</Text>
                          <Button 
                            size="xs" 
                            colorScheme="red" 
                            variant="ghost"
                            onClick={() => handleRemoveFoodItem(item.id)}
                          >
                            ✕
                          </Button>
                        </HStack>
                      </Flex>
                    ))}
                  </VStack>
                  
                  <Divider borderColor="gray.700" mb={4} />
                  
                  <Flex justify="space-between" align="center" mb={6}>
                    <Text color="white" fontWeight="bold">Total Food Donation</Text>
                    <Text color="brand.500" fontWeight="bold" fontSize="xl">${calculateFoodTotal().toFixed(2)}</Text>
                  </Flex>

                  {/* Add payment method selection for food donation */}
                  <Box mb={6}>
                    <Text color="gray.300" mb={4}>Select payment method</Text>
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                      {/* Card Payment */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'card' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'card' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('card')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaCreditCard} boxSize="24px" color={paymentMethod === 'card' ? "brand.500" : "gray.400"} />
                          <Text color="white">Card Payment</Text>
                        </HStack>
                      </Box>

                      {/* Online Banking */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'banking' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'banking' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('banking')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaUniversity} boxSize="24px" color={paymentMethod === 'banking' ? "brand.500" : "gray.400"} />
                          <Text color="white">Online Banking</Text>
                        </HStack>
                      </Box>

                      {/* e-Wallet */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'ewallet' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'ewallet' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('ewallet')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaMobileAlt} boxSize="24px" color={paymentMethod === 'ewallet' ? "brand.500" : "gray.400"} />
                          <Text color="white">e-Wallet</Text>
                        </HStack>
                      </Box>

                      {/* Cash */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'cash' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'cash' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('cash')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaMoneyBillWave} boxSize="24px" color={paymentMethod === 'cash' ? "brand.500" : "gray.400"} />
                          <Text color="white">Cash</Text>
                        </HStack>
                      </Box>

                      {/* Crypto */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'crypto' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'crypto' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('crypto')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaBitcoin} boxSize="24px" color={paymentMethod === 'crypto' ? "brand.500" : "gray.400"} />
                          <Text color="white">Crypto</Text>
                        </HStack>
                      </Box>

                      {/* Buy Now Pay Later */}
                      <Box
                        p={4}
                        bg={paymentMethod === 'bnpl' ? "rgba(11, 197, 234, 0.2)" : "gray.800"}
                        borderWidth="1px"
                        borderColor={paymentMethod === 'bnpl' ? "brand.500" : "gray.700"}
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={() => handlePaymentMethodSelect('bnpl')}
                        transition="all 0.3s"
                        _hover={{
                          borderColor: "brand.500",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
                        }}
                      >
                        <HStack spacing={3}>
                          <Icon as={FaClock} boxSize="24px" color={paymentMethod === 'bnpl' ? "brand.500" : "gray.400"} />
                          <Text color="white">Buy Now Pay Later</Text>
                        </HStack>
                      </Box>
                    </Grid>
                  </Box>
                  
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    w="full"
                    leftIcon={<FaWallet />}
                    onClick={() => {
                      setDonationAmount(calculateFoodTotal());
                      onOpen();
                    }}
                    isDisabled={!paymentMethod}
                  >
                    Donate Food Items
                  </Button>
                </Box>
              )}
              
              {selectedFoodItems.length === 0 && (
                <Box 
                  bg="gray.800" 
                  borderRadius="lg" 
                  p={4} 
                  mb={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                  textAlign="center"
                >
                  <Text color="gray.400" mb={2}>No food items selected yet</Text>
                  <Text color="gray.300" fontSize="sm">
                    Select food items above to create your donation package
                  </Text>
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
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

      {/* E-Wallet QR Code Modal */}
      <Modal isOpen={isQRCodeOpen} onClose={onQRCodeClose} size="md">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
            <HStack spacing={3}>
              <Icon as={FaQrcode} color="brand.500" />
              <Text>Scan QR Code to Pay</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6}>
              <Box 
                p={4} 
                bg="white" 
                borderRadius="lg"
                boxShadow="0 0 20px rgba(11, 197, 234, 0.2)"
              >
                <QRCodeSVG 
                  value={`donation:${donationAmount}${currency}:${selectedPool}:${donationType}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </Box>
              <VStack spacing={2}>
                <Text color="gray.300">Amount to Pay</Text>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  {donationAmount} {currency}
                </Text>
              </VStack>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Scan this QR code with your e-wallet app to complete the payment
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onQRCodeClose}>
              Close
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaWallet />}
              onClick={() => {
                onQRCodeClose();
                onOpen();
              }}
            >
              Proceed to Confirmation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DonationPage;
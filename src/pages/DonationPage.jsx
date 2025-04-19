import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  useToast,
  VStack,
  Input,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { 
  FaSchool, 
  FaHandHoldingWater, 
  FaUtensils, 
  FaHandHoldingUsd, 
  FaCoins,
  FaRegFilePdf,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AIDonationAdvisor from '../components/donation/AIDonationAdvisor';
import DonationPoolSelector from '../components/donation/DonationPoolSelector';
import DonationAmountSection from '../components/donation/DonationAmountSection';
import WaqfDonationForm from '../components/donation/WaqfDonationForm';
import FoodDonationSection from '../components/donation/FoodDonationSection';
import DonationModals from '../components/donation/DonationModals';
import ZakatCalculator from '../components/ZakatCalculator';
import { useWeb3 } from '../context/Web3Context';

const DonationPage = () => {
  const [donationType, setDonationType] = useState('sadaqah');
  const [donationAmount, setDonationAmount] = useState(100);
  const [selectedPool, setSelectedPool] = useState('general');
  const [currency, setCurrency] = useState('USDT');
  const [showAllocation, setShowAllocation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showDonationAmount, setShowDonationAmount] = useState(true);
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

  const { makeDonation, makeFoodDonation, loading } = useWeb3();

  // Update handleDonate function to use smart contract
  const handleDonate = async () => {
    if (donationMode === 'food') {
      await makeFoodDonation(selectedFoodItems);
    } else {
      await makeDonation(donationAmount, donationType, selectedPool);
    }
    onClose();
  };

  // Add a new state for Waqf donation amount
  const [waqfDonationAmount, setWaqfDonationAmount] = useState(100);
  const [waqfPaymentMethod, setWaqfPaymentMethod] = useState('');

  // Update this function to handle donation type changes
  const handleDonationTypeChange = (index) => {
    const types = ['sadaqah', 'zakat', 'waqf'];
    setDonationType(types[index]);
    setShowDonationAmount(true);
    
    if (types[index] === 'zakat' || types[index] === 'waqf') {
      setDonationMode('money');
      setSelectedFoodItems([]);
    }
  };

  // Add a function to handle Waqf payment method selection
  const handleWaqfPaymentMethodSelect = (method) => {
    setWaqfPaymentMethod(method);
    if (method === 'ewallet') {
      onQRCodeOpen();
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

  const [calculatedZakat, setCalculatedZakat] = useState(0);
  const [extractedMetrics, setExtractedMetrics] = useState(null);
  const usdtToMyrRate = 4.72; // 1 USDT = 4.72 MYR

  // Handler for Zakat calculation
  const handleZakatCalculated = (amount) => {
    // Ensure amount is a number
    const zakatAmount = parseFloat(amount) || 0;
    setCalculatedZakat(zakatAmount);
    
    // When zakat is calculated, update the donation amount with converted USDT value
    if (donationType === 'zakat') {
      // Convert MYR to USDT
      const usdtAmount = zakatAmount / usdtToMyrRate;
      setDonationAmount(usdtAmount);
    }
  };

  // Add new state for PDF upload
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle PDF upload
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Log file information
    console.log('File object:', file);
    console.log('File path:', file.path);
    console.log('File name:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size);
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUploadedPdf(file);
  };

  // Handle PDF processing
  const handleProcessPdf = async () => {
    if (!uploadedPdf) return;

    setIsProcessing(true);
    
    try {
      console.log('Processing PDF:', uploadedPdf);
      
      // Create FormData and append the file
      const formData = new FormData();
      formData.append('file', uploadedPdf);
      
      console.log('Uploading file...');

      // Call the new upload endpoint
      const response = await fetch('http://localhost:8000/upload-pdf', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to process PDF: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      // Update Zakat calculator with extracted metrics
      if (data.zakat_metrics) {
        console.log('Extracted Zakat metrics:', data.zakat_metrics);
        
        // Convert any "NaN" strings to actual numbers
        const processedMetrics = Object.fromEntries(
          Object.entries(data.zakat_metrics).map(([key, value]) => [
            key,
            value === "NaN" ? "0" : value.toString()
          ])
        );
        
        setExtractedMetrics(processedMetrics);
        
        toast({
          title: "Document processed successfully",
          description: `Financial metrics have been extracted and applied to the calculator. Income found: RM ${processedMetrics.income}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Document processed",
          description: "No financial metrics were found in the document",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('Error in handleProcessPdf:', error);
      toast({
        title: "Error processing document",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box 
      p={5} 
      maxW="container.xl" 
      mx="auto"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Box position="relative" zIndex="1">
        <Heading 
          mb={2} 
          color="white" 
          size="xl"
          bgGradient="linear(to-r, brand.400, accent.400)"
          bgClip="text"
          fontWeight="bold"
        >
          Make a Donation
        </Heading>
        <Text color="gray.400" mb={6}>Support Shariah-compliant charitable projects with transparent blockchain tracking</Text>
        
        {/* Donation Type Selection */}
        <Tabs 
          variant="soft-rounded" 
          colorScheme="brand" 
          mb={8} 
          onChange={handleDonationTypeChange}
        >
          <TabList>
            <Tab 
              _selected={{ 
                color: 'white', 
                bg: 'brand.500',
                boxShadow: '0 0 15px rgba(11, 197, 234, 0.5)'
              }}
              _hover={{
                bg: 'rgba(11, 197, 234, 0.1)'
              }}
            >
              Sadaqah (Voluntary)
            </Tab>
            <Tab 
              _selected={{ 
                color: 'white', 
                bg: 'accent.500',
                boxShadow: '0 0 15px rgba(236, 110, 76, 0.5)'
              }}
              _hover={{
                bg: 'rgba(236, 110, 76, 0.1)'
              }}
            >
              Zakat (Obligatory)
            </Tab>
            <Tab 
              _selected={{ 
                color: 'white', 
                bg: 'green.500',
                boxShadow: '0 0 15px rgba(72, 187, 120, 0.5)'
              }}
              _hover={{
                bg: 'rgba(72, 187, 120, 0.1)'
              }}
            >
              Waqf (Endowment)
            </Tab>
          </TabList>
          <TabPanels mt={4}>
            <TabPanel px={0}>
              <Text color="gray.300" mb={4}>
                Sadaqah is voluntary charity given to help those in need. It can be given at any time, in any amount, and is a beautiful expression of generosity.
              </Text>
              
              {/* Sadaqah Donation Flow */}
              <Box>
                <AIDonationAdvisor />
                
                {showDonationAmount ? (
                  <DonationAmountSection 
                    donationMode={donationMode}
                    setDonationMode={setDonationMode}
                    donationAmount={donationAmount}
                    setDonationAmount={setDonationAmount}
                    paymentMethod={paymentMethod}
                    handlePaymentMethodSelect={handlePaymentMethodSelect}
                    onOpen={onOpen}
                  />
                ) : (
                  <Button
                    onClick={() => setShowDonationAmount(true)}
                    colorScheme="brand"
                    size="lg"
                    leftIcon={<FaCoins />}
                    mt={4}
                  >
                    Pay Now
                  </Button>
                )}
                
                {donationMode === 'food' && showDonationAmount && (
                  <FoodDonationSection 
                    foodItems={foodItems}
                    selectedFoodItems={selectedFoodItems}
                    handleAddFoodItem={handleAddFoodItem}
                    handleUpdateFoodQuantity={handleUpdateFoodQuantity}
                    handleRemoveFoodItem={handleRemoveFoodItem}
                    calculateFoodTotal={calculateFoodTotal}
                    paymentMethod={paymentMethod}
                    handlePaymentMethodSelect={handlePaymentMethodSelect}
                    setDonationAmount={setDonationAmount}
                    onOpen={onOpen}
                  />
                )}
              </Box>
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={8} align="stretch">
                {/* Add PDF upload section before the calculator */}
                <Box
                  bg="rgba(26, 32, 44, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                >
                  <Heading size="md" color="white" mb={4}>Upload Zakat Document</Heading>
                  <Text color="gray.300" mb={6}>
                    Upload your Zakat-related documents (e.g., financial statements, asset records) for automatic processing.
                  </Text>

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
                        Upload your PDF document (Max 5MB)
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="brand"
                        onClick={() => document.getElementById('pdf-upload').click()}
                      >
                        Select PDF
                      </Button>
                      <Input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        display="none"
                      />
                    </VStack>
                  </Box>

                  {/* Display uploaded PDF */}
                  {uploadedPdf && (
                    <Box mt={3}>
                      <Flex
                        bg="gray.700"
                        p={2}
                        borderRadius="md"
                        justify="space-between"
                        align="center"
                      >
                        <Flex align="center" gap={2}>
                          <Icon as={FaRegFilePdf} color="red.400" />
                          <Text color="white" fontSize="sm" noOfLines={1}>
                            {uploadedPdf.name}
                          </Text>
                          <Badge colorScheme="gray" fontSize="xs">
                            {(uploadedPdf.size / 1024).toFixed(0)} KB
                          </Badge>
                        </Flex>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => setUploadedPdf(null)}
                        >
                          ✕
                        </Button>
                      </Flex>

                      <Button
                        mt={4}
                        colorScheme="brand"
                        isLoading={isProcessing}
                        onClick={handleProcessPdf}
                        width="full"
                      >
                        Process Document
                      </Button>
                    </Box>
                  )}
                </Box>

                <ZakatCalculator 
                  onZakatCalculated={handleZakatCalculated}
                  initialValues={extractedMetrics}
                />
                
                {showDonationAmount ? (
                  <Box>
                    <Heading size="md" color="white" mb={4}>Make Your Zakat Payment</Heading>
                    <DonationAmountSection 
                      donationMode="money"
                      setDonationMode={setDonationMode}
                      donationAmount={donationAmount}
                      setDonationAmount={setDonationAmount}
                      paymentMethod={paymentMethod}
                      handlePaymentMethodSelect={handlePaymentMethodSelect}
                      onOpen={onOpen}
                      donationType={donationType}
                    />
                  </Box>
                ) : (
                  <Button
                    onClick={() => {
                      setShowDonationAmount(true);
                      const usdtAmount = calculatedZakat / usdtToMyrRate;
                      setDonationAmount(usdtAmount);
                    }}
                    colorScheme="accent"
                    size="lg"
                    leftIcon={<FaCoins />}
                    mt={4}
                    isDisabled={calculatedZakat <= 0}
                  >
                    Pay Zakat Now (RM {calculatedZakat.toFixed(2)} ≈ ${(calculatedZakat / usdtToMyrRate).toFixed(2)} USDT)
                  </Button>
                )}
              </VStack>
            </TabPanel>
            
            {/* Waqf Panel */}
            <TabPanel px={0}>
              <Text color="gray.300" mb={4}>
                Waqf is an endowment made by a Muslim to a religious, educational, or charitable cause. The donated assets are held and preserved for specific purposes indefinitely.
              </Text>
              
              <WaqfDonationForm 
                waqfForm={waqfForm}
                handleWaqfFormChange={handleWaqfFormChange}
                handleWaqfSubmit={handleWaqfSubmit}
                uploadedFiles={uploadedFiles}
                handleFileUpload={handleFileUpload}
                handleRemoveFile={handleRemoveFile}
                waqfRequests={waqfRequests}
              />
              
              {showDonationAmount ? (
                <DonationAmountSection 
                  donationMode="money"
                  setDonationMode={() => {}}
                  donationAmount={waqfDonationAmount}
                  setDonationAmount={setWaqfDonationAmount}
                  paymentMethod={waqfPaymentMethod}
                  handlePaymentMethodSelect={handleWaqfPaymentMethodSelect}
                  onOpen={onOpen}
                  donationType="waqf"
                />
              ) : (
                <Button
                  onClick={() => setShowDonationAmount(true)}
                  colorScheme="green"
                  size="lg"
                  leftIcon={<FaCoins />}
                  mt={4}
                >
                  Make Waqf Payment
                </Button>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* Donation Modals */}
        <DonationModals 
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isQRCodeOpen={isQRCodeOpen}
          onQRCodeClose={onQRCodeClose}
          donationType={donationType}
          donationAmount={donationType === 'waqf' ? waqfDonationAmount : donationAmount}
          currency={currency}
          selectedPool={selectedPool}
          poolStats={poolStats}
          handleDonate={handleDonate}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default DonationPage;
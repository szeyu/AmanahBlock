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
} from '@chakra-ui/react';
import { 
  FaSchool, 
  FaHandHoldingWater, 
  FaUtensils, 
  FaHandHoldingUsd, 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';
import AIDonationAdvisor from '../components/AIDonationAdvisor';

// Import extracted components
import DonationTypeSelector from '../components/donation/DonationTypeSelector';
import DonationPoolSelector from '../components/donation/DonationPoolSelector';
import DonationAmountSection from '../components/donation/DonationAmountSection';
import WaqfDonationForm from '../components/donation/WaqfDonationForm';
import FoodDonationSection from '../components/donation/FoodDonationSection';
import DonationModals from '../components/donation/DonationModals';

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
      
      {/* Donation Type Selection */}
      <Tabs variant="soft-rounded" colorScheme="brand" mb={8} onChange={handleDonationTypeChange}>
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
            
            {/* Sadaqah Donation Flow */}
            <Box>
              {/* Pool Selection - Moved before Donation Amount */}
              <DonationPoolSelector 
                poolStats={poolStats} 
                selectedPool={selectedPool} 
                setSelectedPool={setSelectedPool} 
                showAllocation={showAllocation} 
              />

              {/* AI Donation Advisor */}
              <AIDonationAdvisor />
              
              {/* Donation Amount Section */}
              <DonationAmountSection 
                donationMode={donationMode}
                setDonationMode={setDonationMode}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                paymentMethod={paymentMethod}
                handlePaymentMethodSelect={handlePaymentMethodSelect}
                onOpen={onOpen}
              />
              
              {/* Food Donation Section */}
              {donationMode === 'food' && (
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
            <Text color="gray.300" mb={4}>
              Zakat is an obligatory form of charity in Islam, typically 2.5% of one's wealth above a minimum threshold (nisab), given annually.
            </Text>
            
            {/* Add Zakat Calculator Button */}
            <Button 
              as={Link} 
              to="/zakat-calculator" 
              variant="outline" 
              colorScheme="brand" 
              mb={6}
            >
              Calculate Your Zakat
            </Button>
            
            {/* Zakat Donation Flow */}
            <Box>
              {/* Pool Selection */}
              <DonationPoolSelector 
                poolStats={poolStats} 
                selectedPool={selectedPool} 
                setSelectedPool={setSelectedPool} 
                showAllocation={showAllocation} 
              />
              
              {/* AI Donation Advisor */}
              <AIDonationAdvisor />
              
              {/* Donation Amount Section */}
              <DonationAmountSection 
                donationMode={donationMode}
                setDonationMode={setDonationMode}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                paymentMethod={paymentMethod}
                handlePaymentMethodSelect={handlePaymentMethodSelect}
                onOpen={onOpen}
              />
            </Box>
          </TabPanel>
          
          <TabPanel px={0}>
            <Text color="gray.300" mb={4}>
              Waqf is an endowment made by a Muslim to a religious, educational, or charitable cause. The donated assets are held and preserved for specific purposes indefinitely.
            </Text>
            
            {/* Waqf Donation Form */}
            <WaqfDonationForm 
              waqfForm={waqfForm}
              handleWaqfFormChange={handleWaqfFormChange}
              handleWaqfSubmit={handleWaqfSubmit}
              uploadedFiles={uploadedFiles}
              handleFileUpload={handleFileUpload}
              handleRemoveFile={handleRemoveFile}
              waqfRequests={waqfRequests}
            />
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
        donationAmount={donationAmount}
        currency={currency}
        selectedPool={selectedPool}
        poolStats={poolStats}
        handleDonate={handleDonate}
      />
    </Box>
  );
};

export default DonationPage;
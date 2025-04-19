import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  Flex,
  Icon,
  Tooltip,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FaCalculator, FaInfoCircle, FaCoins, FaDollarSign, FaQuestionCircle } from 'react-icons/fa';

const ZakatCalculator = ({ onZakatCalculated, initialValues = null }) => {
  // Current market prices
  const [goldPrice, setGoldPrice] = useState(485.03); // Example from Selangor 2025
  const [silverPrice, setSilverPrice] = useState(20.50); // Example price
  
  // Assets state
  const [assets, setAssets] = useState({
    // Cash and Bank Balances
    cash: 0,
    
    // Gold and Silver
    goldWeight: 0,
    goldValue: 0,
    silverWeight: 0,
    silverValue: 0,
    isGoldForInvestment: false,
    
    // Business Assets
    businessInventory: 0,
    businessCash: 0,
    businessReceivables: 0,
    
    // Stocks and Shares
    stocksValue: 0,
    stocksLiquidRatio: 0.8, // Default ratio - can be adjusted
    
    // Agricultural Assets
    agriculturalProduce: 0,
    
    // Asset Conditions
    hawlCompleted: false
  });
  
  // Liabilities state
  const [liabilities, setLiabilities] = useState({
    shortTermLiabilities: 0,
    businessLiabilities: 0,
    personalLiabilities: 0
  });
  
  // Results state
  const [zakatResults, setZakatResults] = useState({
    totalZakatableWealth: 0,
    totalZakat: 0,
    isEligible: false
  });
  
  const [nisabThreshold, setNisabThreshold] = useState(0);
  
  // Calculate Nisab based on gold and silver prices
  useEffect(() => {
    const goldNisab = 85 * goldPrice;
    const silverNisab = 595 * silverPrice;
    // Use the lower of the two values as the Nisab threshold
    setNisabThreshold(Math.min(goldNisab, silverNisab));
  }, [goldPrice, silverPrice]);
  
  // Effect to handle initialValues
  useEffect(() => {
    if (initialValues) {
      console.log('Received initialValues:', initialValues); // Debug log
      
      const parseValue = (value) => {
        if (value === "NaN" || value === undefined || value === null) return 0;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
      };

      const newAssets = {
        cash: parseValue(initialValues.cash),
        goldWeight: parseValue(initialValues.gold_weight),
        goldValue: parseValue(initialValues.gold_value),
        stocksValue: parseValue(initialValues.stocks_value),
        businessInventory: parseValue(initialValues.business_inventory),
        businessCash: parseValue(initialValues.business_cash),
        businessReceivables: parseValue(initialValues.business_receivables),
        stocksLiquidRatio: 0.8,
        isGoldForInvestment: initialValues.gold_for_investment || false,
        hawlCompleted: initialValues.hawl_completed || false
      };
      
      const newLiabilities = {
        businessLiabilities: parseValue(initialValues.business_liabilities),
        shortTermLiabilities: 0,
        personalLiabilities: 0
      };

      // If income is provided, add it to cash
      if (initialValues.income && initialValues.income !== "NaN") {
        newAssets.cash += parseValue(initialValues.income);
      }
      
      console.log('Parsed assets:', newAssets); // Debug log
      console.log('Parsed liabilities:', newLiabilities); // Debug log
      
      setAssets(newAssets);
      setLiabilities(newLiabilities);
      
      // Calculate total Zakat with the new values
      calculateZakat(newAssets, newLiabilities);
    }
  }, [initialValues, nisabThreshold]);
  
  // Helper function to calculate total Zakatable wealth
  const calculateTotalZakatableWealth = (currentAssets, currentLiabilities) => {
    try {
      // Convert values to numbers and handle large numbers with scientific notation
      const cashValue = Number(currentAssets.cash) || 0;
      const goldValue = Number(currentAssets.goldValue) || 0;
      const silverValue = Number(currentAssets.silverValue) || 0;
      const businessInventoryValue = Number(currentAssets.businessInventory) || 0;
      const businessCashValue = Number(currentAssets.businessCash) || 0;
      const businessReceivablesValue = Number(currentAssets.businessReceivables) || 0;
      const stocksValue = Number(currentAssets.stocksValue * currentAssets.stocksLiquidRatio) || 0;
      const agriculturalValue = Number(currentAssets.agriculturalProduce) || 0;
      
      // Calculate total assets using scientific notation for large numbers
      const totalAssets = [
        cashValue,
        goldValue,
        silverValue,
        businessInventoryValue,
        businessCashValue,
        businessReceivablesValue,
        stocksValue,
        agriculturalValue
      ].reduce((sum, value) => sum + value, 0);
      
      // Calculate total liabilities
      const totalLiabilities = [
        Number(currentLiabilities.shortTermLiabilities) || 0,
        Number(currentLiabilities.businessLiabilities) || 0,
        Number(currentLiabilities.personalLiabilities) || 0
      ].reduce((sum, value) => sum + value, 0);
      
      // Calculate net wealth
      const netWealth = Math.max(0, totalAssets - totalLiabilities);
      
      return netWealth;
    } catch (error) {
      console.error('Error in calculation:', error);
      return 0;
    }
  };
  
  // Helper function to calculate Zakat
  const calculateZakat = (currentAssets, currentLiabilities) => {
    try {
      const totalZakatableWealth = calculateTotalZakatableWealth(currentAssets, currentLiabilities);
      const isEligible = totalZakatableWealth >= nisabThreshold;
      const totalZakat = isEligible ? totalZakatableWealth * 0.025 : 0;
      
      setZakatResults({
        totalZakatableWealth,
        totalZakat,
        isEligible
      });
      
      // Notify parent component
      if (onZakatCalculated) {
        onZakatCalculated(totalZakat);
      }
    } catch (error) {
      console.error('Error calculating Zakat:', error);
      setZakatResults({
        totalZakatableWealth: 0,
        totalZakat: 0,
        isEligible: false
      });
    }
  };
  
  const handleAssetChange = (asset, value) => {
    try {
      // Remove any commas and spaces
      const cleanValue = value.toString().replace(/[,\s]/g, '');
      
      // Convert to number, handling empty string and scientific notation
      const numericValue = cleanValue === '' ? 0 : Number(cleanValue);
      
      if (isNaN(numericValue)) {
        console.warn('Invalid numeric input:', value);
        return;
      }
      
      // Create new assets object
      const newAssets = {
        ...assets,
        [asset]: numericValue
      };

      // Update gold/silver values when weight changes
      if (asset === 'goldWeight') {
        newAssets.goldValue = numericValue * goldPrice;
      } else if (asset === 'silverWeight') {
        newAssets.silverValue = numericValue * silverPrice;
      }

      // Update assets state
      setAssets(newAssets);
      
      // Recalculate Zakat
      calculateZakat(newAssets, liabilities);
    } catch (error) {
      console.error('Error in handleAssetChange:', error);
    }
  };
  
  const handleLiabilityChange = (liability, value) => {
    try {
      // Remove any commas and spaces
      const cleanValue = value.toString().replace(/[,\s]/g, '');
      
      // Convert to number, handling empty string
      const numericValue = cleanValue === '' ? 0 : Number(cleanValue);
      
      // Create new liabilities object
      const newLiabilities = {
        ...liabilities,
        [liability]: numericValue
      };

      // Update liabilities state
      setLiabilities(newLiabilities);
      
      // Recalculate Zakat
      calculateZakat(assets, newLiabilities);
    } catch (error) {
      console.error('Error in handleLiabilityChange:', error);
    }
  };
  
  const handleConditionChange = (condition, value) => {
    const newAssets = {
      ...assets,
      [condition]: value
    };
    
    setAssets(newAssets);
    calculateZakat(newAssets, liabilities);
  };
  
  const resetCalculator = () => {
    setAssets({
      cash: 0,
      goldWeight: 0,
      goldValue: 0,
      silverWeight: 0,
      silverValue: 0,
      businessInventory: 0,
      businessCash: 0,
      businessReceivables: 0,
      stocksValue: 0,
      stocksLiquidRatio: 0.8,
      agriculturalProduce: 0,
      isGoldForInvestment: false,
      hawlCompleted: false
    });
    
    setLiabilities({
      shortTermLiabilities: 0,
      businessLiabilities: 0,
      personalLiabilities: 0
    });
  };
  
  const formatCurrency = (value) => {
    try {
      return Number(value).toLocaleString('en-MY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '0.00';
    }
  };
  
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.700"
      p={6}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="white" mb={1}>Zakat Calculator</Heading>
            <Text color="gray.400">Calculate your obligatory charity amount in MYR (will be converted to USDT for payment)</Text>
          </Box>
          <Icon as={FaCalculator} boxSize={10} color="brand.500" />
        </Flex>
        
        <Divider borderColor="gray.700" />
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          {/* Left Column - Cash, Gold, and Stocks */}
          <Box>
            <Heading size="md" color="white" mb={4}>Assets - Part 1</Heading>
            
            <VStack spacing={4} align="stretch">
              {/* Cash Section */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Cash & Bank Balances</Text>
                    <Tooltip label="Include all cash in hand and bank accounts">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    value={assets.cash === 0 ? '' : assets.cash.toString()} 
                    onChange={(e) => handleAssetChange('cash', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              {/* Gold Section */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Gold Weight (grams)</Text>
                    <Tooltip label="Enter the weight of gold in grams">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <Input 
                  type="text"
                  value={assets.goldWeight === 0 ? '' : assets.goldWeight.toString()}
                  onChange={(e) => handleAssetChange('goldWeight', e.target.value)}
                  placeholder="0.00"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Gold Value (Calculated)</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text"
                    value={formatCurrency(assets.goldValue)}
                    isReadOnly
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              {/* Stocks Section */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Stocks Market Value</Text>
                    <Tooltip label="Current market value of your stocks">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    value={assets.stocksValue === 0 ? '' : assets.stocksValue.toString()} 
                    onChange={(e) => handleAssetChange('stocksValue', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </Box>
          
          {/* Right Column - Business and Income */}
          <Box>
            <Heading size="md" color="white" mb={4}>Assets - Part 2</Heading>
            
            <VStack spacing={4} align="stretch">
              {/* Business Section */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Business Cash</Text>
                    <Tooltip label="Cash held by your business">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    value={assets.businessCash === 0 ? '' : assets.businessCash.toString()} 
                    onChange={(e) => handleAssetChange('businessCash', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Business Receivables</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    value={assets.businessReceivables === 0 ? '' : assets.businessReceivables.toString()} 
                    onChange={(e) => handleAssetChange('businessReceivables', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Business Inventory</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    value={assets.businessInventory === 0 ? '' : assets.businessInventory.toString()} 
                    onChange={(e) => handleAssetChange('businessInventory', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </Box>
        </Grid>
        
        <Divider borderColor="gray.700" />
        
        {/* Results Section */}
        <Box 
          bg="gray.800" 
          p={6} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor="brand.500"
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
            <Stat>
              <StatLabel color="gray.400">Nisab Threshold</StatLabel>
              <StatNumber color="white">RM {formatCurrency(nisabThreshold)}</StatNumber>
              <StatHelpText color="gray.400">Based on gold or silver price (whichever is lower)</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Total Zakat Due</StatLabel>
              <StatNumber color="brand.500">RM {formatCurrency(zakatResults.totalZakat)}</StatNumber>
              <StatHelpText color="gray.400">
                {zakatResults.isEligible 
                  ? "Will be converted to USDT for payment" 
                  : "Below Nisab threshold - no Zakat due"}
              </StatHelpText>
            </Stat>
          </Grid>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <Stat>
              <StatLabel color="gray.400">Total Zakatable Wealth</StatLabel>
              <StatNumber color="white">RM {formatCurrency(zakatResults.totalZakatableWealth)}</StatNumber>
              <StatHelpText color="gray.400">After deducting liabilities</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Eligibility Status</StatLabel>
              <StatNumber color={zakatResults.isEligible ? "green.400" : "red.400"}>
                {zakatResults.isEligible ? "Eligible" : "Not Eligible"}
              </StatNumber>
              <StatHelpText color="gray.400">Based on Nisab threshold</StatHelpText>
            </Stat>
          </Grid>
        </Box>
        
        <Accordion allowToggle>
          <AccordionItem borderColor="gray.700">
            <h2>
              <AccordionButton py={3}>
                <Box flex="1" textAlign="left" fontWeight="medium" color="white">
                  <HStack>
                    <Icon as={FaQuestionCircle} />
                    <Text>About Zakat Calculation</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color="gray.300">
              <Text mb={2}>
                Zakat is calculated as 2.5% of your eligible assets if they exceed the nisab threshold. The nisab is calculated based on the current gold price (85 grams of gold).
              </Text>
              <Text mb={2}>
                Each category (Cash, Gold, Stocks, Business, and Income) is calculated separately against the nisab threshold. The total Zakat due is the sum of all categories that exceed the threshold.
              </Text>
              <Text>
                This calculator provides an estimate. For specific situations, please consult with a qualified Islamic scholar.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        
        <Flex justify="flex-end">
          <Button variant="outline" onClick={resetCalculator}>
            Reset Calculator
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ZakatCalculator; 
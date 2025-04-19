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
  // Gold price state (in RM per gram)
  const [goldPrice, setGoldPrice] = useState(485.03); // Example from Selangor 2025
  
  // Assets state
  const [assets, setAssets] = useState({
    cash: 0,
    goldWeight: 0, // in grams
    goldValue: 0,
    stocksValue: 0,
    stocksDividends: 0,
    stocksFinancing: 0,
    stocksCosts: 0,
    businessCash: 0,
    businessReceivables: 0,
    businessInventory: 0,
    income: 0,
    incomeDeductions: 0
  });
  
  // Liabilities state
  const [liabilities, setLiabilities] = useState({
    businessLiabilities: 0
  });
  
  // Results state
  const [zakatResults, setZakatResults] = useState({
    cashZakat: 0,
    goldZakat: 0,
    stocksZakat: 0,
    businessZakat: 0,
    incomeZakat: 0,
    totalZakat: 0
  });
  
  const [nisabThreshold, setNisabThreshold] = useState(0);
  
  // Calculate Nisab based on gold price
  useEffect(() => {
    const calculatedNisab = 85 * goldPrice; // 85 grams of gold
    setNisabThreshold(calculatedNisab);
  }, [goldPrice]);
  
  // Effect to handle initialValues
  useEffect(() => {
    if (initialValues) {
      const newAssets = {
        ...assets,  // Keep existing values
        cash: parseFloat(initialValues.cash) || 0,
        goldWeight: parseFloat(initialValues.gold_weight) || 0,
        goldValue: parseFloat(initialValues.gold_value) || 0,
        stocksValue: parseFloat(initialValues.stocks_value) || 0,
        stocksDividends: parseFloat(initialValues.stocks_dividends) || 0,
        businessCash: parseFloat(initialValues.business_cash) || 0,
        businessReceivables: parseFloat(initialValues.business_receivables) || 0,
        businessInventory: parseFloat(initialValues.business_inventory) || 0,
        income: parseFloat(initialValues.income) || 0,
        incomeDeductions: parseFloat(initialValues.income_deductions) || 0
      };
      
      setAssets(newAssets);
      
      // Calculate total Zakat with the new values
      const totalZakat = calculateTotalZakat(newAssets);
      
      // Update Zakat results
      setZakatResults({
        cashZakat: parseFloat(newAssets.cash) >= nisabThreshold ? parseFloat(newAssets.cash) * 0.025 : 0,
        goldZakat: (parseFloat(newAssets.goldWeight) >= 85 && parseFloat(newAssets.goldValue) >= nisabThreshold) 
          ? parseFloat(newAssets.goldValue) * 0.025 
          : 0,
        stocksZakat: (parseFloat(newAssets.stocksValue) + parseFloat(newAssets.stocksDividends)) >= nisabThreshold 
          ? (parseFloat(newAssets.stocksValue) + parseFloat(newAssets.stocksDividends)) * 0.025 
          : 0,
        businessZakat: (parseFloat(newAssets.businessCash) + parseFloat(newAssets.businessReceivables) + parseFloat(newAssets.businessInventory)) >= nisabThreshold 
          ? (parseFloat(newAssets.businessCash) + parseFloat(newAssets.businessReceivables) + parseFloat(newAssets.businessInventory)) * 0.025 
          : 0,
        incomeZakat: parseFloat(newAssets.income) >= nisabThreshold ? parseFloat(newAssets.income) * 0.025 : 0,
        totalZakat: totalZakat
      });
      
      // Notify parent component
      if (onZakatCalculated) {
        onZakatCalculated(totalZakat);
      }
    }
  }, [initialValues, nisabThreshold, onZakatCalculated]);
  
  // Helper function to calculate total Zakat
  const calculateTotalZakat = (currentAssets) => {
    const cashZakat = parseFloat(currentAssets.cash) >= nisabThreshold ? parseFloat(currentAssets.cash) * 0.025 : 0;
    const goldZakat = (parseFloat(currentAssets.goldWeight) >= 85 && parseFloat(currentAssets.goldValue) >= nisabThreshold) 
      ? parseFloat(currentAssets.goldValue) * 0.025 
      : 0;
    const stocksZakatableAmount = parseFloat(currentAssets.stocksValue) + 
      parseFloat(currentAssets.stocksDividends) - 
      parseFloat(currentAssets.stocksFinancing) - 
      parseFloat(currentAssets.stocksCosts);
    const stocksZakat = stocksZakatableAmount >= nisabThreshold ? stocksZakatableAmount * 0.025 : 0;
    const businessZakatableAmount = parseFloat(currentAssets.businessCash) + 
      parseFloat(currentAssets.businessReceivables) + 
      parseFloat(currentAssets.businessInventory) - 
      parseFloat(liabilities.businessLiabilities);
    const businessZakat = businessZakatableAmount >= nisabThreshold ? businessZakatableAmount * 0.025 : 0;
    const incomeZakatableAmount = parseFloat(currentAssets.income) - parseFloat(currentAssets.incomeDeductions);
    const incomeZakat = incomeZakatableAmount >= nisabThreshold ? incomeZakatableAmount * 0.025 : 0;
    
    return cashZakat + goldZakat + stocksZakat + businessZakat + incomeZakat;
  };
  
  const handleAssetChange = (asset, value) => {
    const numericValue = parseFloat(value) || 0;
    
    // Create new assets object with updated value
    const newAssets = {
      ...assets,
      [asset]: numericValue
    };

    // Update gold value when weight changes
    if (asset === 'goldWeight') {
      newAssets.goldValue = numericValue * goldPrice;
    }

    // Update assets state
    setAssets(newAssets);

    // Calculate new total Zakat
    const totalZakat = calculateTotalZakat(newAssets);

    // Update Zakat results
    setZakatResults({
      cashZakat: parseFloat(newAssets.cash) >= nisabThreshold ? parseFloat(newAssets.cash) * 0.025 : 0,
      goldZakat: (parseFloat(newAssets.goldWeight) >= 85 && parseFloat(newAssets.goldValue) >= nisabThreshold) 
        ? parseFloat(newAssets.goldValue) * 0.025 
        : 0,
      stocksZakat: (parseFloat(newAssets.stocksValue) + parseFloat(newAssets.stocksDividends)) >= nisabThreshold 
        ? (parseFloat(newAssets.stocksValue) + parseFloat(newAssets.stocksDividends)) * 0.025 
        : 0,
      businessZakat: (parseFloat(newAssets.businessCash) + parseFloat(newAssets.businessReceivables) + parseFloat(newAssets.businessInventory)) >= nisabThreshold 
        ? (parseFloat(newAssets.businessCash) + parseFloat(newAssets.businessReceivables) + parseFloat(newAssets.businessInventory)) * 0.025 
        : 0,
      incomeZakat: parseFloat(newAssets.income) >= nisabThreshold ? parseFloat(newAssets.income) * 0.025 : 0,
      totalZakat: totalZakat
    });

    // Notify parent component
    if (onZakatCalculated) {
      onZakatCalculated(totalZakat);
    }
  };
  
  const handleLiabilityChange = (liability, value) => {
    const numericValue = parseFloat(value) || 0;
    
    // Create new liabilities object
    const newLiabilities = {
      ...liabilities,
      [liability]: numericValue
    };

    // Update liabilities state
    setLiabilities(newLiabilities);

    // Calculate new total Zakat with current assets
    const totalZakat = calculateTotalZakat(assets);

    // Update Zakat results
    setZakatResults(prev => ({
      ...prev,
      businessZakat: (parseFloat(assets.businessCash) + parseFloat(assets.businessReceivables) + parseFloat(assets.businessInventory) - numericValue) >= nisabThreshold 
        ? (parseFloat(assets.businessCash) + parseFloat(assets.businessReceivables) + parseFloat(assets.businessInventory) - numericValue) * 0.025 
        : 0,
      totalZakat: totalZakat
    }));

    // Notify parent component
    if (onZakatCalculated) {
      onZakatCalculated(totalZakat);
    }
  };
  
  const resetCalculator = () => {
    setAssets({
      cash: 0,
      goldWeight: 0,
      goldValue: 0,
      stocksValue: 0,
      stocksDividends: 0,
      stocksFinancing: 0,
      stocksCosts: 0,
      businessCash: 0,
      businessReceivables: 0,
      businessInventory: 0,
      income: 0,
      incomeDeductions: 0
    });
    
    setLiabilities({
      businessLiabilities: 0
    });
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
                    type="number" 
                    value={assets.cash || ''} 
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
                  type="number" 
                  value={assets.goldWeight || ''} 
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
                    type="number" 
                    value={assets.goldValue || ''} 
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
                    type="number" 
                    value={assets.stocksValue || ''} 
                    onChange={(e) => handleAssetChange('stocksValue', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Stock Dividends</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.stocksDividends || ''} 
                    onChange={(e) => handleAssetChange('stocksDividends', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Stock Financing</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.stocksFinancing || ''} 
                    onChange={(e) => handleAssetChange('stocksFinancing', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Stock Costs</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.stocksCosts || ''} 
                    onChange={(e) => handleAssetChange('stocksCosts', e.target.value)}
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
                    type="number" 
                    value={assets.businessCash || ''} 
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
                    type="number" 
                    value={assets.businessReceivables || ''} 
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
                    type="number" 
                    value={assets.businessInventory || ''} 
                    onChange={(e) => handleAssetChange('businessInventory', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Business Liabilities</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={liabilities.businessLiabilities || ''} 
                    onChange={(e) => handleLiabilityChange('businessLiabilities', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              {/* Income Section */}
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Gross Income</Text>
                    <Tooltip label="Total income before deductions">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.income || ''} 
                    onChange={(e) => handleAssetChange('income', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Income Deductions</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    RM
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.incomeDeductions || ''} 
                    onChange={(e) => handleAssetChange('incomeDeductions', e.target.value)}
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
              <StatNumber color="white">RM {nisabThreshold.toFixed(2)}</StatNumber>
              <StatHelpText color="gray.400">Based on 85g gold price</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Total Zakat Due</StatLabel>
              <StatNumber color="brand.500">RM {zakatResults.totalZakat.toFixed(2)}</StatNumber>
              <StatHelpText color="gray.400">Will be converted to USDT for payment</StatHelpText>
            </Stat>
          </Grid>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <Stat>
              <StatLabel color="gray.400">Cash Zakat</StatLabel>
              <StatNumber color="white">RM {zakatResults.cashZakat.toFixed(2)}</StatNumber>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Gold Zakat</StatLabel>
              <StatNumber color="white">RM {zakatResults.goldZakat.toFixed(2)}</StatNumber>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Stocks Zakat</StatLabel>
              <StatNumber color="white">RM {zakatResults.stocksZakat.toFixed(2)}</StatNumber>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Business Zakat</StatLabel>
              <StatNumber color="white">RM {zakatResults.businessZakat.toFixed(2)}</StatNumber>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Income Zakat</StatLabel>
              <StatNumber color="white">RM {zakatResults.incomeZakat.toFixed(2)}</StatNumber>
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
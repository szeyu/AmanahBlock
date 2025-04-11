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
  Switch,
  Select
} from '@chakra-ui/react';
import { FaCalculator, FaInfoCircle, FaCoins, FaEthereum, FaBitcoin, FaDollarSign, FaQuestionCircle } from 'react-icons/fa';

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    crypto: 0,
    businessAssets: 0,
    otherAssets: 0
  });
  
  const [liabilities, setLiabilities] = useState({
    debts: 0,
    expenses: 0,
    otherLiabilities: 0
  });
  
  const [nisabThreshold, setNisabThreshold] = useState(5000); // Example value in USD
  const [zakatAmount, setZakatAmount] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [isZakatDue, setIsZakatDue] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [includeRetirement, setIncludeRetirement] = useState(false);
  
  // Calculate Zakat whenever assets or liabilities change
  useEffect(() => {
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    const calculatedNetWorth = totalAssets - totalLiabilities;
    
    setNetWorth(calculatedNetWorth);
    setIsZakatDue(calculatedNetWorth >= nisabThreshold);
    setZakatAmount(calculatedNetWorth * 0.025); // 2.5% of net worth
  }, [assets, liabilities, nisabThreshold]);
  
  const handleAssetChange = (asset, value) => {
    setAssets({
      ...assets,
      [asset]: value
    });
  };
  
  const handleLiabilityChange = (liability, value) => {
    setLiabilities({
      ...liabilities,
      [liability]: value
    });
  };
  
  const resetCalculator = () => {
    setAssets({
      cash: 0,
      gold: 0,
      silver: 0,
      stocks: 0,
      crypto: 0,
      businessAssets: 0,
      otherAssets: 0
    });
    
    setLiabilities({
      debts: 0,
      expenses: 0,
      otherLiabilities: 0
    });
  };
  
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  
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
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        bg: 'radial-gradient(circle at center, rgba(11, 197, 234, 0.1) 0%, transparent 70%)',
        zIndex: 0,
        borderRadius: 'full',
      }}
    >
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="white" mb={1}>Zakat Calculator</Heading>
            <Text color="gray.400">Calculate your obligatory charity amount</Text>
          </Box>
          <Icon as={FaCalculator} boxSize={10} color="brand.500" />
        </Flex>
        
        <Divider borderColor="gray.700" />
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          {/* Assets Section */}
          <Box>
            <Heading size="md" color="white" mb={4}>Assets</Heading>
            
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Cash & Bank Balances</Text>
                    <Tooltip label="Include all cash in hand, bank accounts, and savings">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.cash || ''} 
                    onChange={(e) => handleAssetChange('cash', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Gold</Text>
                    <Tooltip label="Value of gold you've owned for one lunar year">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.gold || ''} 
                    onChange={(e) => handleAssetChange('gold', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Silver</Text>
                    <Tooltip label="Value of silver you've owned for one lunar year">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.silver || ''} 
                    onChange={(e) => handleAssetChange('silver', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Stocks & Investments</Text>
                    <Tooltip label="Current market value of stocks and investments">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.stocks || ''} 
                    onChange={(e) => handleAssetChange('stocks', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Cryptocurrency</Text>
                    <Tooltip label="Current value of cryptocurrency holdings">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={assets.crypto || ''} 
                    onChange={(e) => handleAssetChange('crypto', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </Box>
          
          {/* Liabilities Section */}
          <Box>
            <Heading size="md" color="white" mb={4}>Liabilities</Heading>
            
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Debts & Loans</Text>
                    <Tooltip label="Outstanding debts that you owe to others">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={liabilities.debts || ''} 
                    onChange={(e) => handleLiabilityChange('debts', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Due Expenses</Text>
                    <Tooltip label="Expenses that are due but not yet paid">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={liabilities.expenses || ''} 
                    onChange={(e) => handleLiabilityChange('expenses', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">
                  <HStack>
                    <Text>Other Liabilities</Text>
                    <Tooltip label="Any other financial obligations">
                      <Icon as={FaInfoCircle} color="gray.500" />
                    </Tooltip>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.500">
                    {currencySymbol}
                  </InputLeftElement>
                  <Input 
                    type="number" 
                    value={liabilities.otherLiabilities || ''} 
                    onChange={(e) => handleLiabilityChange('otherLiabilities', e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>
              </FormControl>
              
              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="include-retirement" mb="0" color="gray.300" fontSize="sm">
                  Include retirement accounts?
                </FormLabel>
                <Switch 
                  id="include-retirement" 
                  colorScheme="brand"
                  isChecked={includeRetirement}
                  onChange={(e) => setIncludeRetirement(e.target.checked)}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Currency</FormLabel>
                <Select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  bg="gray.800"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </Select>
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
          borderColor={isZakatDue ? "brand.500" : "gray.700"}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <Stat>
              <StatLabel color="gray.400">Net Worth</StatLabel>
              <StatNumber color="white">{currencySymbol}{netWorth.toFixed(2)}</StatNumber>
              <StatHelpText color="gray.400">Total Assets - Liabilities</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Nisab Threshold</StatLabel>
              <StatNumber color="white">{currencySymbol}{nisabThreshold.toFixed(2)}</StatNumber>
              <StatHelpText color="gray.400">Minimum for Zakat</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.400">Zakat Due</StatLabel>
              <StatNumber color={isZakatDue ? "brand.500" : "white"}>
                {isZakatDue ? `${currencySymbol}${zakatAmount.toFixed(2)}` : "Not Due"}
              </StatNumber>
              <StatHelpText color="gray.400">2.5% of Net Worth</StatHelpText>
            </Stat>
          </Grid>
          
          {isZakatDue && (
            <Button 
              mt={6} 
              w="full" 
              variant="gradient"
              leftIcon={<FaCoins />}
            >
              Pay Zakat Now
            </Button>
          )}
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
                Zakat is calculated as 2.5% of your net worth (assets minus liabilities) if it exceeds the nisab threshold. The nisab is the minimum amount a Muslim must have before being obligated to pay Zakat.
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
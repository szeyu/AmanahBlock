import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Grid,
  HStack,
  VStack,
  Icon,
  Button,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Image,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  FaWallet, 
  FaCreditCard, 
  FaUniversity, 
  FaMobileAlt, 
  FaMoneyBillWave, 
  FaBitcoin, 
  FaClock,
  FaExternalLinkAlt 
} from 'react-icons/fa';

// Import crypto exchange logos
import lunoLogo from '../../assets/images/luno.png';
import sinergyLogo from '../../assets/images/sinergy.png';
import tokenizeLogo from '../../assets/images/tokenize.png';
import mxLogo from '../../assets/images/logo-MX-blue.png';
import torumLogo from '../../assets/images/torum.jpg';

const DonationAmountSection = ({ 
  donationMode, 
  setDonationMode, 
  donationAmount, 
  setDonationAmount, 
  paymentMethod, 
  handlePaymentMethodSelect, 
  onOpen,
  donationType
}) => {
  // Web3 style colors and effects
  const glassBackground = "rgba(13, 16, 25, 0.7)";
  const selectedGlow = "0 0 15px rgba(11, 197, 234, 0.4)";
  const hoverGlow = "0 4px 15px rgba(11, 197, 234, 0.3)";
  
  // Mock exchange rate (in practice, this would come from an API)
  const usdtToMyrRate = 4.72; // 1 USDT = 4.72 MYR
  
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
      <Heading size="md" color="white" mb={4} fontWeight="600">Donation Amount</Heading>
      
      {/* Donation Mode Selector - Hide food tab for zakat and waqf */}
      <Tabs 
        variant="soft-rounded" 
        colorScheme="brand" 
        mb={6} 
        onChange={(index) => setDonationMode(index === 0 ? 'money' : 'food')} 
        index={donationMode === 'money' ? 0 : 1}
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
            Donate Money
          </Tab>
          {donationType !== 'zakat' && donationType !== 'waqf' && (
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
              Donate Food
            </Tab>
          )}
        </TabList>
    
        <TabPanels>
          <TabPanel px={0}>
            {/* Money Donation UI */}
            <FormControl mb={6}>
              <FormLabel color="gray.300">Enter Amount (USDT)</FormLabel>
              <NumberInput 
                value={donationAmount} 
                onChange={(valueString) => setDonationAmount(parseFloat(valueString))}
                min={10}
                max={1000000}
              >
                <NumberInputField 
                  bg="rgba(26, 32, 44, 0.6)" 
                  borderColor="gray.600" 
                  _hover={{ borderColor: "brand.400" }}
                  _focus={{ 
                    borderColor: "brand.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  fontSize="lg"
                  height="50px"
                  pl="2.5rem"
                />
                <Box position="absolute" left="1rem" top="50%" transform="translateY(-50%)" color="gray.400" zIndex="1">
                  $
                </Box>
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                  <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                </NumberInputStepper>
              </NumberInput>
              <Text color="gray.400" mt={2} fontSize="sm">
                ≈ RM {(donationAmount * usdtToMyrRate).toFixed(2)} MYR
              </Text>
            </FormControl>

            {/* Payment Method Selection */}
            <Box mb={6}>
              <Text color="gray.300" mb={4}>Select payment method</Text>
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                {/* Card Payment */}
                <Box
                  p={4}
                  bg={paymentMethod === 'card' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'card' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('card')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'card' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'card' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaCreditCard} 
                      boxSize="24px" 
                      color={paymentMethod === 'card' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'card' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Card Payment</Text>
                  </HStack>
                </Box>

                {/* Online Banking */}
                <Box
                  p={4}
                  bg={paymentMethod === 'bank' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'bank' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('bank')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'bank' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'bank' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaUniversity} 
                      boxSize="24px" 
                      color={paymentMethod === 'bank' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'bank' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Online Banking</Text>
                  </HStack>
                </Box>

                {/* E-Wallet */}
                <Box
                  p={4}
                  bg={paymentMethod === 'ewallet' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'ewallet' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('ewallet')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'ewallet' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'ewallet' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaMobileAlt} 
                      boxSize="24px" 
                      color={paymentMethod === 'ewallet' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'ewallet' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">e-Wallet</Text>
                  </HStack>
                </Box>

                {/* Cash */}
                <Box
                  p={4}
                  bg={paymentMethod === 'cash' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'cash' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('cash')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'cash' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'cash' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaMoneyBillWave} 
                      boxSize="24px" 
                      color={paymentMethod === 'cash' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'cash' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Cash</Text>
                  </HStack>
                </Box>

                {/* Crypto */}
                <Box
                  p={4}
                  bg={paymentMethod === 'crypto' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'crypto' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('crypto')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'crypto' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'crypto' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaBitcoin} 
                      boxSize="24px" 
                      color={paymentMethod === 'crypto' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'crypto' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Crypto</Text>
                  </HStack>
                </Box>
              </Grid>
            </Box>

            {/* Payment Method Details Sections */}
            {/* Card Payment Details */}
            {paymentMethod === 'card' && (
              <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
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
            {paymentMethod === 'bank' && (
              <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
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
                    defaultValue={`${donationType ? donationType.toUpperCase() : 'Donation'} Donation`}
                  />
                </FormControl>
                
                <Text color="gray.400" fontSize="xs" mt={2}>
                  You will be redirected to your bank's secure login page to complete the payment after clicking "Donate Now".
                </Text>
              </Box>
            )}

            {/* Crypto Payment Details */}
            {paymentMethod === 'crypto' && (
              <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                <Text color="white" fontWeight="medium" mb={3}>Select Crypto Exchange</Text>
                <Text color="gray.400" fontSize="sm" mb={4}>
                  Choose your preferred regulated crypto exchange platform to make the donation
                </Text>
                
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                  {/* Luno */}
                  <Box
                    p={4}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.700"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
                      borderColor: "brand.500"
                    }}
                    onClick={() => window.open('https://www.luno.com', '_blank')}
                  >
                    <VStack spacing={3}>
                      <Image
                        src={lunoLogo}
                        alt="Luno"
                        height="40px"
                        objectFit="contain"
                      />
                      <Text color="gray.300" fontSize="sm">Luno</Text>
                      <HStack>
                        <Icon as={FaExternalLinkAlt} color="brand.500" boxSize="12px" />
                        <Text color="brand.500" fontSize="xs">Open Platform</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Sinergy */}
                  <Box
                    p={4}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.700"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
                      borderColor: "brand.500"
                    }}
                    onClick={() => window.open('https://sinergy.exchange', '_blank')}
                  >
                    <VStack spacing={3}>
                      <Image
                        src={sinergyLogo}
                        alt="Sinergy"
                        height="40px"
                        objectFit="contain"
                      />
                      <Text color="gray.300" fontSize="sm">Sinergy</Text>
                      <HStack>
                        <Icon as={FaExternalLinkAlt} color="brand.500" boxSize="12px" />
                        <Text color="brand.500" fontSize="xs">Open Platform</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Tokenize */}
                  <Box
                    p={4}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.700"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
                      borderColor: "brand.500"
                    }}
                    onClick={() => window.open('https://tokenize.exchange', '_blank')}
                  >
                    <VStack spacing={3}>
                      <Image
                        src={tokenizeLogo}
                        alt="Tokenize"
                        height="40px"
                        objectFit="contain"
                      />
                      <Text color="gray.300" fontSize="sm">Tokenize</Text>
                      <HStack>
                        <Icon as={FaExternalLinkAlt} color="brand.500" boxSize="12px" />
                        <Text color="brand.500" fontSize="xs">Open Platform</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* MX Global */}
                  <Box
                    p={4}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.700"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
                      borderColor: "brand.500"
                    }}
                    onClick={() => window.open('https://www.mx.global', '_blank')}
                  >
                    <VStack spacing={3}>
                      <Image
                        src={mxLogo}
                        alt="MX Global"
                        height="40px"
                        objectFit="contain"
                      />
                      <Text color="gray.300" fontSize="sm">MX Global</Text>
                      <HStack>
                        <Icon as={FaExternalLinkAlt} color="brand.500" boxSize="12px" />
                        <Text color="brand.500" fontSize="xs">Open Platform</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Torum */}
                  <Box
                    p={4}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.700"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
                      borderColor: "brand.500"
                    }}
                    onClick={() => window.open('https://torum.com', '_blank')}
                  >
                    <VStack spacing={3}>
                      <Image
                        src={torumLogo}
                        alt="Torum"
                        height="40px"
                        objectFit="contain"
                      />
                      <Text color="gray.300" fontSize="sm">Torum</Text>
                      <HStack>
                        <Icon as={FaExternalLinkAlt} color="brand.500" boxSize="12px" />
                        <Text color="brand.500" fontSize="xs">Open Platform</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </SimpleGrid>

                <Box mt={6} p={4} bg="rgba(26, 32, 44, 0.4)" borderRadius="md">
                  <Text color="gray.300" fontSize="sm" mb={2}>Donation Wallet Address:</Text>
                  <Input
                    value="0x1234...5678" // Replace with your actual wallet address
                    isReadOnly
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    fontFamily="monospace"
                  />
                  <Text color="gray.400" fontSize="xs" mt={2}>
                    Send your USDT donation to this wallet address through your chosen exchange platform.
                    Make sure to use the USDT network that matches your exchange (e.g., TRC20, ERC20).
                  </Text>
                </Box>

                <Text color="gray.400" fontSize="xs" mt={4}>
                  All listed exchanges are regulated in Malaysia and comply with local cryptocurrency regulations.
                  Please ensure you follow the exchange's KYC and transaction procedures.
                </Text>
              </Box>
            )}

            <Button 
              variant="gradient" 
              size="lg" 
              w="full"
              leftIcon={<FaWallet />}
              onClick={onOpen}
              isDisabled={!paymentMethod}
              bgGradient="linear(to-r, brand.500, accent.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.600, accent.600)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px -10px rgba(11, 197, 234, 0.5)"
              }}
              _active={{
                bgGradient: "linear(to-r, brand.700, accent.700)",
                transform: "translateY(0)",
              }}
              transition="all 0.3s ease"
              height="56px"
              fontSize="md"
              fontWeight="600"
              borderRadius="xl"
              mt={4}
            >
              Donate Now
            </Button>
          </TabPanel>
          
          <TabPanel px={0}>
            {/* Food Donation UI will be in a separate component */}
            <Text color="gray.300" mb={4}>
              Select food items to donate. These will be purchased and distributed to those in need through our partner organizations.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DonationAmountSection;
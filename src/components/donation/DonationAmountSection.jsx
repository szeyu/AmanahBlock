import React from 'react';
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
  Icon,
  Button,
} from '@chakra-ui/react';
import { 
  FaWallet, 
  FaCreditCard, 
  FaUniversity, 
  FaMobileAlt, 
  FaMoneyBillWave, 
  FaBitcoin, 
  FaClock 
} from 'react-icons/fa';

const DonationAmountSection = ({ 
  donationMode, 
  setDonationMode, 
  donationAmount, 
  setDonationAmount, 
  paymentMethod, 
  handlePaymentMethodSelect, 
  onOpen 
}) => {
  return (
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
          <Tab _selected={{ color: 'white', bg: 'accent.500' }}>Donate Food</Tab>
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
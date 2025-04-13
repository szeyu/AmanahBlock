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
  // Web3 style colors and effects
  const glassBackground = "rgba(13, 16, 25, 0.7)";
  const selectedGlow = "0 0 15px rgba(11, 197, 234, 0.4)";
  const hoverGlow = "0 4px 15px rgba(11, 197, 234, 0.3)";
  
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
      
      {/* Donation Mode Selector */}
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
                />
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

                {/* Buy Now Pay Later */}
                <Box
                  p={4}
                  bg={paymentMethod === 'bnpl' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'bnpl' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('bnpl')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'bnpl' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'bnpl' ? {
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
                      as={FaClock} 
                      boxSize="24px" 
                      color={paymentMethod === 'bnpl' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'bnpl' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
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
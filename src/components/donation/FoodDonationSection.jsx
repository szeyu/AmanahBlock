import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  HStack,
  VStack,
  Badge,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
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

const FoodDonationSection = ({ 
  foodItems, 
  selectedFoodItems, 
  handleAddFoodItem, 
  handleUpdateFoodQuantity, 
  handleRemoveFoodItem, 
  calculateFoodTotal,
  paymentMethod,
  handlePaymentMethodSelect,
  setDonationAmount,
  onOpen
}) => {
  return (
    <>
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
    </>
  );
};

export default FoodDonationSection; 
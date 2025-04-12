import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Badge,
  Divider,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Grid
} from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const InvestmentModal = ({ isOpen, onClose, pool, investmentAmount, setInvestmentAmount }) => {
  if (!pool) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
          Invest in {pool.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text color="gray.400" mb={1}>Investment Pool</Text>
              <Heading size="md" color="white">{pool.name}</Heading>
              <HStack mt={2}>
                <ShariahComplianceBadge level={pool.shariahStatus} showDetails={false} />
                <Badge colorScheme="blue" borderRadius="full" px={2}>
                  {pool.riskLevel} Risk
                </Badge>
                <Badge colorScheme="green" borderRadius="full" px={2}>
                  {pool.expectedReturn}% Return
                </Badge>
              </HStack>
            </Box>
            
            <Divider borderColor="gray.700" />
            
            <FormControl>
              <FormLabel>Investment Amount (USDT)</FormLabel>
              <NumberInput 
                min={pool.minInvestment} 
                value={investmentAmount}
                onChange={(valueString) => setInvestmentAmount(parseFloat(valueString))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text fontSize="sm" color="gray.400" mt={1}>
                Minimum investment: {pool.minInvestment} USDT
              </Text>
            </FormControl>
            
            <FormControl>
              <FormLabel>Lock Period</FormLabel>
              <Select defaultValue="3">
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </Select>
            </FormControl>
            
            <Box bg="gray.700" p={4} borderRadius="md">
              <Heading size="sm" mb={3}>Investment Summary</Heading>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">Principal Amount</Text>
                  <Text color="white">{investmentAmount} USDT</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Expected Return</Text>
                  <Text color="green.400">{(investmentAmount * pool.expectedReturn / 100).toFixed(2)} USDT</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Lock Period</Text>
                  <Text color="white">3 months</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Unlock Date</Text>
                  <Text color="white">Aug 10, 2023</Text>
                </Box>
              </Grid>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="gray.700">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            leftIcon={<FaWallet />}
          >
            Confirm Investment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestmentModal; 
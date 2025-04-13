import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Divider,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FaWallet, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

const DonationModals = ({
  isOpen,
  onOpen,
  onClose,
  isQRCodeOpen,
  onQRCodeClose,
  donationType,
  donationAmount,
  currency,
  selectedPool,
  poolStats,
  handleDonate
}) => {
  return (
    <>
      {/* Donation Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">Confirm Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text color="gray.400">Donation Type</Text>
                <Text color="white" fontWeight="bold" fontSize="lg" textTransform="capitalize">{donationType}</Text>
              </Box>
              
              <Box>
                <Text color="gray.400">Amount</Text>
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {donationAmount} {currency}
                  {currency === 'MYR' && ` (≈ ${(donationAmount / 4.65).toFixed(2)} USDT)`}
                </Text>
              </Box>
              
              <Box>
                <Text color="gray.400">Destination Pool</Text>
                <Text color="white" fontWeight="bold" fontSize="lg">{poolStats[selectedPool].name}</Text>
              </Box>
              
              <Divider borderColor="gray.700" />
              
              <Box p={4} bg="gray.700" borderRadius="md">
                <Heading size="sm" mb={3}>Transaction Details</Heading>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.400">Network Fee:</Text>
                  <Text fontSize="sm" color="white">~$0.50</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.400">Estimated Confirmation:</Text>
                  <Text fontSize="sm" color="white">~30 seconds</Text>
                </HStack>
              </Box>
              
              <Text fontSize="sm" color="gray.400">
                By proceeding, you agree to our terms of service and privacy policy. Your donation will be processed via blockchain for maximum transparency.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaWallet />}
              onClick={handleDonate}
            >
              Confirm Donation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* E-Wallet QR Code Modal */}
      <Modal isOpen={isQRCodeOpen} onClose={onQRCodeClose} size="md">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
            <HStack spacing={3}>
              <Icon as={FaQrcode} color="brand.500" />
              <Text>Scan QR Code to Pay</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6}>
              <Box 
                p={4} 
                bg="white" 
                borderRadius="lg"
                boxShadow="0 0 20px rgba(11, 197, 234, 0.2)"
              >
                <QRCodeSVG 
                  value={`donation:${donationAmount}${currency}:${selectedPool}:${donationType}`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </Box>
              <VStack spacing={2}>
                <Text color="gray.300">Amount to Pay</Text>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  {donationAmount} {currency}
                </Text>
              </VStack>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Scan this QR code with your e-wallet app to complete the payment
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onQRCodeClose}>
              Close
            </Button>
            <Button 
              variant="gradient" 
              leftIcon={<FaWallet />}
              onClick={() => {
                onQRCodeClose();
                onOpen();
              }}
            >
              Proceed to Confirmation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DonationModals; 
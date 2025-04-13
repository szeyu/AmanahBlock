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
  Flex,
} from '@chakra-ui/react';
import { FaWallet, FaQrcode, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
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
        <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
        <ModalContent 
          bg="rgba(13, 16, 25, 0.9)"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="gray.700"
          borderRadius="xl"
          boxShadow="0 0 30px rgba(11, 197, 234, 0.2)"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: "-1px",
            left: "-1px",
            right: "-1px",
            bottom: "-1px",
            borderRadius: "xl",
            padding: "1px",
            background: "linear-gradient(135deg, rgba(11, 197, 234, 0.5), rgba(95, 21, 242, 0.5))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            zIndex: 0,
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background: "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <ModalHeader 
            borderBottomWidth="1px" 
            borderColor="gray.700" 
            color="white"
            position="relative"
            zIndex="1"
          >
            <Flex align="center">
              <Icon as={FaCheckCircle} color="brand.500" mr={2} />
              <Text>Confirm Donation</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6} position="relative" zIndex="1">
            <VStack spacing={4} align="stretch">
              <Box>
                <Text color="gray.400">Donation Type</Text>
                <Text 
                  color="white" 
                  fontWeight="bold" 
                  fontSize="lg" 
                  textTransform="capitalize"
                  bgGradient="linear(to-r, brand.400, accent.400)"
                  bgClip="text"
                >
                  {donationType}
                </Text>
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
              
              <Box 
                p={4} 
                bg="rgba(26, 32, 44, 0.6)" 
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
              >
                <Heading size="sm" mb={3} color="white">Transaction Details</Heading>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.400">Network Fee:</Text>
                  <Text fontSize="sm" color="white">~$0.50</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.400">Estimated Confirmation:</Text>
                  <Text fontSize="sm" color="white">~30 seconds</Text>
                </HStack>
              </Box>
              
              <HStack 
                p={3} 
                bg="rgba(72, 187, 120, 0.1)" 
                borderRadius="lg"
                borderWidth="1px"
                borderColor="green.700"
                spacing={3}
              >
                <Icon as={FaShieldAlt} color="green.400" boxSize="20px" />
                <Text fontSize="sm" color="gray.300">
                  Your donation is secured by blockchain technology and complies with Shariah principles
                </Text>
              </HStack>
              
              <Text fontSize="sm" color="gray.400">
                By proceeding, you agree to our terms of service and privacy policy. Your donation will be processed via blockchain for maximum transparency.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700" position="relative" zIndex="1">
            <Button 
              variant="outline" 
              mr={3} 
              onClick={onClose}
              borderColor="gray.600"
              color="gray.300"
              _hover={{
                borderColor: "gray.500",
                bg: "rgba(255, 255, 255, 0.05)"
              }}
            >
              Cancel
            </Button>
            <Button 
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
              color="white"
              leftIcon={<FaWallet />}
              onClick={handleDonate}
              borderRadius="xl"
            >
              Confirm Donation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* E-Wallet QR Code Modal */}
      <Modal isOpen={isQRCodeOpen} onClose={onQRCodeClose} size="md">
        <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
        <ModalContent 
          bg="rgba(13, 16, 25, 0.9)"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="gray.700"
          borderRadius="xl"
          boxShadow="0 0 30px rgba(11, 197, 234, 0.2)"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: "-1px",
            left: "-1px",
            right: "-1px",
            bottom: "-1px",
            borderRadius: "xl",
            padding: "1px",
            background: "linear-gradient(135deg, rgba(11, 197, 234, 0.5), rgba(95, 21, 242, 0.5))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            zIndex: 0,
          }}
        >
          <ModalHeader 
            borderBottomWidth="1px" 
            borderColor="gray.700"
            position="relative"
            zIndex="1"
          >
            <HStack spacing={3}>
              <Icon as={FaQrcode} color="brand.500" />
              <Text color="white">Scan QR Code to Pay</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6} position="relative" zIndex="1">
            <VStack spacing={6}>
              <Box 
                p={4} 
                bg="white" 
                borderRadius="lg"
                boxShadow="0 0 20px rgba(11, 197, 234, 0.3)"
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  right: "-5px",
                  bottom: "-5px",
                  borderRadius: "lg",
                  background: "linear-gradient(135deg, rgba(11, 197, 234, 0.5), rgba(95, 21, 242, 0.5))",
                  zIndex: -1,
                  filter: "blur(8px)"
                }}
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
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  bgGradient="linear(to-r, brand.400, accent.400)"
                  bgClip="text"
                >
                  {donationAmount} {currency}
                </Text>
              </VStack>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Scan this QR code with your e-wallet app to complete the payment
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700" position="relative" zIndex="1">
            <Button 
              variant="outline" 
              mr={3} 
              onClick={onQRCodeClose}
              borderColor="gray.600"
              color="gray.300"
              _hover={{
                borderColor: "gray.500",
                bg: "rgba(255, 255, 255, 0.05)"
              }}
            >
              Close
            </Button>
            <Button 
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
              color="white"
              leftIcon={<FaWallet />}
              onClick={() => {
                onQRCodeClose();
                onOpen();
              }}
              borderRadius="xl"
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
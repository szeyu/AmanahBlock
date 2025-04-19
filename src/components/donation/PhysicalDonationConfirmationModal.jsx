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
  Spinner,
} from '@chakra-ui/react';
import { FaBox, FaTruck, FaCheckCircle, FaMapMarkerAlt, FaInfoCircle, FaRegCalendarAlt, FaPhone, FaStickyNote } from 'react-icons/fa';

/**
 * @component PhysicalDonationConfirmationModal
 * @description Modal to confirm the details before submitting a physical item donation.
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {string} props.itemDescription - Description of the items being donated.
 * @param {string} props.deliveryMethod - Selected delivery method ('self' or 'lalamove').
 * @param {object} [props.selectedCenterDetails] - Details of the selected charity center (for self-delivery).
 * @param {string} [props.lalamoveAddress] - User's address for Lalamove pickup.
 * @param {string} [props.lalamoveContact] - User's contact number for Lalamove pickup.
 * @param {string} [props.lalamoveDate] - Selected date for Lalamove pickup.
 * @param {string} [props.lalamoveTime] - Selected time slot for Lalamove pickup.
 * @param {string} [props.lalamoveNote] - Optional note for Lalamove driver.
 * @param {function} props.handleConfirm - Function to execute when donation is confirmed.
 * @param {boolean} props.loading - Indicates if the confirmation action is in progress.
 */
const PhysicalDonationConfirmationModal = ({
  isOpen,
  onClose,
  itemDescription,
  deliveryMethod,
  selectedCenterDetails,
  lalamoveAddress, // Add new prop
  lalamoveContact, // Add new prop
  lalamoveDate,    // Add new prop
  lalamoveTime,    // Add new prop
  lalamoveNote,    // Add new prop
  handleConfirm,
  loading
}) => {
  const isSelfDelivery = deliveryMethod === 'self';

  // Helper to format date if needed (optional)
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString; // Return original if formatting fails
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent 
        bg="rgba(13, 16, 25, 0.9)"
        backdropFilter="blur(10px)"
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="xl"
        boxShadow="0 0 30px rgba(236, 110, 76, 0.2)" // Accent color shadow
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
          background: "linear-gradient(135deg, rgba(236, 110, 76, 0.5), rgba(95, 21, 242, 0.5))", // Accent to purple gradient
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
          background: "radial-gradient(circle at top right, rgba(236, 110, 76, 0.1), transparent 70%)", // Accent radial gradient
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
            <Icon as={isSelfDelivery ? FaBox : FaTruck} color="accent.500" mr={2} />
            <Text>Confirm Physical Item Donation</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton color="white" zIndex="2" />
        <ModalBody py={6} position="relative" zIndex="1">
          <VStack spacing={5} align="stretch">
            <Box>
              <Text color="gray.400" mb={1}>Items Description</Text>
              <Text 
                color="white" 
                fontSize="md" 
                p={3}
                bg="rgba(26, 32, 44, 0.6)"
                borderRadius="md"
                whiteSpace="pre-wrap" // Preserve line breaks
              >
                {itemDescription || "No description provided."}
              </Text>
            </Box>
            
            <Divider borderColor="gray.700" />

            <Box>
              <Text color="gray.400" mb={1}>Delivery Method</Text>
              <HStack 
                p={3}
                bg="rgba(26, 32, 44, 0.6)"
                borderRadius="md"
                spacing={3}
              >
                <Icon as={isSelfDelivery ? FaBox : FaTruck} color="accent.400" boxSize="20px" />
                <Text color="white" fontWeight="bold" fontSize="lg" textTransform="capitalize">
                  {isSelfDelivery ? 'Self Delivery' : 'Lalamove Pickup'}
                </Text>
              </HStack>
            </Box>

            {isSelfDelivery && selectedCenterDetails && (
              <Box 
                p={4} 
                bg="rgba(26, 32, 44, 0.6)" 
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
              >
                <Heading size="sm" mb={3} color="white">
                  <Icon as={FaMapMarkerAlt} mr={2} color="brand.500" />
                  Drop-off Location
                </Heading>
                <Text color="white" fontWeight="medium">{selectedCenterDetails.name}</Text>
                <Text color="gray.300" fontSize="sm">{selectedCenterDetails.address}</Text>
                <Text color="gray.300" fontSize="sm">Open: {selectedCenterDetails.hours}</Text>
                <Text color="gray.400" fontSize="xs" mt={2}>
                  Please deliver during operating hours.
                </Text>
              </Box>
            )}

            {!isSelfDelivery && (
              <Box 
                p={4} 
                bg="rgba(26, 32, 44, 0.6)" 
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
              >
                <Heading size="sm" mb={3} color="white">
                  <Icon as={FaTruck} mr={2} color="brand.500" />
                  Pickup Details
                </Heading>
                <VStack spacing={2} align="stretch">
                  <HStack>
                    <Icon as={FaMapMarkerAlt} color="gray.400" boxSize="16px" />
                    <Text color="gray.300" fontSize="sm">
                      <Text as="span" fontWeight="medium" color="white">Address:</Text> {lalamoveAddress || 'Not provided'}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaPhone} color="gray.400" boxSize="16px" />
                    <Text color="gray.300" fontSize="sm">
                      <Text as="span" fontWeight="medium" color="white">Contact:</Text> {lalamoveContact || 'Not provided'}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaRegCalendarAlt} color="gray.400" boxSize="16px" />
                    <Text color="gray.300" fontSize="sm">
                      <Text as="span" fontWeight="medium" color="white">Date/Time:</Text> {formatDate(lalamoveDate)} - {lalamoveTime || 'Not specified'}
                    </Text>
                  </HStack>
                  {lalamoveNote && ( // Only show note if provided
                    <HStack>
                      <Icon as={FaStickyNote} color="gray.400" boxSize="16px" />
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" fontWeight="medium" color="white">Note:</Text> {lalamoveNote}
                      </Text>
                    </HStack>
                  )}
                </VStack>
                <Text color="gray.400" fontSize="xs" mt={3}>
                  Our team or Lalamove will contact you to confirm the pickup schedule.
                </Text>
              </Box>
            )}
            
            <HStack 
              p={3} 
              bg="rgba(11, 197, 234, 0.1)" // Brand color info box
              borderRadius="lg"
              borderWidth="1px"
              borderColor="brand.700"
              spacing={3}
            >
              <Icon as={FaInfoCircle} color="brand.400" boxSize="20px" />
              <Text fontSize="sm" color="gray.300">
                Your donation details will be recorded on the blockchain for transparency once confirmed.
              </Text>
            </HStack>
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
            isDisabled={loading}
          >
            Cancel
          </Button>
          <Button 
            bgGradient="linear(to-r, accent.500, brand.500)" // Accent to Brand gradient
            _hover={{
              bgGradient: "linear(to-r, accent.600, brand.600)",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px -10px rgba(236, 110, 76, 0.5)" // Accent shadow
            }}
            _active={{
              bgGradient: "linear(to-r, accent.700, brand.700)",
              transform: "translateY(0)",
            }}
            color="white"
            leftIcon={<FaCheckCircle />}
            onClick={handleConfirm}
            borderRadius="xl"
            isLoading={loading}
            loadingText={isSelfDelivery ? "Confirming..." : "Scheduling..."}
          >
            {isSelfDelivery ? 'Confirm Donation' : 'Schedule Pickup'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhysicalDonationConfirmationModal;
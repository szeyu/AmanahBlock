import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Badge,
  Icon,
  VStack,
  HStack,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  useToast,
  SlideFade,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileAlt,
  FaExclamationTriangle,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaCalendarAlt,
  FaBuilding,
  FaTag,
  FaImage,
  FaTasks,
  FaChevronLeft,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
// Removed AIChatbot import

const MotionBox = motion(Box);

/**
 * MilestoneActionButtons - Component for approval/rejection buttons
 *
 * @param {Function} onApprove - Handler for approval action
 * @param {Function} onReject - Handler for rejection action
 */
const MilestoneActionButtons = ({ onApprove, onReject }) => {
  return (
    <Box
      p={4}
      bg="rgba(26, 32, 44, 0.9)"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.700"
      width="100%"
      mt={4}
    >
      <Flex gap={4}>
        <Button
          leftIcon={<FaLockOpen />}
          colorScheme="green"
          flex="1"
          onClick={onApprove}
          size="lg"
        >
          Release Funds
        </Button>
        <Button
          leftIcon={<FaLock />}
          colorScheme="red"
          variant="outline"
          flex="1"
          onClick={onReject}
          size="lg"
        >
          Withhold Funds
        </Button>
      </Flex>
    </Box>
  );
};

/**
 * MilestoneTrackingSection - Component for tracking project milestones and reviewing proofs
 *
 * Features:
 * - Collapsible list of milestone proofs for review
 * - Detailed view of selected proof with PDF report display
 * - Image proofs display
 * - Approval/rejection for fund release
 *
 * @param {Array} proofs - Array of milestone proof objects to be reviewed
 */
const MilestoneTrackingSection = ({ proofs }) => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProofDetails, setShowProofDetails] = useState(false);
  const toast = useToast();
  const pdfRef = useRef(null);

  // Filter proofs based on search query
  const filteredProofs = proofs.filter(
    (proof) =>
      proof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle proof selection
  const handleSelectProof = (proof) => {
    setSelectedProof(proof);
    setIsSidebarOpen(false); // Collapse sidebar when proof is selected
    setShowProofDetails(true); // Show proof details when selected
  };

  // Handle toggling the sidebar
  const handleToggleSidebar = () => {
    // Reset to initial state when going back to milestone list
    setIsSidebarOpen(true);
    setShowProofDetails(false);
  };

  // Handle milestone approval
  const handleApprove = () => {
    if (!selectedProof) return;

    toast({
      title: "Milestone Approved",
      description: `Funds released for: ${selectedProof.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Log approval to console
    console.log("Approved milestone:", selectedProof.id);
  };

  // Handle milestone rejection
  const handleReject = () => {
    if (!selectedProof) return;

    toast({
      title: "Milestone Rejected",
      description: `Funds withheld for: ${selectedProof.name}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });

    // Log rejection to console
    console.log("Rejected milestone:", selectedProof.id);
  };

  // Set PDF zoom level when it loads
  React.useEffect(() => {
    if (pdfRef.current) {
      // The iframe will need a small delay to load before we can access its content
      const timer = setTimeout(() => {
        try {
          const iframe = pdfRef.current;
          if (iframe && iframe.contentWindow) {
            // Try to set zoom level through iframe
            iframe.contentWindow.postMessage(
              { type: "setZoom", scale: 1 }, // Adjust this value to set default zoom
              "*"
            );
          }
        } catch (error) {
          console.error("Failed to set PDF zoom level:", error);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedProof, showProofDetails]);

  return (
    <Box p={{ base: 2, md: 6 }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: isSidebarOpen ? "320px 1fr" : "1fr",
        }}
        gap={6}
        height="calc(100vh - 180px)"
      >
        {/* Collapsible Milestones List */}
        {isSidebarOpen && (
          <GridItem
            height="100%"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <SlideFade in={isSidebarOpen} offsetX="-20px">
              <Box mb={6}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaSearch} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search milestones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="rgba(26, 32, 44, 0.8)"
                    borderColor="gray.700"
                    _hover={{ borderColor: "gray.600" }}
                    _focus={{ borderColor: "accent.500" }}
                  />
                </InputGroup>
              </Box>

              <VStack
                spacing={4}
                align="stretch"
                height="calc(100vh - 250px)"
                overflowY="auto"
                pr={2}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "rgba(0, 0, 0, 0.1)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "3px",
                  },
                }}
              >
                {filteredProofs.length > 0 ? (
                  filteredProofs.map((proof) => (
                    <MotionBox
                      key={proof.id}
                      p={4}
                      bg={
                        selectedProof?.id === proof.id
                          ? "rgba(138, 124, 251, 0.1)"
                          : "rgba(26, 32, 44, 0.6)"
                      }
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={
                        selectedProof?.id === proof.id
                          ? "accent.500"
                          : "gray.700"
                      }
                      cursor="pointer"
                      onClick={() => handleSelectProof(proof)}
                      transition={{ duration: 0.2 }}
                      _hover={{
                        borderColor: "accent.500",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(138, 124, 251, 0.15)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <HStack>
                          <Icon as={FaTasks} color="accent.500" />
                          <Text color="white" fontWeight="medium" noOfLines={1}>
                            {proof.name}
                          </Text>
                        </HStack>
                        {proof.flagged && (
                          <Badge
                            colorScheme="red"
                            ml={2}
                            borderRadius="full"
                            px={2}
                            py={0.5}
                          >
                            <HStack spacing={1}>
                              <Icon as={FaExclamationTriangle} boxSize={3} />
                              <Text fontSize="xs">Flagged</Text>
                            </HStack>
                          </Badge>
                        )}
                      </Flex>
                      <Flex
                        justify="space-between"
                        fontSize="sm"
                        color="gray.400"
                        mb={1}
                      >
                        <HStack>
                          <Icon as={FaBuilding} boxSize={3} />
                          <Text noOfLines={1}>{proof.organization}</Text>
                        </HStack>
                      </Flex>
                      <Flex
                        justify="space-between"
                        fontSize="sm"
                        color="gray.400"
                      >
                        <HStack>
                          <Icon as={FaCalendarAlt} boxSize={3} />
                          <Text>{proof.date}</Text>
                        </HStack>
                        <HStack>
                          <Badge
                            colorScheme={
                              proof.status === "completed"
                                ? "green"
                                : proof.status === "in-progress"
                                ? "yellow"
                                : "gray"
                            }
                            variant="subtle"
                            px={2}
                          >
                            {proof.status}
                          </Badge>
                        </HStack>
                      </Flex>
                    </MotionBox>
                  ))
                ) : (
                  <Box p={4} textAlign="center">
                    <Text color="gray.400">No milestones found</Text>
                  </Box>
                )}
              </VStack>
            </SlideFade>
          </GridItem>
        )}

        {/* Main Content Area - Document Viewer and Proof Images */}
        <GridItem height="100%" overflow="hidden">
          {/* Back Button (only shown when sidebar is collapsed and a proof is selected) */}
          {!isSidebarOpen && selectedProof && (
            <Flex mb={4}>
              <IconButton
                icon={<FaChevronLeft />}
                aria-label="Back to milestone list"
                onClick={handleToggleSidebar}
                variant="ghost"
                color="accent.500"
                _hover={{ bg: "rgba(138, 124, 251, 0.1)" }}
                mr={2}
              />
              <Text color="white" fontWeight="medium" alignSelf="center">
                Back to milestones
              </Text>
            </Flex>
          )}

          {showProofDetails && selectedProof ? (
            <VStack spacing={4} align="stretch" height="calc(100vh - 240px)">
              <Grid
                templateColumns={{ base: "1fr", xl: "3fr 2fr" }}
                gap={{ base: 6, xl: 8 }}
                flex="1"
                minHeight="0"
              >
                {/* PDF Report Viewer Section */}
                <VStack spacing={4} align="stretch" height="100%">
                  <Box
                    bg="rgba(26, 32, 44, 0.7)"
                    backdropFilter="blur(10px)"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={
                      selectedProof.flagged
                        ? "rgba(245, 101, 101, 0.3)"
                        : "rgba(255, 255, 255, 0.1)"
                    }
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    overflow="hidden"
                    position="relative"
                  >
                    {/* Fixed position and margin for alert so it doesn't cover the title */}
                    {selectedProof.flagged && (
                      <Badge
                        colorScheme="red"
                        position="absolute"
                        top={20} // Increased to move below the title
                        right={4}
                        borderRadius="md"
                        px={3}
                        py={1}
                        zIndex={1}
                      >
                        <HStack>
                          <Icon as={FaExclamationTriangle} />
                          <Text>{selectedProof.flagReason}</Text>
                        </HStack>
                      </Badge>
                    )}

                    {/* Header - Fixed at top */}
                    <Box p={6} borderBottom="1px solid" borderColor="gray.700">
                      <Heading size="md" color="white" mb={4}>
                        {selectedProof.name} - Milestone Report
                      </Heading>

                      <HStack>
                        <Icon as={FaCalendarAlt} color="accent.500" />
                        <Text color="white">
                          Submitted on: {selectedProof.date}
                        </Text>
                      </HStack>
                    </Box>

                    {/* PDF Report Viewer with updated PDF file */}
                    <Box flex="1" overflow="hidden" position="relative">
                      <iframe
                        ref={pdfRef}
                        src="/Fun Edu Milestone Report.pdf#zoom=75"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                        title="Milestone Report"
                      />
                    </Box>
                  </Box>

                  {/* Action Buttons Component */}
                  <MilestoneActionButtons
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </VStack>

                {/* Proof Images - Right column now only contains images */}
                <Box height="100%" overflowY="auto">
                  <Box
                    bg="rgba(26, 32, 44, 0.7)"
                    backdropFilter="blur(10px)"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    height="100%"
                    p={6}
                  >
                    <Heading size="md" color="white" mb={6}>
                      Proof of Work Images
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {selectedProof.proofImages &&
                      selectedProof.proofImages.length > 0 ? (
                        selectedProof.proofImages.map((image, index) => (
                          <Box
                            key={index}
                            borderRadius="md"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor="gray.700"
                            position="relative"
                          >
                            <Image
                              src={image.url || "/Amanah Block Logo.png"} // Use PNG from public folder as fallback
                              alt={`Proof image ${index + 1}`}
                              width="100%"
                              objectFit="cover"
                              transition="transform 0.3s ease"
                              _hover={{ transform: "scale(1.02)" }}
                            />
                            <Text
                              p={2}
                              fontSize="sm"
                              bg="rgba(0, 0, 0, 0.7)"
                              color="white"
                              position="absolute"
                              bottom="0"
                              width="100%"
                            >
                              {image.caption || `Image ${index + 1}`}
                            </Text>
                          </Box>
                        ))
                      ) : (
                        <Box
                          gridColumn="span 2"
                          p={4}
                          bg="rgba(0, 0, 0, 0.2)"
                          borderRadius="md"
                          textAlign="center"
                        >
                          <Icon
                            as={FaImage}
                            color="gray.500"
                            boxSize={8}
                            mb={2}
                          />
                          <Text color="gray.400">No proof images provided</Text>
                        </Box>
                      )}
                    </SimpleGrid>

                    {/* Removed AI Analysis section */}
                  </Box>
                </Box>
              </Grid>
            </VStack>
          ) : (
            <Box
              p={10}
              height="calc(100vh - 250px)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg="rgba(26, 32, 44, 0.4)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.700"
              borderStyle="dashed"
              textAlign="center"
            >
              <Icon as={FaTasks} boxSize={12} color="gray.500" mb={4} />
              <Text color="gray.400" fontSize="lg" mb={2}>
                Select a milestone from the list to review
              </Text>
              {!isSidebarOpen && (
                <Button
                  leftIcon={<FaChevronLeft />}
                  mt={6}
                  variant="outline"
                  colorScheme="accent"
                  onClick={handleToggleSidebar}
                >
                  Show Milestone List
                </Button>
              )}
            </Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MilestoneTrackingSection;

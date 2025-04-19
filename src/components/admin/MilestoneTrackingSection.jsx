import React, { useState } from "react";
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
} from "@chakra-ui/react";
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
} from "react-icons/fa";
import AIChatbox from "./AIChatbox";

/**
 * MilestoneTrackingSection - Component for tracking project milestones and reviewing proofs
 *
 * Features:
 * - List of milestone proofs for review
 * - Detailed view of selected proof
 * - AI analysis and chat interface
 * - Approval/rejection for fund release
 *
 * @param {Array} proofs - Array of milestone proof objects to be reviewed
 */
const MilestoneTrackingSection = ({ proofs }) => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

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

    console.log("Rejected milestone:", selectedProof.id);
  };

  return (
    <Box p={6}>
      <Grid templateColumns={{ base: "1fr", md: "320px 1fr" }} gap={6}>
        {/* Proofs List */}
        <GridItem>
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
                _focus={{ borderColor: "brand.500" }}
              />
            </InputGroup>
          </Box>

          <VStack
            spacing={4}
            align="stretch"
            maxH="600px"
            overflowY="auto"
            pr={2}
          >
            {filteredProofs.length > 0 ? (
              filteredProofs.map((proof) => (
                <Box
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
                    selectedProof?.id === proof.id ? "accent.500" : "gray.700"
                  }
                  cursor="pointer"
                  onClick={() => handleSelectProof(proof)}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "accent.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(138, 124, 251, 0.15)",
                  }}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                      <Icon
                        as={
                          proof.name.includes(".jpg") ||
                          proof.name.includes(".png")
                            ? FaImage
                            : FaFileAlt
                        }
                        color="accent.500"
                      />
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
                      <Icon as={FaTasks} boxSize={3} />
                      <Text noOfLines={1}>{proof.milestone}</Text>
                    </HStack>
                  </Flex>
                  <Flex justify="space-between" fontSize="sm" color="gray.400">
                    <HStack>
                      <Icon as={FaTag} boxSize={3} />
                      <Text>{proof.type}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCalendarAlt} boxSize={3} />
                      <Text>{proof.date}</Text>
                    </HStack>
                  </Flex>
                </Box>
              ))
            ) : (
              <Box p={4} textAlign="center">
                <Text color="gray.400">No milestone proofs found</Text>
              </Box>
            )}
          </VStack>
        </GridItem>

        {/* Selected Proof Detail */}
        {selectedProof ? (
          <GridItem>
            <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={6}>
              {/* Proof Content */}
              <Box
                p={6}
                bg="rgba(26, 32, 44, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={
                  selectedProof.flagged
                    ? "rgba(245, 101, 101, 0.3)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                position="relative"
                minH="550px"
                display="flex"
                flexDirection="column"
              >
                {selectedProof.flagged && (
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top={4}
                    right={4}
                    borderRadius="md"
                    px={3}
                    py={1}
                  >
                    <HStack>
                      <Icon as={FaExclamationTriangle} />
                      <Text>{selectedProof.flagReason}</Text>
                    </HStack>
                  </Badge>
                )}

                <Heading size="md" color="white" mb={2}>
                  {selectedProof.name}
                </Heading>
                <Text color="gray.400" fontSize="sm" mb={4}>
                  Milestone:{" "}
                  <Text as="span" color="white" fontWeight="bold">
                    {selectedProof.milestone}
                  </Text>
                </Text>

                <VStack align="start" spacing={4} mb={6}>
                  <HStack>
                    <Icon as={FaBuilding} color="accent.500" />
                    <Text color="white">{selectedProof.organization}</Text>
                  </HStack>

                  <HStack>
                    <Icon as={FaTag} color="accent.500" />
                    <Text color="white">{selectedProof.type}</Text>
                  </HStack>

                  <HStack>
                    <Icon as={FaCalendarAlt} color="accent.500" />
                    <Text color="white">
                      Submitted on: {selectedProof.date}
                    </Text>
                  </HStack>
                </VStack>

                {/* If this is an image proof, show the image */}
                {selectedProof.imageUrl && (
                  <Box
                    mb={4}
                    flex="1"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      maxW="100%"
                      maxH="300px"
                      borderRadius="md"
                      overflow="hidden"
                      boxShadow="0 4px 20px rgba(0, 0, 0, 0.25)"
                      position="relative"
                    >
                      <Image
                        src={selectedProof.imageUrl}
                        alt={selectedProof.name}
                        objectFit="contain"
                        maxH="300px"
                      />
                    </Box>
                  </Box>
                )}

                <Box
                  mb={6}
                  flex="1"
                  bg="rgba(11, 16, 25, 0.5)"
                  borderRadius="md"
                  p={4}
                  overflowY="auto"
                  borderWidth="1px"
                  borderColor="gray.700"
                >
                  <Text color="gray.300">{selectedProof.content}</Text>
                </Box>

                <Flex mt="auto" gap={4}>
                  <Button
                    leftIcon={<FaRegCheckCircle />}
                    colorScheme="green"
                    flex="1"
                    onClick={handleApprove}
                  >
                    Approve & Release Funds
                  </Button>
                  <Button
                    leftIcon={<FaRegTimesCircle />}
                    colorScheme="red"
                    variant="outline"
                    flex="1"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Flex>
              </Box>

              {/* AI Analysis */}
              <Box>
                <AIChatbox
                  title="AI Verification"
                  isFlagged={selectedProof.flagged}
                  flagReason={selectedProof.flagReason}
                  chatHistory={selectedProof.aiChat}
                />
              </Box>
            </Grid>
          </GridItem>
        ) : (
          <GridItem>
            <Box
              p={10}
              height="550px"
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
            >
              <Icon as={FaFileAlt} boxSize={12} color="gray.500" mb={4} />
              <Text color="gray.400" textAlign="center" fontSize="lg">
                Select a milestone proof to review
              </Text>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default MilestoneTrackingSection;

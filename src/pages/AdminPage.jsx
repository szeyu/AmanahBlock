import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  Badge,
  HStack,
  Icon,
  useToast,
  VStack,
  Divider,
} from "@chakra-ui/react";
import {
  FaWallet,
  FaEthereum,
  FaShieldAlt,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { mockWallet, mockProposals, mockProofs } from "../data/adminMockData";
import ProposalReviewSection from "../components/admin/ProposalReviewSection";
import MilestoneTrackingSection from "../components/admin/MilestoneTrackingSection";

/**
 * AdminPage component - Main administrative interface for AmanahBlock
 *
 * Provides functionality for:
 * 1. Wallet connection for transparency
 * 2. Proposal review with AI flagging
 * 3. Milestone tracking and fund release approval
 */
const AdminPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const toast = useToast();

  // Handle wallet connection
  const connectWallet = () => {
    // Mock wallet connection
    setWallet(mockWallet);
    setIsWalletConnected(true);

    toast({
      title: "Wallet Connected",
      description: `Connected to address ${mockWallet.address}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle wallet disconnection
  const disconnectWallet = () => {
    setWallet(null);
    setIsWalletConnected(false);

    toast({
      title: "Wallet Disconnected",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      p={5}
      maxW="container.xl"
      mx="auto"
      position="relative"
      minH="calc(100vh - 200px)"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at top right, rgba(11, 197, 234, 0.1), transparent 70%)",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {/* Header Area */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Box>
          <Heading
            as="h1"
            size="xl"
            mb={2}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
            bgClip="text"
          >
            Admin Dashboard
          </Heading>
          <Text color="gray.300">
            Manage charity proposals and milestone verification
          </Text>
        </Box>

        {/* Wallet Connection */}
        {isWalletConnected ? (
          <Box
            p={4}
            bg="rgba(26, 32, 44, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="rgba(0, 224, 255, 0.3)"
            minW={{ base: "full", md: "320px" }}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <HStack>
                <Icon as={FaEthereum} color="brand.500" />
                <Text color="white" fontWeight="medium">
                  Wallet Connected
                </Text>
              </HStack>
              <Badge colorScheme="green" variant="subtle" px={2} py={1}>
                Active
              </Badge>
            </Flex>

            <Divider my={2} borderColor="gray.700" />

            <Flex justify="space-between" align="center" mb={2}>
              <Text color="gray.400" fontSize="sm">
                Address:
              </Text>
              <Text color="white" fontSize="sm">
                {wallet?.address}
              </Text>
            </Flex>

            <Flex justify="space-between" align="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Balance:
              </Text>
              <Text color="white" fontSize="sm" fontWeight="bold">
                {wallet?.balance} {wallet?.currency}
              </Text>
            </Flex>

            <Button
              variant="outline"
              colorScheme="red"
              size="sm"
              onClick={disconnectWallet}
              width="full"
            >
              Disconnect Wallet
            </Button>
          </Box>
        ) : (
          <Button
            leftIcon={<FaWallet />}
            bg="rgba(0, 224, 255, 0.1)"
            color="#00E0FF"
            borderWidth="1px"
            borderColor="rgba(0, 224, 255, 0.3)"
            _hover={{
              bg: "rgba(0, 224, 255, 0.2)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)",
            }}
            onClick={connectWallet}
            minW={{ base: "full", md: "200px" }}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>

      {/* Admin Tabs */}
      <Box
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        overflow="hidden"
        mb={8}
      >
        <Tabs variant="soft-rounded" colorScheme="brand">
          <TabList px={6} pt={4}>
            <Tab
              mr={4}
              color="gray.400"
              _selected={{
                color: "white",
                bg: "rgba(11, 197, 234, 0.2)",
                fontWeight: "medium",
              }}
            >
              <Icon as={FaShieldAlt} mr={2} />
              Review Proposals
            </Tab>
            <Tab
              color="gray.400"
              _selected={{
                color: "white",
                bg: "rgba(138, 124, 251, 0.2)",
                fontWeight: "medium",
              }}
            >
              <Icon as={FaRegCheckCircle} mr={2} />
              Track Milestones
            </Tab>
          </TabList>

          <TabPanels>
            {/* Proposal Review Tab */}
            <TabPanel p={0}>
              <ProposalReviewSection proposals={mockProposals} />
            </TabPanel>

            {/* Milestone Tracking Tab */}
            <TabPanel p={0}>
              <MilestoneTrackingSection proofs={mockProofs} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Info Box */}
      <Box
        p={6}
        bg="rgba(13, 16, 31, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="rgba(128, 90, 213, 0.2)"
      >
        <Flex align="center" mb={4}>
          <Icon as={FaShieldAlt} color="accent.400" boxSize={6} mr={3} />
          <Heading size="md" color="white">
            Shariah Compliance Verification
          </Heading>
        </Flex>

        <Text color="gray.300" mb={4}>
          All charity proposals and milestone reports are subjected to rigorous
          Shariah compliance checks using our specialized AI system. As an
          admin, you should verify AI findings and ensure all projects maintain
          complete adherence to Islamic principles.
        </Text>

        <HStack spacing={4}>
          <Badge colorScheme="green" p={2} borderRadius="md">
            <HStack>
              <Icon as={FaRegCheckCircle} />
              <Text>Transparent</Text>
            </HStack>
          </Badge>

          <Badge colorScheme="purple" p={2} borderRadius="md">
            <HStack>
              <Icon as={FaShieldAlt} />
              <Text>Shariah Compliant</Text>
            </HStack>
          </Badge>

          <Badge colorScheme="blue" p={2} borderRadius="md">
            <HStack>
              <Icon as={FaEthereum} />
              <Text>Blockchain Verified</Text>
            </HStack>
          </Badge>
        </HStack>
      </Box>
    </Box>
  );
};

export default AdminPage;

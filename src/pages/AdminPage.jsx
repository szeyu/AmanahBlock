import React from "react";
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
  Icon,
  Flex,
} from "@chakra-ui/react";
import {
  FaShieldAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import { mockProposals, mockProofs } from "../data/adminMockData";
import ProposalReviewSection from "../components/admin/ProposalReviewSection";
import MilestoneTrackingSection from "../components/admin/MilestoneTrackingSection";

/**
 * AdminPage component - Main administrative interface for AmanahBlock
 *
 * Provides functionality for:
 * 1. Proposal review with AI flagging
 * 2. Milestone tracking and fund release approval
 */
const AdminPage = ({projectApproved, setProjectApproved}) => {
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
      <Box mb={8}>
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
              <ProposalReviewSection proposals={mockProposals} projectApproved = {projectApproved} setProjectApproved = {setProjectApproved} />
            </TabPanel>

            {/* Milestone Tracking Tab */}
            <TabPanel p={0}>
              <MilestoneTrackingSection proofs={mockProofs} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AdminPage;

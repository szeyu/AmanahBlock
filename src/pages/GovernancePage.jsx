import React, { useState, useEffect } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  VStack, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  useDisclosure,
  Container,
  Grid,
  HStack,
  Icon,
  useColorModeValue,
  Badge,
  Divider,
  Image,
  chakra,
  SimpleGrid,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaGavel,
  FaVoteYea,
  FaHistory,
  FaRegLightbulb,
  FaNetworkWired,
  FaUsers,
  FaEthereum,
  FaChartPie,
  FaChartLine,
  FaRegClock,
  FaShieldAlt,
  FaBalanceScale,
  FaExclamationTriangle,
  FaHandHoldingUsd,
  FaTools,
  FaFileContract,
} from 'react-icons/fa';

// Import refactored components
import GovernanceStats from '../components/governance/GovernanceStats';
import ProposalCard from '../components/governance/ProposalCard';
import PastProposalsTable from '../components/governance/PastProposalsTable';
import EmptyVotesState from '../components/governance/EmptyVotesState';
import GovernanceInfoSection from '../components/governance/GovernanceInfoSection';
import CreateProposalModal from '../components/governance/CreateProposalModal';
import MyVotesSection from '../components/governance/MyVotesSection';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Animation keyframes
const glowKeyframes = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 224, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 10px rgba(0, 224, 255, 0.3); }
`;

const pulseKeyframes = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatKeyframes = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = `${glowKeyframes} 3s infinite`;
const pulse = `${pulseKeyframes} 4s infinite`;
const float = `${floatKeyframes} 6s infinite`;

const GovernancePage = () => {
  const { isOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  
  // Mock data for governance stats
  const stats = {
    totalProposals: 42,
    activeProposals: 3,
    passRate: 78,
    tokenHolders: 12500,
    avgParticipation: 65,
    treasuryBalance: 2450000
  };
  
  // Mock data for active proposals
  const emergencyFundingProposals = [
    {
      id: "PROP-2023-42",
      title: "Johor Flood Emergency Relief",
      description: "Allocate 50,000 USDT from the emergency fund to provide immediate relief for flood victims in Johor, Malaysia.",
      category: "EMERGENCY FUNDING",
      status: "Active",
      deadline: "2 days",
      votesFor: 1350,
      votesAgainst: 320,
      abstain: 75,
      quorum: 2000,
      proposer: "Community Council",
      tags: ["EMERGENCY", "WATER", "MALAYSIA"],
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
    },
    {
      id: "PROP-2023-41",
      title: "Putra Heights Gas Pipe Leakage Fire Relief",
      description: "Allocate 75,000 USDT from the emergency fund to support victims of the gas pipe leakage fire in Putra Heights residential area.",
      category: "EMERGENCY FUNDING",
      status: "Active",
      deadline: "3 days",
      votesFor: 1850,
      votesAgainst: 150,
      abstain: 50,
      quorum: 2000,
      proposer: "Emergency Response Team",
      tags: ["EMERGENCY", "FIRE", "MALAYSIA"],
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
    }
  ];
  
  const projectFundingProposals = [
    {
      id: "PROP-2023-40",
      title: "Fund Water Wells in Somalia",
      description: "Allocate 50,000 USDT from the emergency fund to build water wells in drought-affected regions of Somalia.",
      category: "PROJECT FUNDING",
      status: "Active",
      deadline: "5 days",
      votesFor: 1250,
      votesAgainst: 320,
      abstain: 75,
      quorum: 2000,
      proposer: "Community Council",
      tags: ["WATER", "AFRICA", "INFRASTRUCTURE"],
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
    }
  ];
  
  const protocolChangeProposals = [
    {
      id: "PROP-2023-39",
      title: "Implement Mudarabah Investment Pool",
      description: "Create a new Shariah-compliant investment pool using Mudarabah contracts to generate sustainable returns for charitable projects.",
      category: "PROTOCOL",
      status: "Active",
      deadline: "7 days",
      votesFor: 1850,
      votesAgainst: 550,
      abstain: 200,
      quorum: 3000,
      proposer: "Investment Committee",
      tags: ["DEFI", "INVESTMENT", "SUSTAINABILITY"],
      shariahStatus: "Under Review",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim", "Dr. Muhammad Daud Bakar"],
    }
  ];
  
  const governanceChangeProposals = [
    {
      id: "PROP-2023-38",
      title: "Reduce Quorum Requirements for Emergency Proposals",
      description: "Reduce the quorum requirement for emergency funding proposals from 20% to 10% to enable faster response to urgent situations.",
      category: "GOVERNANCE",
      status: "Active",
      deadline: "10 days",
      votesFor: 950,
      votesAgainst: 750,
      abstain: 300,
      quorum: 3000,
      proposer: "Governance Committee",
      tags: ["GOVERNANCE", "VOTING", "EMERGENCY"],
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
    }
  ];
  
  // Mock data for past proposals
  const pastProposals = [
    {
      id: "PROP-2023-37",
      title: "School Building in Yemen",
      category: "PROJECT FUNDING",
      status: "Passed",
      date: "2023-03-15",
      votesFor: 2500,
      votesAgainst: 500
    },
    {
      id: "PROP-2023-36",
      title: "Upgrade Smart Contract Security",
      category: "PROTOCOL",
      status: "Passed",
      date: "2023-03-01",
      votesFor: 3000,
      votesAgainst: 200
    },
    {
      id: "PROP-2023-35",
      title: "Medical Aid for Gaza",
      category: "EMERGENCY FUNDING",
      status: "Passed",
      date: "2023-02-20",
      votesFor: 3500,
      votesAgainst: 100
    },
    {
      id: "PROP-2023-34",
      title: "Add New Shariah Advisors",
      category: "GOVERNANCE",
      status: "Failed",
      date: "2023-02-10",
      votesFor: 1200,
      votesAgainst: 1800
    },
    {
      id: "PROP-2023-33",
      title: "Implement Zakat Distribution Algorithm",
      category: "PROTOCOL",
      status: "Passed",
      date: "2023-01-25",
      votesFor: 2800,
      votesAgainst: 700
    }
  ];
  
  return (
    <Box py={10} px={4} bg="#0A0F1E">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Flex 
            justify="space-between" 
            align={{ base: "flex-start", md: "center" }} 
            direction={{ base: "column", md: "row" }}
            mb={8}
          >
            <Box mb={{ base: 4, md: 0 }}>
              <MotionHeading 
                size="2xl" 
                color="#00E0FF"
                mb={2}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Community Governance
              </MotionHeading>
              <MotionText 
                color="gray.400" 
                fontSize="lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Shape the future of SadaqahChain through decentralized decision-making
              </MotionText>
            </Box>
            
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button 
                leftIcon={<FaPlus />} 
                onClick={onCreateOpen}
                size="lg"
                bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, #00B5D8, #805AD5)",
                }}
                borderRadius="xl"
                px={8}
              >
                Create Proposal
              </Button>
            </MotionBox>
          </Flex>
          
          {/* Stats Section */}
          <MotionBox
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <GovernanceStats stats={stats} />
          </MotionBox>
          
          {/* Main Tabs */}
          <Tabs 
            variant="unstyled" 
            mt={10} 
            onChange={(index) => setActiveTab(index)}
            colorScheme="brand"
          >
            <TabList 
              bg="rgba(0, 0, 0, 0.2)" 
              borderRadius="xl" 
              p={1}
              mb={6}
            >
              <Tab 
                _selected={{ 
                  bg: "rgba(0, 224, 255, 0.2)", 
                  color: "#00E0FF" 
                }}
                color="gray.300"
                borderRadius="lg"
                px={6}
                py={3}
              >
                <HStack>
                  <Icon as={FaGavel} />
                  <Text>Active Proposals</Text>
                </HStack>
              </Tab>
              <Tab 
                _selected={{ 
                  bg: "rgba(0, 224, 255, 0.2)", 
                  color: "#00E0FF" 
                }}
                color="gray.300"
                borderRadius="lg"
                px={6}
                py={3}
              >
                <HStack>
                  <Icon as={FaHistory} />
                  <Text>Past Proposals</Text>
                </HStack>
              </Tab>
              <Tab 
                _selected={{ 
                  bg: "rgba(0, 224, 255, 0.2)", 
                  color: "#00E0FF" 
                }}
                color="gray.300"
                borderRadius="lg"
                px={6}
                py={3}
              >
                <HStack>
                  <Icon as={FaVoteYea} />
                  <Text>My Votes</Text>
                </HStack>
              </Tab>
            </TabList>
            
            <TabPanels>
              {/* Active Proposals Tab */}
              <TabPanel p={0} pt={6}>
                {/* Sub-tabs for Active Proposals */}
                <Tabs 
                  variant="soft-rounded" 
                  colorScheme="cyan" 
                  size="sm" 
                  onChange={(index) => setActiveSubTab(index)}
                  mb={6}
                >
                  <TabList 
                    overflowX="auto" 
                    py={2}
                    css={{
                      scrollbarWidth: 'none',
                      '::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    <Tab 
                      mr={2}
                      bg="rgba(0, 0, 0, 0.2)"
                      color="gray.300"
                      _selected={{ 
                        bg: "rgba(0, 224, 255, 0.2)", 
                        color: "#00E0FF" 
                      }}
                    >
                      <HStack>
                        <Icon as={FaExclamationTriangle} />
                        <Text>Emergency Funding</Text>
                      </HStack>
                    </Tab>
                    <Tab 
                      mr={2}
                      bg="rgba(0, 0, 0, 0.2)"
                      color="gray.300"
                      _selected={{ 
                        bg: "rgba(0, 224, 255, 0.2)", 
                        color: "#00E0FF" 
                      }}
                    >
                      <HStack>
                        <Icon as={FaHandHoldingUsd} />
                        <Text>Project Funding</Text>
                      </HStack>
                    </Tab>
                    <Tab 
                      mr={2}
                      bg="rgba(0, 0, 0, 0.2)"
                      color="gray.300"
                      _selected={{ 
                        bg: "rgba(0, 224, 255, 0.2)", 
                        color: "#00E0FF" 
                      }}
                    >
                      <HStack>
                        <Icon as={FaTools} />
                        <Text>Protocol Change</Text>
                      </HStack>
                    </Tab>
                    <Tab 
                      bg="rgba(0, 0, 0, 0.2)"
                      color="gray.300"
                      _selected={{ 
                        bg: "rgba(0, 224, 255, 0.2)", 
                        color: "#00E0FF" 
                      }}
                    >
                      <HStack>
                        <Icon as={FaFileContract} />
                        <Text>Governance Change</Text>
                      </HStack>
                    </Tab>
                  </TabList>
                  
                  <TabPanels>
                    {/* Emergency Funding Proposals */}
                    <TabPanel p={0}>
                      <AnimatePresence>
                        <VStack spacing={8} align="stretch">
                          {emergencyFundingProposals.map((proposal, index) => (
                            <MotionBox
                              key={proposal.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="stagger-item"
                            >
                              <ProposalCard proposal={proposal} />
                            </MotionBox>
                          ))}
                        </VStack>
                      </AnimatePresence>
                    </TabPanel>
                    
                    {/* Project Funding Proposals */}
                    <TabPanel p={0}>
                      <AnimatePresence>
                        <VStack spacing={8} align="stretch">
                          {projectFundingProposals.map((proposal, index) => (
                            <MotionBox
                              key={proposal.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="stagger-item"
                            >
                              <ProposalCard proposal={proposal} />
                            </MotionBox>
                          ))}
                        </VStack>
                      </AnimatePresence>
                    </TabPanel>
                    
                    {/* Protocol Change Proposals */}
                    <TabPanel p={0}>
                      <AnimatePresence>
                        <VStack spacing={8} align="stretch">
                          {protocolChangeProposals.map((proposal, index) => (
                            <MotionBox
                              key={proposal.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="stagger-item"
                            >
                              <ProposalCard proposal={proposal} />
                            </MotionBox>
                          ))}
                        </VStack>
                      </AnimatePresence>
                    </TabPanel>
                    
                    {/* Governance Change Proposals */}
                    <TabPanel p={0}>
                      <AnimatePresence>
                        <VStack spacing={8} align="stretch">
                          {governanceChangeProposals.map((proposal, index) => (
                            <MotionBox
                              key={proposal.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="stagger-item"
                            >
                              <ProposalCard proposal={proposal} />
                            </MotionBox>
                          ))}
                        </VStack>
                      </AnimatePresence>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
              
              {/* Past Proposals Tab */}
              <TabPanel p={0} pt={6}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PastProposalsTable proposals={pastProposals} />
                </MotionBox>
              </TabPanel>
              
              {/* My Votes Tab */}
              <TabPanel p={0} pt={6}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <MyVotesSection />
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          {/* Governance Info Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            mt={10}
          >
            <GovernanceInfoSection />
          </MotionBox>
        </MotionBox>
      </Container>
      
      {/* Create Proposal Modal */}
      <CreateProposalModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </Box>
  );
};

export default GovernancePage;
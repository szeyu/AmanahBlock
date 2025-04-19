import React, { useState, useEffect } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Flex, 
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
  SimpleGrid,
  Tooltip,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaGavel,
  FaVoteYea,
  FaHistory,
  FaCoins,
  FaExclamationCircle,
} from 'react-icons/fa';

// Import refactored components
import GovernanceStats from '../components/governance/GovernanceStats';
import ProposalCard from '../components/governance/ProposalCard';
import PastProposalsTable from '../components/governance/PastProposalsTable';
import EmptyVotesState from '../components/governance/EmptyVotesState';
import GovernanceInfoSection from '../components/governance/GovernanceInfoSection';
import CreateProposalModal from '../components/governance/CreateProposalModal';
import MyVotesSection from '../components/governance/MyVotesSection';
import VotingPieChart from '../components/governance/VotingPieChart';

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
  
  // State for proposals
  const [userTokens, setUserTokens] = useState(1000); // Example initial token balance
  const [proposals, setProposals] = useState({
    emergency: {
      highPriority: [
        { 
          id: 'high1', 
          title: 'Johor Flood Emergency Relief', 
          description: 'Immediate aid needed for flood victims in Johor. Funds will be used for evacuation, temporary shelter, food, and medical supplies.',
          voteCount: 1350,
          hasVoted: false
        },
        { 
          id: 'high2', 
          title: 'Putra Heights Gas Pipe Leakage Fire Relief', 
          description: 'Emergency support needed for families affected by the gas pipe explosion. Funds for immediate medical care, temporary housing, and essential supplies.',
          voteCount: 1850,
          hasVoted: false
        }
      ],
      mediumPriority: [
        { 
          id: 'med1', 
          title: 'Kelantan Landslide Recovery', 
          description: 'Support needed for communities affected by recent landslides in Kelantan. Funds for temporary shelter and basic necessities.',
          voteCount: 950,
          hasVoted: false
        },
        { 
          id: 'med2', 
          title: 'Penang Storm Damage Response', 
          description: 'Assistance for families affected by severe storms in Penang. Funds for home repairs and emergency supplies.',
          voteCount: 850,
          hasVoted: false
        }
      ],
      lowPriority: [
        { 
          id: 'low1', 
          title: 'Sarawak Rural Bridge Repair', 
          description: 'Emergency repairs needed for damaged bridges connecting rural communities in Sarawak.',
          voteCount: 750,
          hasVoted: false
        },
        { 
          id: 'low2', 
          title: 'Sabah Coastal Flooding Preparation', 
          description: 'Preventive measures and emergency supplies for coastal communities at risk of flooding in Sabah.',
          voteCount: 650,
          hasVoted: false
        }
      ]
    }
  });

  const handleVote = (projectId, tokenAmount, category) => {
    setProposals(prev => {
      // For emergency proposals, we need to check all priority levels
      return {
        ...prev,
        emergency: {
          highPriority: prev.emergency.highPriority.map(project => 
            project.id === projectId ? { ...project, voteCount: project.voteCount + tokenAmount } : project
          ),
          mediumPriority: prev.emergency.mediumPriority.map(project => 
            project.id === projectId ? { ...project, voteCount: project.voteCount + tokenAmount } : project
          ),
          lowPriority: prev.emergency.lowPriority.map(project => 
            project.id === projectId ? { ...project, voteCount: project.voteCount + tokenAmount } : project
          )
        }
      };
    });

    // Update user's token balance
    setUserTokens(prevTokens => prevTokens - tokenAmount);
  };
  
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
      title: "Yemen Earthquake Relief",
      category: "EMERGENCY",
      priority: "HIGH",
      status: "Passed",
      date: "2023-03-15",
      votesFor: 2500,
      votesAgainst: 500,
      timeframe: "1 day",
      description: "Emergency aid for earthquake victims in Yemen"
    },
    {
      id: "PROP-2023-36",
      title: "Gaza Medical Emergency",
      category: "EMERGENCY",
      priority: "HIGH",
      status: "Passed",
      date: "2023-03-01",
      votesFor: 3000,
      votesAgainst: 200,
      timeframe: "1 day",
      description: "Urgent medical supplies for hospitals in Gaza"
    },
    {
      id: "PROP-2023-35",
      title: "Indonesia Flood Response",
      category: "EMERGENCY",
      priority: "MEDIUM",
      status: "Passed",
      date: "2023-02-20",
      votesFor: 3500,
      votesAgainst: 100,
      timeframe: "2 days",
      description: "Support for flood victims in Jakarta"
    },
    {
      id: "PROP-2023-34",
      title: "Syria Earthquake Aid",
      category: "EMERGENCY",
      priority: "HIGH",
      status: "Passed",
      date: "2023-02-10",
      votesFor: 4200,
      votesAgainst: 300,
      timeframe: "1 day",
      description: "Emergency response for earthquake victims"
    },
    {
      id: "PROP-2023-33",
      title: "Somalia Drought Relief",
      category: "EMERGENCY",
      priority: "LOW",
      status: "Passed",
      date: "2023-01-25",
      votesFor: 2800,
      votesAgainst: 700,
      timeframe: "3 days",
      description: "Water and food aid for drought-affected regions"
    }
  ];
  
  // Sample emergency proposals with different priority levels
  const emergencyProposals = {
    highPriority: [
      {
        id: 'high1',
        title: 'Johor Flood Relief',
        description: 'Immediate aid needed for flood victims in affected areas.',
        voteCount: 1110,
        hasVoted: false,
      },
      {
        id: 'high2',
        title: 'Putra Height Gas Pipe Leakage Affected Area',
        description: 'Support for residents affected by dangerous gas pipe leakage.',
        voteCount: 1350,
        hasVoted: false,
      }
    ],
    mediumPriority: [
      {
        id: 'med1',
        title: 'Fire Damage Restoration',
        description: 'Support for communities affected by recent fires.',
        voteCount: 950,
        hasVoted: false,
      },
      {
        id: 'med2',
        title: 'Emergency Food Supply',
        description: 'Distribution of emergency food supplies to affected regions.',
        voteCount: 850,
        hasVoted: false,
      }
    ],
    lowPriority: [
      {
        id: 'low1',
        title: 'Infrastructure Repair',
        description: 'Emergency repairs for damaged community infrastructure.',
        voteCount: 750,
        hasVoted: false,
      },
      {
        id: 'low2',
        title: 'Temporary Shelter Setup',
        description: 'Establishment of temporary shelters for displaced families.',
        voteCount: 650,
        hasVoted: false,
      }
    ]
  };

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
            
            {/* User's Voting Power */}
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Tooltip label="Your voting power is proportional to your token balance">
                <HStack 
                  bg="rgba(0, 0, 0, 0.2)"
                  p={4}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                >
                  <Icon as={FaCoins} color="#00E0FF" />
                  <Text color="white">Your Voting Power: {userTokens} tokens</Text>
                </HStack>
              </Tooltip>
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
              <TabPanel p={0}>
                <VStack spacing={8} align="stretch">
                  <Box>
                    <HStack mb={4}>
                      <Icon as={FaExclamationCircle} color="red.500" boxSize={6} />
                      <Heading color="white">Emergency Fund Allocation</Heading>
                    </HStack>
                    <Text color="gray.300">
                      Vote on critical emergency funding proposals based on priority levels.
                      Higher priority items require immediate attention and have shorter voting periods.
                    </Text>
                  </Box>

                  <SimpleGrid columns={1} spacing={6}>
                    {/* High Priority - 1 Day Left */}
                    <VotingPieChart
                      title="High Priority Emergency Proposals"
                      data={proposals.emergency.highPriority}
                      timeframe="1 day remaining"
                      category="Emergency"
                      userTokens={userTokens}
                      onVote={(projectId, tokenAmount) => handleVote(projectId, tokenAmount, 'emergency')}
                      colorScheme="red.500"
                      width="100%"
                    />

                    {/* Medium Priority - 2 Days Left */}
                    <VotingPieChart
                      title="Medium Priority Emergency Proposals"
                      data={proposals.emergency.mediumPriority}
                      timeframe="2 days remaining"
                      category="Emergency"
                      userTokens={userTokens}
                      onVote={(projectId, tokenAmount) => handleVote(projectId, tokenAmount, 'emergency')}
                      colorScheme="orange.500"
                      width="100%"
                    />

                    {/* Low Priority - 3 Days Left */}
                    <VotingPieChart
                      title="Low Priority Emergency Proposals"
                      data={proposals.emergency.lowPriority}
                      timeframe="3 days remaining"
                      category="Emergency"
                      userTokens={userTokens}
                      onVote={(projectId, tokenAmount) => handleVote(projectId, tokenAmount, 'emergency')}
                      colorScheme="yellow.500"
                      width="100%"
                    />
                  </SimpleGrid>
                </VStack>
              </TabPanel>
              
              {/* Past Proposals Tab */}
              <TabPanel p={0} pt={6}>
                <PastProposalsTable proposals={pastProposals} />
              </TabPanel>
              
              {/* My Votes Tab */}
              <TabPanel p={0}>
                <MyVotesSection 
                  userVotes={[
                    {
                      id: "PROP-2023-42",
                      title: "Johor Flood Emergency Relief",
                      votesUsed: 1250,
                      participationRate: 87,
                      date: "2023-03-15",
                      status: "Active"
                    },
                    {
                      id: "PROP-2023-41",
                      title: "Gaza Medical Emergency",
                      votesUsed: 850,
                      participationRate: 92,
                      date: "2023-03-01",
                      status: "Passed"
                    }
                  ]} 
                />
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
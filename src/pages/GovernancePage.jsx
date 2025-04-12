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
} from 'react-icons/fa';

// Import refactored components
import GovernanceStats from '../components/governance/GovernanceStats';
import ProposalCard from '../components/governance/ProposalCard';
import PastProposalsTable from '../components/governance/PastProposalsTable';
import EmptyVotesState from '../components/governance/EmptyVotesState';
import GovernanceInfoSection from '../components/governance/GovernanceInfoSection';
import CreateProposalModal from '../components/governance/CreateProposalModal';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [proposalType, setProposalType] = useState('project');
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for active proposals
  const activeProposals = [
    {
      id: 'PROP-2023-42',
      title: 'Fund Water Wells in Somalia',
      description: 'Allocate 50,000 USDT from the emergency fund to build water wells in drought-affected regions of Somalia.',
      category: 'Project Funding',
      status: 'Active',
      votesFor: 1250,
      votesAgainst: 320,
      abstain: 75,
      quorum: 2000,
      deadline: '2 days left',
      proposer: 'Community Council',
      tags: ['Emergency', 'Water', 'Africa'],
      scholars: [
        'Dr. Ahmed Al-Haddad',
        'Sheikh Mohammed Al-Yaqoubi'
      ],
      shariahStatus: 'Fully Compliant'
    },
    {
      id: 'PROP-2023-41',
      title: 'Implement Mudarabah Investment Pool',
      description: 'Create a new Shariah-compliant investment pool using Mudarabah contracts to generate sustainable returns for charitable projects.',
      category: 'Protocol',
      status: 'Active',
      votesFor: 1850,
      votesAgainst: 950,
      abstain: 200,
      quorum: 3000,
      deadline: '5 days left',
      proposer: 'Investment Committee',
      tags: ['DeFi', 'Investment', 'Sustainability'],
      scholars: [
        'Dr. Mufti Taqi Usmani',
        'Dr. Yasmin Ibrahim'
      ],
      shariahStatus: 'Under Review'
    },
    {
      id: 'PROP-2023-40',
      title: 'Expand Zakat Distribution Network',
      description: 'Integrate with 5 new local partners across Southeast Asia to improve Zakat distribution efficiency and reach.',
      category: 'Operations',
      status: 'Active',
      votesFor: 2100,
      votesAgainst: 450,
      abstain: 120,
      quorum: 3000,
      deadline: '3 days left',
      proposer: 'Operations Team',
      tags: ['Zakat', 'Partnership', 'Asia'],
      scholars: [
        'Dr. Yasmin Ibrahim',
        'Sheikh Abdullah Bin Bayyah'
      ],
      shariahStatus: 'Fully Compliant'
    }
  ];
  
  // Mock data for past proposals
  const pastProposals = [
    {
      id: 'PROP-2023-39',
      title: 'Emergency Fund for Gaza Relief',
      category: 'Project Funding',
      status: 'Passed',
      votesFor: 3250,
      votesAgainst: 120,
      result: 'Passed with 96.4% approval',
      date: '2023-05-10',
      tags: ['Emergency', 'Medical', 'Palestine']
    },
    {
      id: 'PROP-2023-38',
      title: 'Reduce Governance Quorum to 15%',
      category: 'Governance',
      status: 'Failed',
      votesFor: 1250,
      votesAgainst: 2320,
      result: 'Failed with 35% approval',
      date: '2023-05-05',
      tags: ['Governance', 'Voting', 'Protocol']
    },
    {
      id: 'PROP-2023-37',
      title: 'Implement Sukuk-based Financing',
      category: 'Protocol',
      status: 'Passed',
      votesFor: 2850,
      votesAgainst: 750,
      result: 'Passed with 79.2% approval',
      date: '2023-04-28',
      tags: ['DeFi', 'Sukuk', 'Finance']
    },
    {
      id: 'PROP-2023-36',
      title: 'Add Polygon Network Support',
      category: 'Technical',
      status: 'Passed',
      votesFor: 3100,
      votesAgainst: 250,
      result: 'Passed with 92.5% approval',
      date: '2023-04-15',
      tags: ['Technical', 'Polygon', 'Scaling']
    }
  ];
  
  // Mock data for governance stats
  const governanceStats = {
    totalProposals: 42,
    activeProposals: 3,
    passRate: 78,
    avgParticipation: 65,
    tokenHolders: 12500,
    treasuryBalance: 2450000
  };
  
  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  return (
    <Box 
      minH="100vh" 
      bg="#0A0F1E"
      backgroundImage="radial-gradient(circle at 20% 30%, rgba(0, 224, 255, 0.03) 0%, transparent 40%), 
                       radial-gradient(circle at 80% 70%, rgba(138, 124, 251, 0.03) 0%, transparent 40%)"
      position="relative"
      overflow="hidden"
      pt={10}
      pb={20}
    >
      {/* Decorative elements */}
      <Box 
        position="absolute" 
        top="10%" 
        right="5%" 
        width="300px" 
        height="300px" 
        borderRadius="full" 
        bg="rgba(0, 224, 255, 0.03)" 
        filter="blur(60px)" 
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        bottom="15%" 
        left="10%" 
        width="250px" 
        height="250px" 
        borderRadius="full" 
        bg="rgba(138, 124, 251, 0.03)" 
        filter="blur(60px)" 
        zIndex={0}
      />
      
      {/* Hexagon grid pattern with reduced opacity */}
      <Box 
        className="hexagon-grid" 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0} 
        opacity={0.03} 
        zIndex={0}
      />
      
      {/* Floating network nodes */}
      <Box 
        position="absolute" 
        top="20%" 
        right="15%" 
        width="10px" 
        height="10px" 
        borderRadius="full" 
        bg="#00E0FF" 
        boxShadow="0 0 20px rgba(0, 224, 255, 0.7)"
        animation={float}
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        top="30%" 
        right="25%" 
        width="6px" 
        height="6px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        boxShadow="0 0 15px rgba(138, 124, 251, 0.7)"
        animation={`${float} 8s infinite`}
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        top="15%" 
        right="35%" 
        width="8px" 
        height="8px" 
        borderRadius="full" 
        bg="#00E0FF" 
        boxShadow="0 0 15px rgba(0, 224, 255, 0.7)"
        animation={`${float} 7s infinite`}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={10}
        >
          <Flex 
            direction={{ base: "column", md: "row" }} 
            justify="space-between" 
            align={{ base: "flex-start", md: "center" }}
            mb={6}
          >
            <Box>
              <MotionHeading 
                as="h1"
                size="2xl" 
                mb={3} 
                bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
                bgClip="text"
                fontWeight="bold"
                letterSpacing="tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Community Governance
              </MotionHeading>
              
              <MotionText 
                color="gray.400" 
                fontSize="lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Shape the future of SadaqahChain through decentralized decision-making
              </MotionText>
            </Box>
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                leftIcon={<FaPlus />} 
                bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                _hover={{ 
                  bgGradient: "linear(to-r, #00E0FF, #8A7CFB)",
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px rgba(0, 224, 255, 0.3)"
                }}
                color="white"
                fontWeight="bold"
                onClick={onOpen}
                size="lg"
                px={8}
                py={7}
                borderRadius="xl"
                position="relative"
                overflow="hidden"
              >
                {/* Animated glow effect on button */}
                <Box 
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="50%"
                  height="100%"
                  bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  animation="shine 1.5s infinite"
                  zIndex={0}
                />
                Create Proposal
              </Button>
            </MotionBox>
          </Flex>
          
          {/* Governance Stats */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <GovernanceStats stats={governanceStats} />
          </MotionBox>
        </MotionBox>
        
        {/* Main Content */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Tabs 
            variant="unstyled" 
            colorScheme="brand" 
            mb={10}
            onChange={(index) => setActiveTab(index)}
            position="relative"
          >
            <TabList 
              mb={8} 
              borderBottom="1px solid" 
              borderColor="rgba(255, 255, 255, 0.05)" 
              pb={4}
              position="relative"
              zIndex={1}
            >
              <HStack spacing={4} position="relative">
                <Tab 
                  color="gray.400" 
                  _selected={{ 
                    color: "white",
                    fontWeight: "bold"
                  }}
                  px={4}
                  py={3}
                  position="relative"
                >
                  <HStack spacing={2}>
                    <Icon as={FaVoteYea} />
                    <Text>Active Proposals</Text>
                  </HStack>
                  {activeTab === 0 && (
                    <MotionBox
                      position="absolute"
                      bottom="-4px"
                      left="0"
                      right="0"
                      height="3px"
                      bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                      layoutId="activeTab"
                      borderRadius="full"
                      animation={glow}
                    />
                  )}
                </Tab>
                
                <Tab 
                  color="gray.400" 
                  _selected={{ 
                    color: "white",
                    fontWeight: "bold"
                  }}
                  px={4}
                  py={3}
                  position="relative"
                >
                  <HStack spacing={2}>
                    <Icon as={FaHistory} />
                    <Text>Past Proposals</Text>
                  </HStack>
                  {activeTab === 1 && (
                    <MotionBox
                      position="absolute"
                      bottom="-4px"
                      left="0"
                      right="0"
                      height="3px"
                      bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                      layoutId="activeTab"
                      borderRadius="full"
                      animation={glow}
                    />
                  )}
                </Tab>
                
                <Tab 
                  color="gray.400" 
                  _selected={{ 
                    color: "white",
                    fontWeight: "bold"
                  }}
                  px={4}
                  py={3}
                  position="relative"
                >
                  <HStack spacing={2}>
                    <Icon as={FaUsers} />
                    <Text>My Votes</Text>
                  </HStack>
                  {activeTab === 2 && (
                    <MotionBox
                      position="absolute"
                      bottom="-4px"
                      left="0"
                      right="0"
                      height="3px"
                      bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                      layoutId="activeTab"
                      borderRadius="full"
                      animation={glow}
                    />
                  )}
                </Tab>
              </HStack>
            </TabList>
            
            <TabPanels>
              {/* Active Proposals Tab */}
              <TabPanel p={0}>
                <AnimatePresence>
                  <VStack spacing={8} align="stretch">
                    {activeProposals.map((proposal, index) => (
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
              
              {/* Past Proposals Tab */}
              <TabPanel p={0}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PastProposalsTable proposals={pastProposals} />
                </MotionBox>
              </TabPanel>
              
              {/* My Votes Tab */}
              <TabPanel p={0}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <EmptyVotesState />
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          {/* Governance Info Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <GovernanceInfoSection />
          </MotionBox>
        </MotionBox>
      </Container>
      
      {/* Create Proposal Modal */}
      <CreateProposalModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default GovernancePage;
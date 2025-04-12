import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { 
  FaPlus, 
} from 'react-icons/fa';

// Import refactored components
import GovernanceStats from '../components/governance/GovernanceStats';
import ProposalCard from '../components/governance/ProposalCard';
import PastProposalsTable from '../components/governance/PastProposalsTable';
import EmptyVotesState from '../components/governance/EmptyVotesState';
import GovernanceInfoSection from '../components/governance/GovernanceInfoSection';
import CreateProposalModal from '../components/governance/CreateProposalModal';

const GovernancePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [proposalType, setProposalType] = useState('project');
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Mock data for active proposals - reduced to 2 examples
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
    }
  ];
  
  // Mock data for past proposals - reduced to 2 examples
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
    <Box p={{ base: 4, md: 8 }} maxW="container.xl" mx="auto">
      <Heading 
        mb={3} 
        color="white" 
        size="xl" 
        bgGradient="linear(to-r, brand.400, accent.400)" 
        bgClip="text"
      >
        Community Governance
      </Heading>
      <Text color="gray.400" mb={8} fontSize="lg">
        Participate in decentralized decision-making for the SadaqahChain ecosystem
      </Text>
      
      {/* Governance Stats */}
      <GovernanceStats stats={governanceStats} />
      
      {/* Main Content */}
      <Flex 
        justify="space-between" 
        align="center" 
        mb={8}
        pb={4}
        borderBottom="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <Heading size="lg" color="white">Active Proposals</Heading>
        <Button 
          leftIcon={<FaPlus />} 
          variant="gradient" 
          onClick={onOpen}
          size="lg"
          px={6}
          py={5}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(128, 90, 213, 0.4)"
          }}
        >
          Create Proposal
        </Button>
      </Flex>
      
      <Tabs variant="soft-rounded" colorScheme="brand" mb={10}>
        <TabList mb={6} borderBottom="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pb={4}>
          <Tab 
            color="gray.300" 
            _selected={{ 
              color: "white", 
              bg: "rgba(11, 197, 234, 0.2)",
              fontWeight: "bold"
            }}
            mr={4}
          >
            Active Proposals
          </Tab>
          <Tab 
            color="gray.300" 
            _selected={{ 
              color: "white", 
              bg: "rgba(11, 197, 234, 0.2)",
              fontWeight: "bold"
            }}
            mr={4}
          >
            Past Proposals
          </Tab>
          <Tab 
            color="gray.300" 
            _selected={{ 
              color: "white", 
              bg: "rgba(11, 197, 234, 0.2)",
              fontWeight: "bold"
            }}
          >
            My Votes
          </Tab>
        </TabList>
        
        <TabPanels>
          {/* Active Proposals Tab */}
          <TabPanel p={0}>
            <VStack spacing={8} align="stretch">
              {activeProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </VStack>
          </TabPanel>
          
          {/* Past Proposals Tab */}
          <TabPanel p={0}>
            <PastProposalsTable proposals={pastProposals} />
          </TabPanel>
          
          {/* My Votes Tab */}
          <TabPanel p={0}>
            <EmptyVotesState />
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Governance Info Section */}
      <GovernanceInfoSection />
      
      {/* Create Proposal Modal */}
      <CreateProposalModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default GovernancePage; 
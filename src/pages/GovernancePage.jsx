import React, { useState } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Grid, 
  Flex, 
  Button, 
  VStack, 
  HStack, 
  Icon, 
  Progress, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Badge, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Divider,
  Avatar,
  AvatarGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react';
import { 
  FaVoteYea, 
  FaUsers, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRegClock, 
  FaChartPie, 
  FaUserTie, 
  FaRegLightbulb, 
  FaPlus, 
  FaEthereum,
  FaGavel
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';

const GovernancePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [proposalType, setProposalType] = useState('project');
  const [selectedTags, setSelectedTags] = useState([]);
  
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
        'Sheikh Mohammed Al-Yaqoubi',
        'Dr. Yasmin Ibrahim'
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
        'Dr. Akram Nadwi',
        'Dr. Yasmin Ibrahim'
      ],
      shariahStatus: 'Under Review'
    },
    {
      id: 'PROP-2023-40',
      title: 'Expand Scholar Board',
      description: 'Add three new scholars to the governance board to increase diversity of Islamic legal opinions and expertise.',
      category: 'Governance',
      status: 'Active',
      votesFor: 2100,
      votesAgainst: 450,
      abstain: 120,
      quorum: 2500,
      deadline: '1 day left',
      proposer: 'Governance Committee',
      tags: ['Governance', 'Scholars', 'Expansion'],
      scholars: [
        'Dr. Ahmed Al-Haddad',
        'Sheikh Mohammed Al-Yaqoubi'
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
      title: 'Implement Zakat Auto-Distribution',
      category: 'Protocol',
      status: 'Passed',
      votesFor: 2850,
      votesAgainst: 450,
      result: 'Passed with 86.4% approval',
      date: '2023-04-28',
      tags: ['Zakat', 'Automation', 'Protocol']
    }
  ];
  
  // Mock data for governance stats
  const governanceStats = {
    totalProposals: 42,
    activeProposals: 3,
    passRate: 78,
    avgParticipation: 65,
    tokenHolders: 12500,
    delegatedVotes: 8500000,
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
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Community Governance</Heading>
      <Text color="gray.400" mb={6}>Participate in decentralized decision-making for the SadaqahChain ecosystem</Text>
      
      {/* Governance Stats */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Total Proposals</StatLabel>
          <StatNumber color="white">{governanceStats.totalProposals}</StatNumber>
          <StatHelpText color="gray.400">
            {governanceStats.activeProposals} active now
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Proposal Pass Rate</StatLabel>
          <StatNumber color="white">{governanceStats.passRate}%</StatNumber>
          <StatHelpText color="gray.400">
            Last 30 days
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Governance Participants</StatLabel>
          <StatNumber color="white">{governanceStats.tokenHolders.toLocaleString()}</StatNumber>
          <StatHelpText color="gray.400">
            {governanceStats.avgParticipation}% avg. participation
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Treasury Balance</StatLabel>
          <HStack>
            <Icon as={FaEthereum} color="brand.500" />
            <StatNumber color="white">{(governanceStats.treasuryBalance).toLocaleString()} USDT</StatNumber>
          </HStack>
          <StatHelpText color="gray.400">
            Available for allocation
          </StatHelpText>
        </Stat>
      </Grid>
      
      {/* Main Content */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md" color="white">Active Proposals</Heading>
        <Button 
          leftIcon={<FaPlus />} 
          variant="gradient" 
          onClick={onOpen}
        >
          Create Proposal
        </Button>
      </Flex>
      
      <Tabs variant="soft-rounded" colorScheme="brand" mb={8}>
        <TabList mb={6}>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Active Proposals</Tab>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Past Proposals</Tab>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>My Votes</Tab>
        </TabList>
        
        <TabPanels>
          {/* Active Proposals Tab */}
          <TabPanel p={0}>
            <VStack spacing={6} align="stretch">
              {activeProposals.map((proposal) => (
                <Box 
                  key={proposal.id}
                  bg="rgba(26, 32, 44, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                  transition="all 0.3s"
                  _hover={{ 
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    borderColor: "brand.500"
                  }}
                >
                  <Flex justify="space-between" align="flex-start" mb={4}>
                    <VStack align="flex-start" spacing={1}>
                      <HStack>
                        <Badge colorScheme="purple" borderRadius="full" px={2}>
                          {proposal.id}
                        </Badge>
                        <Badge colorScheme="blue" borderRadius="full" px={2}>
                          {proposal.category}
                        </Badge>
                        <ShariahComplianceBadge 
                          level={proposal.shariahStatus} 
                          scholars={proposal.scholars}
                          showDetails={true}
                        />
                      </HStack>
                      <Heading size="md" color="white">{proposal.title}</Heading>
                    </VStack>
                    <Badge 
                      colorScheme="green" 
                      borderRadius="full" 
                      px={3} 
                      py={1}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FaRegClock} mr={1} />
                      {proposal.deadline}
                    </Badge>
                  </Flex>
                  
                  <Text color="gray.300" mb={4} noOfLines={2}>
                    {proposal.description}
                  </Text>
                  
                  <Flex wrap="wrap" gap={2} mb={4}>
                    {proposal.tags.map((tag, index) => (
                      <Badge key={index} colorScheme="gray" borderRadius="full" px={2} py={1}>
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                  
                  <Box mb={4}>
                    <Flex justify="space-between" mb={1}>
                      <Text color="gray.400" fontSize="sm">Quorum: {((proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100).toFixed(0)}%</Text>
                      <Text color="gray.400" fontSize="sm">{proposal.votesFor + proposal.votesAgainst + proposal.abstain} / {proposal.quorum} votes</Text>
                    </Flex>
                    <Progress 
                      value={(proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100} 
                      colorScheme="blue" 
                      borderRadius="full" 
                      size="sm" 
                    />
                  </Box>
                  
                  <Box mb={6}>
                    <Flex justify="space-between" mb={1}>
                      <Text color="gray.400" fontSize="sm">Current Results</Text>
                      <Text color="gray.400" fontSize="sm">
                        {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% in favor
                      </Text>
                    </Flex>
                    <Flex h="24px" borderRadius="full" overflow="hidden">
                      <Box 
                        bg="green.500" 
                        w={`${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
                      />
                      <Box 
                        bg="red.500" 
                        w={`${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
                      />
                      <Box 
                        bg="gray.500" 
                        w={`${(proposal.abstain / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
                      />
                    </Flex>
                    <Flex justify="space-between" mt={1}>
                      <HStack>
                        <Box w="10px" h="10px" borderRadius="full" bg="green.500" />
                        <Text fontSize="xs" color="gray.300">For ({proposal.votesFor})</Text>
                      </HStack>
                      <HStack>
                        <Box w="10px" h="10px" borderRadius="full" bg="red.500" />
                        <Text fontSize="xs" color="gray.300">Against ({proposal.votesAgainst})</Text>
                      </HStack>
                      <HStack>
                        <Box w="10px" h="10px" borderRadius="full" bg="gray.500" />
                        <Text fontSize="xs" color="gray.300">Abstain ({proposal.abstain})</Text>
                      </HStack>
                    </Flex>
                  </Box>
                  
                  <Flex justify="space-between" align="center">
                    <HStack color="gray.400" fontSize="sm">
                      <Icon as={FaUsers} />
                      <Text>Proposed by: {proposal.proposer}</Text>
                    </HStack>
                    
                    <HStack spacing={2}>
                      <Button 
                        leftIcon={<FaCheckCircle />} 
                        colorScheme="green" 
                        size="sm" 
                        variant="outline"
                      >
                        Vote For
                      </Button>
                      <Button 
                        leftIcon={<FaTimesCircle />} 
                        colorScheme="red" 
                        size="sm" 
                        variant="outline"
                      >
                        Vote Against
                      </Button>
                      <Button 
                        colorScheme="gray" 
                        size="sm" 
                        variant="outline"
                      >
                        Abstain
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </TabPanel>
          
          {/* Past Proposals Tab */}
          <TabPanel p={0}>
            <Box 
              bg="rgba(26, 32, 44, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.700"
            >
              <Table variant="simple">
                <Thead bg="gray.800">
                  <Tr>
                    <Th color="gray.300">ID</Th>
                    <Th color="gray.300">Title</Th>
                    <Th color="gray.300">Category</Th>
                    <Th color="gray.300">Result</Th>
                    <Th color="gray.300">Date</Th>
                    <Th color="gray.300">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pastProposals.map((proposal) => (
                    <Tr key={proposal.id} _hover={{ bg: 'gray.700' }}>
                      <Td color="white">{proposal.id}</Td>
                      <Td color="white">{proposal.title}</Td>
                      <Td>
                        <Badge colorScheme="blue" borderRadius="full" px={2}>
                          {proposal.category}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge 
                          colorScheme={proposal.status === 'Passed' ? 'green' : 'red'} 
                          borderRadius="full" 
                          px={2}
                        >
                          {proposal.status}
                        </Badge>
                      </Td>
                      <Td color="gray.300">{proposal.date}</Td>
                      <Td>
                        <Button size="sm" variant="ghost" colorScheme="brand">
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          
          {/* My Votes Tab */}
          <TabPanel p={0}>
            <Box 
              bg="rgba(26, 32, 44, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              p={6}
              borderWidth="1px"
              borderColor="gray.700"
              textAlign="center"
              py={12}
            >
              <Icon as={FaVoteYea} boxSize={12} color="gray.500" mb={4} />
              <Heading size="md" color="white" mb={2}>No Votes Cast Yet</Heading>
              <Text color="gray.400" mb={6}>
                You haven't voted on any proposals yet. Connect your wallet to participate in governance.
              </Text>
              <Button 
                variant="gradient" 
                leftIcon={<FaEthereum />}
              >
                Connect Wallet
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Governance Info */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Heading size="md" color="white" mb={4}>How Governance Works</Heading>
          <Text color="gray.300" mb={4}>
            SadaqahChain governance is a hybrid system combining traditional Islamic scholarly oversight with modern decentralized governance mechanisms.
          </Text>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={6}>
            <VStack align="flex-start" spacing={3}>
              <Flex 
                w="50px" 
                h="50px" 
                bg="rgba(128, 90, 213, 0.2)" 
                borderRadius="lg"
                justify="center"
                align="center"
                mb={2}
              >
                <Icon as={FaFileAlt} color="accent.500" boxSize={6} />
              </Flex>
              <Heading size="sm" color="white">1. Proposal Creation</Heading>
              <Text color="gray.400" fontSize="sm">
                Any community member with at least 1,000 SDQ tokens can create a proposal for consideration.
              </Text>
            </VStack>
            
            <VStack align="flex-start" spacing={3}>
              <Flex 
                w="50px" 
                h="50px" 
                bg="rgba(11, 197, 234, 0.2)" 
                borderRadius="lg"
                justify="center"
                align="center"
                mb={2}
              >
                <Icon as={FaUserTie} color="brand.500" boxSize={6} />
              </Flex>
              <Heading size="sm" color="white">2. Shariah Review</Heading>
              <Text color="gray.400" fontSize="sm">
                The Scholar Board reviews proposals for Shariah compliance and provides their assessment.
              </Text>
            </VStack>
            
            <VStack align="flex-start" spacing={3}>
              <Flex 
                w="50px" 
                h="50px" 
                bg="rgba(72, 187, 120, 0.2)" 
                borderRadius="lg"
                justify="center"
                align="center"
                mb={2}
              >
                <Icon as={FaVoteYea} color="green.500" boxSize={6} />
              </Flex>
              <Heading size="sm" color="white">3. Community Voting</Heading>
              <Text color="gray.400" fontSize="sm">
                Token holders vote on proposals, with voting power proportional to token holdings.
              </Text>
            </VStack>
          </Grid>
          
          <Text color="gray.300" mb={4}>
            For a proposal to pass, it must receive both Shariah approval and a majority of community votes, with a minimum quorum of 20% participation.
          </Text>
          
          <Button 
            variant="outline" 
            rightIcon={<FaRegLightbulb />}
            as={Link}
            to="/learn/governance"
          >
            Learn More About Governance
          </Button>
        </Box>
        
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Heading size="md" color="white" mb={4}>Scholar Board</Heading>
          <Text color="gray.300" mb={4}>
            Our governance is guided by a diverse board of Islamic scholars who ensure all activities remain Shariah-compliant.
          </Text>
          
          <VStack spacing={4} align="stretch" mb={6}>
            {[
              { name: 'Dr. Ahmed Al-Haddad', role: 'Head Scholar', votes: '15.2%', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Dr. Yasmin Ibrahim', role: 'Finance Specialist', votes: '12.8%', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Sheikh Mohammed Al-Yaqoubi', role: 'Charity Expert', votes: '11.5%', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
            ].map((scholar, index) => (
              <Flex key={index} align="center" justify="space-between">
                <HStack>
                  <Avatar src={scholar.image} name={scholar.name} />
                  <Box>
                    <Text color="white" fontWeight="medium">{scholar.name}</Text>
                    <Text color="gray.400" fontSize="sm">{scholar.role}</Text>
                  </Box>
                </HStack>
                <Badge colorScheme="purple" borderRadius="full" px={2}>
                  {scholar.votes} votes
                </Badge>
              </Flex>
            ))}
          </VStack>
          
          <Button 
            variant="outline" 
            w="full"
            rightIcon={<FaGavel />}
            as={Link}
            to="/governance/scholars"
          >
            View All Scholars
          </Button>
        </Box>
      </Grid>
      
      {/* Create Proposal Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">Create New Proposal</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Proposal Title</FormLabel>
                <Input placeholder="Enter a clear, descriptive title" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Proposal Type</FormLabel>
                <Select 
                  value={proposalType} 
                  onChange={(e) => setProposalType(e.target.value)}
                >
                  <option value="project">Project Funding</option>
                  <option value="protocol">Protocol Change</option>
                  <option value="governance">Governance Change</option>
                  <option value="treasury">Treasury Allocation</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder="Provide a detailed description of your proposal" 
                  minH="150px"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Flex wrap="wrap" gap={2} mb={2}>
                  {selectedTags.map((tag, index) => (
                    <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="purple">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </Flex>
                <Select 
                  placeholder="Select tags" 
                  onChange={(e) => handleAddTag(e.target.value)}
                >
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Water">Water</option>
                  <option value="Food">Food</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Governance">Governance</option>
                  <option value="DeFi">DeFi</option>
                  <option value="Sustainability">Sustainability</option>
                </Select>
              </FormControl>
              
              {proposalType === 'project' && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Requested Amount (USDT)</FormLabel>
                    <Input type="number" placeholder="Enter amount" />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Project Timeline (days)</FormLabel>
                    <Input type="number" placeholder="Enter number of days" />
                  </FormControl>
                </>
              )}
              
              <FormControl>
                <FormLabel>Additional Documentation</FormLabel>
                <Input type="file" pt={1} />
                <Text fontSize="sm" color="gray.400" mt={1}>
                  Upload any supporting documents (PDF, max 10MB)
                </Text>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="gradient" leftIcon={<FaFileAlt />}>
              Submit Proposal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GovernancePage; 
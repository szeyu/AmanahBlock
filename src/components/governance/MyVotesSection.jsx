import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  HStack,
  VStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaEthereum,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaCoins,
} from 'react-icons/fa';

const MotionBox = motion(Box);

const MyVotesSection = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for user's emergency votes
  const myVotes = [
    {
      id: "PROP-2023-42",
      title: "Johor Flood Emergency Relief",
      description: "Immediate aid needed for flood victims in affected areas",
      priority: "HIGH",
      date: "2023-04-10",
      voteType: "For",
      voteWeight: 250,
      timeframe: "1 day",
      txHash: "0x71C...93E4",
    },
    {
      id: "PROP-2023-41",
      title: "Gaza Medical Emergency",
      description: "Urgent medical supplies for hospitals in Gaza",
      priority: "HIGH",
      date: "2023-04-08",
      voteType: "For",
      voteWeight: 300,
      timeframe: "1 day",
      txHash: "0x82D...45F2",
    },
    {
      id: "PROP-2023-40",
      title: "Indonesia Flood Response",
      description: "Support for flood victims in Jakarta",
      priority: "MEDIUM",
      date: "2023-04-05",
      voteType: "For",
      voteWeight: 200,
      timeframe: "2 days",
      txHash: "0x93E...12A7",
    },
    {
      id: "PROP-2023-39",
      title: "Syria Earthquake Aid",
      description: "Emergency response for earthquake victims",
      priority: "HIGH",
      date: "2023-04-01",
      voteType: "For",
      voteWeight: 250,
      timeframe: "1 day",
      txHash: "0x45F...78B9",
    },
    {
      id: "PROP-2023-38",
      title: "Somalia Drought Relief",
      description: "Water and food aid for drought-affected regions",
      priority: "LOW",
      date: "2023-03-28",
      voteType: "For",
      voteWeight: 250,
      timeframe: "3 days",
      txHash: "0x12A...34C5",
    },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'orange';
      case 'LOW': return 'yellow';
      default: return 'gray';
    }
  };
  
  const getVoteIcon = (voteType) => {
    switch(voteType) {
      case 'For': return FaCheckCircle;
      case 'Against': return FaTimesCircle;
      case 'Abstain': return FaMinusCircle;
      default: return FaExclamationTriangle;
    }
  };
  
  const getVoteColor = (voteType) => {
    switch(voteType) {
      case 'For': return 'green';
      case 'Against': return 'red';
      case 'Abstain': return 'gray';
      default: return 'blue';
    }
  };
  
  const filteredVotes = myVotes
    .filter(vote => {
      const matchesSearch = vote.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           vote.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || vote.voteType === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalVoteWeight = myVotes.reduce((sum, vote) => sum + vote.voteWeight, 0);
  
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="lg" color="white" mb={4}>My Emergency Votes</Heading>
        <Text color="gray.400">Track your voting history on emergency proposals</Text>
      </Box>

      <Box
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        borderRadius="xl"
        overflow="hidden"
        bg="rgba(13, 16, 31, 0.7)"
        p={6}
      >
        {/* Voting Statistics */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
          <Box
            bg="rgba(0, 0, 0, 0.2)"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.05)"
          >
            <Text color="gray.400">Total Votes Cast</Text>
            <Heading size="lg" color="white">{myVotes.length}</Heading>
          </Box>
          <Box
            bg="rgba(0, 0, 0, 0.2)"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.05)"
          >
            <Text color="gray.400">Voting Power Used</Text>
            <Heading size="lg" color="white">{totalVoteWeight} tokens</Heading>
          </Box>
          <Box
            bg="rgba(0, 0, 0, 0.2)"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.05)"
          >
            <Text color="gray.400">Participation Rate</Text>
            <Heading size="lg" color="white">87%</Heading>
          </Box>
        </SimpleGrid>

        {/* Search and Filter Controls */}
        <Flex 
          justify="space-between" 
          align="center" 
          mb={6} 
          gap={4}
          flexDir={{ base: "column", md: "row" }}
        >
          <InputGroup maxW={{ base: "full", md: "320px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search emergency votes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="rgba(0, 0, 0, 0.2)"
              borderColor="rgba(255, 255, 255, 0.1)"
              _hover={{ borderColor: "#00E0FF" }}
              _focus={{ borderColor: "#00E0FF", boxShadow: "0 0 0 1px #00E0FF" }}
              color="white"
            />
          </InputGroup>

          <Menu>
            <MenuButton
              as={Button}
              bg="rgba(13, 16, 31, 0.8)"
              color="white"
              leftIcon={<Icon as={FaFilter} />}
              rightIcon={<Icon as={FaChevronDown} />}
              _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
            >
              {filterType} Votes
            </MenuButton>
            <MenuList bg="rgba(13, 16, 31, 0.95)" borderColor="rgba(255, 255, 255, 0.1)">
              <MenuItem onClick={() => setFilterType('All')} color="white">All Votes</MenuItem>
              <MenuItem onClick={() => setFilterType('For')} color="white">Voted For</MenuItem>
              <MenuItem onClick={() => setFilterType('Against')} color="white">Voted Against</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Votes List */}
        <VStack spacing={4} align="stretch">
          {filteredVotes.map((vote) => (
            <Box
              key={vote.id}
              bg="rgba(0, 0, 0, 0.2)"
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="rgba(255, 255, 255, 0.05)"
              _hover={{ borderColor: "rgba(0, 224, 255, 0.3)" }}
            >
              <HStack justify="space-between" mb={2}>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text color="white" fontWeight="bold">{vote.title}</Text>
                    <Badge colorScheme={getPriorityColor(vote.priority)}>
                      {vote.priority} ({vote.timeframe})
                    </Badge>
                  </HStack>
                  <Text color="gray.400" fontSize="sm">{vote.description}</Text>
                </VStack>
                <Badge colorScheme={getVoteColor(vote.voteType)}>
                  <HStack spacing={1}>
                    <Icon as={getVoteIcon(vote.voteType)} />
                    <Text>{vote.voteType}</Text>
                  </HStack>
                </Badge>
              </HStack>
              
              <HStack justify="space-between" mt={2}>
                <HStack spacing={4} color="gray.400" fontSize="sm">
                  <HStack>
                    <Icon as={FaCalendarAlt} />
                    <Text>{vote.date}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCoins} />
                    <Text>{vote.voteWeight} tokens</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaEthereum} />
                    <Text>Tx: {vote.txHash}</Text>
                  </HStack>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={<FaExternalLinkAlt />}
                >
                  View
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default MyVotesSection; 
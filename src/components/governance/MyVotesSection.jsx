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
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaEthereum,
  FaFilter,
  FaVoteYea,
  FaSearch,
  FaHistory,
  FaHandHoldingUsd,
  FaTools,
  FaExclamationTriangle,
  FaFileContract,
  FaFileAlt,
  FaChartLine,
  FaChevronDown,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const MyVotesSection = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for user's votes
  const myVotes = [
    {
      id: "PROP-2023-42",
      title: "Johor Flood Emergency Relief",
      category: "EMERGENCY FUNDING",
      date: "2023-04-10",
      voteType: "For",
      voteWeight: 1250,
      txHash: "0x71C...93E4",
    },
    {
      id: "PROP-2023-41",
      title: "Putra Heights Gas Pipe Leakage Fire Relief",
      category: "EMERGENCY FUNDING",
      date: "2023-04-08",
      voteType: "For",
      voteWeight: 1250,
      txHash: "0x82D...45F2",
    },
    {
      id: "PROP-2023-39",
      title: "Implement Mudarabah Investment Pool",
      category: "PROTOCOL",
      date: "2023-04-05",
      voteType: "Against",
      voteWeight: 1250,
      txHash: "0x93E...12A7",
    },
    {
      id: "PROP-2023-38",
      title: "Reduce Quorum Requirements for Emergency Proposals",
      category: "GOVERNANCE",
      date: "2023-04-01",
      voteType: "Abstain",
      voteWeight: 1250,
      txHash: "0x45F...78B9",
    },
    {
      id: "PROP-2023-37",
      title: "School Building in Yemen",
      category: "PROJECT FUNDING",
      date: "2023-03-28",
      voteType: "For",
      voteWeight: 1250,
      txHash: "0x12A...34C5",
    },
  ];
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'PROJECT FUNDING': return FaHandHoldingUsd;
      case 'PROTOCOL': return FaTools;
      case 'EMERGENCY FUNDING': return FaExclamationTriangle;
      case 'GOVERNANCE': return FaFileContract;
      default: return FaFileAlt;
    }
  };
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'PROJECT FUNDING': return '#00B5D8';
      case 'PROTOCOL': return '#805AD5';
      case 'EMERGENCY FUNDING': return '#DD6B20';
      case 'GOVERNANCE': return '#3182CE';
      default: return '#718096';
    }
  };
  
  const getVoteIcon = (voteType) => {
    switch(voteType) {
      case 'For': return FaCheckCircle;
      case 'Against': return FaTimesCircle;
      case 'Abstain': return FaMinusCircle;
      default: return FaVoteYea;
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
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Connected Wallet Banner */}
      <Box
        bg="rgba(13, 16, 31, 0.8)"
        borderRadius="lg"
        p={4}
        mb={6}
        borderWidth="1px"
        borderColor="rgba(0, 224, 255, 0.3)"
        maxW="300px"
        mx="auto"
      >
        <HStack spacing={3} justify="center">
          <Icon as={FaEthereum} color="#00E0FF" boxSize={5} />
          <VStack align="start" spacing={0}>
            <Text color="gray.400" fontSize="sm">Connected Wallet</Text>
            <Text color="white" fontWeight="bold">0x71C...93E4</Text>
          </VStack>
        </HStack>
      </Box>
      
      {/* Filter Control */}
      <Flex 
        justify="center" 
        mb={8}
      >
        <Menu>
          <MenuButton
            as={Button}
            bg="rgba(13, 16, 31, 0.8)"
            color="white"
            leftIcon={<Icon as={FaFilter} color="white" />}
            rightIcon={<Icon as={FaChevronDown} color="white" />}
            _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
            _active={{ bg: "rgba(0, 224, 255, 0.2)" }}
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            Vote Type: {filterType}
          </MenuButton>
          <MenuList
            bg="rgba(13, 16, 31, 0.95)"
            borderColor="rgba(255, 255, 255, 0.1)"
            p={2}
          >
            <MenuItem
              bg="transparent"
              color="white"
              _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
              onClick={() => setFilterType('All')}
            >
              All Votes
            </MenuItem>
            <MenuItem
              bg="transparent"
              color="white"
              _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
              onClick={() => setFilterType('For')}
            >
              <Icon as={FaCheckCircle} color="green.400" mr={2} />
              Voted For
            </MenuItem>
            <MenuItem
              bg="transparent"
              color="white"
              _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
              onClick={() => setFilterType('Against')}
            >
              <Icon as={FaTimesCircle} color="red.400" mr={2} />
              Voted Against
            </MenuItem>
            <MenuItem
              bg="transparent"
              color="white"
              _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
              onClick={() => setFilterType('Abstain')}
            >
              <Icon as={FaMinusCircle} color="gray.400" mr={2} />
              Abstained
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      
      {/* Header with stats */}
      <MotionFlex 
        justify="space-between" 
        align="center" 
        mb={8}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <HStack spacing={8}>
          <VStack align="flex-start" spacing={1}>
            <Text color="gray.400" fontSize="sm">Total Votes Cast</Text>
            <Text color="white" fontSize="2xl" fontWeight="bold">{myVotes.length}</Text>
          </VStack>
          
          <VStack align="flex-start" spacing={1}>
            <Text color="gray.400" fontSize="sm">Voting Power</Text>
            <Text color="white" fontSize="2xl" fontWeight="bold">1,250 SDQ</Text>
          </VStack>
          
          <VStack align="flex-start" spacing={1}>
            <Text color="gray.400" fontSize="sm">Participation Rate</Text>
            <Text color="white" fontSize="2xl" fontWeight="bold">87%</Text>
          </VStack>
        </HStack>
      </MotionFlex>
      
      {/* Search and Filter Controls */}
      <Flex 
        justify="space-between" 
        align="center" 
        mb={6} 
        flexDir={{ base: "column", md: "row" }}
        gap={4}
      >
        <InputGroup maxW={{ base: "full", md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search votes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="rgba(0, 0, 0, 0.2)"
            borderColor="rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: "#00E0FF" }}
            _focus={{ borderColor: "#00E0FF", boxShadow: "0 0 0 1px #00E0FF" }}
          />
        </InputGroup>
      </Flex>
      
      {/* Results Count */}
      <Text color="gray.400" mb={4}>
        Showing {filteredVotes.length} of {myVotes.length} votes
      </Text>
      
      {/* Votes List */}
      <VStack spacing={4} align="stretch">
        {filteredVotes.map((vote, index) => (
          <MotionBox
            key={vote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            bg="rgba(13, 16, 31, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.05)"
            overflow="hidden"
            _hover={{ 
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              borderColor: "rgba(0, 224, 255, 0.2)",
              transition: "all 0.3s ease"
            }}
          >
            <Flex p={5} align="center" justify="space-between">
              <HStack spacing={4} flex={1}>
                <Badge 
                  colorScheme={getVoteColor(vote.voteType)}
                  borderRadius="full"
                  p={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={getVoteIcon(vote.voteType)} boxSize={5} />
                </Badge>
                
                <VStack align="flex-start" spacing={1}>
                  <HStack>
                    <Text color="gray.400" fontSize="xs">{vote.id}</Text>
                    <Tag 
                      size="sm" 
                      borderRadius="full" 
                      variant="subtle" 
                      bg={`${getCategoryColor(vote.category)}20`}
                      color={getCategoryColor(vote.category)}
                    >
                      <TagLeftIcon boxSize="10px" as={getCategoryIcon(vote.category)} />
                      <TagLabel fontSize="xs">{vote.category}</TagLabel>
                    </Tag>
                  </HStack>
                  
                  <Text color="white" fontWeight="bold">{vote.title}</Text>
                  
                  <HStack spacing={4}>
                    <HStack color="gray.400" fontSize="xs">
                      <Icon as={FaCalendarAlt} boxSize={3} />
                      <Text>{vote.date}</Text>
                    </HStack>
                    
                    <HStack color="gray.400" fontSize="xs">
                      <Icon as={FaVoteYea} boxSize={3} />
                      <Text>Weight: {vote.voteWeight} SDQ</Text>
                    </HStack>
                    
                    <HStack color="gray.400" fontSize="xs">
                      <Icon as={FaEthereum} boxSize={3} />
                      <Text>Tx: {vote.txHash}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
              
              <Button
                size="sm"
                variant="ghost"
                color="gray.400"
                _hover={{ color: "#00E0FF" }}
                rightIcon={<FaExternalLinkAlt />}
              >
                View
              </Button>
            </Flex>
          </MotionBox>
        ))}
      </VStack>
      
      {/* Load More Button */}
      <Flex justify="center" mt={8}>
        <Button
          variant="outline"
          borderColor="rgba(255, 255, 255, 0.1)"
          color="gray.300"
          _hover={{
            bg: "rgba(0, 224, 255, 0.1)",
            borderColor: "#00E0FF",
            color: "#00E0FF"
          }}
          leftIcon={<FaHistory />}
        >
          Load More Votes
        </Button>
      </Flex>
    </MotionBox>
  );
};

export default MyVotesSection; 
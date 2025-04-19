import React, { useState } from 'react';
import {
  Box,
  Badge,
  HStack,
  VStack,
  Text,
  Icon,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaSearch,
  FaCalendarAlt,
} from 'react-icons/fa';

const MotionBox = motion(Box);

const PastProposalsTable = ({ proposals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProposals = proposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    proposal.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'orange';
      case 'LOW': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" color="white" mb={4}>Past Emergency Proposals</Heading>
          <Text color="gray.400">View the history of emergency funding proposals</Text>
        </Box>

        {/* Search Bar */}
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search past proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="rgba(0, 0, 0, 0.2)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: "#00E0FF" }}
            _focus={{ borderColor: "#00E0FF", boxShadow: "0 0 0 1px #00E0FF" }}
            color="white"
          />
        </InputGroup>

        {/* Proposals Table */}
        <Box
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius="xl"
          overflow="hidden"
        >
          <Box as="table" width="100%" bg="rgba(13, 16, 31, 0.7)">
            <Box as="thead" bg="rgba(0, 0, 0, 0.2)">
              <Box as="tr">
                <Box as="th" px={6} py={4} color="gray.400">ID</Box>
                <Box as="th" px={6} py={4} color="gray.400">Title</Box>
                <Box as="th" px={6} py={4} color="gray.400">Priority</Box>
                <Box as="th" px={6} py={4} color="gray.400">Result</Box>
                <Box as="th" px={6} py={4} color="gray.400">Date</Box>
                <Box as="th" px={6} py={4} color="gray.400">Votes</Box>
              </Box>
            </Box>
            <Box as="tbody">
              {filteredProposals.map((proposal) => (
                <Box 
                  as="tr" 
                  key={proposal.id}
                  _hover={{ bg: "rgba(0, 224, 255, 0.1)" }}
                  transition="background 0.2s"
                >
                  <Box as="td" px={6} py={4} color="white">{proposal.id}</Box>
                  <Box as="td" px={6} py={4}>
                    <VStack align="start" spacing={1}>
                      <Text color="white">{proposal.title}</Text>
                      <Text color="gray.400" fontSize="sm">{proposal.description}</Text>
                    </VStack>
                  </Box>
                  <Box as="td" px={6} py={4}>
                    <Badge colorScheme={getPriorityColor(proposal.priority)}>
                      {proposal.priority} ({proposal.timeframe})
                    </Badge>
                  </Box>
                  <Box as="td" px={6} py={4}>
                    <Badge colorScheme={proposal.status === 'Passed' ? 'green' : 'red'}>
                      {proposal.status}
                    </Badge>
                  </Box>
                  <Box as="td" px={6} py={4}>
                    <HStack>
                      <Icon as={FaCalendarAlt} color="gray.400" />
                      <Text color="white">{proposal.date}</Text>
                    </HStack>
                  </Box>
                  <Box as="td" px={6} py={4}>
                    <HStack spacing={2}>
                      <Badge colorScheme="green">
                        For: {proposal.votesFor}
                      </Badge>
                      <Badge colorScheme="red">
                        Against: {proposal.votesAgainst}
                      </Badge>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default PastProposalsTable; 
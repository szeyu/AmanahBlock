import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  HStack,
  Icon,
  Progress,
  Badge,
} from '@chakra-ui/react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRegClock,
  FaUsers
} from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const ProposalCard = ({ proposal }) => {
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.5)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={8}
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      transition="all 0.3s"
      _hover={{ 
        transform: "translateY(-5px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        borderColor: "brand.400"
      }}
    >
      <Flex 
        justify="space-between" 
        align="flex-start" 
        mb={6}
        pb={4}
        borderBottom="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <HStack spacing={3} alignItems="flex-start" flexWrap="wrap">
          <Badge 
            colorScheme="purple" 
            borderRadius="full" 
            px={3}
            py={1}
            fontSize="sm"
          >
            {proposal.id}
          </Badge>
          <Badge 
            colorScheme="blue" 
            borderRadius="full" 
            px={3}
            py={1}
            fontSize="sm"
          >
            {proposal.category}
          </Badge>
          <ShariahComplianceBadge 
            level={proposal.shariahStatus} 
            scholars={proposal.scholars}
            showDetails={true}
          />
        </HStack>
        <Badge 
          colorScheme="green" 
          borderRadius="full" 
          px={4} 
          py={2}
          display="flex"
          alignItems="center"
          fontSize="md"
          fontWeight="medium"
        >
          <Icon as={FaRegClock} mr={2} />
          {proposal.deadline}
        </Badge>
      </Flex>
      
      <Heading size="lg" color="white" mb={4}>{proposal.title}</Heading>
      
      <Text color="gray.300" mb={6} fontSize="lg">
        {proposal.description}
      </Text>
      
      <Flex wrap="wrap" gap={3} mb={6}>
        {proposal.tags.map((tag, index) => (
          <Badge 
            key={index} 
            colorScheme="gray" 
            borderRadius="full" 
            px={3} 
            py={1}
            fontSize="sm"
          >
            {tag}
          </Badge>
        ))}
      </Flex>
      
      <Box mb={6}>
        <Flex justify="space-between" mb={2}>
          <Text color="gray.300" fontSize="md">Quorum: {((proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100).toFixed(0)}%</Text>
          <Text color="gray.300" fontSize="md">{proposal.votesFor + proposal.votesAgainst + proposal.abstain} / {proposal.quorum} votes</Text>
        </Flex>
        <Progress 
          value={(proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100} 
          colorScheme="brand" 
          borderRadius="full" 
          size="md"
          bg="rgba(255, 255, 255, 0.1)"
        />
      </Box>
      
      <Box mb={8}>
        <Flex justify="space-between" mb={2}>
          <Text color="gray.300" fontSize="md">Current Results</Text>
          <Text color="gray.300" fontSize="md">
            {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% in favor
          </Text>
        </Flex>
        <Flex h="30px" borderRadius="full" overflow="hidden">
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
        <Flex justify="space-between" mt={3}>
          <HStack>
            <Box w="12px" h="12px" borderRadius="full" bg="green.500" />
            <Text fontSize="sm" color="gray.300">For ({proposal.votesFor})</Text>
          </HStack>
          <HStack>
            <Box w="12px" h="12px" borderRadius="full" bg="red.500" />
            <Text fontSize="sm" color="gray.300">Against ({proposal.votesAgainst})</Text>
          </HStack>
          <HStack>
            <Box w="12px" h="12px" borderRadius="full" bg="gray.500" />
            <Text fontSize="sm" color="gray.300">Abstain ({proposal.abstain})</Text>
          </HStack>
        </Flex>
      </Box>
      
      <Flex 
        justify="space-between" 
        align="center"
        pt={4}
        borderTop="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <HStack color="gray.300" fontSize="md">
          <Icon as={FaUsers} />
          <Text>Proposed by: {proposal.proposer}</Text>
        </HStack>
        
        <HStack spacing={3}>
          <Button 
            leftIcon={<FaCheckCircle />} 
            colorScheme="green" 
            size="md" 
            variant="solid"
            px={5}
          >
            Vote For
          </Button>
          <Button 
            leftIcon={<FaTimesCircle />} 
            colorScheme="red" 
            size="md" 
            variant="outline"
            px={5}
          >
            Vote Against
          </Button>
          <Button 
            colorScheme="gray" 
            size="md" 
            variant="ghost"
          >
            Abstain
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ProposalCard; 
import React, { useState } from 'react';
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
  Tooltip,
  useDisclosure,
  Collapse,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRegClock,
  FaUsers,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const MotionBox = motion(Box);

const ProposalCard = ({ proposal }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <MotionBox 
      bg="rgba(13, 16, 31, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.05)"
      overflow="hidden"
      position="relative"
      transition="all 0.3s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 224, 255, 0.3)"
      }}
    >
      {/* Header section */}
      <Flex 
        justify="space-between" 
        align="center" 
        bg="rgba(0, 0, 0, 0.2)"
        p={4}
      >
        <HStack spacing={3}>
          <Badge 
            bg="#2D3748" 
            color="gray.300" 
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {proposal.id}
          </Badge>
          
          <Badge 
            bg="#00B5D8" 
            color="white" 
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {proposal.category}
          </Badge>
          
          <ShariahComplianceBadge level={proposal.shariahStatus} />
        </HStack>
        
        <Tooltip label={`${proposal.deadline} remaining`}>
          <Badge 
            colorScheme={proposal.deadline.includes('days') && parseInt(proposal.deadline) > 2 ? "green" : "red"}
            borderRadius="full"
            px={3}
            py={1}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaRegClock} mr={1} />
            <Text>{proposal.deadline}</Text>
          </Badge>
        </Tooltip>
      </Flex>
      
      {/* Content section */}
      <Box p={6}>
        <Heading size="md" mb={4} color="white">{proposal.title}</Heading>
        
        <Text color="gray.300" mb={6}>
          {proposal.description}
        </Text>
        
        <Flex wrap="wrap" gap={2} mb={6}>
          {proposal.tags.map((tag, index) => (
            <Badge 
              key={index} 
              bg="rgba(0, 0, 0, 0.2)" 
              color="gray.300" 
              px={2} 
              py={1}
              borderRadius="md"
              fontSize="xs"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
        
        {/* Quorum progress */}
        <Box mb={6}>
          <Flex justify="space-between" mb={2}>
            <HStack>
              <Icon as={FaUsers} color="#00E0FF" />
              <Text color="white" fontSize="sm">Quorum Progress</Text>
            </HStack>
            <Text color="gray.300" fontSize="sm">
              {((proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100).toFixed(0)}% 
              ({proposal.votesFor + proposal.votesAgainst + proposal.abstain} / {proposal.quorum})
            </Text>
          </Flex>
          
          <Progress 
            value={(proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100} 
            size="sm" 
            colorScheme="cyan"
            bg="rgba(0, 0, 0, 0.2)"
            borderRadius="full"
            mb={4}
          />
        </Box>
        
        {/* Current results */}
        <Box mb={6}>
          <Flex justify="space-between" mb={2}>
            <Text color="white" fontSize="sm">Current Results</Text>
            <Text color="gray.300" fontSize="sm">
              {(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst + proposal.abstain) * 100).toFixed(1)}% in favor
            </Text>
          </Flex>
          
          <Flex w="100%" h="8px" bg="rgba(0, 0, 0, 0.2)" borderRadius="full" overflow="hidden" mb={2}>
            <Box 
              bg="#48BB78" 
              w={`${proposal.votesFor / (proposal.votesFor + proposal.votesAgainst + proposal.abstain) * 100}%`} 
            />
            <Box 
              bg="#F56565" 
              w={`${proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst + proposal.abstain) * 100}%`} 
            />
            <Box 
              bg="#A0AEC0" 
              w={`${proposal.abstain / (proposal.votesFor + proposal.votesAgainst + proposal.abstain) * 100}%`} 
            />
          </Flex>
          
          <Flex justify="space-between" fontSize="xs" color="gray.400">
            <Text>For ({proposal.votesFor})</Text>
            <Text>Against ({proposal.votesAgainst})</Text>
            <Text>Abstain ({proposal.abstain})</Text>
          </Flex>
        </Box>
        
        {/* Vote buttons */}
        <Flex justify="space-between" align="center">
          <HStack spacing={3}>
            <Button 
              leftIcon={<FaCheckCircle />} 
              colorScheme="green" 
              size="sm" 
              variant="solid"
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
              variant="ghost"
            >
              Abstain
            </Button>
          </HStack>
          
          <Button
            variant="outline"
            size="sm"
            borderColor="rgba(255, 255, 255, 0.2)"
            color="gray.300"
            onClick={onToggle}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
          >
            {isOpen ? "Less Info" : "More Info"}
          </Button>
        </Flex>
        
        {/* Collapsible details section */}
        <Collapse in={isOpen} animateOpacity>
          <Box mt={6} pt={6} borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Heading size="sm" color="gray.300" mb={3}>Shariah Compliance</Heading>
                <Box 
                  p={4} 
                  bg="rgba(0, 0, 0, 0.2)" 
                  borderRadius="md"
                >
                  <Text color="white" fontWeight="bold" mb={2}>Status: {proposal.shariahStatus}</Text>
                  <Text color="gray.400" fontSize="sm" mb={3}>Reviewed by:</Text>
                  {proposal.scholars.map((scholar, index) => (
                    <Text key={index} color="gray.300" fontSize="sm" ml={4}>• {scholar}</Text>
                  ))}
                </Box>
              </Box>
              
              <Box>
                <Heading size="sm" color="gray.300" mb={3}>Proposal Details</Heading>
                <Box 
                  p={4} 
                  bg="rgba(0, 0, 0, 0.2)" 
                  borderRadius="md"
                >
                  <Text color="white" mb={2}>Proposed by: {proposal.proposer}</Text>
                  <HStack color="gray.300" fontSize="sm">
                    <Icon as={FaInfoCircle} />
                    <Text>On-chain verification available</Text>
                  </HStack>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Collapse>
      </Box>
    </MotionBox>
  );
};

export default ProposalCard; 
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
  VStack,
  Divider,
  Tooltip,
  useDisclosure,
  Collapse,
  Grid,
  GridItem,
  Circle,
  chakra,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRegClock,
  FaUsers,
  FaInfoCircle,
  FaEthereum,
  FaVoteYea,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaShieldAlt,
  FaBalanceScale,
} from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionBadge = motion(Badge);

// Animation keyframes
const pulseKeyframes = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowKeyframes = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 224, 255, 0.3); }
  50% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 224, 255, 0.3); }
`;

const shineKeyframes = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const pulse = `${pulseKeyframes} 3s infinite`;
const glow = `${glowKeyframes} 3s infinite`;
const shine = `${shineKeyframes} 2s infinite`;

const ProposalCard = ({ proposal }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate time remaining with more precision
  const getTimeRemaining = (deadline) => {
    if (deadline.includes('days')) {
      return {
        value: parseInt(deadline.split(' ')[0]),
        unit: 'days',
        critical: parseInt(deadline.split(' ')[0]) <= 2
      };
    } else if (deadline.includes('hours')) {
      return {
        value: parseInt(deadline.split(' ')[0]),
        unit: 'hours',
        critical: true
      };
    }
    return { value: 0, unit: 'days', critical: false };
  };
  
  const timeRemaining = getTimeRemaining(proposal.deadline);
  
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
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        borderColor: "rgba(0, 224, 255, 0.3)"
      }}
    >
      {/* Decorative elements */}
      <Box 
        position="absolute" 
        top="-50px" 
        right="-50px" 
        width="200px" 
        height="200px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity="0.05" 
        filter="blur(60px)" 
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        bottom="-30px" 
        left="-30px" 
        width="150px" 
        height="150px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity="0.07" 
        filter="blur(50px)" 
        zIndex={0}
      />
      
      {/* Header section */}
      <Box 
        p={6} 
        borderBottomWidth="1px" 
        borderColor="rgba(255, 255, 255, 0.05)"
        position="relative"
        zIndex={1}
      >
        <Grid templateColumns="3fr 1fr" gap={4}>
          <GridItem>
            <HStack spacing={3} mb={4} flexWrap="wrap">
              <Badge 
                colorScheme="purple" 
                borderRadius="full" 
                px={3}
                py={1}
                fontSize="sm"
                bg="rgba(138, 124, 251, 0.2)"
                color="#8A7CFB"
              >
                {proposal.id}
              </Badge>
              
              <MotionBadge 
                colorScheme="blue" 
                borderRadius="full" 
                px={3}
                py={1}
                fontSize="sm"
                bg="rgba(0, 224, 255, 0.2)"
                color="#00E0FF"
                whileHover={{ scale: 1.05 }}
              >
                {proposal.category}
              </MotionBadge>
              
              <ShariahComplianceBadge 
                level={proposal.shariahStatus} 
                scholars={proposal.scholars}
                showDetails={true}
              />
            </HStack>
            
            <Heading 
              size="lg" 
              color="white" 
              mb={2}
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
              bgClip="text"
              fontWeight="bold"
            >
              {proposal.title}
            </Heading>
          </GridItem>
          
          <GridItem>
            <VStack spacing={2} align="flex-end">
              <Badge 
                colorScheme={timeRemaining.critical ? "red" : "green"} 
                borderRadius="full" 
                px={4} 
                py={2}
                display="flex"
                alignItems="center"
                fontSize="md"
                fontWeight="medium"
                bg={timeRemaining.critical ? "rgba(245, 101, 101, 0.2)" : "rgba(72, 187, 120, 0.2)"}
                color={timeRemaining.critical ? "#F56565" : "#48BB78"}
                borderWidth="1px"
                borderColor={timeRemaining.critical ? "rgba(245, 101, 101, 0.3)" : "rgba(72, 187, 120, 0.3)"}
                animation={timeRemaining.critical ? pulse : "none"}
              >
                <Icon as={FaRegClock} mr={2} />
                {proposal.deadline}
              </Badge>
              
              <HStack color="gray.300" fontSize="sm">
                <Icon as={FaUsers} />
                <Text>Proposed by: {proposal.proposer}</Text>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
      
      {/* Content section */}
      <Box p={6}>
        <Text color="gray.300" mb={6} fontSize="lg" lineHeight="1.7">
          {proposal.description}
        </Text>
        
        <Flex wrap="wrap" gap={3} mb={6}>
          {proposal.tags.map((tag, index) => (
            <MotionBadge 
              key={index} 
              colorScheme="gray" 
              borderRadius="full" 
              px={3} 
              py={1}
              fontSize="sm"
              bg="rgba(160, 174, 192, 0.1)"
              color="gray.300"
              borderWidth="1px"
              borderColor="rgba(160, 174, 192, 0.2)"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </MotionBadge>
          ))}
        </Flex>
        
        {/* Quorum progress */}
        <Box mb={6}>
          <Flex justify="space-between" mb={2} align="center">
            <HStack>
              <Icon as={FaUsers} color="#00E0FF" />
              <Text color="white" fontWeight="bold">Quorum Progress</Text>
            </HStack>
            <HStack>
              <Text color="#00E0FF" fontWeight="bold">
                {((proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100).toFixed(0)}%
              </Text>
              <Text color="gray.400">
                ({proposal.votesFor + proposal.votesAgainst + proposal.abstain} / {proposal.quorum})
              </Text>
            </HStack>
          </Flex>
          
          <Box position="relative" h="8px" w="full" bg="rgba(0, 0, 0, 0.2)" borderRadius="full" overflow="hidden" mb={1}>
            <Box 
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              width={`${(proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum * 100}%`}
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
              borderRadius="full"
              css={{
                animation: glow
              }}
            />
          </Box>
        </Box>
        
        {/* Current Results */}
        <Box mb={8}>
          <Flex justify="space-between" mb={2} align="center">
            <HStack>
              <Icon as={FaVoteYea} color="#8A7CFB" />
              <Text color="white" fontWeight="bold">Current Results</Text>
            </HStack>
            <Text color="gray.300" fontSize="sm">
              {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% in favor
            </Text>
          </Flex>
          
          <Flex h="30px" borderRadius="full" overflow="hidden" position="relative">
            <Box 
              bg="green.500" 
              w={`${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
              position="relative"
              overflow="hidden"
            >
              {isHovered && (
                <Box 
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="50%"
                  height="100%"
                  bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  css={{
                    animation: shine
                  }}
                />
              )}
            </Box>
            <Box 
              bg="red.500" 
              w={`${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
              position="relative"
              overflow="hidden"
            >
              {isHovered && (
                <Box 
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="50%"
                  height="100%"
                  bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  css={{
                    animation: shine
                  }}
                />
              )}
            </Box>
            <Box 
              bg="gray.500" 
              w={`${(proposal.abstain / (proposal.votesFor + proposal.votesAgainst + proposal.abstain)) * 100}%`} 
              position="relative"
              overflow="hidden"
            >
              {isHovered && (
                <Box 
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="50%"
                  height="100%"
                  bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  css={{
                    animation: shine
                  }}
                />
              )}
            </Box>
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
        
        {/* Voting buttons */}
        <Flex 
          justify="space-between" 
          align="center"
          pt={4}
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.05)"
        >
          <HStack spacing={3}>
            <Button 
              leftIcon={<FaCheckCircle />} 
              colorScheme="green" 
              size="md" 
              variant="solid"
              px={5}
              bg="rgba(72, 187, 120, 0.2)"
              color="#48BB78"
              borderWidth="1px"
              borderColor="rgba(72, 187, 120, 0.3)"
              _hover={{
                bg: "rgba(72, 187, 120, 0.3)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              position="relative"
              overflow="hidden"
            >
              {isHovered && (
                <Box 
                  position="absolute"
                  top="0"
                  left="-100%"
                  width="50%"
                  height="100%"
                  bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                  css={{
                    animation: shine
                  }}
                  zIndex={0}
                />
              )}
              <Box position="relative" zIndex={1}>Vote For</Box>
            </Button>
            
            <Button 
              leftIcon={<FaTimesCircle />} 
              colorScheme="red" 
              size="md" 
              variant="outline"
              px={5}
              _hover={{
                bg: "rgba(245, 101, 101, 0.1)",
                transform: "translateY(-2px)"
              }}
            >
              Vote Against
            </Button>
            
            <Button 
              colorScheme="gray" 
              size="md" 
              variant="ghost"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)"
              }}
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
            _hover={{
              borderColor: "#00E0FF",
              color: "#00E0FF"
            }}
          >
            {isOpen ? "Less Info" : "More Info"}
          </Button>
        </Flex>
        
        {/* Collapsible details section */}
        <Collapse in={isOpen} animateOpacity>
          <Box mt={6} pt={6} borderTop="1px dashed" borderColor="rgba(255, 255, 255, 0.1)">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Heading size="sm" color="gray.300" mb={3}>Shariah Compliance</Heading>
                <Box 
                  p={4} 
                  bg="rgba(0, 0, 0, 0.2)" 
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.05)"
                >
                  <HStack mb={2}>
                    <Icon as={FaShieldAlt} color="#8A7CFB" />
                    <Text color="white" fontWeight="bold">Status: {proposal.shariahStatus}</Text>
                  </HStack>
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
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.05)"
                >
                  <HStack mb={2}>
                    <Icon as={FaInfoCircle} color="#00E0FF" />
                    <Text color="white" fontWeight="bold">Proposal ID: {proposal.id}</Text>
                  </HStack>
                  <HStack mb={2}>
                    <Icon as={FaBalanceScale} color="#00E0FF" />
                    <Text color="gray.300" fontSize="sm">Category: {proposal.category}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaEthereum} color="#00E0FF" />
                    <Text color="gray.300" fontSize="sm">On-chain verification available</Text>
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
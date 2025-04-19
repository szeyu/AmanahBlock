import React from 'react';
import {
  Grid,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Icon,
  Avatar,
  Badge,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import { 
  FaFileAlt, 
  FaUserTie, 
  FaVoteYea, 
  FaRegLightbulb,
  FaGavel
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GovernanceInfoSection = () => {
  return (
    <SimpleGrid columns={1} spacing={8} width="100%" mb={10}>
      <Box 
        bg="rgba(26, 32, 44, 0.5)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={8}
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
        width="100%"
      >
        <Heading 
          size="lg" 
          color="white" 
          mb={6}
          pb={4}
          borderBottom="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          How Governance Works
        </Heading>
        <Text color="gray.300" fontSize="lg" mb={8}>
          SadaqahChain governance is a hybrid system combining traditional Islamic scholarly oversight with modern decentralized governance mechanisms.
        </Text>
        
        <SimpleGrid 
          columns={{ base: 1, md: 3 }} 
          spacing={8} 
          mb={8}
          width="100%"
        >
          <GovernanceStep 
            icon={FaFileAlt} 
            iconBg="rgba(128, 90, 213, 0.2)" 
            iconColor="accent.400"
            title="1. Proposal Creation"
            description="Any community member with at least 1,000 SDQ tokens can create a proposal for consideration."
          />
          
          <GovernanceStep 
            icon={FaUserTie} 
            iconBg="rgba(11, 197, 234, 0.2)" 
            iconColor="brand.400"
            title="2. Shariah Review"
            description="The Scholar Board reviews proposals for Shariah compliance and provides their assessment."
          />
          
          <GovernanceStep 
            icon={FaVoteYea} 
            iconBg="rgba(72, 187, 120, 0.2)" 
            iconColor="green.400"
            title="3. Community Voting"
            description="Token holders vote on proposals, with voting power proportional to token holdings."
          />
        </SimpleGrid>
        
        <Flex justify="center" width="100%">
          <Button 
            variant="outline" 
            rightIcon={<FaRegLightbulb />}
            as={Link}
            to="/learn/governance"
            size="lg"
            borderColor="brand.400"
            color="brand.400"
            _hover={{
              bg: "rgba(11, 197, 234, 0.1)",
              transform: "translateY(-2px)"
            }}
          >
            Learn More About Governance
          </Button>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

const GovernanceStep = ({ icon, iconBg, iconColor, title, description }) => {
  return (
    <VStack align="flex-start" spacing={4} width="100%">
      <Flex 
        w="60px" 
        h="60px" 
        bg={iconBg} 
        borderRadius="xl"
        justify="center"
        align="center"
        mb={2}
      >
        <Icon as={icon} color={iconColor} boxSize={7} />
      </Flex>
      <Heading size="md" color="white">{title}</Heading>
      <Text color="gray.300" fontSize="md">
        {description}
      </Text>
    </VStack>
  );
};

export default GovernanceInfoSection; 
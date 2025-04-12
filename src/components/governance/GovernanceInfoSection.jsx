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
  Badge
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
  const scholars = [
    { name: 'Dr. Ahmed Al-Haddad', role: 'Head Scholar', votes: '15.2%', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Dr. Yasmin Ibrahim', role: 'Finance Specialist', votes: '12.8%', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];

  return (
    <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={8} mb={10}>
      <Box 
        bg="rgba(26, 32, 44, 0.5)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={8}
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
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
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={8}>
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
        </Grid>
        
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
      </Box>
      
      <Box 
        bg="rgba(26, 32, 44, 0.5)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={8}
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      >
        <Heading 
          size="lg" 
          color="white" 
          mb={6}
          pb={4}
          borderBottom="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          Scholar Board
        </Heading>
        <Text color="gray.300" fontSize="lg" mb={6}>
          Our governance is guided by a diverse board of Islamic scholars who ensure all activities remain Shariah-compliant.
        </Text>
        
        <VStack spacing={6} align="stretch" mb={8}>
          {scholars.map((scholar, index) => (
            <Flex 
              key={index} 
              align="center" 
              justify="space-between"
              p={4}
              borderRadius="lg"
              bg="rgba(255, 255, 255, 0.05)"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                transform: "translateY(-2px)",
                transition: "all 0.3s ease"
              }}
            >
              <HStack spacing={4}>
                <Avatar src={scholar.image} name={scholar.name} size="md" />
                <Box>
                  <Text color="white" fontWeight="medium" fontSize="lg">{scholar.name}</Text>
                  <Text color="brand.300" fontSize="md">{scholar.role}</Text>
                </Box>
              </HStack>
              <Badge 
                colorScheme="purple" 
                borderRadius="full" 
                px={3}
                py={1}
                fontSize="md"
              >
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
          size="lg"
          borderColor="accent.400"
          color="accent.400"
          _hover={{
            bg: "rgba(128, 90, 213, 0.1)",
            transform: "translateY(-2px)"
          }}
        >
          View All Scholars
        </Button>
      </Box>
    </Grid>
  );
};

const GovernanceStep = ({ icon, iconBg, iconColor, title, description }) => {
  return (
    <VStack align="flex-start" spacing={4}>
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
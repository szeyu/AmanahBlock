import React, { useState } from 'react';
import {
  Box,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import VotingPieChart from './VotingPieChart';

const MotionBox = motion(Box);

const ProposalCard = ({
  emergencyProjects,
  projectProjects,
  governanceProjects,
  userTokens,
  onVote,
}) => {
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
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={8}
        width="100%"
        p={6}
      >
        <VotingPieChart
          title="Emergency Fund Allocation"
          data={emergencyProjects}
          timeframe="3 days"
          colorScheme="red"
          width="100%"
          userTokens={userTokens}
          onVote={(projectId, tokenAmount) => onVote(projectId, tokenAmount, 'emergency')}
        />
        <VotingPieChart
          title="Project Fund Allocation"
          data={projectProjects}
          timeframe="7 days"
          colorScheme="blue"
          width="100%"
          userTokens={userTokens}
          onVote={(projectId, tokenAmount) => onVote(projectId, tokenAmount, 'project')}
        />
        <VotingPieChart
          title="Protocol & Governance Changes"
          data={governanceProjects}
          timeframe="30 days"
          colorScheme="purple"
          width="100%"
          userTokens={userTokens}
          onVote={(projectId, tokenAmount) => onVote(projectId, tokenAmount, 'governance')}
        />
      </SimpleGrid>
    </MotionBox>
  );
};

export default ProposalCard; 
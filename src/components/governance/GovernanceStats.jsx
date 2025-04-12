import React, { useEffect } from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Box,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEthereum, FaUsers, FaVoteYea } from 'react-icons/fa';
import { RiGovernmentLine } from 'react-icons/ri';

const MotionBox = motion(Box);

const GovernanceStats = ({ stats }) => {
  return (
    <Grid 
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
      gap={6} 
      mb={10}
    >
      <StatCard 
        label="Total Proposals" 
        value={stats.totalProposals} 
        helpText={`${stats.activeProposals} active now`} 
        icon={RiGovernmentLine}
        index={0}
      />
      
      <StatCard 
        label="Proposal Pass Rate" 
        value={`${stats.passRate}%`} 
        helpText="Last 30 days" 
        icon={FaVoteYea}
        index={1}
      />
      
      <StatCard 
        label="Governance Participants" 
        value={stats.tokenHolders.toLocaleString()} 
        helpText={`${stats.avgParticipation}% avg. participation`} 
        icon={FaUsers}
        index={2}
      />
      
      <StatCard 
        label="Treasury Balance" 
        value={`${stats.treasuryBalance.toLocaleString()} USDT`} 
        helpText="Available for allocation"
        icon={FaEthereum}
        index={3}
      />
    </Grid>
  );
};

const StatCard = ({ label, value, helpText, icon, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1, duration: 0.5 }
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Stat 
        bg="rgba(13, 16, 31, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={6}
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.1)"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        height="180px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        _hover={{
          borderColor: "#00E0FF",
        }}
      >
        <Box>
          <Flex align="center" mb={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0, 224, 255, 0.1)"
              color="#00E0FF"
              borderRadius="full"
              p={2}
              mr={3}
              w="36px"
              h="36px"
            >
              <Icon as={icon} w={5} h={5} />
            </Box>
            <StatLabel color="gray.300" fontSize="md" fontWeight="medium">{label}</StatLabel>
          </Flex>
          
          <StatNumber 
            color="white" 
            fontSize="2xl" 
            fontWeight="bold"
          >
            {value}
          </StatNumber>
        </Box>
        
        <StatHelpText 
          color="#00E0FF" 
          fontSize="sm"
          mt={2}
        >
          {helpText}
        </StatHelpText>
      </Stat>
    </MotionBox>
  );
};

export default GovernanceStats; 
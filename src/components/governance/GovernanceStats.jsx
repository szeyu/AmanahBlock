import React from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Icon,
  Box
} from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';

const GovernanceStats = ({ stats }) => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={10}>
      <StatCard 
        label="Total Proposals" 
        value={stats.totalProposals} 
        helpText={`${stats.activeProposals} active now`} 
      />
      
      <StatCard 
        label="Proposal Pass Rate" 
        value={`${stats.passRate}%`} 
        helpText="Last 30 days" 
      />
      
      <StatCard 
        label="Governance Participants" 
        value={stats.tokenHolders.toLocaleString()} 
        helpText={`${stats.avgParticipation}% avg. participation`} 
      />
      
      <StatCard 
        label="Treasury Balance" 
        value={`${stats.treasuryBalance.toLocaleString()} USDT`} 
        helpText="Available for allocation"
        icon={FaEthereum}
      />
    </Grid>
  );
};

const StatCard = ({ label, value, helpText, icon }) => {
  return (
    <Stat 
      bg="rgba(26, 32, 44, 0.5)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={5}
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      _hover={{
        borderColor: "brand.500",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease"
      }}
    >
      <StatLabel color="gray.300" fontSize="sm">{label}</StatLabel>
      {icon ? (
        <HStack>
          <Icon as={icon} color="brand.400" />
          <StatNumber color="white" fontSize="2xl">{value}</StatNumber>
        </HStack>
      ) : (
        <StatNumber color="white" fontSize="2xl">{value}</StatNumber>
      )}
      <StatHelpText color="brand.300">
        {helpText}
      </StatHelpText>
    </Stat>
  );
};

export default GovernanceStats; 
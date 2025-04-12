import React from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Box,
  Tooltip
} from '@chakra-ui/react';
import { FaChartLine, FaHandHoldingHeart, FaProjectDiagram, FaUsers, FaGlobe } from 'react-icons/fa';

const DefiStats = ({ stats }) => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }} gap={6} mb={8}>
      <Tooltip label="Total value of donations invested in Shariah-compliant pools">
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          cursor="help"
        >
          <StatLabel color="gray.300">Total Value Invested</StatLabel>
          <StatNumber color="white">${(stats.totalValueLocked/1000000).toFixed(1)}M</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaChartLine} mr={1} />
            Growing steadily
          </StatHelpText>
        </Stat>
      </Tooltip>
      
      <Tooltip label="Number of donors whose contributions are invested in these pools">
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          cursor="help"
        >
          <StatLabel color="gray.300">Contributing Donors</StatLabel>
          <StatNumber color="white">{stats.activeInvestors}</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaGlobe} mr={1} />
            Across 45 countries
          </StatHelpText>
        </Stat>
      </Tooltip>
      
      <Tooltip label="Average annual return across all investment pools">
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          cursor="help"
        >
          <StatLabel color="gray.300">Average Return</StatLabel>
          <StatNumber color="white">{stats.averageReturn}%</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaChartLine} mr={1} />
            Annualized
          </StatHelpText>
        </Stat>
      </Tooltip>
      
      <Tooltip label="Number of charitable projects funded by returns from these pools">
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          cursor="help"
        >
          <StatLabel color="gray.300">Projects Funded</StatLabel>
          <StatNumber color="white">{stats.projectsFunded}</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaProjectDiagram} mr={1} />
            100% Shariah-compliant
          </StatHelpText>
        </Stat>
      </Tooltip>
      
      <Tooltip label="Total returns generated and reinvested in charitable projects">
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          cursor="help"
        >
          <StatLabel color="gray.300">Returns Generated</StatLabel>
          <StatNumber color="white">${(stats.totalReturns/1000).toFixed(1)}K</StatNumber>
          <StatHelpText color="green.400">
            <Icon as={FaHandHoldingHeart} mr={1} />
            Reinvested in charity
          </StatHelpText>
        </Stat>
      </Tooltip>
    </Grid>
  );
};

export default DefiStats; 
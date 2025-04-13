import React from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Box,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaChartLine, FaProjectDiagram, FaMoneyBillWave, FaAward } from 'react-icons/fa';

const StatCards = ({ donationStats }) => {
  // Define card data with icons and gradients
  const cards = [
    {
      label: "Total Donations",
      value: `${donationStats.total} USDT`,
      change: 23.36,
      changeType: "increase",
      icon: FaMoneyBillWave,
      gradient: "linear(to-r, #3182CE, #63B3ED)",
      glow: "rgba(49, 130, 206, 0.4)",
    },
    {
      label: "Active Projects",
      value: donationStats.activeProjects,
      subtext: "From 3 pools",
      icon: FaProjectDiagram,
      gradient: "linear(to-r, #805AD5, #B794F4)",
      glow: "rgba(128, 90, 213, 0.4)",
    },
    {
      label: "Investment Returns",
      value: `${donationStats.investmentReturns} USDT`,
      change: 5.8,
      changeType: "increase",
      icon: FaChartLine,
      gradient: "linear(to-r, #38A169, #68D391)",
      glow: "rgba(56, 161, 105, 0.4)",
    },
    {
      label: "Impact Score",
      value: `${donationStats.impactScore}/100`,
      subtext: "Excellent",
      subtextColor: "blue.400",
      icon: FaAward,
      gradient: "linear(to-r, #DD6B20, #F6AD55)",
      glow: "rgba(221, 107, 32, 0.4)",
    },
  ];

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
      {cards.map((card, index) => (
        <Box
          key={index}
          bg="rgba(13, 16, 25, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.700"
          overflow="hidden"
          position="relative"
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: `0 10px 20px ${card.glow}`,
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: "-1px",
            left: "-1px",
            right: "-1px",
            bottom: "-1px",
            borderRadius: "xl",
            padding: "1px",
            background: card.gradient,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            zIndex: 0,
            opacity: 0.7,
          }}
        >
          <Stat p={4} position="relative" zIndex="1">
            <Flex justify="space-between" align="flex-start">
              <Box>
                <StatLabel color="gray.300">{card.label}</StatLabel>
                <StatNumber color="white" fontSize="2xl" fontWeight="bold" mt={1}>
                  {card.value}
                </StatNumber>
                {card.change ? (
                  <StatHelpText color={card.changeType === "increase" ? "green.400" : "red.400"}>
                    <StatArrow type={card.changeType} />
                    {card.change}%
                  </StatHelpText>
                ) : (
                  <StatHelpText color={card.subtextColor || "gray.300"}>
                    {card.subtext}
                  </StatHelpText>
                )}
              </Box>
              <Box 
                p={2} 
                borderRadius="lg" 
                bgGradient={card.gradient}
                boxShadow={`0 4px 12px ${card.glow}`}
              >
                <Icon as={card.icon} boxSize={6} color="white" />
              </Box>
            </Flex>
          </Stat>
        </Box>
      ))}
    </Grid>
  );
};

export default StatCards; 
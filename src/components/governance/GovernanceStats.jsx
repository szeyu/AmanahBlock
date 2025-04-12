import React, { useEffect, useRef } from 'react';
import {
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Icon,
  Box,
  Flex,
  Text,
  Circle,
  useToken
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { keyframes } from '@emotion/react';
import { FaEthereum, FaUsers, FaVoteYea, FaChartLine } from 'react-icons/fa';
import { RiGovernmentLine } from 'react-icons/ri';

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);
const MotionFlex = motion(Flex);

// Animation keyframes
const glowKeyframes = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 224, 255, 0.3); }
  50% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 224, 255, 0.3); }
`;

const glow = `${glowKeyframes} 3s infinite`;

const GovernanceStats = ({ stats }) => {
  const controls = useAnimation();
  const [cyan400, purple400] = useToken('colors', ['cyan.400', 'purple.400']);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    });
  }, [controls]);

  return (
    <Grid 
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
      gap={6} 
      mb={10}
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <StatCard 
        label="Total Proposals" 
        value={stats.totalProposals} 
        helpText={`${stats.activeProposals} active now`} 
        icon={RiGovernmentLine}
        accentColor={cyan400}
        index={0}
      />
      
      <StatCard 
        label="Proposal Pass Rate" 
        value={`${stats.passRate}%`} 
        helpText="Last 30 days" 
        icon={FaVoteYea}
        accentColor={purple400}
        index={1}
      />
      
      <StatCard 
        label="Governance Participants" 
        value={stats.tokenHolders.toLocaleString()} 
        helpText={`${stats.avgParticipation}% avg. participation`} 
        icon={FaUsers}
        accentColor={cyan400}
        index={2}
      />
      
      <StatCard 
        label="Treasury Balance" 
        value={`${stats.treasuryBalance.toLocaleString()} USDT`} 
        helpText="Available for allocation"
        icon={FaEthereum}
        accentColor={purple400}
        index={3}
      />
    </Grid>
  );
};

const StatCard = ({ label, value, helpText, icon, accentColor, index }) => {
  const cardRef = useRef(null);
  
  return (
    <MotionBox
      ref={cardRef}
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
        borderColor="rgba(255, 255, 255, 0.05)"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          borderColor: accentColor,
        }}
      >
        {/* Background elements */}
        <Box 
          position="absolute" 
          top="-30px" 
          right="-30px" 
          width="150px" 
          height="150px" 
          borderRadius="full" 
          bg={accentColor} 
          opacity="0.05" 
          filter="blur(40px)" 
          zIndex={0}
        />
        
        <MotionCircle
          position="absolute"
          top="20px"
          right="20px"
          size="50px"
          bg={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : "138, 124, 251"}, 0.1)`}
          borderWidth="1px"
          borderColor={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : "138, 124, 251"}, 0.3)`}
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            transition: { 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          zIndex={0}
        />
        
        <Box position="relative" zIndex={1}>
          <Flex align="center" mb={3}>
            <MotionCircle
              size="40px"
              bg={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : "138, 124, 251"}, 0.1)`}
              color={accentColor}
              mr={3}
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: 360,
                transition: { 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }
              }}
            >
              <Icon as={icon} w={5} h={5} />
            </MotionCircle>
            <StatLabel color="gray.300" fontSize="md" fontWeight="medium">{label}</StatLabel>
          </Flex>
          
          <StatNumber 
            color="white" 
            fontSize="2xl" 
            fontWeight="bold"
            bgGradient={`linear(to-r, ${accentColor}, ${accentColor === "#00E0FF" ? "#8A7CFB" : "#00E0FF"})`}
            bgClip="text"
          >
            {value}
          </StatNumber>
          
          <StatHelpText 
            color={accentColor} 
            fontSize="sm"
            mt={2}
          >
            {helpText}
          </StatHelpText>
        </Box>
      </Stat>
    </MotionBox>
  );
};

export default GovernanceStats; 
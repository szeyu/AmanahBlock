import React from 'react';
import { Box, Container, Heading, Text, Grid, Flex, Icon, VStack, Circle } from '@chakra-ui/react';
import { 
  FaHandHoldingHeart, 
  FaWallet, 
  FaProjectDiagram, 
  FaChartLine 
} from 'react-icons/fa';

const StepCard = ({ number, icon, title, description, accentColor }) => (
  <Box 
    bg="rgba(13, 16, 31, 0.7)"
    backdropFilter="blur(10px)"
    borderRadius="xl"
    p={8}
    pt={12}
    position="relative"
    borderWidth="1px"
    borderColor="rgba(255, 255, 255, 0.05)"
    transition="all 0.3s"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${accentColor}30`,
      borderColor: accentColor
    }}
    overflow="visible"
  >
    {/* Glowing number */}
    <Circle 
      position="absolute"
      top="-30px"
      left="50%"
      transform="translateX(-50%)"
      size="60px"
      bg={accentColor}
      color="white"
      fontWeight="bold"
      fontSize="xl"
      boxShadow={`0 0 20px ${accentColor}`}
      zIndex={2}
      border="3px solid rgba(255, 255, 255, 0.3)"
    >
      {number}
    </Circle>
    
    {/* Background glow */}
    <Box 
      position="absolute"
      top="-50%"
      right="-50%"
      width="200px"
      height="200px"
      borderRadius="full"
      bg={accentColor}
      opacity="0.05"
      filter="blur(40px)"
      zIndex={0}
    />
    
    <VStack align="center" spacing={4} position="relative" zIndex={1}>
      <Flex 
        w="60px" 
        h="60px" 
        bg={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : 
                accentColor === "#8A7CFB" ? "138, 124, 251" : 
                accentColor === "#FF5A5A" ? "255, 90, 90" : 
                "72, 187, 120"}, 0.1)`} 
        borderRadius="xl"
        justify="center"
        align="center"
        mb={2}
      >
        <Icon as={icon} color={accentColor} boxSize={7} />
      </Flex>
      <Heading size="md" color="white" fontWeight="bold" textAlign="center">{title}</Heading>
      <Text color="gray.300" fontSize="md" textAlign="center">
        {description}
      </Text>
    </VStack>
  </Box>
);

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FaHandHoldingHeart,
      title: "Choose Donation Type",
      description: "Select between Waqf, Zakat, or Sadaqah based on your intention.",
      accentColor: "#00E0FF"
    },
    {
      number: "02",
      icon: FaWallet,
      title: "Connect Wallet",
      description: "Securely connect your crypto wallet to make the donation.",
      accentColor: "#8A7CFB"
    },
    {
      number: "03",
      icon: FaProjectDiagram,
      title: "Select Project",
      description: "Choose a specific cause or let us allocate where needed most.",
      accentColor: "#FF5A5A"
    },
    {
      number: "04",
      icon: FaChartLine,
      title: "Track Impact",
      description: "Monitor your donation's journey and impact in real-time.",
      accentColor: "#48BB78"
    }
  ];

  return (
    <Box 
      py={20} 
      bg="#0A0F1E" 
      position="relative" 
      overflow="hidden"
      style={{ marginTop: "-2px" }}
    >
      {/* Background elements */}
      <Box 
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial-gradient(circle at 80% 20%, rgba(138, 124, 251, 0.1) 0%, transparent 40%), 
                     radial-gradient(circle at 20% 80%, rgba(0, 224, 255, 0.05) 0%, transparent 40%)"
        opacity={0.8}
        zIndex={0}
      />
      
      {/* Hexagon grid pattern with reduced opacity */}
      <Box 
        className="hexagon-grid" 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0} 
        opacity={0.03} 
        zIndex={0}
      />
      
      {/* Floating orbs */}
      <Box 
        position="absolute" 
        top="30%" 
        left="5%" 
        w="100px" 
        h="100px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity={0.1} 
        filter="blur(40px)"
        animation="float 10s infinite alternate ease-in-out"
      />
      
      <Box 
        position="absolute" 
        bottom="20%" 
        right="10%" 
        w="150px" 
        h="150px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity={0.1} 
        filter="blur(60px)"
        animation="float 12s infinite alternate-reverse ease-in-out"
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={4} mb={16} textAlign="center">
          <Heading 
            as="h2" 
            size="xl" 
            mb={2}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
            bgClip="text"
            fontWeight="bold"
          >
            How It Works
          </Heading>
          <Text color="gray.400" maxW="container.md" mx="auto" fontSize="lg">
            Our blockchain-based platform ensures transparency and Shariah compliance at every step
          </Text>
        </VStack>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection; 
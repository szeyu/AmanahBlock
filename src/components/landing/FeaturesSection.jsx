import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, Grid, VStack, Icon, Circle } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  FaGlobeAfrica, 
  FaUserCircle, 
  FaExclamationTriangle,
  FaProjectDiagram
} from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, buttonText, buttonLink, accentColor = "#00E0FF" }) => (
  <Box 
    className="card" 
    p={8} 
    textAlign="center"
    bg="rgba(13, 16, 31, 0.7)"
    backdropFilter="blur(10px)"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="rgba(255, 255, 255, 0.05)"
    transition="all 0.3s"
    position="relative"
    overflow="hidden"
    height="100%"
    display="flex"
    flexDirection="column"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${accentColor}30`,
      borderColor: accentColor
    }}
  >
    {/* Background glow */}
    <Box 
      position="absolute"
      top="-30%"
      left="-30%"
      width="200px"
      height="200px"
      borderRadius="full"
      bg={accentColor}
      opacity="0.05"
      filter="blur(40px)"
      zIndex={0}
    />
    
    <VStack spacing={6} position="relative" zIndex={1} height="100%" justify="space-between">
      <Box width="100%">
        <Flex justify="center" mb={4}>
          <Circle 
            size="80px" 
            bg={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : 
                    accentColor === "#8A7CFB" ? "138, 124, 251" : 
                    accentColor === "#FF5A5A" ? "255, 90, 90" : 
                    "72, 187, 120"}, 0.1)`} 
            color={accentColor}
          >
            <Icon as={icon} w={8} h={8} />
          </Circle>
        </Flex>
        
        <Heading as="h3" size="lg" mb={2} color="white" fontWeight="bold">{title}</Heading>
        
        <Text color="gray.300" fontSize="md">
          {description}
        </Text>
      </Box>
      
      <Button 
        as={Link} 
        to={buttonLink} 
        variant="outline" 
        borderColor={accentColor}
        color={accentColor}
        borderWidth="2px"
        w="full"
        py={6}
        _hover={{
          bg: `rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : 
                accentColor === "#8A7CFB" ? "138, 124, 251" : 
                accentColor === "#FF5A5A" ? "255, 90, 90" : 
                "72, 187, 120"}, 0.1)`,
          transform: "translateY(-2px)",
          boxShadow: `0 0 15px ${accentColor}50`
        }}
        transition="all 0.3s ease"
      >
        {buttonText}
      </Button>
    </VStack>
  </Box>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: FaGlobeAfrica,
      title: "Impact Explorer",
      description: "Visualize the real-world impact of donations with interactive maps and metrics.",
      buttonText: "Explore Impact",
      buttonLink: "/impact",
      accentColor: "#00E0FF"
    },
    {
      icon: FaUserCircle,
      title: "Beneficiary Feedback",
      description: "Hear directly from those who benefit from your donations with verified testimonials.",
      buttonText: "View Feedback",
      buttonLink: "/beneficiary-feedback",
      accentColor: "#8A7CFB"
    },
    {
      icon: FaExclamationTriangle,
      title: "Emergency Fund",
      description: "Support rapid response to humanitarian crises with our emergency fund.",
      buttonText: "Support Emergencies",
      buttonLink: "/emergency-fund",
      accentColor: "#FF5A5A"
    },
    {
      icon: FaProjectDiagram,
      title: "Funding Tracker",
      description: "Monitor the progress of projects and see how funds are being allocated.",
      buttonText: "Track Funding",
      buttonLink: "/project-funding",
      accentColor: "#48BB78"
    }
  ];

  return (
    <Box 
      py={20} 
      bg="#0D101F" 
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
        bgGradient="radial-gradient(circle at 30% 70%, rgba(0, 224, 255, 0.08) 0%, transparent 50%), 
                     radial-gradient(circle at 70% 30%, rgba(138, 124, 251, 0.08) 0%, transparent 50%)"
        opacity={0.8}
        zIndex={0}
      />
      
      {/* Floating orbs */}
      <Box 
        position="absolute" 
        top="20%" 
        right="10%" 
        w="120px" 
        h="120px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity={0.1} 
        filter="blur(40px)"
        animation="float 12s infinite alternate ease-in-out"
      />
      
      <Box 
        position="absolute" 
        bottom="10%" 
        left="5%" 
        w="150px" 
        h="150px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity={0.1} 
        filter="blur(60px)"
        animation="float 15s infinite alternate-reverse ease-in-out"
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
            Platform Features
          </Heading>
          <Text color="gray.400" maxW="container.md" mx="auto" fontSize="lg">
            Explore the innovative tools and features that make SadaqahChain unique
          </Text>
        </VStack>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection; 
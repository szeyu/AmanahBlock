import React from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Icon, SimpleGrid, Circle } from '@chakra-ui/react';
import { FaUserPlus, FaProjectDiagram, FaDonate, FaCheckCircle } from 'react-icons/fa';

const StepCard = ({ icon, title, description, stepNumber, accentColor }) => (
  <VStack 
    spacing={4} 
    align="center" 
    textAlign="center" 
    p={6}
    bg="rgba(13, 16, 31, 0.5)" // Keep card background
    backdropFilter="blur(8px)"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="rgba(255, 255, 255, 0.08)"
    height="100%"
  >
    <Circle size="60px" bg={`rgba(${accentColor === "#00E0FF" ? "0, 224, 255" : "138, 124, 251"}, 0.1)`} color={accentColor} mb={2}>
      <Icon as={icon} w={6} h={6} />
    </Circle>
    <Text fontWeight="bold" fontSize="sm" color={accentColor}>STEP {stepNumber}</Text>
    <Heading as="h4" size="md" color="white" fontWeight="semibold">{title}</Heading>
    <Text color="gray.300" fontSize="sm">{description}</Text>
  </VStack>
);

const HowItWorksSection = () => {
  const steps = [
    { icon: FaUserPlus, title: "Sign Up & Verify", description: "Create your secure account and complete identity verification (KYC).", stepNumber: 1, accentColor: "#00E0FF" },
    { icon: FaProjectDiagram, title: "Explore Projects", description: "Browse verified charitable projects aligned with Shariah principles.", stepNumber: 2, accentColor: "#8A7CFB" },
    { icon: FaDonate, title: "Donate Securely", description: "Contribute using cryptocurrency or fiat, recorded transparently on the blockchain.", stepNumber: 3, accentColor: "#00E0FF" },
    { icon: FaCheckCircle, title: "Track Impact", description: "Follow your donation's journey and see its real-world impact verified on-chain.", stepNumber: 4, accentColor: "#8A7CFB" },
  ];

  return (
    <Box 
      py={20} 
      bg="transparent" // Ensure transparent background
      position="relative" // Keep relative for zIndex context
      zIndex={1} // Ensure content is above LandingPage background
      overflow="visible"
    >
      <Container maxW="container.xl" mb={50}>
        <VStack spacing={4} mb={12} textAlign="center">
        <Heading 
            as="h2" 
            size="xl" 
            mb={2}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
            bgClip="text"
            fontWeight="bold"
          >
            How AmanahBlock Works
          </Heading>
          <Text color="gray.400" maxW="container.md" mx="auto" fontSize="lg">
            A simple, transparent process for impactful giving.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {steps.map((step) => (
            <StepCard key={step.stepNumber} {...step} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection; 
import React from 'react';
import { Box, Container, Heading, Text, Button, VStack, HStack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react'; // Keep keyframes for shine
import { FaArrowRight } from 'react-icons/fa';

// Keyframes for button shine animation
const shine = keyframes`
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
`;

const CTASection = () => {
  return (
    <Box 
      bg="transparent" // Ensure transparent background
      py={20}
      position="relative" // Keep relative for zIndex context
      zIndex={1} // Ensure content is above LandingPage background
      overflow="visible"
    >
      {/* Ensure all background elements (gradients, orbs) specific to this section are removed */}
      
      <Container maxW="container.lg" textAlign="center">
        <VStack spacing={6}>
          <Heading 
            as="h2" 
            size="2xl" 
            fontWeight="bold"
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
            bgClip="text"
          >
            Ready to Make a Transparent Impact?
          </Heading>
          <Text fontSize="xl" color="gray.300" maxW="container.md" mx="auto">
            Join AmanahBlock today. Explore verified projects, donate securely, and track your contribution's journey on the blockchain.
          </Text>
          <HStack spacing={4} pt={4}>
            <Button
              as={Link}
              to="/projects"
              size="lg"
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
              color="white"
              fontWeight="bold"
              px={8}
              py={7}
              position="relative"
              overflow="hidden"
              _hover={{ opacity: 0.9, boxShadow: "0 0 20px rgba(0, 224, 255, 0.5)"}}
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  animation: `${shine} 1.5s infinite`,
                  zIndex: 1,
                }
              }}
            >
              Explore Projects
            </Button>
            <Button
              as={Link}
              to="/how-it-works" // Or maybe '/about' or '/learn-more'
              size="lg"
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.3)"
              color="white"
              fontWeight="medium"
              px={8}
              py={7}
              rightIcon={<FaArrowRight />}
              _hover={{ borderColor: "#00E0FF", color: "#00E0FF", bg: "rgba(0, 224, 255, 0.1)" }}
            >
              Learn More
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default CTASection; 
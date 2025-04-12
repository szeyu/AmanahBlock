import React from 'react';
import { Box, Container, Heading, Text, Button, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <Box 
      py={20} 
      position="relative"
      bg="#0A0F1E"
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
        bgGradient="radial-gradient(circle at 50% 50%, rgba(138, 124, 251, 0.15) 0%, transparent 70%)"
        opacity={0.8}
        zIndex={0}
      />
      
      <Box className="hexagon-grid" position="absolute" top={0} left={0} right={0} bottom={0} opacity={0.03} />
      
      {/* Floating orbs */}
      <Box 
        position="absolute" 
        top="30%" 
        left="20%" 
        w="150px" 
        h="150px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity={0.1} 
        filter="blur(60px)"
        animation="float 12s infinite alternate ease-in-out"
      />
      
      <Box 
        position="absolute" 
        bottom="20%" 
        right="15%" 
        w="180px" 
        h="180px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity={0.1} 
        filter="blur(70px)"
        animation="float 15s infinite alternate-reverse ease-in-out"
      />
      
      <Container maxW="container.lg" position="relative" zIndex={1}>
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          bg="rgba(13, 16, 31, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.05)"
          p={{ base: 8, md: 16 }}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative elements */}
          <Box 
            position="absolute" 
            top="-50px" 
            left="-50px" 
            w="200px" 
            h="200px" 
            borderRadius="full" 
            bg="#00E0FF" 
            opacity={0.05} 
            filter="blur(60px)" 
          />
          
          <Box 
            position="absolute" 
            bottom="-50px" 
            right="-50px" 
            w="200px" 
            h="200px" 
            borderRadius="full" 
            bg="#8A7CFB" 
            opacity={0.05} 
            filter="blur(60px)" 
          />
          
          <Heading 
            as="h2" 
            size="xl" 
            mb={6}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
            bgClip="text"
            fontWeight="bold"
          >
            Ready to Make a Difference?
          </Heading>
          
          <Text fontSize="xl" color="gray.300" mb={10} maxW="container.sm">
            Join thousands of Muslims worldwide who are using blockchain technology to make their charitable giving more impactful.
          </Text>
          
          <Button 
            as={Link} 
            to="/signup" 
            size="lg" 
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
            _hover={{ 
              bgGradient: "linear(to-r, #00E0FF, #8A7CFB)",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px -5px rgba(138, 124, 251, 0.4)"
            }}
            color="white"
            px={10}
            py={7}
            borderRadius="xl"
            mb={4}
            transition="all 0.3s ease"
            fontWeight="bold"
          >
            Get Started
          </Button>
          
          <Text color="gray.400" fontSize="md" mt={2}>
            Already have an account? <ChakraLink as={Link} to="/login" color="#00E0FF" _hover={{ textDecoration: "underline" }}>Login here</ChakraLink>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default CTASection; 
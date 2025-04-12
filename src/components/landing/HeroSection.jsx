import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, HStack, Icon, Badge, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaShieldAlt, FaEthereum, FaLock } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <Box 
      position="relative"
      overflow="hidden"
      bg="#0A0F1E"
      py={20}
      minH="90vh"
      display="flex"
      alignItems="center"
    >
      {/* Animated gradient background */}
      <Box 
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial-gradient(circle at 20% 30%, rgba(128, 90, 213, 0.15) 0%, transparent 40%), 
                     radial-gradient(circle at 80% 70%, rgba(11, 197, 234, 0.1) 0%, transparent 40%)"
        opacity={0.8}
        zIndex={0}
      />
      
      {/* Floating elements */}
      <Box 
        position="absolute" 
        top="20%" 
        right="15%" 
        w="120px" 
        h="120px" 
        borderRadius="full" 
        bg="brand.500" 
        opacity={0.2} 
        filter="blur(40px)"
        animation="float 8s infinite alternate ease-in-out"
      />
      
      <Box 
        position="absolute" 
        bottom="15%" 
        left="10%" 
        w="150px" 
        h="150px" 
        borderRadius="full" 
        bg="accent.500" 
        opacity={0.15} 
        filter="blur(50px)"
        animation="float 10s infinite alternate-reverse ease-in-out"
      />
      
      <Box 
        position="absolute" 
        top="60%" 
        right="25%" 
        w="80px" 
        h="80px" 
        borderRadius="full" 
        bg="cyan.400" 
        opacity={0.2} 
        filter="blur(30px)"
        animation="float 6s infinite alternate ease-in-out"
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between">
          <Box flex="1" pr={{ lg: 10 }} maxW={{ lg: "600px" }}>
            <Badge 
              colorScheme="purple" 
              mb={6} 
              p={2} 
              borderRadius="full"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
              boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
            >
              Shariah-Compliant Blockchain
            </Badge>
            
            <Heading 
              as="h1" 
              size="2xl" 
              mb={8} 
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
              bgClip="text"
              lineHeight="1.2"
              letterSpacing="tight"
              fontWeight="bold"
            >
              Transparent Islamic Charity on the Blockchain
            </Heading>
            
            <Text fontSize="xl" mb={10} color="gray.300" lineHeight="1.7">
              Make your donations with complete transparency and Shariah compliance. 
              Every transaction is tracked on the blockchain, ensuring your charity 
              reaches those who need it most.
            </Text>
            
            <HStack spacing={6} mb={12}>
              <Button 
                as={Link} 
                to="/donate" 
                size="lg" 
                bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
                _hover={{ 
                  bgGradient: "linear(to-r, #00E0FF, #8A7CFB)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px -5px rgba(138, 124, 251, 0.5)"
                }}
                color="white"
                px={8}
                py={7}
                borderRadius="xl"
                transition="all 0.3s ease"
                fontWeight="bold"
                leftIcon={<FaHandHoldingHeart />}
              >
                Donate Now
              </Button>
              
              <Button 
                as={Link} 
                to="/learn-more" 
                size="lg" 
                variant="outline" 
                borderColor="#00E0FF"
                color="#00E0FF"
                borderWidth="2px"
                _hover={{
                  bg: "rgba(0, 224, 255, 0.1)",
                  transform: "translateY(-2px)"
                }}
                px={8}
                py={7}
                borderRadius="xl"
                transition="all 0.3s ease"
              >
                Learn More
              </Button>
            </HStack>
            
            {/* Trust indicators */}
            <Flex wrap="wrap" gap={8}>
              <HStack>
                <Icon as={FaLock} color="#00E0FF" boxSize={5} />
                <Text color="gray.400">Secure & Transparent</Text>
              </HStack>
              <HStack>
                <Icon as={FaShieldAlt} color="#8A7CFB" boxSize={5} />
                <Text color="gray.400">Shariah Certified</Text>
              </HStack>
              <HStack>
                <Icon as={FaEthereum} color="#00E0FF" boxSize={5} />
                <Text color="gray.400">Low Gas Fees</Text>
              </HStack>
            </Flex>
          </Box>
          
          {/* Hero visual - 3D blockchain visualization */}
          <Box 
            flex="1" 
            mt={{ base: 16, lg: 0 }} 
            position="relative"
            height="500px"
          >
            {/* Animated blockchain nodes */}
            <Box className="blockchain-nodes" position="relative" height="100%" width="100%">
              {/* Main circular glow */}
              <Box 
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="300px"
                h="300px"
                borderRadius="full"
                bgGradient="radial-gradient(circle, rgba(138, 124, 251, 0.3) 0%, transparent 70%)"
              />
              
              {/* Nodes */}
              {[...Array(6)].map((_, i) => (
                <Box
                  key={i}
                  position="absolute"
                  top={`${20 + i * 12}%`}
                  left={`${10 + i * 15}%`}
                  w={`${30 + i * 5}px`}
                  h={`${30 + i * 5}px`}
                  borderRadius="full"
                  bg={i % 2 === 0 ? "#00E0FF" : "#8A7CFB"}
                  opacity={0.8}
                  boxShadow={`0 0 20px ${i % 2 === 0 ? "rgba(0, 224, 255, 0.5)" : "rgba(138, 124, 251, 0.5)"}`}
                  animation={`pulse ${3 + i * 0.5}s infinite alternate ease-in-out`}
                  animationDelay={`${i * 0.5}s`}
                />
              ))}
              
              {/* Connection lines */}
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 500 500" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  opacity: 0.3,
                  stroke: '#8A7CFB',
                  strokeWidth: 1,
                  strokeDasharray: '5,5',
                  fill: 'none'
                }}
              >
                <path d="M100,100 L400,150 L200,400 Z" />
                <path d="M150,200 L350,250 L250,350 Z" />
                <path d="M200,100 L300,300 L100,300 Z" />
              </svg>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection; 
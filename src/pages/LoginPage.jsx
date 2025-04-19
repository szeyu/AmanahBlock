import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, VStack, HStack, Divider, Flex, Icon, InputGroup, InputRightElement, Checkbox } from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box p={5} maxW="container.xl" mx="auto" minH="calc(100vh - 200px)" display="flex" alignItems="center" justifyContent="center">
      <Box className="card" p={8} maxW="md" w="full">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading size="lg" mb={2} color="white">Welcome Back</Heading>
            <Text color="gray.400">Sign in to continue to SadaqahChain</Text>
          </Box>
          
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel color="white">Email Address</FormLabel>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                bg="#1A1A2E" 
                borderColor="gray.600"
                _focus={{ borderColor: 'brand.500' }}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel color="white">Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  bg="#1A1A2E" 
                  borderColor="gray.600"
                  _focus={{ borderColor: 'brand.500' }}
                />
                <InputRightElement>
                  <Button variant="ghost" onClick={handleShowClick} tabIndex="-1" size="sm">
                    <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray.400" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            
            <Flex justify="space-between" align="center">
              <Checkbox colorScheme="purple">Remember me</Checkbox>
              <Link to="/forgot-password">
                <Text color="brand.500" fontSize="sm">Forgot Password?</Text>
              </Link>
            </Flex>
            
            <Button 
              bgGradient="linear(to-r, brand.500, accent.500)" 
              _hover={{ bgGradient: "linear(to-r, brand.600, accent.500)", opacity: 0.9 }}
              color="white"
              size="lg"
            >
              Sign In
            </Button>
          </VStack>
          
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">
              Don't have an account? <Link to="/signup"><Text as="span" color="brand.500">Sign up</Text></Link>
            </Text>
          </Box>
          
          <Flex align="center" my={4}>
            <Divider borderColor="gray.600" />
            <Text px={4} color="gray.400" fontSize="sm">OR CONTINUE WITH</Text>
            <Divider borderColor="gray.600" />
          </Flex>
          
          <HStack spacing={4}>
            <Button flex="1" leftIcon={<FaGoogle />} variant="outline" borderColor="gray.600" color="white">
              Google
            </Button>
            <Button flex="1" leftIcon={<FaFacebook />} variant="outline" borderColor="gray.600" color="white">
              Facebook
            </Button>
            <Button flex="1" leftIcon={<FaTwitter />} variant="outline" borderColor="gray.600" color="white">
              Twitter
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage; 
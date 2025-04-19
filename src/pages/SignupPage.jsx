import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, VStack, HStack, Divider, Flex, Icon, InputGroup, InputRightElement, Checkbox, Select } from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box p={5} maxW="container.xl" mx="auto" minH="calc(100vh - 200px)" display="flex" alignItems="center" justifyContent="center">
      <Box className="card" p={8} maxW="md" w="full">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading size="lg" mb={2} color="white">Create an Account</Heading>
            <Text color="gray.400">Join SadaqahChain to start your charitable journey</Text>
          </Box>
          
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl>
                <FormLabel color="white">First Name</FormLabel>
                <Input 
                  placeholder="Enter first name" 
                  bg="#1A1A2E" 
                  borderColor="gray.600"
                  _focus={{ borderColor: 'brand.500' }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel color="white">Last Name</FormLabel>
                <Input 
                  placeholder="Enter last name" 
                  bg="#1A1A2E" 
                  borderColor="gray.600"
                  _focus={{ borderColor: 'brand.500' }}
                />
              </FormControl>
            </HStack>
            
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
              <FormLabel color="white">Account Type</FormLabel>
              <Select 
                placeholder="Select account type" 
                bg="#1A1A2E" 
                borderColor="gray.600"
                _focus={{ borderColor: 'brand.500' }}
              >
                <option value="individual">Individual</option>
                <option value="company">Company/Organization</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel color="white">Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Create a password" 
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
              <Text fontSize="xs" color="gray.400" mt={1}>
                Password must be at least 8 characters long with a number and special character
              </Text>
            </FormControl>
            
            <FormControl>
              <FormLabel color="white">Confirm Password</FormLabel>
              <Input 
                type="password" 
                placeholder="Confirm your password" 
                bg="#1A1A2E" 
                borderColor="gray.600"
                _focus={{ borderColor: 'brand.500' }}
              />
            </FormControl>
            
            <Checkbox colorScheme="purple">
              <Text color="gray.300" fontSize="sm">
                I agree to the <Link to="/terms"><Text as="span" color="brand.500">Terms of Service</Text></Link> and <Link to="/privacy"><Text as="span" color="brand.500">Privacy Policy</Text></Link>
              </Text>
            </Checkbox>
            
            <Button 
              bgGradient="linear(to-r, brand.500, accent.500)" 
              _hover={{ bgGradient: "linear(to-r, brand.600, accent.500)", opacity: 0.9 }}
              color="white"
              size="lg"
            >
              Create Account
            </Button>
          </VStack>
          
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">
              Already have an account? <Link to="/login"><Text as="span" color="brand.500">Sign in</Text></Link>
            </Text>
          </Box>
          
          <Flex align="center" my={4}>
            <Divider borderColor="gray.600" />
            <Text px={4} color="gray.400" fontSize="sm">OR SIGN UP WITH</Text>
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

export default SignupPage; 
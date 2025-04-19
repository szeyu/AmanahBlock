import React from 'react';
import { Box, Heading, Text, VStack, Button, Flex, Icon } from '@chakra-ui/react';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import ZakatCalculator from '../components/ZakatCalculator';
import { Link } from 'react-router-dom';

const ZakatCalculatorPage = () => {
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Zakat Calculator</Heading>
      <Text color="gray.400" mb={6}>Calculate your Zakat obligation with our Shariah-compliant calculator</Text>
      
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Box flex="1">
          <ZakatCalculator />
        </Box>
        
        <VStack spacing={6} align="stretch" maxW={{ base: 'full', lg: '350px' }}>
          <Box 
            bg="rgba(26, 32, 44, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.700"
            p={6}
          >
            <Heading size="md" color="white" mb={4}>About Zakat</Heading>
            <Text color="gray.300" mb={4}>
              Zakat is one of the Five Pillars of Islam, representing the obligation to give a portion of one's wealth to those in need. It is calculated as 2.5% of eligible assets held for a full lunar year.
            </Text>
            <Text color="gray.300" mb={4}>
              The Nisab threshold is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory. It is traditionally set at the value of 85 grams of gold or 595 grams of silver.
            </Text>
            <Button 
              as={Link} 
              to="/learn" 
              rightIcon={<FaBookOpen />} 
              variant="outline" 
              w="full"
            >
              Learn More About Zakat
            </Button>
          </Box>
          
          <Box 
            bg="rgba(26, 32, 44, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.700"
            p={6}
          >
            <Heading size="md" color="white" mb={4}>Ready to Donate?</Heading>
            <Text color="gray.300" mb={4}>
              Once you've calculated your Zakat, you can donate directly through our platform to verified Shariah-compliant charitable projects.
            </Text>
            <Button 
              as={Link} 
              to="/donate" 
              rightIcon={<FaArrowRight />} 
              variant="gradient" 
              w="full"
            >
              Donate Your Zakat
            </Button>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ZakatCalculatorPage; 
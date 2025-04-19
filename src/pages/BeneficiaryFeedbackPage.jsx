import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Badge,
  Avatar,
  Divider,
  useToast,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { 
  FaCheckCircle, 
  FaUserCircle, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaQuoteLeft, 
  FaQuoteRight,
  FaCamera,
  FaEthereum,
  FaRegLightbulb
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BeneficiaryFeedbackPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [feedbackType, setFeedbackType] = useState('confirmation');
  const toast = useToast();
  
  // Mock data for recent testimonials
  const testimonials = [
    {
      id: 1,
      name: "Amina Hassan",
      location: "Mogadishu, Somalia",
      project: "Clean Water Initiative",
      date: "2023-05-10",
      feedback: "The new water well has transformed our village. Children no longer have to walk miles for water and can attend school regularly. Thank you for this life-changing support.",
      image: "https://randomuser.me/api/portraits/women/62.jpg",
      verified: true
    },
    {
      id: 2,
      name: "Mohammed Al-Najjar",
      location: "Gaza, Palestine",
      project: "Emergency Medical Aid",
      date: "2023-05-05",
      feedback: "The medical supplies arrived when we needed them most. Our hospital was able to treat hundreds of patients during the crisis. Your support saved many lives.",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      verified: true
    },
    {
      id: 3,
      name: "Fatima Qasim",
      location: "Sana'a, Yemen",
      project: "Food Security Program",
      date: "2023-04-28",
      feedback: "The food packages sustained my family during the worst of the crisis. We received nutritious food that lasted for weeks. May Allah reward your generosity.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      verified: true
    }
  ];
  
  const handleSubmit = () => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback. It helps us improve our aid delivery.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setVerificationCode('');
  };
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Beneficiary Feedback</Heading>
      <Text color="gray.400" mb={6}>Confirm receipt of aid and share your experience</Text>
      
      <Tabs variant="soft-rounded" colorScheme="brand" mb={8}>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'brand.500' }}>Submit Feedback</Tab>
          <Tab _selected={{ color: 'white', bg: 'accent.500' }}>Testimonials</Tab>
        </TabList>
        
        <TabPanels mt={6}>
          {/* Submit Feedback Tab */}
          <TabPanel px={0}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
              <Box 
                bg="rgba(26, 32, 44, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                p={6}
                borderWidth="1px"
                borderColor="gray.700"
              >
                <Heading size="md" color="white" mb={4}>Confirm Aid Receipt</Heading>
                <Text color="gray.300" mb={6}>
                  Please enter your verification code to confirm you've received aid. This helps us maintain transparency and accountability.
                </Text>
                
                <VStack spacing={6} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Verification Code</FormLabel>
                    <Input 
                      placeholder="Enter the code provided with your aid package" 
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel color="gray.300">Feedback Type</FormLabel>
                    <Select 
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                    >
                      <option value="confirmation">Aid Confirmation Only</option>
                      <option value="testimonial">Confirmation with Testimonial</option>
                      <option value="suggestion">Suggestion for Improvement</option>
                    </Select>
                  </FormControl>
                  
                  {feedbackType !== 'confirmation' && (
                    <FormControl>
                      <FormLabel color="gray.300">Your Feedback</FormLabel>
                      <Textarea 
                        placeholder="Share your experience or suggestions..." 
                        minH="150px"
                      />
                    </FormControl>
                  )}
                  
                  {feedbackType === 'testimonial' && (
                    <FormControl>
                      <FormLabel color="gray.300">Upload Photo (Optional)</FormLabel>
                      <Input type="file" pt={1} />
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        Share a photo showing the impact of the aid (max 5MB)
                      </Text>
                    </FormControl>
                  )}
                  
                  <Button 
                    variant="gradient" 
                    leftIcon={<FaCheckCircle />}
                    onClick={handleSubmit}
                    isDisabled={!verificationCode}
                  >
                    Submit Feedback
                  </Button>
                </VStack>
              </Box>
              
              <Box>
                <Box 
                  bg="rgba(26, 32, 44, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                  mb={6}
                >
                  <Flex align="center" mb={4}>
                    <Icon as={FaRegLightbulb} color="yellow.400" mr={2} />
                    <Heading size="md" color="white">Why Your Feedback Matters</Heading>
                  </Flex>
                  
                  <VStack spacing={4} align="stretch">
                    <HStack align="flex-start">
                      <Box as={FaCheckCircle} color="green.500" mt={1} />
                      <Text color="gray.300">
                        Confirms aid was delivered to the intended recipients
                      </Text>
                    </HStack>
                    
                    <HStack align="flex-start">
                      <Box as={FaCheckCircle} color="green.500" mt={1} />
                      <Text color="gray.300">
                        Helps us improve our aid delivery processes
                      </Text>
                    </HStack>
                    
                    <HStack align="flex-start">
                      <Box as={FaCheckCircle} color="green.500" mt={1} />
                      <Text color="gray.300">
                        Provides transparency to donors about the impact of their contributions
                      </Text>
                    </HStack>
                    
                    <HStack align="flex-start">
                      <Box as={FaCheckCircle} color="green.500" mt={1} />
                      <Text color="gray.300">
                        Creates a permanent record on the blockchain for accountability
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
                
                <Box 
                  bg="rgba(26, 32, 44, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                >
                  <Flex align="center" mb={4}>
                    <Icon as={FaEthereum} color="brand.500" mr={2} />
                    <Heading size="md" color="white">Blockchain Verification</Heading>
                  </Flex>
                  
                  <Text color="gray.300" mb={4}>
                    Your feedback is recorded on the blockchain, creating an immutable record that connects donors with beneficiaries in a transparent way.
                  </Text>
                  
                  <Image 
                    src="https://images.unsplash.com/photo-1639762681057-408e52192e55" 
                    alt="Blockchain Verification" 
                    borderRadius="md"
                    mb={4}
                  />
                  
                  <Text color="gray.400" fontSize="sm">
                    Each verification is linked to the specific aid distribution transaction, creating a complete chain of accountability from donation to impact.
                  </Text>
                </Box>
              </Box>
            </Grid>
          </TabPanel>
          
          {/* Testimonials Tab */}
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {testimonials.map((testimonial) => (
                <Box 
                  key={testimonial.id}
                  bg="rgba(26, 32, 44, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.700"
                  position="relative"
                >
                  {testimonial.verified && (
                    <Badge 
                      position="absolute" 
                      top={4} 
                      right={4}
                      colorScheme="green"
                      display="flex"
                      alignItems="center"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      <Icon as={FaCheckCircle} mr={1} />
                      Verified
                    </Badge>
                  )}
                  
                  <Flex direction="column" align="center" mb={4}>
                    <Avatar 
                      src={testimonial.image} 
                      name={testimonial.name} 
                      size="xl" 
                      mb={3}
                      border="3px solid"
                      borderColor="brand.500"
                    />
                    <Heading size="md" color="white" textAlign="center">{testimonial.name}</Heading>
                    <HStack mt={1} color="gray.400" fontSize="sm">
                      <Icon as={FaMapMarkerAlt} />
                      <Text>{testimonial.location}</Text>
                    </HStack>
                  </Flex>
                  
                  <Box position="relative" mb={4}>
                    <Icon as={FaQuoteLeft} color="brand.500" opacity={0.3} boxSize={6} position="absolute" top={-2} left={-2} />
                    <Text color="gray.300" textAlign="center" px={6}>
                      {testimonial.feedback}
                    </Text>
                    <Icon as={FaQuoteRight} color="brand.500" opacity={0.3} boxSize={6} position="absolute" bottom={-2} right={-2} />
                  </Box>
                  
                  <Divider borderColor="gray.700" mb={4} />
                  
                  <Flex justify="space-between" color="gray.400" fontSize="sm">
                    <Text>{testimonial.project}</Text>
                    <HStack>
                      <Icon as={FaCalendarAlt} />
                      <Text>{new Date(testimonial.date).toLocaleDateString()}</Text>
                    </HStack>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BeneficiaryFeedbackPage; 
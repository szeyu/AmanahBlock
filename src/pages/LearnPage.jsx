import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Button,
  Image,
  VStack,
  HStack,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@chakra-ui/react';
import { FaGraduationCap, FaBook, FaQuestionCircle, FaCheckCircle, FaExternalLinkAlt, FaPlayCircle, FaFileAlt, FaLock, FaUnlock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LearnPage = () => {
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Islamic Finance Education Hub</Heading>
      <Text color="gray.400" mb={6}>Learn about Shariah-compliant finance and charitable giving</Text>
      
      {/* Featured Courses */}
      <Box mb={10}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="white">Featured Courses</Heading>
          <Button variant="link" rightIcon={<FaExternalLinkAlt />} color="brand.500">View All</Button>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            {
              title: "Introduction to Islamic Finance",
              image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
              level: "Beginner",
              duration: "2 hours",
              free: true
            },
            {
              title: "Understanding Zakat Calculation",
              image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
              level: "Intermediate",
              duration: "3 hours",
              free: true
            },
            {
              title: "Waqf & Sustainable Giving",
              image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
              level: "Advanced",
              duration: "4 hours",
              free: false
            }
          ].map((course, index) => (
            <Box 
              key={index}
              bg="rgba(26, 32, 44, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.700"
              transition="all 0.3s"
              _hover={{ 
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                borderColor: "brand.500"
              }}
            >
              <Box position="relative">
                <Image 
                  src={course.image}
                  alt={course.title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  borderRadius="full"
                  colorScheme="brand"
                  w="50px"
                  h="50px"
                  p={0}
                >
                  <Icon as={FaPlayCircle} boxSize={6} />
                </Button>
                <Badge 
                  position="absolute" 
                  top={2} 
                  right={2}
                  colorScheme={course.free ? "green" : "purple"}
                  borderRadius="full"
                  px={2}
                >
                  <HStack spacing={1}>
                    <Icon as={course.free ? FaUnlock : FaLock} boxSize={3} />
                    <Text fontSize="xs">{course.free ? "Free" : "Premium"}</Text>
                  </HStack>
                </Badge>
              </Box>
              
              <Box p={4}>
                <Heading size="md" mb={2} color="white" noOfLines={1}>
                  {course.title}
                </Heading>
                
                <HStack mb={4} color="gray.400" fontSize="sm" spacing={4}>
                  <HStack>
                    <Icon as={FaGraduationCap} />
                    <Text>{course.level}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaBook} />
                    <Text>{course.duration}</Text>
                  </HStack>
                </HStack>
                
                <Button colorScheme="brand" size="sm" width="full">
                  Start Learning
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      
      {/* FAQ Section */}
      <Box mb={10}>
        <Heading size="md" color="white" mb={6}>Frequently Asked Questions</Heading>
        
        <Accordion allowMultiple>
          <AccordionItem borderTopWidth="1px" borderColor="gray.700">
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left" fontWeight="medium" color="white">
                  What is Zakat and how is it calculated?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color="gray.300">
              Zakat is one of the Five Pillars of Islam and refers to the obligation that an individual has to donate a certain proportion of wealth each year to charitable causes. It is calculated as 2.5% of one's wealth that has been held for a lunar year, if that wealth is above the nisab threshold.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderTopWidth="1px" borderColor="gray.700">
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left" fontWeight="medium" color="white">
                  What is the difference between Zakat and Sadaqah?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color="gray.300">
              Zakat is obligatory for all Muslims who meet the necessary criteria of wealth, while Sadaqah is voluntary charity that can be given at any time in any amount. Zakat has specific rules about who can receive it, while Sadaqah can be given to anyone.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderTopWidth="1px" borderBottomWidth="1px" borderColor="gray.700">
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left" fontWeight="medium" color="white">
                  What is Waqf and how does it work?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color="gray.300">
              Waqf is an Islamic endowment of property to be held in trust and used for a charitable or religious purpose. Once a property is dedicated as Waqf, it can never be gifted, inherited, or sold. The income generated from the Waqf is used for the designated charitable purposes in perpetuity.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      
      {/* Resources Section */}
      <Box mb={10}>
        <Heading size="md" color="white" mb={6}>Educational Resources</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card bg="gray.800" borderRadius="lg" borderWidth="1px" borderColor="gray.700">
            <CardHeader>
              <Heading size="md" color="white">Zakat Guide</Heading>
            </CardHeader>
            <CardBody color="gray.300">
              <Text>Comprehensive guide to understanding and calculating Zakat correctly.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<FaFileAlt />} variant="outline" colorScheme="brand" size="sm">
                Download PDF
              </Button>
            </CardFooter>
          </Card>
          
          <Card bg="gray.800" borderRadius="lg" borderWidth="1px" borderColor="gray.700">
            <CardHeader>
              <Heading size="md" color="white">Sadaqah in Islam</Heading>
            </CardHeader>
            <CardBody color="gray.300">
              <Text>Learn about the virtues and benefits of voluntary charity in Islam.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<FaFileAlt />} variant="outline" colorScheme="brand" size="sm">
                Download PDF
              </Button>
            </CardFooter>
          </Card>
          
          <Card bg="gray.800" borderRadius="lg" borderWidth="1px" borderColor="gray.700">
            <CardHeader>
              <Heading size="md" color="white">Blockchain & Shariah</Heading>
            </CardHeader>
            <CardBody color="gray.300">
              <Text>Explore how blockchain technology aligns with Islamic finance principles.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<FaFileAlt />} variant="outline" colorScheme="brand" size="sm">
                Download PDF
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
      
      {/* Certification Section */}
      <Box>
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="md" color="white" mb={2}>Earn Certifications</Heading>
            <Text color="gray.400">Complete courses and earn blockchain-verified certificates</Text>
          </Box>
          <Button variant="gradient">View Certifications</Button>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box 
            bg="gray.800" 
            borderRadius="lg" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor="gray.700"
            p={6}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              bg: 'radial-gradient(circle at center, rgba(128, 90, 213, 0.2) 0%, transparent 70%)',
              zIndex: 0,
            }}
          >
            <Heading size="md" color="white" mb={4}>Islamic Finance Specialist</Heading>
            <List spacing={3} mb={6} position="relative" zIndex={1}>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Complete 5 core courses
              </ListItem>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Pass final assessment
              </ListItem>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Receive NFT certificate
              </ListItem>
            </List>
            <Button colorScheme="brand" size="md">
              Start Certification
            </Button>
          </Box>
          
          <Box 
            bg="gray.800" 
            borderRadius="lg" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor="gray.700"
            p={6}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              bg: 'radial-gradient(circle at center, rgba(11, 197, 234, 0.2) 0%, transparent 70%)',
              zIndex: 0,
            }}
          >
            <Heading size="md" color="white" mb={4}>Blockchain Charity Expert</Heading>
            <List spacing={3} mb={6} position="relative" zIndex={1}>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Complete 3 advanced courses
              </ListItem>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Submit case study
              </ListItem>
              <ListItem color="gray.300">
                <ListIcon as={FaCheckCircle} color="green.500" />
                Receive NFT certificate
              </ListItem>
            </List>
            <Button colorScheme="brand" size="md">
              Start Certification
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default LearnPage; 
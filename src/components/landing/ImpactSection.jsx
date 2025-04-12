import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Image,
  HStack,
  Badge,
  Button,
  Icon,
  Tooltip,
  Flex,
  SimpleGrid,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaCamera,
  FaVrCardboard,
  FaGlobeAfrica,
} from 'react-icons/fa';

// Mock data for featured impact stories
const impactStories = [
  {
    id: 1,
    title: "Clean Water Transforms Village in Somalia",
    location: "Baidoa, Somalia",
    category: "Water",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 1200,
    completionDate: "March 2023",
    description: "This project provided clean water access to an entire village, reducing waterborne diseases by 85% and allowing girls to attend school instead of walking miles for water.",
    status: "Completed",
    hasVR: false
  },
  {
    id: 2,
    title: "School Rebuilding in Gaza",
    location: "Gaza City, Palestine",
    category: "Education",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 850,
    completionDate: "Ongoing",
    description: "This project is rebuilding a school damaged in conflict, providing education facilities for 850 children and employment for 35 teachers.",
    status: "In Progress",
    hasVR: false
  },
  {
    id: 3,
    title: "Emergency Food Relief in Yemen",
    location: "Sana'a, Yemen",
    category: "Food",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 5000,
    completionDate: "January 2023",
    description: "This emergency response provided food packages to 5,000 people facing severe food insecurity, with special focus on malnourished children and pregnant women.",
    status: "Completed",
    hasVR: false
  }
];

const ImpactSection = () => {
  return (
    <Box py={20} bg="gray.900">
      <Box maxW="container.xl" mx="auto" px={4}>
        {/* Featured Impact Stories */}
        <Box mb={16}>
          <Heading size="xl" color="white" mb={2} textAlign="center">Featured Impact Stories</Heading>
          <Text color="gray.400" mb={8} textAlign="center">
            See how your contributions are making a real difference in communities worldwide
          </Text>
          
          <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
            {impactStories.map((story) => (
              <Box 
                key={story.id}
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
                    src={story.image} 
                    alt={story.title} 
                    w="full" 
                    h="200px" 
                    objectFit="cover" 
                  />
                  <HStack position="absolute" top={2} right={2} spacing={2}>
                    {story.hasVR && (
                      <Tooltip label="VR Experience Available">
                        <Button 
                          size="sm" 
                          borderRadius="full" 
                          colorScheme="purple"
                          leftIcon={<FaVrCardboard />}
                        >
                          VR
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip label="Coming Soon" placement="top">
                      <Button 
                        size="sm" 
                        borderRadius="full" 
                        colorScheme="blue"
                        leftIcon={<FaCamera />}
                        isDisabled
                        opacity={0.7}
                        _hover={{ opacity: 0.7 }}
                      >
                        B/A
                      </Button>
                    </Tooltip>
                  </HStack>
                  <HStack position="absolute" bottom={2} left={2} spacing={2}>
                    <Badge colorScheme="green" borderRadius="full" px={2} py={1}>
                      {story.category}
                    </Badge>
                    <Badge 
                      colorScheme={story.status === "Completed" ? "green" : "orange"} 
                      borderRadius="full" 
                      px={2} 
                      py={1}
                    >
                      <HStack spacing={1}>
                        <Icon as={story.status === "Completed" ? FaRegCheckCircle : FaRegClock} boxSize={3} />
                        <Text fontSize="xs">{story.status}</Text>
                      </HStack>
                    </Badge>
                  </HStack>
                </Box>
                
                <Box p={4}>
                  <Heading size="md" mb={2} color="white" noOfLines={1}>
                    {story.title}
                  </Heading>
                  
                  <HStack mb={4} color="gray.400" fontSize="sm">
                    <Icon as={FaMapMarkerAlt} />
                    <Text>{story.location}</Text>
                  </HStack>
                  
                  <Text color="gray.300" mb={4} noOfLines={3}>
                    {story.description}
                  </Text>
                  
                  <Divider borderColor="gray.700" mb={4} />
                  
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Beneficiaries</Text>
                      <Text color="white" fontWeight="bold">{story.beneficiaries.toLocaleString()}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Completion</Text>
                      <Text color="white" fontWeight="bold">{story.completionDate}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  <Button 
                    as={Link}
                    to={`/impact/story/${story.id}`}
                    variant="gradient" 
                    size="sm" 
                    w="full"
                  >
                    Explore Impact
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Global Impact Map */}
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading size="md" color="white" mb={1}>Global Impact Map</Heading>
              <Text color="gray.400">Explore our projects and their impact around the world</Text>
            </Box>
            <Tooltip label="Coming Soon" placement="top">
              <Button 
                leftIcon={<FaGlobeAfrica />} 
                variant="outline"
                isDisabled
                opacity={0.7}
                _hover={{ opacity: 0.7 }}
              >
                Open Full Map
              </Button>
            </Tooltip>
          </Flex>
          
          <Box 
            h="400px" 
            bg="gray.800" 
            borderRadius="md" 
            position="relative"
            overflow="hidden"
          >
            <Flex 
              position="absolute" 
              top="0" 
              left="0" 
              right="0" 
              bottom="0" 
              justify="center" 
              align="center"
              direction="column"
              bg="url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
              bgSize="cover"
              bgPosition="center"
            >
              <Text color="white" fontSize="lg" fontWeight="bold" mb={4}>Interactive Map Coming Soon</Text>
              <Text color="gray.300">Our projects span 28 countries across 4 continents</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImpactSection; 
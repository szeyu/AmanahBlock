import React, { useState } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  VStack, 
  HStack, 
  Icon, 
  Grid, 
  Badge, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Image, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Divider,
  Progress,
  Select,
  InputGroup,
  Input,
  InputLeftElement,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid
} from '@chakra-ui/react';
import { 
  FaGlobeAfrica, 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaWater, 
  FaGraduationCap, 
  FaHospital, 
  FaUtensils, 
  FaHome, 
  FaUsers,
  FaRegLightbulb,
  FaChartLine,
  FaRegCheckCircle,
  FaRegClock,
  FaCamera,
  FaVrCardboard
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';

const ImpactExplorerPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for impact stats
  const impactStats = {
    totalBeneficiaries: 1250000,
    projectsCompleted: 156,
    countriesServed: 28,
    donorsContributed: 45000,
    totalDonated: 8500000
  };
  
  // Mock data for impact categories
  const impactCategories = [
    {
      name: 'Water & Sanitation',
      icon: FaWater,
      color: 'blue',
      metrics: [
        { label: 'Clean Water Wells', value: 215 },
        { label: 'People with Water Access', value: 320000 },
        { label: 'Sanitation Facilities', value: 85 }
      ],
      progress: 78
    },
    {
      name: 'Education',
      icon: FaGraduationCap,
      color: 'purple',
      metrics: [
        { label: 'Schools Built/Renovated', value: 42 },
        { label: 'Students Supported', value: 28500 },
        { label: 'Teachers Trained', value: 1250 }
      ],
      progress: 65
    },
    {
      name: 'Healthcare',
      icon: FaHospital,
      color: 'green',
      metrics: [
        { label: 'Medical Clinics', value: 28 },
        { label: 'Patients Treated', value: 185000 },
        { label: 'Medical Staff Supported', value: 450 }
      ],
      progress: 72
    },
    {
      name: 'Food Security',
      icon: FaUtensils,
      color: 'orange',
      metrics: [
        { label: 'Meals Provided', value: 1850000 },
        { label: 'Food Banks Established', value: 35 },
        { label: 'Sustainable Farms', value: 18 }
      ],
      progress: 81
    }
  ];
  
  // Mock data for featured impact stories
  const impactStories = [
    {
      id: 1,
      title: "Clean Water Transforms Village in Somalia",
      location: "Baidoa, Somalia",
      category: "Water",
      image: "https://images.unsplash.com/photo-1594789327651-87bf2de3c50a",
      beforeImage: "https://images.unsplash.com/photo-1516939884455-1445c8652f83",
      afterImage: "https://images.unsplash.com/photo-1594789327651-87bf2de3c50a",
      beneficiaries: 1200,
      completionDate: "March 2023",
      description: "This project provided clean water access to an entire village, reducing waterborne diseases by 85% and allowing girls to attend school instead of walking miles for water.",
      testimonial: {
        name: "Amina Hassan",
        quote: "Before this well, I spent 4 hours every day collecting water. Now I can attend school and dream of becoming a doctor.",
        image: "https://randomuser.me/api/portraits/women/62.jpg"
      },
      metrics: [
        { label: "Wells Built", value: 3 },
        { label: "Water Capacity", value: "15,000 liters/day" },
        { label: "Disease Reduction", value: "85%" }
      ],
      status: "Completed",
      hasVR: true
    },
    {
      id: 2,
      title: "School Rebuilding in Gaza",
      location: "Gaza City, Palestine",
      category: "Education",
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799",
      beforeImage: "https://images.unsplash.com/photo-1633876841461-2f3d915c2fc3",
      afterImage: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799",
      beneficiaries: 850,
      completionDate: "Ongoing",
      description: "This project is rebuilding a school damaged in conflict, providing education facilities for 850 children and employment for 35 teachers.",
      testimonial: {
        name: "Mohammed Al-Najjar",
        quote: "Education is the only way forward for our children. This school gives them hope for a better future.",
        image: "https://randomuser.me/api/portraits/men/52.jpg"
      },
      metrics: [
        { label: "Classrooms", value: 24 },
        { label: "Library Books", value: 5000 },
        { label: "Computer Lab", value: "Yes" }
      ],
      status: "In Progress",
      hasVR: false
    },
    {
      id: 3,
      title: "Emergency Food Relief in Yemen",
      location: "Sana'a, Yemen",
      category: "Food",
      image: "https://images.unsplash.com/photo-1593113598332-cd59a93f9724",
      beforeImage: "https://images.unsplash.com/photo-1469571486292-b53601010b89",
      afterImage: "https://images.unsplash.com/photo-1593113598332-cd59a93f9724",
      beneficiaries: 5000,
      completionDate: "January 2023",
      description: "This emergency response provided food packages to 5,000 people facing severe food insecurity, with special focus on malnourished children and pregnant women.",
      testimonial: {
        name: "Fatima Qasim",
        quote: "The food packages came when we had nothing left. It saved my children from starvation during the worst of the crisis.",
        image: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      metrics: [
        { label: "Food Packages", value: 1250 },
        { label: "Nutritional Supplements", value: 3500 },
        { label: "Duration", value: "3 months" }
      ],
      status: "Completed",
      hasVR: false
    }
  ];
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Impact Explorer</Heading>
      <Text color="gray.400" mb={6}>Discover the real-world impact of your donations with blockchain-verified data</Text>
      
      {/* Impact Stats */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }} gap={6} mb={8}>
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Total Beneficiaries</StatLabel>
          <StatNumber color="white">{impactStats.totalBeneficiaries.toLocaleString()}</StatNumber>
          <StatHelpText color="green.400">
            Lives impacted
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Projects Completed</StatLabel>
          <StatNumber color="white">{impactStats.projectsCompleted}</StatNumber>
          <StatHelpText color="green.400">
            Across {impactStats.countriesServed} countries
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <StatLabel color="gray.300">Total Donated</StatLabel>
          <StatNumber color="white">${(impactStats.totalDonated/1000000).toFixed(1)}M</StatNumber>
          <StatHelpText color="green.400">
            100% Shariah-compliant
          </StatHelpText>
        </Stat>
        
        <Stat 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor="gray.700"
          colSpan={{ base: 1, md: 2 }}
        >
          <StatLabel color="gray.300">Donor Community</StatLabel>
          <StatNumber color="white">{impactStats.donorsContributed.toLocaleString()}</StatNumber>
          <StatHelpText color="green.400">
            Contributors worldwide
          </StatHelpText>
        </Stat>
      </Grid>
      
      {/* Search and Filter */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search impact stories" />
        </InputGroup>
        
        <Select 
          placeholder="Filter by Region" 
          maxW={{ base: 'full', md: '200px' }}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="all">All Regions</option>
          <option value="middle-east">Middle East</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
        </Select>
        
        <Select 
          placeholder="Filter by Category" 
          maxW={{ base: 'full', md: '200px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="water">Water & Sanitation</option>
          <option value="education">Education</option>
          <option value="healthcare">Healthcare</option>
          <option value="food">Food Security</option>
        </Select>
      </Flex>
      
      {/* Impact Categories */}
      <Heading size="md" color="white" mb={4}>Impact by Category</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={10}>
        {impactCategories.map((category, index) => (
          <Box 
            key={index}
            bg="rgba(26, 32, 44, 0.7)"
            backdropFilter="blur(10px)"
            borderRadius="lg"
            p={6}
            borderWidth="1px"
            borderColor="gray.700"
            position="relative"
            overflow="hidden"
          >
            <Flex justify="space-between" mb={4}>
              <Flex 
                w="50px" 
                h="50px" 
                bg={`rgba(${category.color === 'blue' ? '11, 197, 234' : 
                           category.color === 'purple' ? '128, 90, 213' : 
                           category.color === 'green' ? '72, 187, 120' : 
                           '237, 137, 54'}, 0.2)`}
                borderRadius="lg"
                justify="center"
                align="center"
              >
                <Icon 
                  as={category.icon} 
                  color={`${category.color}.500`} 
                  boxSize={6} 
                />
              </Flex>
              
              <CircularProgress 
                value={category.progress} 
                color={`${category.color}.500`}
                size="60px"
                thickness="8px"
              >
                <CircularProgressLabel color="white">{category.progress}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
            
            <Heading size="md" color="white" mb={4}>{category.name}</Heading>
            
            <VStack align="stretch" spacing={2}>
              {category.metrics.map((metric, idx) => (
                <Flex key={idx} justify="space-between">
                  <Text color="gray.400" fontSize="sm">{metric.label}</Text>
                  <Text color="white" fontWeight="bold" fontSize="sm">{metric.value.toLocaleString()}</Text>
                </Flex>
              ))}
            </VStack>
            
            <Button 
              variant="outline" 
              size="sm" 
              mt={6} 
              w="full"
              as={Link}
              to={`/impact/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              View Details
            </Button>
          </Box>
        ))}
      </Grid>
      
      {/* Featured Impact Stories */}
      <Heading size="md" color="white" mb={4}>Featured Impact Stories</Heading>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6} mb={10}>
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
                <Tooltip label="Before/After Photos">
                  <Button 
                    size="sm" 
                    borderRadius="full" 
                    colorScheme="blue"
                    leftIcon={<FaCamera />}
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
      
      {/* Interactive Map */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={6}
        borderWidth="1px"
        borderColor="gray.700"
        mb={10}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="md" color="white" mb={1}>Global Impact Map</Heading>
            <Text color="gray.400">Explore our projects and their impact around the world</Text>
          </Box>
          <Button 
            leftIcon={<FaGlobeAfrica />} 
            variant="outline"
            as={Link}
            to="/impact/map"
          >
            Open Full Map
          </Button>
        </Flex>
        
        <Box 
          h="400px" 
          bg="gray.800" 
          borderRadius="md" 
          position="relative"
          overflow="hidden"
        >
          {/* This would be replaced with an actual interactive map component */}
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
      
      {/* Blockchain Verification */}
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
            <Heading size="md" color="white" mb={1}>Blockchain-Verified Impact</Heading>
            <Text color="gray.400">All impact data is permanently recorded on the blockchain for complete transparency</Text>
          </Box>
          <Button 
            leftIcon={<FaChartLine />} 
            variant="gradient"
            as={Link}
            to="/impact/verification"
          >
            Verify Impact
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(128, 90, 213, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaRegLightbulb} color="accent.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Transparent Tracking</Heading>
            <Text color="gray.400" fontSize="sm">
              Every donation and its impact is tracked on the blockchain, creating an immutable record of your contribution.
            </Text>
          </VStack>
          
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(11, 197, 234, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaUsers} color="brand.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Beneficiary Verification</Heading>
            <Text color="gray.400" fontSize="sm">
              Beneficiaries confirm receipt of aid through blockchain attestations, ensuring your donation reaches those in need.
            </Text>
          </VStack>
          
          <VStack align="flex-start" spacing={3}>
            <Flex 
              w="50px" 
              h="50px" 
              bg="rgba(72, 187, 120, 0.2)" 
              borderRadius="lg"
              justify="center"
              align="center"
              mb={2}
            >
              <Icon as={FaCamera} color="green.500" boxSize={6} />
            </Flex>
            <Heading size="sm" color="white">Visual Evidence</Heading>
            <Text color="gray.400" fontSize="sm">
              Before/after photos and videos are hashed and stored on-chain to provide visual proof of project completion.
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ImpactExplorerPage; 
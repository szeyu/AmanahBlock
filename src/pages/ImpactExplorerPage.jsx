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
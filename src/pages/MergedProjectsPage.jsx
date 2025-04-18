import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  useDisclosure,
  Flex,
  Icon,
  Container,
  Button,
  HStack,
  VStack,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Tooltip,
  Circle
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaChartLine, FaRegLightbulb, FaSearch, FaRocket, FaFilter, FaAngleDown, FaCoins, FaLayerGroup, FaInfoCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Project components
import ProjectCardExplore from '../components/projects/ProjectCard';
import ProjectCardFunding from '../components/funding/ProjectCard';
import ProjectFiltersExplore from '../components/projects/ProjectFilters';
import ProjectFiltersFunding from '../components/funding/ProjectFilters';
import ProjectDetailsModalExplore from '../components/projects/ProjectDetailsModal';
import ProjectDetailsModalFunding from '../components/funding/ProjectDetailsModal';

// Project data
import projectsExploreData from '../data/projectsExploreData';
import projectsData from '../data/projectsData';
import { filterAndSortProjects } from '../utils/projectUtils';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const MergedProjectsPage = () => {
  // State for projects page
  const [selectedProjectExplore, setSelectedProjectExplore] = useState(null);
  const { isOpen: isOpenExplore, onOpen: onOpenExplore, onClose: onCloseExplore } = useDisclosure();
  const [favorites, setFavorites] = useState([]);
  const [exploreFilters, setExploreFilters] = useState([]);

  // State for funding page
  const [selectedProjectFunding, setSelectedProjectFunding] = useState(null);
  const { isOpen: isOpenFunding, onOpen: onOpenFunding, onClose: onCloseFunding } = useDisclosure();
  const [fundingFilters, setFundingFilters] = useState({
    category: '',
    status: '',
    sortBy: 'progress'
  });
  
  // Shared state
  const [activeView, setActiveView] = useState('pending'); // 'pending' or 'ongoing'
  const [isLoading, setIsLoading] = useState(true);
  const [filteredExploreProjects, setFilteredExploreProjects] = useState([]);
  const [filteredFundingProjects, setFilteredFundingProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [donationTypeFilter, setDonationTypeFilter] = useState('');
  
  // New state for stats interactivity
  const [selectedStat, setSelectedStat] = useState(null);
  const { isOpen: isStatsModalOpen, onOpen: onStatsModalOpen, onClose: onStatsModalClose } = useDisclosure();
  const [statsTrend, setStatsTrend] = useState({
    totalProjects: { value: 5, label: 'New projects this month' },
    totalFundsRaised: { value: 12.5, label: 'Increase since last month' },
    successRate: { value: 7.2, label: 'Improvement since last quarter' }
  });
  const [statsHistory, setStatsHistory] = useState({
    totalProjects: [28, 32, 36, 42, 48, 52, 58, 65, 72, 80, 88, 95],
    totalFundsRaised: [15000, 35000, 65000, 95000, 120000, 150000, 185000, 220000, 260000, 290000, 320000, 350000],
    successRate: [40, 42, 45, 48, 51, 55, 62, 68, 71, 78, 82, 85],
  });
  
  // Adding/removing filters for explore projects
  const addFilter = (filter) => {
    if (!exploreFilters.includes(filter)) {
      setExploreFilters([...exploreFilters, filter]);
    }
  };
  
  const removeFilter = (filter) => {
    setExploreFilters(exploreFilters.filter(f => f !== filter));
  };
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Handle project card clicks
  const handleProjectExploreClick = (project) => {
    setSelectedProjectExplore(project);
    onOpenExplore();
  };
  
  const handleProjectFundingClick = (project) => {
    setSelectedProjectFunding(project);
    onOpenFunding();
  };
  
  // Update the stats calculation to be more dynamic
  // Stats for the header
  const calculateStats = () => {
    // Count total projects 
    const totalProjects = projectsData.length + projectsExploreData.length;
    
    // Calculate total funds raised from both arrays
    const totalFundsRaised = [...projectsData, ...projectsExploreData].reduce((sum, project) => {
      // Handle different property names between data sets
      const amount = project.raisedAmount || project.raised || 0;
      return sum + amount;
    }, 0);
    
    // Calculate success rate based on projects that have reached at least 70% of their goal
    const successfulProjects = [...projectsData, ...projectsExploreData].filter(project => {
      const progress = project.progress || 0;
      return progress >= 70; // Consider projects with 70%+ progress as successful
    });
    
    const successRate = totalProjects > 0 
      ? Math.round((successfulProjects.length / totalProjects) * 100) 
      : 0;
    
    return {
      totalProjects,
      totalFundsRaised,
      successRate
    };
  };

  const { totalProjects, totalFundsRaised, successRate } = calculateStats();

  // Handle stat card click
  const handleStatClick = (statType) => {
    setSelectedStat(statType);
    onStatsModalOpen();
  };

  const getModalContent = () => {
    if (!selectedStat) return null;

    // Content based on selected stat
    switch (selectedStat) {
      case 'totalProjects':
        return {
          title: 'Projects Overview',
          data: {
            current: totalProjects,
            trend: statsTrend.totalProjects.value,
            trendLabel: statsTrend.totalProjects.label,
            breakdown: [
              { label: 'Education', value: projectsData.filter(p => p.category === 'Education').length + projectsExploreData.filter(p => p.category === 'Education').length, color: '#48BB78' },
              { label: 'Healthcare', value: projectsData.filter(p => p.category === 'Healthcare').length + projectsExploreData.filter(p => p.category === 'Healthcare').length, color: '#3182CE' },
              { label: 'Food', value: projectsData.filter(p => p.category === 'Food').length + projectsExploreData.filter(p => p.category === 'Food').length, color: '#DD6B20' },
              { label: 'Water', value: projectsData.filter(p => p.category === 'Water').length + projectsExploreData.filter(p => p.category === 'Water').length, color: '#00E0FF' },
              { label: 'Other', value: projectsData.filter(p => !['Education', 'Healthcare', 'Food', 'Water'].includes(p.category)).length + projectsExploreData.filter(p => !['Education', 'Healthcare', 'Food', 'Water'].includes(p.category)).length, color: '#8A7CFB' },
            ],
            history: statsHistory.totalProjects
          }
        };
      case 'totalFundsRaised':
        return {
          title: 'Funds Raised Overview',
          data: {
            current: totalFundsRaised,
            trend: statsTrend.totalFundsRaised.value,
            trendLabel: statsTrend.totalFundsRaised.label,
            breakdown: [
              { label: 'Sadaqah', value: Math.round(totalFundsRaised * 0.65), color: '#48BB78' },
              { label: 'Waqf', value: Math.round(totalFundsRaised * 0.25), color: '#3182CE' },
              { label: 'Zakat', value: Math.round(totalFundsRaised * 0.10), color: '#DD6B20' },
            ],
            history: statsHistory.totalFundsRaised
          }
        };
      case 'successRate':
        return {
          title: 'Success Rate Overview',
          data: {
            current: successRate,
            trend: statsTrend.successRate.value,
            trendLabel: statsTrend.successRate.label,
            breakdown: [
              { label: 'Completed', value: Math.round(successRate * 0.75), color: '#48BB78' }, 
              { label: 'On track', value: Math.round(successRate * 0.15), color: '#3182CE' },
              { label: 'Delayed', value: Math.round(successRate * 0.10), color: '#DD6B20' },
            ],
            history: statsHistory.successRate
          }
        };
      default:
        return null;
    }
  };

  const modalContent = getModalContent();

  const stats = [
    { 
      label: "Total Projects", 
      value: totalProjects,
      icon: FaProjectDiagram,
      color: "#00E0FF",
      key: "totalProjects",
      description: "Click for detailed breakdown of all projects",
    },
    { 
      label: "Funds Raised", 
      value: `$${totalFundsRaised.toLocaleString()}`,
      icon: FaChartLine,
      color: "#8A7CFB",
      key: "totalFundsRaised",
      description: "Click to see funding breakdown and trends",
    },
    { 
      label: "Success Rate", 
      value: `${successRate}%`,
      icon: FaRegLightbulb,
      color: "#48BB78",
      key: "successRate",
      description: "Click to view success metrics and analysis",
    }
  ];
  
  // Loading and filtering effects
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Apply search, category, location, and donation type filters to explore projects
      let filteredExplore = projectsExploreData;
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredExplore = filteredExplore.filter(project => 
          project.title?.toLowerCase().includes(query) || 
          project.description?.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (categoryFilter) {
        filteredExplore = filteredExplore.filter(project => 
          project.category === categoryFilter
        );
      }
      
      // Apply location filter
      if (locationFilter) {
        filteredExplore = filteredExplore.filter(project => 
          project.location?.includes(locationFilter)
        );
      }
      
      // Apply donation type filter
      if (donationTypeFilter) {
        filteredExplore = filteredExplore.filter(project => 
          project.donationType?.toLowerCase() === donationTypeFilter.toLowerCase()
        );
      }
      
      // Apply any additional filters from exploreFilters
      if (exploreFilters.length > 0) {
        filteredExplore = filteredExplore.filter(project => 
          exploreFilters.some(filter => 
            project.category === filter || 
            project.tags?.includes(filter) ||
            project.donationType?.toLowerCase() === filter.toLowerCase())
        );
      }
      
      setFilteredExploreProjects(filteredExplore);
      
      // Apply filters to funding projects
      let filteredFunding = projectsData;
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredFunding = filteredFunding.filter(project => 
          project.title?.toLowerCase().includes(query) || 
          project.description?.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (categoryFilter) {
        filteredFunding = filteredFunding.filter(project => 
          project.category === categoryFilter
        );
      }
      
      // Apply location filter
      if (locationFilter) {
        filteredFunding = filteredFunding.filter(project => 
          project.location?.includes(locationFilter)
        );
      }
      
      // Apply donation type filter
      if (donationTypeFilter) {
        filteredFunding = filteredFunding.filter(project => 
          project.donationType?.toLowerCase() === donationTypeFilter.toLowerCase()
        );
      }
      
      // Apply any additional fundingFilters
      filteredFunding = filterAndSortProjects(filteredFunding, fundingFilters);
      
      setFilteredFundingProjects(filteredFunding);
      
      setIsLoading(false);
    }, 500);
  }, [searchQuery, categoryFilter, locationFilter, donationTypeFilter, exploreFilters, fundingFilters]);
  
  return (
    <Box 
      minH="100vh" 
      bg="#0A0F1E"
      backgroundImage="radial-gradient(circle at 20% 30%, rgba(0, 224, 255, 0.03) 0%, transparent 40%), 
                       radial-gradient(circle at 80% 70%, rgba(138, 124, 251, 0.03) 0%, transparent 40%)"
      position="relative"
      overflow="hidden"
      pt={10}
      pb={20}
    >
      {/* Page Header */}
      <Container maxW="container.xl" mb={10} textAlign="center">
        <Icon 
          as={FaProjectDiagram}
          color="#00E0FF"
          boxSize="50px"
          mb={6}
        />
        <Heading
          fontSize={{ base: "4xl", md: "5xl" }}
          mb={4}
          bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
          bgClip="text"
          fontWeight="bold"
        >
          Project Funding
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.400"
          maxW="container.md"
          mx="auto"
          mb={10}
        >
          Track the progress of funded projects with milestone-based verification on the blockchain
        </Text>
      </Container>

      {/* Stats Cards */}
      <Container maxW="container.xl" mb={10}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              as={motion.div}
              whileHover={{ 
                y: -5,
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStatClick(stat.key)}
              bg="rgba(13, 16, 31, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              borderWidth="1px"
              borderColor={selectedStat === stat.key ? stat.color : "rgba(255, 255, 255, 0.05)"}
              p={6}
              textAlign="center"
              position="relative"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                borderColor: stat.color,
              }}
            >
              {/* Background icon */}
              <Icon 
                as={stat.icon} 
                color={stat.color} 
                position="absolute" 
                top="-15px" 
                right="-15px" 
                opacity="0.1" 
                boxSize="80px" 
              />
              
              {/* Visible icon */}
              <Flex direction="column" align="center" justify="center" position="relative" zIndex={1}>
                <Icon as={stat.icon} color={stat.color} boxSize={8} mb={3} />
                <Text 
                  color="white" 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold"
                  mb={2}
                >
                  {stat.value}
                </Text>
                <Text color="gray.400" fontSize="sm" mb={2}>{stat.label}</Text>
                
                {/* Add trend indicators */}
                {statsTrend[stat.key] && (
                  <HStack fontSize="xs" color={statsTrend[stat.key].value > 0 ? "green.400" : "red.400"} spacing={1}>
                    <Icon as={statsTrend[stat.key].value > 0 ? FaArrowUp : FaArrowDown} boxSize={3} />
                    <Text>{Math.abs(statsTrend[stat.key].value)}%</Text>
                  </HStack>
                )}
                
                {/* Info text */}
                <HStack color="gray.500" fontSize="xs" mt={3} spacing={1}>
                  <Icon as={FaInfoCircle} boxSize={3} />
                  <Text>Click for details</Text>
                </HStack>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Container>
      
      {/* Stats Modal */}
      <Modal isOpen={isStatsModalOpen} onClose={onStatsModalClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="rgba(13, 16, 31, 0.95)" borderColor="rgba(255, 255, 255, 0.05)" borderWidth="1px">
          <ModalHeader color="white">{modalContent?.title}</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {modalContent && (
              <VStack spacing={6} align="stretch">
                {/* Current value with trend */}
                <Stat>
                  <StatLabel color="gray.400">Current Value</StatLabel>
                  <StatNumber color="white" fontSize="3xl">
                    {selectedStat === 'totalFundsRaised' 
                      ? `$${modalContent.data.current.toLocaleString()}` 
                      : selectedStat === 'successRate' 
                        ? `${modalContent.data.current}%` 
                        : modalContent.data.current}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type={modalContent.data.trend > 0 ? 'increase' : 'decrease'} />
                    {Math.abs(modalContent.data.trend)}% {modalContent.data.trendLabel}
                  </StatHelpText>
                </Stat>
                
                {/* Breakdown by category */}
                <Box>
                  <Text color="white" fontWeight="medium" mb={3}>Breakdown</Text>
                  <VStack align="stretch" spacing={3}>
                    {modalContent.data.breakdown.map((item, idx) => (
                      <Box key={idx}>
                        <Flex justify="space-between" mb={1}>
                          <HStack>
                            <Circle size="12px" bg={item.color} />
                            <Text color="gray.300" fontSize="sm">{item.label}</Text>
                          </HStack>
                          <Text color="white" fontWeight="medium">
                            {selectedStat === 'totalFundsRaised' 
                              ? `$${item.value.toLocaleString()}` 
                              : selectedStat === 'successRate' 
                                ? `${item.value}%` 
                                : item.value}
                          </Text>
                        </Flex>
                        <Progress 
                          value={item.value} 
                          max={selectedStat === 'totalFundsRaised' 
                            ? modalContent.data.current 
                            : selectedStat === 'successRate' 
                              ? 100 
                              : modalContent.data.current}
                          size="sm"
                          colorScheme={item.color.includes('#48BB78') ? 'green' : 
                                        item.color.includes('#3182CE') ? 'blue' : 
                                        item.color.includes('#DD6B20') ? 'orange' : 
                                        item.color.includes('#00E0FF') ? 'cyan' : 
                                        'purple'}
                          borderRadius="full"
                        />
                      </Box>
                    ))}
                  </VStack>
                </Box>
                
                {/* Historical data */}
                <Box>
                  <Text color="white" fontWeight="medium" mb={3}>12-Month History</Text>
                  <Box h="150px" position="relative" mt={4}>
                    {/* Simple chart visualization */}
                    <Flex h="100%" position="relative" align="flex-end">
                      {modalContent.data.history.map((value, idx) => {
                        const maxValue = Math.max(...modalContent.data.history);
                        const height = (value / maxValue) * 100;
                        const color = selectedStat === 'totalProjects' ? '#00E0FF' : 
                                      selectedStat === 'totalFundsRaised' ? '#8A7CFB' : '#48BB78';
                        
                        return (
                          <Tooltip 
                            key={idx} 
                            label={selectedStat === 'totalFundsRaised' 
                              ? `$${value.toLocaleString()}` 
                              : selectedStat === 'successRate' 
                                ? `${value}%` 
                                : value}
                            placement="top"
                          >
                            <Box
                              w="8.33%"
                              h={`${height}%`}
                              bg={color}
                              opacity={0.7}
                              _hover={{ opacity: 1 }}
                              borderTopRadius="md"
                              mx="1px"
                              transition="all 0.2s"
                            />
                          </Tooltip>
                        );
                      })}
                    </Flex>
                  </Box>
                  <Flex justify="space-between" mt={2}>
                    <Text color="gray.500" fontSize="xs">12 Months Ago</Text>
                    <Text color="gray.500" fontSize="xs">Current</Text>
                  </Flex>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onStatsModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Container maxW="container.xl">
        {/* Toggle Buttons for Pending/Ongoing */}
        <Flex justify="space-between" mb={6}>
          <Button
            leftIcon={<Icon as={FaSearch} />}
            variant={activeView === 'pending' ? 'solid' : 'outline'}
            colorScheme="cyan"
            size="lg"
            flex={1}
            mr={2}
            bg={activeView === 'pending' ? 'rgba(0, 224, 255, 0.2)' : 'transparent'}
            borderColor={activeView === 'pending' ? 'transparent' : 'rgba(0, 224, 255, 0.3)'}
            color={activeView === 'pending' ? 'white' : 'gray.400'}
            onClick={() => setActiveView('pending')}
            _hover={{
              bg: activeView === 'pending' ? 'rgba(0, 224, 255, 0.3)' : 'rgba(0, 224, 255, 0.1)',
            }}
          >
            Pending Projects
          </Button>
          <Button
            leftIcon={<Icon as={FaRocket} />}
            variant={activeView === 'ongoing' ? 'solid' : 'outline'}
            colorScheme="purple"
            size="lg"
            flex={1}
            ml={2}
            bg={activeView === 'ongoing' ? 'rgba(138, 124, 251, 0.2)' : 'transparent'}
            borderColor={activeView === 'ongoing' ? 'transparent' : 'rgba(138, 124, 251, 0.3)'}
            color={activeView === 'ongoing' ? 'white' : 'gray.400'}
            onClick={() => setActiveView('ongoing')}
            _hover={{
              bg: activeView === 'ongoing' ? 'rgba(138, 124, 251, 0.3)' : 'rgba(138, 124, 251, 0.1)',
            }}
          >
            Ongoing Projects
          </Button>
        </Flex>
        
        {/* Filter Controls */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          mb={8} 
          gap={4}
          align="center"
        >
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search projects" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="rgba(13, 16, 31, 0.7)"
              borderColor="rgba(255, 255, 255, 0.1)"
              borderRadius="lg"
              _hover={{
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _focus={{
                borderColor: "#00E0FF",
                boxShadow: "0 0 0 1px #00E0FF",
              }}
            />
          </InputGroup>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<FaAngleDown />}
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.1)"
              color={categoryFilter ? "white" : "gray.400"}
              bg="rgba(13, 16, 31, 0.7)"
              minW="180px"
              _hover={{
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _active={{
                bg: "rgba(13, 16, 31, 0.9)",
              }}
            >
              {categoryFilter || "Category"}
            </MenuButton>
            <MenuList bg="rgba(13, 16, 31, 0.9)" borderColor="rgba(255, 255, 255, 0.1)">
              <MenuItem onClick={() => setCategoryFilter('')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>All Categories</MenuItem>
              <MenuItem onClick={() => setCategoryFilter('Food')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Food</MenuItem>
              <MenuItem onClick={() => setCategoryFilter('Water')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Water</MenuItem>
              <MenuItem onClick={() => setCategoryFilter('Education')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Education</MenuItem>
              <MenuItem onClick={() => setCategoryFilter('Healthcare')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Healthcare</MenuItem>
            </MenuList>
          </Menu>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<FaAngleDown />}
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.1)"
              color={locationFilter ? "white" : "gray.400"}
              bg="rgba(13, 16, 31, 0.7)"
              minW="180px"
              _hover={{
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _active={{
                bg: "rgba(13, 16, 31, 0.9)",
              }}
            >
              {locationFilter || "Location"}
            </MenuButton>
            <MenuList bg="rgba(13, 16, 31, 0.9)" borderColor="rgba(255, 255, 255, 0.1)">
              <MenuItem onClick={() => setLocationFilter('')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>All Locations</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Selangor')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Selangor</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Kuala Lumpur')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Kuala Lumpur</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Johor')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Johor</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Penang')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Penang</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Sabah')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Sabah</MenuItem>
              <MenuItem onClick={() => setLocationFilter('Sarawak')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Sarawak</MenuItem>
            </MenuList>
          </Menu>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<FaAngleDown />}
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.1)"
              color={donationTypeFilter ? "white" : "gray.400"}
              bg="rgba(13, 16, 31, 0.7)"
              minW="180px"
              _hover={{
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              _active={{
                bg: "rgba(13, 16, 31, 0.9)",
              }}
              leftIcon={<Icon as={FaCoins} />}
            >
              {donationTypeFilter || "Donation Type"}
            </MenuButton>
            <MenuList bg="rgba(13, 16, 31, 0.9)" borderColor="rgba(255, 255, 255, 0.1)">
              <MenuItem onClick={() => setDonationTypeFilter('')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>All Types</MenuItem>
              <MenuItem onClick={() => setDonationTypeFilter('Sadaqah')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Sadaqah</MenuItem>
              <MenuItem onClick={() => setDonationTypeFilter('Waqf')} bg="transparent" _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}>Waqf</MenuItem>
            </MenuList>
          </Menu>
          
          <Button 
            rightIcon={<FaFilter />}
            variant="outline"
            borderColor="rgba(0, 224, 255, 0.3)"
            color="#00E0FF"
            _hover={{
              bg: "rgba(0, 224, 255, 0.1)",
            }}
          >
            More Filters
          </Button>
        </Flex>
        
        {/* Project Cards */}
        {activeView === 'pending' ? (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Box 
                  key={index}
                  bg="rgba(13, 16, 31, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.05)"
                  h="500px"
                  position="relative"
                  overflow="hidden"
                >
                  <Box 
                    position="absolute" 
                    top="0" 
                    left="-100%" 
                    width="150%" 
                    height="100%" 
                    background="linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
                    animation="shine 1.5s infinite"
                  />
                </Box>
              ))
            ) : filteredExploreProjects.length > 0 ? (
              filteredExploreProjects.map((project) => (
                <ProjectCardExplore 
                  key={project.id} 
                  project={project} 
                  handleProjectClick={handleProjectExploreClick}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <Box 
                gridColumn="1 / -1" 
                textAlign="center" 
                p={10} 
                bg="rgba(13, 16, 31, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.05)"
              >
                <Icon as={FaSearch} color="gray.500" boxSize={12} mb={4} />
                <Heading size="md" color="gray.400" mb={4}>No Projects Found</Heading>
                <Text color="gray.500" mb={6}>
                  No pending projects match your current filter criteria. Try adjusting your filters or check back later.
                </Text>
                <Button 
                  onClick={() => {
                    setExploreFilters([]);
                    setCategoryFilter('');
                    setLocationFilter('');
                    setSearchQuery('');
                    setDonationTypeFilter('');
                  }}
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="#00E0FF"
                  _hover={{
                    borderColor: "#00E0FF",
                    bg: "rgba(0, 224, 255, 0.1)"
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            )}
          </Grid>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Box 
                  key={index}
                  bg="rgba(13, 16, 31, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.05)"
                  h="600px"
                  position="relative"
                  overflow="hidden"
                >
                  <Box 
                    position="absolute" 
                    top="0" 
                    left="-100%" 
                    width="150%" 
                    height="100%" 
                    background="linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
                    animation="shine 1.5s infinite"
                  />
                </Box>
              ))
            ) : filteredFundingProjects.length > 0 ? (
              filteredFundingProjects.map((project) => (
                <ProjectCardFunding 
                  key={project.id} 
                  project={project} 
                  openMilestoneDetails={handleProjectFundingClick}
                />
              ))
            ) : (
              <Box 
                gridColumn="1 / -1" 
                textAlign="center" 
                p={10} 
                bg="rgba(13, 16, 31, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.05)"
              >
                <Icon as={FaRocket} color="gray.500" boxSize={12} mb={4} />
                <Heading size="md" color="gray.400" mb={4}>No Projects Found</Heading>
                <Text color="gray.500" mb={6}>
                  No ongoing projects match your current filter criteria. Try adjusting your filters or check back later.
                </Text>
                <Button 
                  onClick={() => {
                    setFundingFilters({ category: '', status: '', sortBy: 'progress' });
                    setCategoryFilter('');
                    setLocationFilter('');
                    setSearchQuery('');
                    setDonationTypeFilter('');
                  }}
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="#00E0FF"
                  _hover={{
                    borderColor: "#00E0FF",
                    bg: "rgba(0, 224, 255, 0.1)"
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            )}
          </Grid>
        )}
      </Container>
      
      {/* Project Details Modals */}
      <ProjectDetailsModalExplore 
        isOpen={isOpenExplore} 
        onClose={onCloseExplore} 
        project={selectedProjectExplore} 
      />
      
      <ProjectDetailsModalFunding 
        isOpen={isOpenFunding} 
        onClose={onCloseFunding} 
        project={selectedProjectFunding} 
      />
    </Box>
  );
};

export default MergedProjectsPage;
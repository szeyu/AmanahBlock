import React, { useState, useEffect } from 'react';
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
  MenuItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaChartLine, FaRegLightbulb, FaSearch, FaRocket, FaFilter, FaAngleDown, FaCoins, FaLayerGroup } from 'react-icons/fa';

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

  const stats = [
    { 
      label: "Total Projects", 
      value: totalProjects,
      icon: FaProjectDiagram,
      color: "#00E0FF"
    },
    { 
      label: "Funds Raised", 
      value: `$${totalFundsRaised.toLocaleString()}`,
      icon: FaChartLine,
      color: "#8A7CFB"
    },
    { 
      label: "Success Rate", 
      value: `${successRate}%`,
      icon: FaRegLightbulb,
      color: "#48BB78"
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
              bg="rgba(13, 16, 31, 0.7)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="rgba(255, 255, 255, 0.05)"
              p={6}
              textAlign="center"
              position="relative"
              overflow="hidden"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: `0 20px 30px -10px ${stat.color}30`,
                borderColor: `${stat.color}50`,
                "& > .stat-icon": {
                  opacity: "0.2",
                  transform: "scale(1.2) rotate(10deg)",
                },
                "& > .content > .visible-icon": {
                  transform: "rotateY(360deg)",
                  color: stat.color,
                },
                "& > .content > .stat-value": {
                  transform: "scale(1.05)",
                  color: "white",
                },
                cursor: "pointer"
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
                className="stat-icon"
                transition="all 0.5s ease"
              />
              
              {/* Decorative elements that appear on hover */}
              <Box
                position="absolute"
                bottom="-50px"
                left="-50px"
                width="100px"
                height="100px"
                borderRadius="full"
                bg={stat.color}
                opacity="0"
                filter="blur(30px)"
                transition="opacity 0.5s ease"
                _groupHover={{ opacity: "0.1" }}
              />
              
              {/* Visible icon and content */}
              <Flex 
                direction="column" 
                align="center" 
                justify="center" 
                position="relative" 
                zIndex={1}
                className="content"
              >
                <Icon 
                  as={stat.icon} 
                  color={stat.color} 
                  boxSize={8} 
                  mb={3}
                  className="visible-icon"
                  transition="all 0.6s ease"
                />
                <Text 
                  color="white" 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold"
                  mb={2}
                  className="stat-value"
                  transition="all 0.3s ease"
                >
                  {stat.value}
                </Text>
                <Text 
                  color="gray.400" 
                  fontSize="sm"
                  transition="color 0.3s ease"
                  _groupHover={{ color: "gray.300" }}
                >
                  {stat.label}
                </Text>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Container>
      
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
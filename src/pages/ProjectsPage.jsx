import React, { useState, useEffect } from 'react';
import { VStack, HStack, Button, Box, Heading, Text, Grid, useDisclosure, Skeleton, SkeletonText } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectDetailsModal from '../components/projects/ProjectDetailsModal';
import { projectsExploreData } from '../data/projectsExploreData';

const ProjectsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle opening project modal from map link
  useEffect(() => {
    // Check if we navigated with state and loading is finished
    if (!isLoading && location.state?.openProjectId) {
      const projectIdToOpen = location.state.openProjectId;
      const projectToOpen = projectsExploreData.find(p => p.id === projectIdToOpen);
      
      if (projectToOpen) {
        handleProjectClick(projectToOpen);
        // Optional: Clear the state after use to prevent re-opening on refresh/back
        // Note: This might require more complex state management or history manipulation
        // window.history.replaceState({}, document.title)
      }
    }
    // Depend on isLoading and location.state to re-run if needed
    // Be cautious with location.state as dependency if it causes loops
  }, [isLoading, location.state]); 

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const toggleFavorite = (projectId) => {
    if (favorites.includes(projectId)) {
      setFavorites(favorites.filter(id => id !== projectId));
    } else {
      setFavorites([...favorites, projectId]);
    }
  };

  const addFilter = (filter) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter(f => f !== filter));
  };

  // Project card skeleton for loading state
  const ProjectCardSkeleton = () => (
    <Box
      bg="rgba(13, 16, 31, 0.85)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.05)"
      height="520px"
    >
      <Skeleton height="200px" width="100%" />
      <Box p={5}>
        <Skeleton height="24px" width="70%" mb={2} />
        <Skeleton height="16px" width="40%" mb={3} />
        <SkeletonText mt={2} noOfLines={2} spacing="2" mb={4} />
        <Skeleton height="1px" width="100%" mb={4} />
        <Skeleton height="24px" width="60%" mb={2} />
        <Skeleton height="8px" width="100%" mb={2} />
        <Skeleton height="16px" width="100%" mb={4} />
        <Skeleton height="40px" width="100%" />
      </Box>
    </Box>
  );

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Explore Projects</Heading>
      <Text color="gray.400" mb={6}>Discover Shariah-compliant charitable projects that need your support</Text>
      
      <ProjectFilters 
        filters={filters} 
        setFilters={setFilters} 
        addFilter={addFilter} 
        removeFilter={removeFilter} 
      />
      
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} mb={10}>
        {isLoading ? (
          // Render skeletons while loading
          Array(6).fill(0).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))
        ) : (
          // Render actual project cards when loaded
          projectsExploreData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              handleProjectClick={handleProjectClick}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </Grid>
      
      {/* Bottom CTA Section */}
      <Box
        bg="rgba(13, 16, 31, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.05)"
        p={8}
        textAlign="center"
        position="relative"
        overflow="hidden"
        mb={10}
      >
        {/* Decorative elements */}
        <Box 
          position="absolute" 
          top="-50px" 
          right="-50px" 
          width="150px" 
          height="150px" 
          borderRadius="full" 
          bg="#00E0FF" 
          opacity="0.05" 
          filter="blur(50px)" 
          zIndex={0}
        />
        
        <Box 
          position="absolute" 
          bottom="-50px" 
          left="-50px" 
          width="150px" 
          height="150px" 
          borderRadius="full" 
          bg="#8A7CFB" 
          opacity="0.05" 
          filter="blur(50px)" 
          zIndex={0}
        />
        
        <VStack spacing={4} position="relative" zIndex={1}>
          <Heading 
            size="lg" 
            color="white"
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
            bgClip="text"
            fontWeight="bold"
            mb={2}
          >
            Ready to Make a Difference?
          </Heading>
          <Text color="gray.300" maxW="container.md" mx="auto" mb={6}>
            Start your own project or contribute to existing ones. Every donation is tracked on the blockchain for complete transparency.
          </Text>
          <HStack spacing={4}>
            <Button 
              as="a"
              // href="/create-project"
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
              _hover={{
                bgGradient: "linear(to-r, #00E0FF, #8A7CFB)",
                opacity: 0.9,
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px rgba(0, 224, 255, 0.3)"
              }}
              color="white"
              fontWeight="bold"
              px={8}
              py={6}
              borderRadius="xl"
              position="relative"
              overflow="hidden"
            >
              {/* Animated glow effect on button */}
              <Box 
                position="absolute"
                top="0"
                left="-100%"
                width="50%"
                height="100%"
                bg="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)"
                animation="shine 1.5s infinite"
                zIndex={0}
              />
              Start a Project
            </Button>
            <Button 
              as="a"
              href="/donate"
              variant="outline"
              borderColor="rgba(255, 255, 255, 0.2)"
              color="white"
              _hover={{
                borderColor: "#00E0FF",
                color: "#00E0FF",
                bg: "rgba(0, 224, 255, 0.1)"
              }}
              px={8}
              py={6}
              borderRadius="xl"
            >
              Donate Now
            </Button>
          </HStack>
        </VStack>
      </Box>
      
      <ProjectDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedProject={selectedProject}
      />
    </Box>
  );
};

export default ProjectsPage; 
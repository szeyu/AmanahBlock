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
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaChartLine, FaRegLightbulb } from 'react-icons/fa';
import ProjectCard from '../components/funding/ProjectCard';
import ProjectFilters from '../components/funding/ProjectFilters';
import ProjectDetailsModal from '../components/funding/ProjectDetailsModal';
import projectsData from '../data/projectsData';
import { filterAndSortProjects } from '../utils/projectUtils';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const ProjectFundingPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sortBy: 'progress'
  });
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      // Apply filters and sorting
      const filtered = filterAndSortProjects(projectsData, filters);
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 500);
  }, [filters]);
  
  // Open milestone details modal
  const openMilestoneDetails = (project) => {
    setSelectedProject(project);
    onOpen();
  };
  
  // Stats for the header
  const stats = [
    { 
      label: "Total Projects", 
      value: projectsData.length,
      icon: FaProjectDiagram,
      color: "#00E0FF"
    },
    { 
      label: "Funds Raised", 
      value: `$${projectsData.reduce((sum, project) => sum + project.raisedAmount, 0).toLocaleString()}`,
      icon: FaChartLine,
      color: "#8A7CFB"
    },
    { 
      label: "Success Rate", 
      value: "92%",
      icon: FaRegLightbulb,
      color: "#48BB78"
    }
  ];
  
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
      {/* Decorative elements */}
      <Box 
        position="absolute" 
        top="10%" 
        right="5%" 
        width="300px" 
        height="300px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity="0.03" 
        filter="blur(100px)" 
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        bottom="10%" 
        left="5%" 
        width="300px" 
        height="300px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity="0.03" 
        filter="blur(100px)" 
        zIndex={0}
      />
      
      {/* Hexagon grid pattern with reduced opacity */}
      <Box 
        className="hexagon-grid" 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0} 
        opacity={0.02} 
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Page Header */}
        <Flex 
          direction="column" 
          align="center" 
          textAlign="center" 
          mb={12}
        >
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            mb={2}
          >
            <Icon as={FaProjectDiagram} color="#00E0FF" boxSize={12} mb={4} />
          </MotionBox>
          
          <MotionHeading
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            size="xl"
            mb={4}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
            bgClip="text"
            fontWeight="bold"
          >
            Project Funding
          </MotionHeading>
          
          <MotionText
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            color="gray.400"
            fontSize="lg"
            maxW="container.md"
            mb={8}
          >
            Track the progress of funded projects with milestone-based verification on the blockchain
          </MotionText>
          
          {/* Stats */}
          <MotionFlex
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            justify="center"
            wrap="wrap"
            gap={6}
            mb={10}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                bg="rgba(13, 16, 31, 0.7)"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.05)"
                p={6}
                minW="200px"
                textAlign="center"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 20px rgba(${stat.color === "#00E0FF" ? "0, 224, 255" : 
                                                stat.color === "#8A7CFB" ? "138, 124, 251" : 
                                                "72, 187, 120"}, 0.2)`,
                  borderColor: stat.color
                }}
              >
                <Icon as={stat.icon} color={stat.color} boxSize={8} mb={3} />
                <Text color="gray.400" fontSize="sm" mb={1}>{stat.label}</Text>
                <Heading size="lg" color="white">{stat.value}</Heading>
              </Box>
            ))}
          </MotionFlex>
        </Flex>
        
        {/* Filters */}
        <ProjectFilters filters={filters} setFilters={setFilters} />
        
        {/* Project Cards */}
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} 
          gap={8} 
          mb={10}
        >
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
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                openMilestoneDetails={openMilestoneDetails}
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
              <Icon as={FaProjectDiagram} color="gray.500" boxSize={12} mb={4} />
              <Heading size="md" color="gray.400" mb={4}>No Projects Found</Heading>
              <Text color="gray.500" mb={6}>
                No projects match your current filter criteria. Try adjusting your filters or check back later.
              </Text>
              <Button 
                onClick={() => setFilters({ category: '', status: '', sortBy: 'progress' })}
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
        
        {/* Project Details Modal */}
        <ProjectDetailsModal 
          isOpen={isOpen} 
          onClose={onClose} 
          project={selectedProject} 
        />
        
        {/* Bottom CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          bg="rgba(13, 16, 31, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.05)"
          p={8}
          textAlign="center"
          position="relative"
          overflow="hidden"
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
                href="/create-project"
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
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProjectFundingPage;
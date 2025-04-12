import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Flex,
  Button,
  Badge,
  Progress,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Avatar,
  AvatarGroup,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  SimpleGrid,
  Select
} from '@chakra-ui/react';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaCheckCircle, 
  FaRegClock, 
  FaExclamationTriangle, 
  FaFileAlt, 
  FaRegCheckCircle, 
  FaRegTimesCircle,
  FaShieldAlt,
  FaChartLine,
  FaRegLightbulb,
  FaCamera,
  FaEthereum
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShariahComplianceBadge from '../components/ShariahComplianceBadge';
import BlockchainVerification from '../components/BlockchainVerification';
import MilestoneTimeline from '../components/VerticalTimeline';

const ProjectFundingPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock data for projects with milestones
  const projects = [
    {
      id: 1,
      title: "School Building in Yemen",
      category: "Education",
      location: "Sana'a, Yemen",
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799",
      description: "Construction of a school for 500 children in war-torn Yemen, providing safe access to education.",
      totalFunding: 50000,
      raisedAmount: 32500,
      progress: 65,
      startDate: "2023-01-15",
      endDate: "2023-12-15",
      status: "In Progress",
      pool: "school",
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
      partners: [
        { name: "Yemen Education Foundation", role: "Local Partner" },
        { name: "Global Builders Co.", role: "Construction" }
      ],
      milestones: [
        {
          id: 101,
          title: "Land Acquisition & Permits",
          description: "Purchase of land and obtaining necessary building permits",
          amount: 10000,
          status: "Completed",
          completionDate: "2023-03-10",
          verificationHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
          evidence: [
            { type: "document", title: "Land Deed", url: "#" },
            { type: "document", title: "Building Permit", url: "#" },
            { type: "image", title: "Site Photo", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5" }
          ]
        },
        {
          id: 102,
          title: "Foundation & Structure",
          description: "Construction of the building foundation and main structure",
          amount: 15000,
          status: "Completed",
          completionDate: "2023-06-20",
          verificationHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
          evidence: [
            { type: "image", title: "Foundation Work", url: "https://images.unsplash.com/photo-1503387837-b154d5074bd2" },
            { type: "image", title: "Structure Progress", url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77" }
          ]
        },
        {
          id: 103,
          title: "Walls & Roofing",
          description: "Construction of walls, roofing, and basic interior",
          amount: 12000,
          status: "In Progress",
          completionDate: null,
          verificationHash: null,
          evidence: []
        },
        {
          id: 104,
          title: "Interior & Furnishing",
          description: "Interior finishing, classroom setup, and furnishing",
          amount: 8000,
          status: "Pending",
          completionDate: null,
          verificationHash: null,
          evidence: []
        },
        {
          id: 105,
          title: "Equipment & Materials",
          description: "Educational equipment, books, and teaching materials",
          amount: 5000,
          status: "Pending",
          completionDate: null,
          verificationHash: null,
          evidence: []
        }
      ]
    },
    {
      id: 2,
      title: "Emergency Flood Relief in Bangladesh",
      category: "Disaster Relief",
      location: "Dhaka, Bangladesh",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5",
      description: "Emergency relief for families affected by severe flooding in Bangladesh, providing food, clean water, and temporary shelter.",
      totalFunding: 30000,
      raisedAmount: 25500,
      progress: 85,
      startDate: "2023-04-10",
      endDate: "2023-07-10",
      status: "In Progress",
      pool: "flood",
      shariahStatus: "Fully Compliant",
      scholars: ["Dr. Mufti Taqi Usmani", "Sheikh Mohammed Al-Yaqoubi"],
      partners: [
        { name: "Bangladesh Relief Organization", role: "Local Partner" },
        { name: "Global Water Initiative", role: "Water Purification" }
      ],
      milestones: [
        {
          id: 201,
          title: "Immediate Food & Water",
          description: "Distribution of emergency food packages and clean water",
          amount: 12000,
          status: "Completed",
          completionDate: "2023-04-20",
          verificationHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
          evidence: [
            { type: "image", title: "Food Distribution", url: "https://images.unsplash.com/photo-1469571486292-b53601010b89" },
            { type: "document", title: "Distribution Report", url: "#" }
          ]
        },
        {
          id: 202,
          title: "Temporary Shelter",
          description: "Setting up temporary shelters for displaced families",
          amount: 10000,
          status: "Completed",
          completionDate: "2023-05-15",
          verificationHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
          evidence: [
            { type: "image", title: "Shelter Construction", url: "https://images.unsplash.com/photo-1603531763662-f95714fd0dbd" }
          ]
        },
        {
          id: 203,
          title: "Medical Aid",
          description: "Medical supplies and healthcare for affected communities",
          amount: 8000,
          status: "In Progress",
          completionDate: null,
          verificationHash: null,
          evidence: []
        }
      ]
    }
  ];
  
  // Calculate milestone progress
  const calculateMilestoneProgress = (milestones) => {
    const completed = milestones.filter(m => m.status === "Completed").length;
    return Math.round((completed / milestones.length) * 100);
  };
  
  // Open milestone details modal
  const openMilestoneDetails = (project) => {
    setSelectedProject(project);
    onOpen();
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Pending": return "gray";
      case "Delayed": return "orange";
      case "Failed": return "red";
      default: return "gray";
    }
  };
  
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  
  const categories = ['all', 'Education', 'Disaster Relief'];
  
  // Filter and sort projects based on selected criteria
  const filteredProjects = projects
    .filter(project => {
      // Category filter
      if (categoryFilter !== 'all' && project.category !== categoryFilter) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && project.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch(sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'deadline':
          // Extract days from deadline string (e.g., "30 days left" -> 30)
          const aDays = parseInt(a.endDate.split('-')[2]);
          const bDays = parseInt(b.endDate.split('-')[2]);
          return aDays - bDays;
        case 'donors':
          return b.partners.length - a.partners.length;
        case 'amount':
          return b.raisedAmount - a.raisedAmount;
        default:
          return 0;
      }
    });
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Project Funding</Heading>
      <Text color="gray.400" mb={6}>Track the progress of funded projects with milestone-based verification</Text>
      
      {/* Filters */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={4}
        mb={6}
        borderWidth="1px"
        borderColor="gray.700"
      >
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <Select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            _hover={{ borderColor: "brand.500" }}
            _focus={{ borderColor: "brand.500" }}
          >
            {categories.map(category => (
              <option key={category} value={category} style={{ backgroundColor: "#1A202C", color: "white" }}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Select>
          
          <Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            _hover={{ borderColor: "brand.500" }}
            _focus={{ borderColor: "brand.500" }}
          >
            <option value="all" style={{ backgroundColor: "#1A202C", color: "white" }}>All Statuses</option>
            <option value="In Progress" style={{ backgroundColor: "#1A202C", color: "white" }}>In Progress</option>
            <option value="Completed" style={{ backgroundColor: "#1A202C", color: "white" }}>Completed</option>
            <option value="Pending" style={{ backgroundColor: "#1A202C", color: "white" }}>Pending</option>
            <option value="Delayed" style={{ backgroundColor: "#1A202C", color: "white" }}>Delayed</option>
            <option value="Failed" style={{ backgroundColor: "#1A202C", color: "white" }}>Failed</option>
          </Select>
          
          <Select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            _hover={{ borderColor: "brand.500" }}
            _focus={{ borderColor: "brand.500" }}
          >
            <option value="progress" style={{ backgroundColor: "#1A202C", color: "white" }}>Sort by Progress</option>
            <option value="deadline" style={{ backgroundColor: "#1A202C", color: "white" }}>Sort by Deadline</option>
            <option value="donors" style={{ backgroundColor: "#1A202C", color: "white" }}>Sort by Donors</option>
            <option value="amount" style={{ backgroundColor: "#1A202C", color: "white" }}>Sort by Amount</option>
          </Select>
        </Grid>
      </Box>
      
      {/* Project Cards */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={10}>
        {filteredProjects.map((project) => (
          <Box 
            key={project.id}
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
                src={project.image} 
                alt={project.title} 
                w="full" 
                h="200px" 
                objectFit="cover" 
              />
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                bottom={0} 
                bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
              />
              <Box position="absolute" top={4} right={4}>
                <ShariahComplianceBadge 
                  level={project.shariahStatus} 
                  scholars={project.scholars}
                  showDetails={false}
                />
              </Box>
              <Box position="absolute" bottom={4} left={4}>
                <Heading size="md" color="white" mb={1}>{project.title}</Heading>
                <HStack>
                  <Badge colorScheme="purple">{project.category}</Badge>
                  <HStack spacing={1}>
                    <Icon as={FaMapMarkerAlt} color="gray.300" boxSize={3} />
                    <Text color="gray.300" fontSize="sm">{project.location}</Text>
                  </HStack>
                </HStack>
              </Box>
            </Box>
            
            <Box p={4}>
              <Text color="gray.300" mb={4} noOfLines={2}>
                {project.description}
              </Text>
              
              <Box mb={4}>
                <Flex justify="space-between" mb={1}>
                  <Text color="gray.400" fontSize="sm">Funding Progress</Text>
                  <Text color="white" fontSize="sm">${project.raisedAmount.toLocaleString()} / ${project.totalFunding.toLocaleString()}</Text>
                </Flex>
                <Progress 
                  value={project.progress} 
                  size="sm" 
                  colorScheme="brand" 
                  borderRadius="full" 
                  bg="gray.700"
                />
              </Box>
              
              <Box mb={4}>
                <Flex justify="space-between" mb={1}>
                  <Text color="gray.400" fontSize="sm">Milestone Progress</Text>
                  <Text color="white" fontSize="sm">
                    {project.milestones.filter(m => m.status === "Completed").length} of {project.milestones.length} Complete
                  </Text>
                </Flex>
                <Progress 
                  value={calculateMilestoneProgress(project.milestones)} 
                  size="sm" 
                  colorScheme="green" 
                  borderRadius="full" 
                  bg="gray.700"
                />
              </Box>
              
              <Divider borderColor="gray.700" mb={4} />
              
              <SimpleGrid columns={2} spacing={4} mb={4}>
                <Box>
                  <Text color="gray.400" fontSize="xs">Status</Text>
                  <Badge colorScheme={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="xs">Timeline</Text>
                  <HStack>
                    <Icon as={FaCalendarAlt} color="gray.400" boxSize={3} />
                    <Text color="white" fontSize="xs">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="xs">Partners</Text>
                  <AvatarGroup size="xs" max={3}>
                    {project.partners.map((partner, index) => (
                      <Avatar key={index} name={partner.name} />
                    ))}
                  </AvatarGroup>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="xs">Pool</Text>
                  <Badge colorScheme="accent" variant="subtle">
                    {project.pool.charAt(0).toUpperCase() + project.pool.slice(1)} Pool
                  </Badge>
                </Box>
              </SimpleGrid>
              
              <Button 
                variant="gradient" 
                w="full"
                onClick={() => openMilestoneDetails(project)}
              >
                View Milestones
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
      
      {/* Milestone Tracking Modal */}
      {selectedProject && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent 
            bg="gray.800" 
            color="white"
            sx={{
              '& .chakra-modal__body': {
                maxHeight: '70vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(66, 153, 225, 0.5) rgba(45, 55, 72, 0.3)',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(45, 55, 72, 0.3)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(66, 153, 225, 0.5)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: 'rgba(66, 153, 225, 0.7)',
                  },
                },
              },
            }}
          >
            <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
              <Heading size="md">{selectedProject.title} - Milestones</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody py={6}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Flex justify="space-between" align="center" mb={4}>
                    <HStack>
                      <Badge colorScheme={getStatusColor(selectedProject.status)} px={2} py={1}>
                        {selectedProject.status}
                      </Badge>
                      <Text color="gray.300" fontSize="sm">
                        {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <ShariahComplianceBadge 
                      level={selectedProject.shariahStatus} 
                      scholars={selectedProject.scholars}
                    />
                  </Flex>
                  
                  <Text color="gray.300" mb={4}>
                    {selectedProject.description}
                  </Text>
                  
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
                    <Box p={3} bg="gray.700" borderRadius="md">
                      <Text color="gray.400" fontSize="sm">Total Funding</Text>
                      <Text color="white" fontWeight="bold">${selectedProject.totalFunding.toLocaleString()}</Text>
                    </Box>
                    <Box p={3} bg="gray.700" borderRadius="md">
                      <Text color="gray.400" fontSize="sm">Raised Amount</Text>
                      <Text color="white" fontWeight="bold">${selectedProject.raisedAmount.toLocaleString()}</Text>
                    </Box>
                    <Box p={3} bg="gray.700" borderRadius="md">
                      <Text color="gray.400" fontSize="sm">Funding Progress</Text>
                      <Progress 
                        value={selectedProject.progress} 
                        size="sm" 
                        colorScheme="brand" 
                        borderRadius="full" 
                        bg="gray.600"
                        mt={2}
                      />
                    </Box>
                  </SimpleGrid>
                </Box>
                
                <Divider borderColor="gray.700" />
                
                <Heading size="sm" mb={2}>Milestone Tracking</Heading>
                
                <MilestoneTimeline milestones={selectedProject.milestones} />
                
                <Divider borderColor="gray.700" />
                
                <Box bg="gray.700" p={4} borderRadius="md">
                  <Heading size="sm" mb={3}>Project Partners</Heading>
                  <VStack align="stretch" spacing={3}>
                    {selectedProject.partners.map((partner, index) => (
                      <Flex key={index} justify="space-between" align="center">
                        <HStack>
                          <Avatar size="sm" name={partner.name} />
                          <Text color="white">{partner.name}</Text>
                        </HStack>
                        <Badge colorScheme="purple">{partner.role}</Badge>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </ModalBody>
            <ModalFooter borderTopWidth="1px" borderColor="gray.700">
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button 
                variant="gradient"
                as={Link}
                to={`/donate?project=${selectedProject.id}`}
              >
                Support This Project
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ProjectFundingPage; 
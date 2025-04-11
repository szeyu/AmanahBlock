import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Grid, 
  Flex, 
  Button, 
  Image, 
  Badge, 
  Progress, 
  HStack, 
  VStack, 
  Icon, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Select, 
  Tag, 
  TagLabel, 
  TagCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Avatar,
  AvatarGroup,
  Tooltip
} from '@chakra-ui/react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRegClock, FaUsers, FaShieldAlt, FaRegCheckCircle, FaRegStar, FaEthereum, FaExternalLinkAlt, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState([]);
  
  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "School Building in Yemen",
      category: "Education",
      location: "Sana'a, Yemen",
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799",
      description: "Help build a school for 500 children in war-torn Yemen, providing safe access to education.",
      raised: 32500,
      goal: 50000,
      progress: 65,
      deadline: "30 days left",
      donors: 128,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Education", "Children", "Emergency"]
    },
    {
      id: 2,
      title: "Emergency Flood Relief",
      category: "Disaster",
      location: "Dhaka, Bangladesh",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5",
      description: "Provide emergency supplies and shelter to families affected by severe flooding in Bangladesh.",
      raised: 25500,
      goal: 30000,
      progress: 85,
      deadline: "15 days left",
      donors: 210,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Disaster Relief", "Emergency", "Food & Water"]
    },
    {
      id: 3,
      title: "Food Bank Initiative",
      category: "Food",
      location: "Cairo, Egypt",
      image: "https://images.unsplash.com/photo-1593113598332-cd59a93f9724",
      description: "Establish a sustainable food bank to provide nutritious meals to underprivileged families.",
      raised: 10000,
      goal: 25000,
      progress: 40,
      deadline: "45 days left",
      donors: 87,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Food & Water", "Sustainable", "Community"]
    },
    {
      id: 4,
      title: "Clean Water Wells",
      category: "Water",
      location: "Mogadishu, Somalia",
      image: "https://images.unsplash.com/photo-1594789327651-87bf2de3c50a",
      description: "Dig wells to provide clean drinking water to communities suffering from drought.",
      raised: 18000,
      goal: 40000,
      progress: 45,
      deadline: "60 days left",
      donors: 95,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Water", "Health", "Infrastructure"]
    },
    {
      id: 5,
      title: "Orphanage Support Program",
      category: "Children",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      description: "Provide education, healthcare, and basic necessities to orphaned children.",
      raised: 15000,
      goal: 35000,
      progress: 43,
      deadline: "50 days left",
      donors: 112,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Children", "Education", "Healthcare"]
    },
    {
      id: 6,
      title: "Medical Clinic in Rural Pakistan",
      category: "Healthcare",
      location: "Sindh, Pakistan",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      description: "Establish a medical clinic to provide healthcare services to underserved rural communities.",
      raised: 22000,
      goal: 60000,
      progress: 37,
      deadline: "75 days left",
      donors: 78,
      verified: true,
      shariah: "Fully Compliant",
      tags: ["Healthcare", "Rural", "Infrastructure"]
    }
  ];

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

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Explore Projects</Heading>
      <Text color="gray.400" mb={6}>Discover Shariah-compliant charitable projects that need your support</Text>
      
      {/* Search and Filter */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search projects" />
        </InputGroup>
        
        <Select placeholder="Category" maxW={{ base: 'full', md: '200px' }} onChange={(e) => addFilter(e.target.value)}>
          <option value="Education">Education</option>
          <option value="Disaster">Disaster Relief</option>
          <option value="Food">Food & Nutrition</option>
          <option value="Water">Water & Sanitation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Children">Children & Orphans</option>
        </Select>
        
        <Select placeholder="Location" maxW={{ base: 'full', md: '200px' }} onChange={(e) => addFilter(e.target.value)}>
          <option value="Yemen">Yemen</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Egypt">Egypt</option>
          <option value="Somalia">Somalia</option>
          <option value="Jordan">Jordan</option>
          <option value="Pakistan">Pakistan</option>
        </Select>
        
        <Button leftIcon={<FaFilter />} colorScheme="purple" variant="outline">
          More Filters
        </Button>
      </Flex>
      
      {/* Active Filters */}
      {filters.length > 0 && (
        <Flex wrap="wrap" gap={2} mb={6}>
          {filters.map((filter, index) => (
            <Tag key={index} size="md" borderRadius="full" variant="subtle" colorScheme="purple">
              <TagLabel>{filter}</TagLabel>
              <TagCloseButton onClick={() => removeFilter(filter)} />
            </Tag>
          ))}
          <Button size="sm" variant="link" color="gray.400" onClick={() => setFilters([])}>
            Clear All
          </Button>
        </Flex>
      )}
      
      {/* Projects Grid */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} mb={10}>
        {projects.map((project) => (
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
            onClick={() => handleProjectClick(project)}
            cursor="pointer"
          >
            <Box position="relative">
              <Image 
                src={project.image} 
                alt={project.title} 
                w="full" 
                h="200px" 
                objectFit="cover" 
              />
              <Button 
                position="absolute" 
                top={2} 
                right={2} 
                size="sm" 
                borderRadius="full" 
                colorScheme={favorites.includes(project.id) ? "red" : "gray"}
                variant={favorites.includes(project.id) ? "solid" : "ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(project.id);
                }}
              >
                <Icon as={favorites.includes(project.id) ? FaHeart : FaRegHeart} />
              </Button>
              <HStack position="absolute" bottom={2} left={2} spacing={2}>
                <Badge colorScheme="green" borderRadius="full" px={2} py={1}>
                  {project.category}
                </Badge>
                {project.verified && (
                  <Badge colorScheme="blue" borderRadius="full" px={2} py={1}>
                    <HStack spacing={1}>
                      <Icon as={FaShieldAlt} boxSize={3} />
                      <Text fontSize="xs">Verified</Text>
                    </HStack>
                  </Badge>
                )}
              </HStack>
            </Box>
            
            <Box p={4}>
              <Heading size="md" mb={2} color="white" noOfLines={1}>
                {project.title}
              </Heading>
              
              <HStack mb={2} color="gray.400" fontSize="sm">
                <Icon as={FaMapMarkerAlt} />
                <Text>{project.location}</Text>
              </HStack>
              
              <Text color="gray.300" noOfLines={2} mb={4} fontSize="sm">
                {project.description}
              </Text>
              
              <Box mb={4}>
                <Flex justify="space-between" mb={1}>
                  <Text color="gray.400" fontSize="sm">{project.progress}% Funded</Text>
                  <Text color="gray.400" fontSize="sm">{project.raised.toLocaleString()} / {project.goal.toLocaleString()} USDT</Text>
                </Flex>
                <Progress value={project.progress} colorScheme="green" borderRadius="full" size="sm" />
              </Box>
              
              <Flex justify="space-between" align="center">
                <HStack color="gray.400" fontSize="sm">
                  <Icon as={FaUsers} />
                  <Text>{project.donors} donors</Text>
                </HStack>
                <HStack color="gray.400" fontSize="sm">
                  <Icon as={FaRegClock} />
                  <Text>{project.deadline}</Text>
                </HStack>
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg="gray.800" color="white" borderRadius="lg" borderWidth="1px" borderColor="gray.700">
            <ModalHeader pb={0}>{selectedProject.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                w="full" 
                h="250px" 
                objectFit="cover" 
                borderRadius="md"
                mb={4}
              />
              
              <Flex wrap="wrap" gap={2} mb={4}>
                <Badge colorScheme="green" borderRadius="full" px={2} py={1}>
                  {selectedProject.category}
                </Badge>
                {selectedProject.verified && (
                  <Badge colorScheme="blue" borderRadius="full" px={2} py={1}>
                    <HStack spacing={1}>
                      <Icon as={FaShieldAlt} boxSize={3} />
                      <Text fontSize="xs">Verified</Text>
                    </HStack>
                  </Badge>
                )}
                <Badge colorScheme="purple" borderRadius="full" px={2} py={1}>
                  <HStack spacing={1}>
                    <Icon as={FaRegCheckCircle} boxSize={3} />
                    <Text fontSize="xs">{selectedProject.shariah}</Text>
                  </HStack>
                </Badge>
                {selectedProject.tags.map((tag, index) => (
                  <Badge key={index} colorScheme="gray" borderRadius="full" px={2} py={1}>
                    {tag}
                  </Badge>
                ))}
              </Flex>
              
              <HStack mb={4} color="gray.400" fontSize="sm">
                <Icon as={FaMapMarkerAlt} />
                <Text>{selectedProject.location}</Text>
              </HStack>
              
              <Text color="gray.300" mb={6}>
                {selectedProject.description}
              </Text>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
                <Stat bg="gray.700" p={3} borderRadius="md">
                  <StatLabel color="gray.400">Raised</StatLabel>
                  <StatNumber color="white" fontSize="xl">{selectedProject.raised.toLocaleString()} USDT</StatNumber>
                  <Text color="gray.400" fontSize="sm">of {selectedProject.goal.toLocaleString()} goal</Text>
                </Stat>
                
                <Stat bg="gray.700" p={3} borderRadius="md">
                  <StatLabel color="gray.400">Donors</StatLabel>
                  <StatNumber color="white" fontSize="xl">{selectedProject.donors}</StatNumber>
                  <Text color="gray.400" fontSize="sm">supporters</Text>
                </Stat>
                
                <Stat bg="gray.700" p={3} borderRadius="md">
                  <StatLabel color="gray.400">Time Left</StatLabel>
                  <StatNumber color="white" fontSize="xl">{selectedProject.deadline.split(' ')[0]}</StatNumber>
                  <Text color="gray.400" fontSize="sm">days remaining</Text>
                </Stat>
              </Grid>
              
              <Box mb={6}>
                <Flex justify="space-between" mb={1}>
                  <Text color="gray.400" fontSize="sm">{selectedProject.progress}% Funded</Text>
                  <Text color="gray.400" fontSize="sm">{selectedProject.raised.toLocaleString()} / {selectedProject.goal.toLocaleString()} USDT</Text>
                </Flex>
                <Progress value={selectedProject.progress} colorScheme="green" borderRadius="full" size="md" />
              </Box>
              
              <Tabs variant="soft-rounded" colorScheme="brand" mb={6}>
                <TabList>
                  <Tab>Details</Tab>
                  <Tab>Updates</Tab>
                  <Tab>Team</Tab>
                  <Tab>Donors</Tab>
                </TabList>
                <TabPanels mt={4}>
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={4}>
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={2}>Project Goals</Heading>
                        <Text color="gray.300" fontSize="sm">
                          This project aims to provide essential support to those in need through sustainable and impactful initiatives.
                        </Text>
                      </Box>
                      
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={2}>Shariah Compliance</Heading>
                        <Text color="gray.300" fontSize="sm">
                          This project has been verified by our Shariah board and complies with Islamic principles of charity and finance.
                        </Text>
                      </Box>
                      
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={2}>Blockchain Verification</Heading>
                        <Text color="gray.300" fontSize="sm" mb={2}>
                          All donations are recorded on the blockchain for complete transparency.
                        </Text>
                        <Button size="sm" rightIcon={<FaExternalLinkAlt />} variant="outline">
                          View on Blockchain
                        </Button>
                      </Box>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={4}>
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={1}>Project updates will appear here</Heading>
                        <Text color="gray.300" fontSize="sm">
                          Regular updates on project progress will be posted here.
                        </Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={4}>
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={3}>Project Team</Heading>
                        <Text color="gray.300" fontSize="sm" mb={4}>
                          Meet the dedicated team working on this project.
                        </Text>
                        <AvatarGroup size="md" max={5} mb={2}>
                          <Avatar name="Ahmed Hassan" src="https://randomuser.me/api/portraits/men/1.jpg" />
                          <Avatar name="Fatima Ali" src="https://randomuser.me/api/portraits/women/2.jpg" />
                        </AvatarGroup>
                      </Box>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={4}>
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Heading size="sm" mb={1}>Recent Donors</Heading>
                        <Text color="gray.300" fontSize="sm" mb={4}>
                          Join these generous donors in supporting this project.
                        </Text>
                        <VStack align="stretch" spacing={2}>
                          <Flex justify="space-between">
                            <HStack>
                              <Avatar size="xs" />
                              <Text>0x71C...93E4</Text>
                            </HStack>
                            <Text>500 USDT</Text>
                          </Flex>
                          <Divider borderColor="gray.600" />
                          <Flex justify="space-between">
                            <HStack>
                              <Avatar size="xs" />
                              <Text>0x82D...45F1</Text>
                            </HStack>
                            <Text>250 USDT</Text>
                          </Flex>
                          <Divider borderColor="gray.600" />
                          <Flex justify="space-between">
                            <HStack>
                              <Avatar size="xs" />
                              <Text>0x93E...67G2</Text>
                            </HStack>
                            <Text>100 USDT</Text>
                          </Flex>
                        </VStack>
                      </Box>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button 
                leftIcon={<FaEthereum />}
                variant="gradient"
              >
                Donate Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ProjectsPage; 
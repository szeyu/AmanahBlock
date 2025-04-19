import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  HStack,
  Badge,
  Box,
  SimpleGrid,
  Progress,
  Divider,
  VStack,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
  Link as ChakraLink
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaEthereum, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaChartLine, 
  FaHandHoldingUsd,
  FaRegClock,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaInfoCircle,
  FaFileAlt,
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf
} from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';
import MilestoneTimeline from '../VerticalTimeline';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const ProjectDetailsModal = ({ isOpen, onClose, project, highlightedRecipientId }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Check URL for recipient parameter on component mount and when recipient changes
  useEffect(() => {
    if (isOpen && highlightedRecipientId) {
      // If we have a recipient ID, switch to the Partners tab since that's where recipients are shown
      setActiveTab(2); // Partners tab is at index 2
      
      // TODO: If needed, add logic to scroll to the highlighted partner
    }
  }, [isOpen, highlightedRecipientId]);
  
  if (!project) return null;
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "#48BB78";
      case "In Progress": return "#00E0FF";
      case "Delayed": return "#ECC94B";
      case "Failed": return "#F56565";
      default: return "#A0AEC0";
    }
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return FaCheckCircle;
      case "In Progress": return FaHourglassHalf;
      case "Failed": return FaTimesCircle;
      default: return FaRegClock;
    }
  };
  
  const statusColor = getStatusColor(project.status);
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="6xl" 
      scrollBehavior="inside"
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(10px)" bg="rgba(13, 16, 31, 0.8)" />
      <ModalContent 
        bg="rgba(13, 16, 31, 0.95)"
        backdropFilter="blur(10px)"
        color="white"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.05)"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0 20px 50px rgba(0, 0, 0, 0.5)"
        maxH="85vh"
        sx={{
          '& .chakra-modal__body': {
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 224, 255, 0.5) rgba(45, 55, 72, 0.3)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(45, 55, 72, 0.3)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 224, 255, 0.5)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 224, 255, 0.7)',
              },
            },
          },
        }}
      >
        {/* Project Header with Image */}
        <Box position="relative" h="200px">
          <Image 
            src={project.image} 
            alt={project.title} 
            w="full" 
            h="full" 
            objectFit="cover" 
            filter="brightness(0.7)"
          />
          
          {/* Gradient overlay */}
          <Box 
            position="absolute" 
            top={0} 
            left={0} 
            right={0} 
            bottom={0} 
            bg="linear-gradient(to top, rgba(13, 16, 31, 1) 0%, rgba(13, 16, 31, 0.7) 50%, rgba(13, 16, 31, 0.3) 100%)"
          />
          
          {/* Project Title and Status */}
          <Box position="absolute" bottom={4} left={6} right={6}>
            <Flex justify="space-between" align="flex-end">
              <Box>
                <HStack mb={2}>
                  <Badge 
                    colorScheme="purple" 
                    bg="rgba(138, 124, 251, 0.2)" 
                    color="#8A7CFB"
                    borderWidth="1px"
                    borderColor="rgba(138, 124, 251, 0.3)"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {project.category}
                  </Badge>
                  <Badge 
                    px={2} 
                    py={1} 
                    borderRadius="full" 
                    bg={`${statusColor}20`} 
                    color={statusColor}
                    borderWidth="1px"
                    borderColor={`${statusColor}40`}
                  >
                    {project.status}
                  </Badge>
                </HStack>
                <Heading 
                  size="lg" 
                  color="white"
                  bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  {project.title}
                </Heading>
                <HStack mt={1} spacing={4}>
                  <HStack spacing={1}>
                    <Icon as={FaMapMarkerAlt} color="#00E0FF" boxSize={3} />
                    <Text color="gray.300" fontSize="sm">{project.location}</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={FaCalendarAlt} color="#00E0FF" boxSize={3} />
                    <Text color="gray.300" fontSize="sm">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
              <ShariahComplianceBadge 
                level={project.shariahStatus} 
                scholars={project.scholars}
              />
            </Flex>
          </Box>
          
          <ModalCloseButton 
            position="absolute" 
            top={4} 
            right={4} 
            bg="rgba(0, 0, 0, 0.3)"
            _hover={{ bg: "rgba(0, 0, 0, 0.5)" }}
          />
        </Box>
        
        <ModalBody p={0}>
          <Tabs 
            variant="soft-rounded" 
            colorScheme="brand" 
            p={6}
            index={activeTab}
            onChange={(index) => setActiveTab(index)}
          >
            <TabList mb={6} borderBottom="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pb={4}>
              <Tab 
                color="gray.400" 
                _selected={{ 
                  color: "white", 
                  bg: "rgba(0, 224, 255, 0.1)",
                  fontWeight: "bold"
                }}
                mr={2}
              >
                Overview
              </Tab>
              <Tab 
                color="gray.400" 
                _selected={{ 
                  color: "white", 
                  bg: "rgba(0, 224, 255, 0.1)",
                  fontWeight: "bold"
                }}
                mr={2}
              >
                Milestones
              </Tab>
              <Tab 
                color="gray.400" 
                _selected={{ 
                  color: "white", 
                  bg: "rgba(0, 224, 255, 0.1)",
                  fontWeight: "bold"
                }}
              >
                Partners
              </Tab>
            </TabList>
            
            <TabPanels>
              {/* Overview Tab */}
              <TabPanel px={0}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Text color="gray.300" mb={6} fontSize="md" lineHeight="1.7">
                    {project.description}
                  </Text>
                  
                  {/* Project Stats */}
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
                    <MotionBox
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 224, 255, 0.2)" }}
                      transition={{ duration: 0.2 }}
                      p={6}
                      bg="rgba(26, 32, 44, 0.4)"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.05)"
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Decorative element */}
                      <Box 
                        position="absolute" 
                        top="-20px" 
                        right="-20px" 
                        width="100px" 
                        height="100px" 
                        borderRadius="full" 
                        bg="#00E0FF" 
                        opacity="0.1" 
                        filter="blur(30px)" 
                      />
                      
                      <Stat position="relative" zIndex={1}>
                        <StatLabel color="gray.400" fontSize="sm" mb={1}>
                          <HStack>
                            <Icon as={FaEthereum} color="#00E0FF" />
                            <Text>Total Funding</Text>
                          </HStack>
                        </StatLabel>
                        <StatNumber 
                          fontSize="2xl" 
                          fontWeight="bold" 
                          color="white"
                          bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                          bgClip="text"
                        >
                          ${project.totalFunding.toLocaleString()}
                        </StatNumber>
                        <StatHelpText color="gray.400" mt={2}>
                          Target amount
                        </StatHelpText>
                      </Stat>
                    </MotionBox>
                    
                    <MotionBox
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 224, 255, 0.2)" }}
                      transition={{ duration: 0.2 }}
                      p={6}
                      bg="rgba(26, 32, 44, 0.4)"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.05)"
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Decorative element */}
                      <Box 
                        position="absolute" 
                        top="-20px" 
                        right="-20px" 
                        width="100px" 
                        height="100px" 
                        borderRadius="full" 
                        bg="#8A7CFB" 
                        opacity="0.1" 
                        filter="blur(30px)" 
                      />
                      
                      <Stat position="relative" zIndex={1}>
                        <StatLabel color="gray.400" fontSize="sm" mb={1}>
                          <HStack>
                            <Icon as={FaHandHoldingUsd} color="#8A7CFB" />
                            <Text>Raised Amount</Text>
                          </HStack>
                        </StatLabel>
                        <StatNumber 
                          fontSize="2xl" 
                          fontWeight="bold" 
                          color="#8A7CFB"
                        >
                          ${project.raisedAmount.toLocaleString()}
                        </StatNumber>
                        <StatHelpText color="gray.400" mt={2}>
                          {project.progress}% of goal
                        </StatHelpText>
                      </Stat>
                    </MotionBox>
                    
                    <MotionBox
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 224, 255, 0.2)" }}
                      transition={{ duration: 0.2 }}
                      p={6}
                      bg="rgba(26, 32, 44, 0.4)"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.05)"
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Decorative element */}
                      <Box 
                        position="absolute" 
                        top="-20px" 
                        right="-20px" 
                        width="100px" 
                        height="100px" 
                        borderRadius="full" 
                        bg="#48BB78" 
                        opacity="0.1" 
                        filter="blur(30px)" 
                      />
                      
                      <Stat position="relative" zIndex={1}>
                        <StatLabel color="gray.400" fontSize="sm" mb={1}>
                          <HStack>
                            <Icon as={FaChartLine} color="#48BB78" />
                            <Text>Milestone Progress</Text>
                          </HStack>
                        </StatLabel>
                        <StatNumber 
                          fontSize="2xl" 
                          fontWeight="bold" 
                          color="#48BB78"
                        >
                          {project.milestones.filter(m => m.status === "Completed").length} of {project.milestones.length}
                        </StatNumber>
                        <StatHelpText color="gray.400" mt={2}>
                          Milestones completed
                        </StatHelpText>
                      </Stat>
                    </MotionBox>
                  </SimpleGrid>
                  
                  {/* Funding Progress */}
                  <Box mb={8}>
                    <Heading size="md" mb={4} color="white">Funding Progress</Heading>
                    <Box position="relative" h="12px" w="full" bg="rgba(0, 0, 0, 0.2)" borderRadius="full" overflow="hidden" mb={2}>
                      <Box 
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        width={`${project.progress}%`}
                        bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
                        borderRadius="full"
                      />
                      {/* Animated glow effect */}
                      <Box 
                        position="absolute"
                        top={0}
                        left={`calc(${project.progress}% - 15px)`}
                        bottom={0}
                        width="30px"
                        filter="blur(15px)"
                        bg="#00E0FF"
                        opacity="0.7"
                        borderRadius="full"
                        animation="pulse 2s infinite"
                      />
                    </Box>
                    <Flex justify="space-between">
                      <Text color="gray.400" fontSize="sm">
                        <Icon as={FaEthereum} mr={1} />
                        ${project.raisedAmount.toLocaleString()}
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        <Icon as={FaEthereum} mr={1} />
                        ${project.totalFunding.toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                  
                  {/* Project Details */}
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Box 
                      p={6} 
                      bg="rgba(26, 32, 44, 0.4)" 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.05)"
                    >
                      <Heading size="sm" mb={4} color="white">Project Details</Heading>
                      <VStack align="stretch" spacing={4}>
                        <Flex justify="space-between">
                          <Text color="gray.400">Category</Text>
                          <Text color="white">{project.category}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">Location</Text>
                          <Text color="white">{project.location}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">Start Date</Text>
                          <Text color="white">{new Date(project.startDate).toLocaleDateString()}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">End Date</Text>
                          <Text color="white">{new Date(project.endDate).toLocaleDateString()}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">Status</Text>
                          <Badge 
                            px={2} 
                            py={1} 
                            borderRadius="full" 
                            bg={`${statusColor}20`} 
                            color={statusColor}
                            borderWidth="1px"
                            borderColor={`${statusColor}40`}
                          >
                            {project.status}
                          </Badge>
                        </Flex>
                      </VStack>
                    </Box>
                    
                    <Box 
                      p={6} 
                      bg="rgba(26, 32, 44, 0.4)" 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.05)"
                    >
                      <Heading size="sm" mb={4} color="white">Shariah Compliance</Heading>
                      <VStack align="stretch" spacing={4}>
                        <Flex justify="space-between">
                          <Text color="gray.400">Status</Text>
                          <Badge colorScheme="green">{project.shariahStatus}</Badge>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">Scholars</Text>
                          <VStack align="flex-end" spacing={1}>
                            {project.scholars.map((scholar, index) => (
                              <Text key={index} color="white" fontSize="sm">{scholar}</Text>
                            ))}
                          </VStack>
                        </Flex>
                        <Flex justify="space-between">
                          <Text color="gray.400">Pool</Text>
                          <Badge 
                            colorScheme="purple" 
                            bg="rgba(138, 124, 251, 0.2)" 
                            color="#8A7CFB"
                            px={2}
                            py={1}
                            borderRadius="full"
                          >
                            {project.pool.charAt(0).toUpperCase() + project.pool.slice(1)} Pool
                          </Badge>
                        </Flex>
                        <Box>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            colorScheme="brand"
                            rightIcon={<FaExternalLinkAlt />}
                            mt={2}
                            onClick={() => setActiveTab(1)}
                          >
                            View Milestones
                          </Button>
                        </Box>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </MotionBox>
              </TabPanel>
              
              {/* Milestones Tab */}
              <TabPanel px={0} maxH="60vh" overflowY="auto" overflowX="hidden">
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  width="100%"
                  px={2}
                >
                  <Heading size="md" mb={6} color="white">Project Milestones</Heading>
                  <Box width="100%" maxW="1200px" mx="auto">
                    <MilestoneTimeline milestones={project.milestones} />
                  </Box>
                </MotionBox>
              </TabPanel>
              
              {/* Partners Tab */}
              <TabPanel px={0}>
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heading size="md" mb={6} color="white">Project Partners</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {project.partners.map((partner, index) => (
                      <MotionBox
                        key={index}
                        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 224, 255, 0.2)" }}
                        transition={{ duration: 0.2 }}
                        p={6}
                        bg="rgba(26, 32, 44, 0.4)"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={partner.id === highlightedRecipientId ? "cyan.400" : "rgba(255, 255, 255, 0.05)"}
                        boxShadow={partner.id === highlightedRecipientId ? "0 0 15px rgba(0, 224, 255, 0.4)" : "none"}
                        // If this is the highlighted partner, add a ref to scroll to it
                        ref={partner.id === highlightedRecipientId ? (el) => {
                          if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
                        } : null}
                      >
                        <Flex align="center">
                          <Avatar 
                            size="lg" 
                            name={partner.name} 
                            mr={4}
                            bg="brand.500"
                            color="white"
                          />
                          <Box>
                            <Heading size="md" color="white" mb={1}>{partner.name}</Heading>
                            <Badge 
                              colorScheme="purple" 
                              bg="rgba(138, 124, 251, 0.2)" 
                              color="#8A7CFB"
                              px={2}
                              py={1}
                              borderRadius="full"
                              mb={2}
                            >
                              {partner.role}
                            </Badge>
                            <Text color="gray.400" fontSize="sm">
                              Verified partner working on this project to ensure successful implementation and impact.
                            </Text>
                          </Box>
                        </Flex>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailsModal;
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Button,
  Badge,
  Progress,
  Icon,
  Avatar,
  AvatarGroup,
  Image,
  useColorModeValue,
  Tooltip,
  Circle,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaEthereum, FaShieldAlt, FaChartLine, FaTag } from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';
import { calculateMilestoneProgress } from '../../utils/projectUtils';

const MotionBox = motion(Box);

const ProjectCard = ({ project, openMilestoneDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Get donation type styling
  const getDonationTypeStyle = (type) => {
    switch(type.toLowerCase()) {
      case "waqf": return { 
        bg: "rgba(72, 187, 120, 0.2)", 
        color: "#48BB78",
        borderColor: "rgba(72, 187, 120, 0.3)" 
      };
      case "sadaqah": return { 
        bg: "rgba(237, 137, 54, 0.2)", 
        color: "#ED8936",
        borderColor: "rgba(237, 137, 54, 0.3)" 
      };
      case "zakat": return { 
        bg: "rgba(214, 188, 0, 0.2)", 
        color: "#D6BC00",
        borderColor: "rgba(214, 188, 0, 0.3)" 
      };
      default: return { 
        bg: "rgba(138, 124, 251, 0.2)", 
        color: "#8A7CFB",
        borderColor: "rgba(138, 124, 251, 0.3)" 
      };
    }
  };

  const statusColor = getStatusColor(project.status);
  const milestoneProgress = calculateMilestoneProgress(project.milestones);
  const donationStyle = getDonationTypeStyle(project.donationType || 'sadaqah'); // Default to sadaqah if not specified
  
  return (
    <MotionBox
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      bg="rgba(13, 16, 31, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.05)"
      transition="all 0.3s"
      _hover={{
        borderColor: "#00E0FF",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 224, 255, 0.2)",
      }}
    >
      {/* DONATION TYPE RIBBON - Top left corner */}
      <Box
        position="absolute"
        top="0"
        left="0"
        bg={donationStyle.color}
        color="white"
        px={3}
        py={1.5}
        fontSize="sm"
        fontWeight="bold"
        zIndex={10}
        clipPath="polygon(0 0, 100% 0, 85% 100%, 0% 100%)"
        boxShadow="0 2px 5px rgba(0,0,0,0.2)"
        letterSpacing="wide"
        textTransform="uppercase"
        display="flex"
        alignItems="center"
      >
        <Icon as={FaTag} mr={1.5} boxSize={3} />
        {project.donationType || 'sadaqah'}
      </Box>
      
      {/* Glowing orbs for decoration */}
      <Box 
        position="absolute" 
        top="-20px" 
        right="-20px" 
        width="100px" 
        height="100px" 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity="0.1" 
        filter="blur(40px)" 
        zIndex={0}
      />
      
      <Box 
        position="absolute" 
        bottom="-30px" 
        left="-20px" 
        width="120px" 
        height="120px" 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity="0.1" 
        filter="blur(50px)" 
        zIndex={0}
      />
      
      {/* Project Image with Overlay */}
      <Box position="relative">
        <Image 
          src={project.image} 
          alt={project.title} 
          w="full" 
          h="220px" 
          objectFit="cover" 
          transition="transform 0.5s"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
        />
        
        {/* Gradient overlay */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          bg="linear-gradient(to top, rgba(13, 16, 31, 1) 0%, rgba(13, 16, 31, 0.7) 50%, rgba(13, 16, 31, 0.3) 100%)"
          width="100%"
          height="100%"
          transition="all 0.5s"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
          opacity={isHovered ? 0.9 : 0.6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        />
        
        {/* Shariah Compliance Badge */}
        <Box position="absolute" top={4} right={4} zIndex={1}>
          <ShariahComplianceBadge 
            level={project.shariahStatus} 
            scholars={project.scholars}
            showDetails={false}
          />
        </Box>
        
        {/* Project Title and Location */}
        <Box position="absolute" bottom={4} left={4} zIndex={1} maxW="80%">
          <Heading 
            size="md" 
            color="white" 
            mb={2}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
            bgClip="text"
            fontWeight="bold"
          >
            {project.title}
          </Heading>
          <HStack spacing={3}>
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
            <HStack spacing={1}>
              <Icon as={FaMapMarkerAlt} color="#00E0FF" boxSize={3} />
              <Text color="gray.300" fontSize="sm">{project.location}</Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
      
      {/* Project Details */}
      <Box p={6} position="relative" zIndex={1}>
        {/* Description */}
        <Text color="gray.300" mb={6} noOfLines={2} fontSize="sm">
          {project.description}
        </Text>
        
        {/* Funding Progress */}
        <Box mb={6}>
          <Flex justify="space-between" mb={1} align="center">
            <HStack>
              <Icon as={FaEthereum} color="#00E0FF" />
              <Text color="white" fontWeight="bold">Funding Progress</Text>
            </HStack>
            <Text color="#00E0FF" fontWeight="bold">${project.raisedAmount.toLocaleString()} / ${project.totalFunding.toLocaleString()}</Text>
          </Flex>
          <Box position="relative" h="8px" w="full" bg="rgba(0, 0, 0, 0.2)" borderRadius="full" overflow="hidden" mb={1}>
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
              left={`calc(${project.progress}% - 10px)`}
              bottom={0}
              width="20px"
              filter="blur(10px)"
              bg="#00E0FF"
              opacity="0.7"
              borderRadius="full"
              animation="pulse 2s infinite"
            />
          </Box>
          <Text color="gray.400" fontSize="xs" textAlign="right">{project.progress}% Complete</Text>
        </Box>
        
        {/* Milestone Progress */}
        <Box mb={6}>
          <Flex justify="space-between" mb={1} align="center">
            <HStack>
              <Icon as={FaChartLine} color="#8A7CFB" />
              <Text color="white" fontWeight="bold">Milestone Progress</Text>
            </HStack>
            <Text color="#8A7CFB" fontWeight="bold">
              {project.milestones.filter(m => m.status === "Completed").length} of {project.milestones.length}
            </Text>
          </Flex>
          <Box position="relative" h="8px" w="full" bg="rgba(0, 0, 0, 0.2)" borderRadius="full" overflow="hidden" mb={1}>
            <Box 
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              width={`${milestoneProgress}%`}
              bg="#8A7CFB"
              borderRadius="full"
            />
          </Box>
          <Text color="gray.400" fontSize="xs" textAlign="right">{milestoneProgress}% Complete</Text>
        </Box>
        
        {/* Project Details Grid */}
        <Flex justify="space-between" mb={6}>
          <VStack align="flex-start" spacing={3}>
            <Box>
              <Text color="gray.400" fontSize="xs">Status</Text>
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
            </Box>
            
            <Box>
              <Text color="gray.400" fontSize="xs">Pool</Text>
              <Badge 
                colorScheme="accent" 
                variant="subtle"
                px={2}
                py={1}
                borderRadius="full"
                bg="rgba(138, 124, 251, 0.1)"
                color="#8A7CFB"
              >
                {project.pool.charAt(0).toUpperCase() + project.pool.slice(1)} Pool
              </Badge>
            </Box>
          </VStack>
          
          <VStack align="flex-end" spacing={3}>
            <Box>
              <Text color="gray.400" fontSize="xs" textAlign="right">Timeline</Text>
              <HStack>
                <Icon as={FaCalendarAlt} color="gray.400" boxSize={3} />
                <Text color="white" fontSize="xs">
                  {new Date(project.endDate).toLocaleDateString()}
                </Text>
              </HStack>
            </Box>
            
            <Box>
              <Text color="gray.400" fontSize="xs" textAlign="right">Partners</Text>
              <AvatarGroup size="xs" max={3} spacing="-0.5rem">
                {project.partners.map((partner, index) => (
                  <Tooltip key={index} label={`${partner.name} (${partner.role})`}>
                    <Avatar 
                      name={partner.name} 
                      borderWidth="2px" 
                      borderColor="rgba(13, 16, 31, 0.7)"
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          </VStack>
        </Flex>
        
        {/* View Milestones Button */}
        <Button 
          w="full"
          py={6}
          bgGradient="linear(to-r, #00E0FF, #8A7CFB)"
          _hover={{
            bgGradient: "linear(to-r, #00E0FF, #8A7CFB)",
            opacity: 0.9,
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(0, 224, 255, 0.3)"
          }}
          color="white"
          fontWeight="bold"
          borderRadius="xl"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            if (typeof openMilestoneDetails === 'function') {
              openMilestoneDetails(project);
            }
          }}
          transition="all 0.3s"
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
            animation={isHovered ? "shine 1.5s infinite" : "none"}
            zIndex={0}
          />
          View Milestones
        </Button>
      </Box>
    </MotionBox>
  );
};

export default ProjectCard;
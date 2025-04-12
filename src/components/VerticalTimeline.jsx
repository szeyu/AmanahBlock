import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { 
  Box, 
  Text, 
  Badge, 
  Icon, 
  Button, 
  SimpleGrid, 
  Flex,
  VStack,
  Collapse,
  useDisclosure,
  HStack
} from '@chakra-ui/react';
import { 
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaCamera,
  FaFileAlt,
  FaEthereum,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Add custom styles to override the react-vertical-timeline-component styles
const customStyles = `
  .vertical-timeline {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
  
  .vertical-timeline-element {
    margin: 2em 0;
  }
  
  .vertical-timeline::before {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .vertical-timeline-element-content {
    box-shadow: none;
  }
  
  .vertical-timeline-element-date {
    color: rgba(255, 255, 255, 0.6) !important;
    opacity: 1 !important;
    font-size: 0.85em !important;
  }
  
  @media only screen and (min-width: 1170px) {
    .vertical-timeline-element-content .vertical-timeline-element-date {
      position: absolute;
      width: 100%;
      left: 124%;
      top: 6px;
      font-size: 0.85em !important;
    }
    
    .vertical-timeline-element:nth-child(even):not(.vertical-timeline-element--left) .vertical-timeline-element-content .vertical-timeline-element-date, 
    .vertical-timeline-element.vertical-timeline-element--right .vertical-timeline-element-content .vertical-timeline-element-date {
      left: auto;
      right: 124%;
      text-align: right;
    }
  }
`;

const MilestoneCard = ({ milestone, index }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "#48BB78";
      case "In Progress": return "#4299E1";
      case "Pending": return "#718096";
      default: return "#718096";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return FaCheckCircle;
      case "In Progress": return FaClock;
      case "Pending": return FaHourglassHalf;
      default: return FaHourglassHalf;
    }
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s ease"
      transform={isHovered ? "scale(1.02)" : "scale(1)"}
      cursor="pointer"
      onClick={onToggle}
    >
      <VerticalTimelineElement
        className="vertical-timeline-element"
        contentStyle={{
          background: milestone.status === "Completed" ? "rgba(72, 187, 120, 0.1)" : 
                     milestone.status === "In Progress" ? "rgba(66, 153, 225, 0.1)" : 
                     "rgba(45, 55, 72, 0.3)",
          color: '#fff',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: milestone.status === "Completed" ? "rgba(72, 187, 120, 0.3)" : 
                      milestone.status === "In Progress" ? "rgba(66, 153, 225, 0.3)" : 
                      "rgba(113, 128, 150, 0.3)",
          boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.2)" : "none"
        }}
        contentArrowStyle={{ 
          borderRight: isEven ? '7px solid rgba(45, 55, 72, 0.3)' : 'none',
          borderLeft: !isEven ? '7px solid rgba(45, 55, 72, 0.3)' : 'none'
        }}
        date={milestone.completionDate ? new Date(milestone.completionDate).toLocaleDateString() : 'Pending'}
        dateClassName="vertical-timeline-element-date"
        iconStyle={{ 
          background: getStatusColor(milestone.status), 
          color: '#fff',
          boxShadow: isHovered ? "0 0 0 4px rgba(66, 153, 225, 0.2)" : "none"
        }}
        icon={<Icon as={getStatusIcon(milestone.status)} />}
        position={isEven ? "left" : "right"}
      >
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg" color="white">
              {milestone.title}
            </Text>
            <Badge colorScheme={
              milestone.status === "Completed" ? "green" : 
              milestone.status === "In Progress" ? "blue" : 
              "gray"
            }>
              {milestone.status}
            </Badge>
          </Flex>

          <Text color="gray.300" noOfLines={isOpen ? undefined : 2}>
            {milestone.description}
          </Text>

          <Box>
            <Text color="gray.400" fontSize="sm">Funding Amount</Text>
            <Text color="white" fontWeight="bold">${milestone.amount.toLocaleString()}</Text>
          </Box>

          <Collapse in={isOpen} animateOpacity>
            {milestone.status === "Completed" && milestone.evidence && (
              <>
                <Box mb={3}>
                  <Text color="gray.400" fontSize="xs" mb={1}>Evidence & Verification</Text>
                  <VStack align="stretch" spacing={1}>
                    {milestone.evidence.map((item, i) => (
                      <Box 
                        key={i} 
                        py={1}
                        px={2}
                        bg="gray.700" 
                        borderRadius="md"
                        borderLeftWidth="2px"
                        borderLeftColor={item.type === "image" ? "brand.500" : "accent.500"}
                        transition="all 0.2s ease"
                        _hover={{ 
                          transform: "translateX(2px)",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
                        }}
                      >
                        <Flex align="center" justify="space-between">
                          <HStack spacing={1}>
                            <Icon 
                              as={item.type === "image" ? FaCamera : FaFileAlt} 
                              color={item.type === "image" ? "brand.500" : "accent.500"}
                              boxSize={3}
                            />
                            <Text color="white" fontSize="xs">{item.title}</Text>
                          </HStack>
                          <Link 
                            to={item.url}
                            color={item.type === "image" ? "brand.500" : "accent.500"}
                            fontSize="xs"
                            _hover={{ textDecoration: "underline" }}
                          >
                            View
                          </Link>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {milestone.verificationHash && (
                  <Box 
                    p={5} 
                    bg="gray.700" 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="brand.500"
                    transition="all 0.2s ease"
                    _hover={{ 
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                    }}
                  >
                    <VStack align="stretch" spacing={3}>
                      <Flex align="center" justify="space-between">
                        <HStack spacing={3}>
                          <Icon as={FaEthereum} color="brand.500" boxSize={5} />
                          <Text color="white" fontWeight="medium">Blockchain Verification</Text>
                        </HStack>
                        <Badge colorScheme="brand" variant="subtle">Verified</Badge>
                      </Flex>
                      
                      <Text color="gray.300" fontSize="sm">
                        This milestone has been verified on the blockchain with the following transaction hash:
                      </Text>
                      
                      <Box 
                        p={3} 
                        bg="gray.800" 
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="gray.600"
                      >
                        <Text color="gray.400" fontSize="xs" fontFamily="mono" isTruncated>
                          {milestone.verificationHash}
                        </Text>
                      </Box>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        colorScheme="brand"
                        as={Link}
                        to={`/audit-trail/tx/${milestone.verificationHash}`}
                        leftIcon={<Icon as={FaEthereum} />}
                      >
                        View Transaction Details
                      </Button>
                    </VStack>
                  </Box>
                )}
              </>
            )}
          </Collapse>

          <Flex justify="center">
            <Icon 
              as={isOpen ? FaChevronUp : FaChevronDown} 
              color="gray.400"
              boxSize={4}
              transition="transform 0.3s ease"
              transform={isHovered ? "scale(1.2)" : "scale(1)"}
            />
          </Flex>
        </VStack>
      </VerticalTimelineElement>
    </Box>
  );
};

const MilestoneTimeline = ({ milestones }) => {
  return (
    <Box position="relative" width="100%" pb={10}>
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      
      <VerticalTimeline 
        animate={false} 
        lineColor="#2D3748"
        className="custom-timeline"
      >
        {milestones.map((milestone, index) => (
          <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
        ))}
      </VerticalTimeline>
    </Box>
  );
};

export default MilestoneTimeline;
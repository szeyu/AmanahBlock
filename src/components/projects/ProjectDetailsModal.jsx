import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Badge,
  HStack,
  VStack,
  Icon,
  Text,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Flex,
  Avatar,
  AvatarGroup,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { 
  FaShieldAlt, 
  FaRegCheckCircle, 
  FaMapMarkerAlt,
  FaEthereum,
  FaExternalLinkAlt,
  FaUsers,
} from 'react-icons/fa';

const ProjectDetailsModal = ({ isOpen, onClose, project, highlightedRecipientId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const recipientRefs = useRef({});

  const recipientsTabIndex = 2;

  useEffect(() => {
    if (isOpen && highlightedRecipientId) {
      setActiveTab(recipientsTabIndex);

      const timer = setTimeout(() => {
        const recipientElement = recipientRefs.current[highlightedRecipientId];
        if (recipientElement) {
          recipientElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          console.log(`Scrolled to recipient: ${highlightedRecipientId}`);
        } else {
          console.log(`Recipient element not found for ID: ${highlightedRecipientId}`);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, highlightedRecipientId, recipientsTabIndex]);

  useEffect(() => {
    if (isOpen) {
      console.log("ProjectDetailsModal opened with project:", project?.title);
    }
  }, [isOpen, project]);
  
  if (!project) {
    console.log("ProjectDetailsModal: No project provided");
    return null;
  }
  
  const {
    title = '',
    category = '',
    location = '',
    image = '',
    description = '',
    raised = 0,
    goal = 0,
    progress = 0,
    deadline = '0 days',
    donors = 0,
    verified = false,
    shariah = 'Pending Review',
    tags = [],
    recipients = [],
  } = project;

  const projectRecipients = recipients || project.partners?.map(partner => ({
    id: partner.id,
    name: partner.name,
    location: partner.location || 'Unknown location',
    status: partner.status || 'ACTIVE',
    amount: partner.amount || `${Math.floor(Math.random() * 500) + 100} USDT`,
    progress: partner.progress || Math.floor(Math.random() * 70) + 30
  })) || [];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xl" 
      scrollBehavior="inside"
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white" borderRadius="lg" borderWidth="1px" borderColor="gray.700">
        <ModalHeader pb={0}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image 
            src={image} 
            alt={title} 
            w="full" 
            h="250px" 
            objectFit="cover" 
            borderRadius="md"
            mb={4}
          />
          
          <Flex wrap="wrap" gap={2} mb={4}>
            <Badge colorScheme="green" borderRadius="full" px={2} py={1}>
              {category}
            </Badge>
            {verified && (
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
                <Text fontSize="xs">{shariah}</Text>
              </HStack>
            </Badge>
            {tags && tags.map((tag, index) => (
              <Badge key={index} colorScheme="gray" borderRadius="full" px={2} py={1}>
                {tag}
              </Badge>
            ))}
          </Flex>
          
          <HStack mb={4} color="gray.400" fontSize="sm">
            <Icon as={FaMapMarkerAlt} />
            <Text>{location}</Text>
          </HStack>
          
          <Text color="gray.300" mb={6}>
            {description}
          </Text>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
            <Stat bg="gray.700" p={3} borderRadius="md">
              <StatLabel color="gray.400">Raised</StatLabel>
              <StatNumber color="white" fontSize="xl">{raised.toLocaleString()} USDT</StatNumber>
              <Text color="gray.400" fontSize="sm">of {goal.toLocaleString()} goal</Text>
            </Stat>
            
            <Stat bg="gray.700" p={3} borderRadius="md">
              <StatLabel color="gray.400">Donors</StatLabel>
              <StatNumber color="white" fontSize="xl">{donors}</StatNumber>
              <Text color="gray.400" fontSize="sm">supporters</Text>
            </Stat>
            
            <Stat bg="gray.700" p={3} borderRadius="md">
              <StatLabel color="gray.400">Time Left</StatLabel>
              <StatNumber color="white" fontSize="xl">{deadline.split(' ')[0]}</StatNumber>
              <Text color="gray.400" fontSize="sm">days remaining</Text>
            </Stat>
          </Grid>
          
          <Box mb={6}>
            <Flex justify="space-between" mb={1}>
              <Text color="gray.400" fontSize="sm">{progress}% Funded</Text>
              <Text color="gray.400" fontSize="sm">{raised.toLocaleString()} / {goal.toLocaleString()} USDT</Text>
            </Flex>
            <Progress value={progress} colorScheme="green" borderRadius="full" size="md" />
          </Box>
          
          <Tabs 
            variant="soft-rounded" 
            colorScheme="brand" 
            mb={6}
            index={activeTab}
            onChange={(index) => setActiveTab(index)}
          >
            <TabList>
              <Tab>Details</Tab>
              <Tab>Updates</Tab>
              <Tab>Partners</Tab>
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
                    <Heading size="sm" mb={3}>Project Partners/Recipients</Heading>
                    <Text color="gray.300" fontSize="sm" mb={4}>
                      These are the recipients benefiting from this project.
                    </Text>
                    
                    {projectRecipients && projectRecipients.length > 0 ? (
                      projectRecipients.map((recipient, index) => (
                        <Box 
                          key={recipient.id || index}
                          ref={(el) => {
                            if (recipient.id) {
                              recipientRefs.current[recipient.id] = el;
                            }
                          }}
                          p={4}
                          bg={recipient.id === highlightedRecipientId ? "gray.600" : "gray.700"}
                          borderRadius="md"
                          borderWidth={recipient.id === highlightedRecipientId ? "2px" : "1px"}
                          borderColor={recipient.id === highlightedRecipientId ? "cyan.400" : "gray.600"}
                          mb={3}
                          transition="all 0.3s ease"
                          _hover={{ bg: "gray.600" }}
                          boxShadow={recipient.id === highlightedRecipientId ? "0 0 10px rgba(0, 224, 255, 0.5)" : "none"}
                        >
                          <Flex align="center" justify="space-between">
                            <HStack>
                              <Avatar size="md" name={recipient.name} />
                              <Box>
                                <Text fontWeight="bold">{recipient.name}</Text>
                                <Text fontSize="sm" color="gray.400">{recipient.location || 'N/A'}</Text>
                              </Box>
                            </HStack>
                            <Badge colorScheme={
                              recipient.status === "ACTIVE" ? "blue" :
                              recipient.status === "COMPLETED" ? "green" :
                              "gray"
                            }>
                              {recipient.status || 'UNKNOWN'}
                            </Badge>
                          </Flex>
                          {recipient.progress && (
                            <Box mt={3}>
                              <Text fontSize="xs" mb={1}>Project progress: {recipient.progress}%</Text>
                              <Progress 
                                value={recipient.progress} 
                                size="sm" 
                                colorScheme="blue"
                                borderRadius="full"
                              />
                            </Box>
                          )}
                          {recipient.amount && (
                            <Text fontSize="sm" mt={2}>
                              Fund allocation: <Text as="span" fontWeight="bold">{recipient.amount}</Text>
                            </Text>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Box p={4} bg="gray.700" borderRadius="md">
                        <Flex align="center" justify="center" direction="column">
                          <Icon as={FaUsers} boxSize={8} color="gray.500" mb={3} />
                          <Text color="gray.500">No recipients information available</Text>
                        </Flex>
                      </Box>
                    )}
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
            onClick={() => window.location.href = '/donate'}
          >
            Donate Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailsModal;
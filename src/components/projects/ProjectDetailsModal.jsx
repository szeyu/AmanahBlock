import React from 'react';
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
} from '@chakra-ui/react';
import { 
  FaShieldAlt, 
  FaRegCheckCircle, 
  FaMapMarkerAlt,
  FaEthereum,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;
  
  // Default values for potentially missing properties
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
  } = project;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
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
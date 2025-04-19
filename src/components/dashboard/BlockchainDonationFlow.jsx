import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Collapse,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { FaChevronDown, FaEthereum, FaClock, FaCheckCircle } from 'react-icons/fa';

const Block = ({ data, isLast }) => {
  const { isOpen, onToggle } = useDisclosure();
  
  return (
    <VStack spacing={2} align="stretch" width="100%">
      <Box
        p={4}
        bg="gray.800"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={data.status === 'Confirmed' ? 'green.500' : 'yellow.500'}
        cursor="pointer"
        onClick={onToggle}
        position="relative"
        _hover={{ transform: 'translateY(-2px)' }}
        transition="all 0.2s"
      >
        <HStack spacing={4} justify="space-between">
          <HStack>
            <Icon 
              as={FaEthereum} 
              color={data.status === 'Confirmed' ? 'green.500' : 'yellow.500'} 
              boxSize={5} 
            />
            <VStack align="start" spacing={1}>
              <Text color="white" fontWeight="bold">{data.type}</Text>
              <Text color="gray.400" fontSize="sm">{data.timestamp}</Text>
            </VStack>
          </HStack>
          <Badge 
            colorScheme={data.status === 'Confirmed' ? 'green' : 'yellow'}
            display="flex"
            alignItems="center"
          >
            <Icon 
              as={data.status === 'Confirmed' ? FaCheckCircle : FaClock} 
              mr={1} 
              boxSize={3} 
            />
            {data.status}
          </Badge>
        </HStack>
      </Box>

      <Collapse in={isOpen}>
        <Box
          p={4}
          bg="gray.700"
          borderRadius="md"
          fontSize="sm"
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text color="gray.400">Transaction Hash:</Text>
              <Text color="blue.300" fontFamily="mono">{data.hash}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">Amount:</Text>
              <Text color="green.300">{data.amount}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">From:</Text>
              <Text color="white">{data.from}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">To:</Text>
              <Text color="white">{data.to}</Text>
            </HStack>
            {data.projectDetails && (
              <>
                <Divider borderColor="gray.600" />
                <VStack align="stretch" spacing={2}>
                  <Text color="gray.400">Project Details:</Text>
                  <Box p={3} bg="gray.800" borderRadius="md">
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text color="gray.400">Name:</Text>
                        <Text color="white">{data.projectDetails.name}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.400">Milestone:</Text>
                        <Text color="white">{data.projectDetails.milestone}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.400">Status:</Text>
                        <Badge colorScheme={data.projectDetails.status === 'Completed' ? 'green' : 'yellow'}>
                          {data.projectDetails.status}
                        </Badge>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              </>
            )}
          </VStack>
        </Box>
      </Collapse>

      {!isLast && (
        <Box 
          width="2px" 
          height="20px" 
          bg="gray.600" 
          mx="auto" 
          my={2}
        />
      )}
    </VStack>
  );
};

const BlockchainDonationFlow = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [blocks, setBlocks] = useState([]);

  // Sample project data
  const projects = [
    {
      id: 1,
      name: 'School Building Project',
      type: 'Education',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Clean Water Initiative',
      type: 'Infrastructure',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Food Bank Program',
      type: 'Humanitarian',
      status: 'Active'
    }
  ];

  // Sample blockchain data
  const blockchainData = {
    1: [
      {
        type: 'Project Approval',
        status: 'Confirmed',
        timestamp: '2024-03-15 10:30:45',
        hash: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        amount: '50,000 USDT',
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0x123...456',
        projectDetails: {
          name: 'School Building Project',
          milestone: 'Project Approval',
          status: 'Completed'
        }
      },
      {
        type: 'Donation Received',
        status: 'Confirmed',
        timestamp: '2024-03-16 14:22:10',
        hash: '0x82D8e1B30CcA5B74d2a29F6538eBBE45c9c97B2E',
        amount: '1,000 USDT',
        from: '0x912d35Cc6634C0532925a3b844Bc454e4438f785',
        to: '0x123...456',
        projectDetails: {
          name: 'School Building Project',
          milestone: 'Fundraising',
          status: 'In Progress'
        }
      },
      {
        type: 'Milestone 1 Release',
        status: 'Pending',
        timestamp: '2024-03-17 09:15:30',
        hash: '0x92E8e1B30CcA5B74d2a29F6538eBBE45c9c97C3F',
        amount: '15,000 USDT',
        from: '0x123...456',
        to: '0x456...789',
        projectDetails: {
          name: 'School Building Project',
          milestone: 'Foundation Construction',
          status: 'Pending'
        }
      }
    ],
    // Add similar data for other projects
  };

  useEffect(() => {
    if (selectedProject) {
      setBlocks(blockchainData[selectedProject.id] || []);
    } else {
      setBlocks([]);
    }
  }, [selectedProject]);

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Menu>
          <MenuButton 
            as={Button} 
            rightIcon={<FaChevronDown />}
            colorScheme="blue"
            width="100%"
          >
            {selectedProject ? selectedProject.name : 'Select Project'}
          </MenuButton>
          <MenuList>
            {projects.map((project) => (
              <MenuItem 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
              >
                <HStack justify="space-between" width="100%">
                  <Text>{project.name}</Text>
                  <Badge colorScheme="blue">{project.type}</Badge>
                </HStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {selectedProject ? (
          <VStack spacing={4} align="stretch">
            {blocks.map((block, index) => (
              <Block 
                key={block.hash} 
                data={block} 
                isLast={index === blocks.length - 1} 
              />
            ))}
          </VStack>
        ) : (
          <Box 
            p={8} 
            textAlign="center" 
            bg="gray.800" 
            borderRadius="lg"
            color="gray.400"
          >
            Select a project to view its blockchain history
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default BlockchainDonationFlow;
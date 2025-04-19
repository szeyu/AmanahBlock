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
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

/**
 * Represents a single block in the blockchain flow.
 * @param {object} props - Component props.
 * @param {object} props.data - The data for the block (type, status, timestamp, hash, etc.).
 * @param {boolean} props.isLast - Indicates if this is the last block in the list.
 * @param {function} [props.onLastBlockClick] - Optional click handler specifically for the last block.
 */
const Block = ({ data, isLast, onLastBlockClick }) => {
  const { isOpen, onToggle } = useDisclosure();
  const isClickable = isLast && !!onLastBlockClick; // Clickable only if it's the last block and handler exists

  /**
   * Handles the click event on the main block area.
   * If it's the last block with a specific handler, call that handler.
   * Otherwise, toggle the collapse state.
   * Stops event propagation to prevent interference.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleBlockClick = (event) => {
    event.stopPropagation(); // Stop propagation to prevent unwanted effects
    if (isClickable) {
      onLastBlockClick(data); // Call the specific handler for the last block
    } else {
      onToggle(); // Default behavior: toggle collapse
    }
  };

  return (
    <VStack spacing={2} align="stretch" width="100%">
      <Box
        p={4}
        bg="gray.800"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={isClickable ? 'cyan.300' : (data.status === 'Confirmed' ? 'green.500' : 'yellow.500')}
        cursor={isClickable ? 'pointer' : 'default'} // Use pointer cursor if clickable
        onClick={handleBlockClick} // Use the combined handler
        position="relative"
        _hover={{
          transform: 'translateY(-2px)',
          // Add hover effect only if clickable
          boxShadow: isClickable ? '0 4px 8px rgba(0, 255, 255, 0.3)' : 'none',
          borderColor: isClickable ? 'cyan.400' : (data.status === 'Confirmed' ? 'green.400' : 'yellow.400')
        }}
        transition="all 0.2s"
      >
        <HStack spacing={4} justify="space-between">
          <HStack>
            <Icon
              as={FaEthereum}
              color={isClickable ? 'cyan.300' : (data.status === 'Confirmed' ? 'green.500' : 'yellow.500')}
              boxSize={5}
            />
            <VStack align="start" spacing={1}>
              <Text color="white" fontWeight="bold">{data.type}</Text>
              <Text color="gray.400" fontSize="sm">{data.timestamp}</Text>
            </VStack>
          </HStack>
          <Badge
            colorScheme={isClickable ? 'cyan' : (data.status === 'Confirmed' ? 'green' : 'yellow')}
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

      {/* Collapse remains toggled by the default behavior in handleBlockClick */}
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
              <Text color="blue.300" fontFamily="mono" isTruncated maxW="200px" title={data.hash}>{data.hash}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">Amount:</Text>
              <Text color="green.300">{data.amount}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">From:</Text>
              <Text color="white" isTruncated maxW="200px" title={data.from}>{data.from}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.400">To:</Text>
              <Text color="white" isTruncated maxW="200px" title={data.to}>{data.to}</Text>
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

/**
 * Displays the blockchain transaction flow for a selected project.
 */
const BlockchainDonationFlow = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample project data (ensure IDs match keys in blockchainData)
  const projects = [
    {
      id: 1, // Matches key in blockchainData
      name: 'School Building Project',
      type: 'Education',
      status: 'Active'
    },
    {
      id: 2, // Add data for this project in blockchainData if needed
      name: 'Clean Water Initiative',
      type: 'Infrastructure',
      status: 'Active'
    },
    {
      id: 3, // Add data for this project in blockchainData if needed
      name: 'Food Bank Program',
      type: 'Humanitarian',
      status: 'Active'
    }
  ];

  // Sample blockchain data
  const blockchainData = {
    1: [ // Data for project with id: 1
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
    // Add similar data arrays for project IDs 2 and 3 if needed
    2: [],
    3: [],
  };

  useEffect(() => {
    if (selectedProject) {
      // Ensure blockchainData has an entry for the selected project ID
      setBlocks(blockchainData[selectedProject.id] || []);
    } else {
      setBlocks([]);
    }
  }, [selectedProject]);

  /**
   * Handles the click event for the last block in the list.
   * Navigates to the projects page (/projects-all) with the selected project ID
   * passed in the navigation state, allowing the target page to potentially
   * open or highlight the specific project.
   * @param {object} blockData - The data of the clicked block (currently unused but passed).
   */
  const handleLastBlockClick = (blockData) => {
    // Ensure a project is selected before attempting navigation
    if (!selectedProject) {
        console.warn("Attempted to navigate from last block click without a selected project.");
        return;
    }
    console.log(`Last block clicked for Project ID: ${selectedProject.id}`, blockData);
    // Navigate programmatically to the projects page, passing the project ID in state
    navigate('/projects-all', { state: { openProjectId: selectedProject.id } });
  };

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
          blocks.length > 0 ? (
            <VStack spacing={0} align="stretch"> {/* Reduce spacing between block and line */}
              {blocks.map((block, index) => {
                const isLast = index === blocks.length - 1;
                return (
                  <Block
                    key={block.hash}
                    data={block}
                    isLast={isLast}
                    // Pass the handleLastBlockClick function as the onLastBlockClick prop
                    // ONLY to the last block in the list.
                    onLastBlockClick={isLast ? handleLastBlockClick : undefined}
                  />
                );
              })}
            </VStack>
          ) : (
            <Box
              p={8}
              textAlign="center"
              bg="gray.800"
              borderRadius="lg"
              color="gray.400"
            >
              No blockchain history found for this project.
            </Box>
          )
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
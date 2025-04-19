import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { 
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  getBezierPath,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Box, 
  Text, 
  Tooltip, 
  Progress, 
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaHandHoldingUsd,
  FaSchool,
  FaWater,
  FaUtensils,
  FaUserShield,
  FaPiggyBank,
  FaChartLine,
  FaMedapps,
  FaChevronDown,
  FaCubes,
  FaSearchPlus,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Blockchain Block Component
// Accept isClickable prop for styling purposes
const BlockchainBlock = ({ data, isClickable }) => {
  // onClick is removed as Link handles navigation

  // Function to stop propagation if needed, though Link might handle it
  const handleClick = (event) => {
    // Stop propagation if necessary to prevent React Flow interference
    event.stopPropagation();
  };

  return (
    <Box
      p={3}
      bg="gray.800"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={data.status === 'Confirmed' ? 'green.500' : 'yellow.500'}
      position="relative"
      mb={2}
      _hover={{
        // Apply hover styles if it's clickable (wrapped in Link)
        transform: isClickable ? 'translateY(-3px)' : 'translateY(-2px)',
        boxShadow: isClickable ? '0 4px 8px rgba(0, 255, 255, 0.3)' : 'none',
        borderColor: isClickable ? 'cyan.300' : (data.status === 'Confirmed' ? 'green.500' : 'yellow.500')
      }}
      transition="all 0.2s"
      // Set cursor if clickable
      cursor={isClickable ? 'pointer' : 'default'}
      // Add onClick to stop propagation if Link doesn't prevent it
      onClick={isClickable ? handleClick : undefined}
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text color="white" fontWeight="bold">{data.type}</Text>
          <Badge colorScheme={data.status === 'Confirmed' ? 'green' : 'yellow'}>
            {data.status}
          </Badge>
        </HStack>
        <Text color="gray.400" fontSize="sm" noOfLines={1} title={data.hash}>Hash: {data.hash}</Text> {/* Added noOfLines and title */}
        <Text color="green.300" fontSize="sm">Amount: {data.amount}</Text>
        <Text color="blue.300" fontSize="xs">{data.timestamp}</Text>
      </VStack>
    </Box>
  );
};

// BlockList Component to handle block display with show more functionality
const BlockList = ({ blocks, selectedProjectId }) => { // Accept selectedProjectId
  const [showAll, setShowAll] = useState(false);
  const displayBlocks = showAll ? blocks : blocks.slice(-3);

  // Optional: Handler for logging click before navigation
  const handleLinkClick = (projectId, blockData) => {
    console.log(`Link clicked for Project ID: ${projectId}`, blockData);
    // Navigation happens via Link component
  };

  // Helper function to map string project ID to integer ID
  const getIntegerProjectId = (stringId) => {
    switch (stringId) {
      case 'schoolBuilding':
        return 1;
      case 'waterProject':
        return 2;
      case 'foodBank':
        return 3;
      // Add more cases if needed
      default:
        return null; // Or handle unknown IDs appropriately
    }
  };

  return (
    <VStack align="stretch" spacing={2}>
      {blocks.length > 0 ? (
        <>
          {displayBlocks.map((block, index) => {
            // Determine if this block should be linkable
            const isLastBlock = index === displayBlocks.length - 1;
            const isProjectSpecific = selectedProjectId && selectedProjectId !== 'general';
            const isLinkable = isLastBlock && isProjectSpecific;

            // Get the integer project ID for the link state
            const integerProjectId = getIntegerProjectId(selectedProjectId);

            // Conditionally wrap the last block with a Link
            // Ensure integerProjectId is valid before creating the Link
            return isLinkable && integerProjectId !== null ? (
              <Link
                key={index}
                to="/projects-all" // Target page route
                // Use the integer project ID in the state
                state={{ openProjectId: integerProjectId }}
                style={{ textDecoration: 'none' }} // Remove default underline
                onClick={() => handleLinkClick(selectedProjectId, block)} // Optional: Log click
              >
                <BlockchainBlock
                  data={block}
                  isClickable={true} // Pass isClickable for styling
                />
              </Link>
            ) : (
              <BlockchainBlock
                key={index}
                data={block}
                isClickable={false} // Not linkable
              />
            );
          })}
          {blocks.length > 3 && (
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show More (${blocks.length - 3} more)`}
            </Button>
          )}
        </>
      ) : (
        <Text color="gray.500" fontSize="sm">No blocks available</Text>
      )}
    </VStack>
  );
};

// Custom node component with tooltip and metrics
const CustomNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
      <Box
        p={4}
        borderRadius="xl"
        transform={isHovered ? 'translateY(-2px)' : 'none'}
        transition="all 0.2s"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        bg={data.style?.background || '#E6FFFA'}
        color={data.style?.color || '#2C7A7B'}
        border={data.style?.border || '2px solid #319795'}
        style={{
          boxShadow: isHovered 
            ? '0 8px 16px rgba(0,0,0,0.3)' 
            : '0 4px 12px rgba(0,0,0,0.2)',
          width: '300px',
          borderRadius: '12px',
        }}
      >
        <Handle type="target" position={Position.Left} />
        <VStack spacing={3} align="stretch">
          <HStack spacing={3}>
            <Box fontSize="24px" color={data.style?.color || '#2C7A7B'}>
              {data.icon}
            </Box>
            <Text fontWeight="bold" fontSize="md" color={data.style?.color || '#2C7A7B'}>{data.label}</Text>
          </HStack>
          
          {data.metrics && (
            <Stat>
              <StatLabel color={data.style?.color || '#2C7A7B'}>{data.metrics.label}</StatLabel>
              <StatNumber fontSize="2xl">{data.metrics.value}</StatNumber>
              {data.metrics.change && (
                <StatHelpText>
                  <StatArrow 
                    type={data.metrics.change > 0 ? 'increase' : 'decrease'} 
                  />
                  {Math.abs(data.metrics.change)}%
                </StatHelpText>
              )}
            </Stat>
          )}

          {data.progress && (
            <Box>
              <Text fontSize="sm" mb={1} color={data.progress.colorScheme === 'blue' ? '#3182CE' : data.style?.color || '#2C7A7B'}></Text>
                {data.progress.label}: {data.progress.value}%
                <Progress 
                  value={data.progress.value} 
                  size="sm" 
                  colorScheme={data.progress.colorScheme || 'teal'}
                  borderRadius="full"
                  hasStripe={true}
                  isAnimated={true}
                />
            </Box>
          )}

          {data.blocks && data.blocks.length > 0 && (
            <Box>
              <Text fontSize="sm" mb={1} color="gray.300">Recent Activity:</Text> {/* Changed label */}
              {/* Pass selectedProjectId to BlockList */}
              <BlockList blocks={data.blocks} selectedProjectId={data.selectedProjectId} />
            </Box>
          )}
        
        {data.address && (
          <Text fontSize="xs" color="gray.500">Address: {data.address}</Text>
        )}
        
        {data.description && (
          <Text fontSize="xs" color="gray.500" noOfLines={2}>{data.description}</Text>
          )}
        </VStack>
        <Handle type="source" position={Position.Right} />
      </Box>
  );
};

// Custom edge with label
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  // Add different curvature for parallel edges
  const curvature = {
    'e4-5': 0.3,  // charityPool to investment (curve up)
    'e4-6': -0.3, // charityPool to emergency (curve down)
    'e7-8': 0.4,  // profit to schoolPool (strong curve up)
    'e7-9': 0,    // profit to floodPool (straight)
    'e7-10': -0.4, // profit to foodPool (strong curve down)
  };

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: curvature[id] || 0
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <>
          <rect
            x={labelX - 45}
            y={labelY - 10}
            width={90}
            height={20}
            fill="white"
            rx={4}
            style={{
              filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))'
            }}
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{
              fill: '#0BC5EA',
              fontSize: '13px',
              fontWeight: 600,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {data.label}
          </text>
        </>
      )}
    </>
  );
};

// Transaction Node Component for Project-Specific Flows
const TransactionNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Box
      p={4}
      borderRadius="xl"
      transform={isHovered ? 'translateY(-2px)' : 'none'}
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={data.style?.background || '#E6FFFA'}
      color={data.style?.color || '#2C7A7B'}
      border={data.style?.border || '2px solid #319795'}
      style={{
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0,0,0,0.3)' 
          : '0 4px 12px rgba(0,0,0,0.2)',
        width: '220px',
        borderRadius: '12px',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <VStack spacing={3} align="stretch">
        <HStack spacing={3}>
          <Box fontSize="24px" color={data.style?.color || '#2C7A7B'}>
            {data.icon}
          </Box>
          <Text fontWeight="bold" fontSize="md" color={data.style?.color || '#2C7A7B'}>{data.label}</Text>
        </HStack>
        
        {data.amount && (
          <Stat>
            <StatLabel color={data.style?.color || '#2C7A7B'}>Amount</StatLabel>
            <StatNumber fontSize="md" color={data.style?.color || '#2C7A7B'}>
              {data.amount}
            </StatNumber>
          </Stat>
        )}
      </VStack>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

// Recipient Node Component for Project-Specific Flows
const MilestoneNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get status-specific colors
  const getBgColor = (status) => {
    if (status === "COMPLETED") return "#E6FFFA";
    if (status === "IN PROGRESS") return "#EBF8FF";
    return "#F7FAFC";
  };
  
  const getBorderColor = (status) => {
    if (status === "COMPLETED") return "#319795";
    if (status === "IN PROGRESS") return "#3182CE";
    return "#A0AEC0";
  };

  // Set opacity based on status
  const getOpacity = (status) => {
    if (status === "PENDING") return 0.6;
    return 1;
  };
  
  // Get progress value for In Progress milestones (random for demonstration)
  const getProgress = () => {
    // For real implementation, this would come from the milestone data
    return data.milestone.progress || Math.floor(Math.random() * 50) + 30; // Returns a value between 30-80%
  };
  
  // Get status-specific badge colors
  const getBadgeBg = (status) => {
    if (status === "COMPLETED") return "#38A169"; // Green 600
    if (status === "IN PROGRESS") return "#3182CE"; // Blue 600
    return "#718096"; // Gray 600
  };
  
  // Get status-specific text colors
  const getBadgeColor = (status) => {
    return "white"; // White text for all badges for better contrast
  };
  
  return (
    <Box
      p={4}
      borderRadius="xl"
      transform={isHovered ? 'translateY(-2px)' : 'none'}
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={getBgColor(data.milestone.status)}
      borderWidth="2px"
      borderColor={getBorderColor(data.milestone.status)}
      opacity={getOpacity(data.milestone.status)}
      style={{
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0,0,0,0.3)' 
          : '0 4px 12px rgba(0,0,0,0.2)',
        width: '220px',
        borderRadius: '12px',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <VStack spacing={3} align="stretch">
        <HStack spacing={3} justify="space-between">
          <Text fontSize="md" fontWeight="bold" color="#2C7A7B">
            {data.milestone.title}
          </Text>
          <Badge 
            colorScheme={
              data.milestone.status === "COMPLETED" ? "green" : 
              data.milestone.status === "IN PROGRESS" ? "blue" : 
              "gray"
            }
            fontSize="xs"
            px={2}
            py={0.5}
            borderRadius="full"
            color="white"
            bg={getBadgeBg(data.milestone.status)}
            fontWeight="bold"
            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
          >
            {data.milestone.status}
          </Badge>
        </HStack>
        
        {/* Add progress bar for In Progress milestones */}
        {data.milestone.status === "IN PROGRESS" && (
          <Box mt={1}>
            <Text fontSize="xs" mb={1} color="#3182CE">Completion: {getProgress()}%</Text>
            <Progress 
              value={getProgress()} 
              size="sm" 
              colorScheme="blue"
              borderRadius="full"
              hasStripe={true}
              isAnimated={true}
            />
          </Box>
        )}
        
        {data.milestone.amount && (
          <Stat>
            <StatLabel color="#2C7A7B">Amount</StatLabel>
            <StatNumber fontSize="md" color="#2C7A7B">
              {data.milestone.amount}
            </StatNumber>
          </Stat>
        )}
      </VStack>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

// Create new RecipientNode component to replace MilestoneNode
const RecipientNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get status-specific colors
  const getBgColor = (status) => {
    if (status === "ACTIVE") return "#EBF8FF"; // Light blue background
    if (status === "COMPLETED") return "#E6FFFA"; // Light teal background
    return "#F7FAFC"; // Light gray background for other states
  };
  
  const getBorderColor = (status) => {
    if (status === "ACTIVE") return "#3182CE"; // Blue border
    if (status === "COMPLETED") return "#319795"; // Teal border
    return "#A0AEC0"; // Gray border for other states
  };

  // Set opacity based on status
  const getOpacity = (status) => {
    if (status === "INACTIVE") return 0.6;
    return 1;
  };
  
  // Handle click to navigate to project page - kept for backwards compatibility
  const handleNavigateToProject = () => {
    if (data.onNavigateToProject) {
      data.onNavigateToProject(data.recipient.id || data.recipient.name);
    }
  };

  // Use the passed callback function
  const handleRecipientClick = () => {
    if (data.onRecipientClick) {
      // Pass the project ID and recipient ID back to the parent
      data.onRecipientClick(data.projectId, data.recipient.id);
    } else if (data.onNavigateToProject) {
      // Use the navigation prop if callback is not available
      handleNavigateToProject();
    } else {
      console.log("No navigation handlers available for recipient click");
    }
  };
  
  return (
    <Box
      p={4}
      borderRadius="xl"
      transform={isHovered ? 'translateY(-2px)' : 'none'}
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={getBgColor(data.recipient.status)}
      borderWidth="2px"
      borderColor={getBorderColor(data.recipient.status)}
      opacity={getOpacity(data.recipient.status)}
      cursor="pointer"
      onClick={handleRecipientClick} // Use the new handler
      _hover={{
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        transform: 'translateY(-2px)'
      }}
      style={{
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0,0,0,0.3)' 
          : '0 4px 12px rgba(0,0,0,0.2)',
        width: '220px',
        borderRadius: '12px',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <VStack spacing={3} align="stretch">
        <HStack spacing={3} justify="space-between">
          <Text fontSize="md" fontWeight="bold" color="#2C7A7B">
            {data.recipient.name}
          </Text>
          <Badge 
            colorScheme={
              data.recipient.status === "ACTIVE" ? "blue" : 
              data.recipient.status === "COMPLETED" ? "green" : 
              "gray"
            }
            fontSize="xs"
            px={2}
            py={0.5}
            borderRadius="full"
            color="white"
            bg={
              data.recipient.status === "ACTIVE" ? "#3182CE" : 
              data.recipient.status === "COMPLETED" ? "#38A169" : 
              "#718096"
            }
            fontWeight="bold"
            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
          >
            {data.recipient.status}
          </Badge>
        </HStack>
        
        <Text fontSize="xs" color="gray.600">{data.recipient.location}</Text>
        
        {/* Add progress bar for active recipients */}
        {data.recipient.progress && (
          <Box mt={1}>
            <Text fontSize="xs" mb={1} color="#3182CE">Project progress: {data.recipient.progress}%</Text>
            <Progress 
              value={data.recipient.progress} 
              size="sm" 
              colorScheme="blue"
              borderRadius="full"
              hasStripe={true}
              isAnimated={true}
            />
          </Box>
        )}
        
        {data.recipient.amount && (
          <Stat>
            <StatLabel color="#2C7A7B">Fund allocation</StatLabel>
            <StatNumber fontSize="md" color="#2C7A7B">
              {data.recipient.amount}
            </StatNumber>
          </Stat>
        )}
      </VStack>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

// Transaction Edge Component for Project-Specific Flows
const TransactionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.2 // Add slight curvature to all edges
  });
  
  // Adjust label position to be below the edge (increase Y position)
  const adjustedLabelY = labelY + 40;
  
  // Calculate width based on label length to accommodate longer text
  const labelText = data?.label || "";
  const labelWidth = Math.max(130, labelText.length * 10); // Base width or width based on text length
  const labelX_adjusted = labelX;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <>
          <rect
            x={labelX_adjusted - (labelWidth/2)}
            y={adjustedLabelY - 18}
            width={labelWidth}
            height={36}
            fill={'#06B6D4'} // Cyan-500 for all project type labels
            rx={10}
            style={{
              filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.3))',
              stroke: '#0BC5EA',
              strokeWidth: 1.5,
            }}
          />
          <text
            x={labelX_adjusted}
            y={adjustedLabelY}
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{
              fill: 'white', // White text for better contrast
              fontSize: '16px',
              fontWeight: 700,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {data.label}
          </text>
        </>
      )}
    </>
  );
};

// Define node types
const nodeTypes = {
  custom: CustomNode,
  transaction: TransactionNode,
  milestone: MilestoneNode,
  recipient: RecipientNode,
};

// Define edge types
const edgeTypes = {
  custom: CustomEdge,
  transaction: TransactionEdge,
};

// Add onRecipientClick prop to Flow component
const Flow = ({ onRecipientClick }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [blockchainData, setBlockchainData] = useState({
    general: [],
    schoolBuilding: [],
    waterProject: [],
    foodBank: [],
  });
  const prevSelectedProject = useRef(null);
  const isInitialRender = useRef(true);
  const router = typeof window !== 'undefined' ? window.location : null;
  const navigate = useNavigate(); // Add useNavigate hook
  
  // Handle recipient click without a callback
  const handleRecipientClickWithoutCallback = (projectId, recipientId) => {
    console.log(`Navigating to project ${projectId} with recipient ${recipientId}`);
    // Map string ID to integer ID for navigation state
    const integerProjectId = getIntegerProjectId(projectId); // Use the helper function
    if (integerProjectId !== null) {
      navigate('/projects-all', {
        state: {
          openProjectId: integerProjectId, // Use integer ID
          // recipientId: recipientId, // Uncomment if needed
          // fromDonationFlow: true // Uncomment if needed
        }
      });
    } else {
      console.warn(`Could not map project ID "${projectId}" to an integer for navigation.`);
    }
  };

  // Helper function to map string project ID to integer ID (can be defined here or imported)
  const getIntegerProjectId = (stringId) => {
    switch (stringId) {
      case 'schoolBuilding':
        return 1;
      case 'waterProject':
        return 2;
      case 'foodBank':
        return 3;
      // Add more cases if needed
      default:
        return null; // Or handle unknown IDs appropriately
    }
  };

  // Sample projects (IDs remain strings here as they are used as keys/identifiers internally)
  const projects = [
    { id: 'general', name: 'General View', type: 'ALL PROJECTS' },
    { id: 'schoolBuilding', name: 'School Building Project', type: 'EDUCATION' },
    { id: 'waterProject', name: 'Clean Water Initiative', type: 'INFRASTRUCTURE' },
    { id: 'foodBank', name: 'Food Bank Program', type: 'HUMANITARIAN' },
  ];

  // Initialize edges for general view
  const initialEdges = [
    { 
      id: 'e1-2', 
      source: 'donor', 
      target: 'fpx', 
      animated: true,
      type: 'custom',
      data: { label: 'RM 210,135' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e2-3', 
      source: 'fpx', 
      target: 'p2p', 
      animated: true,
      type: 'custom',
      data: { label: 'RM 209,925' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e3-4', 
      source: 'p2p', 
      target: 'charityPool', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 95,420' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e4-5', 
      source: 'charityPool', 
      target: 'investment', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 76,336' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e4-6', 
      source: 'charityPool', 
      target: 'emergency', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 9,542' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e5-7', 
      source: 'investment', 
      target: 'profit', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 5,724' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e7-8', 
      source: 'profit', 
      target: 'schoolPool', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 1,431' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e7-9', 
      source: 'profit', 
      target: 'floodPool', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 954' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e7-10', 
      source: 'profit', 
      target: 'foodPool', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 763' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
    { 
      id: 'e7-11', 
      source: 'profit', 
      target: 'healthcarePool', 
      animated: true,
      type: 'custom',
      data: { label: 'USDT 1,908' },
      style: { stroke: '#319795', strokeWidth: 2 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  // Handle zoom to fit button click
  const handleZoomToFit = () => {
    // Different zoom settings for general view vs project-specific views
    if (!selectedProject || selectedProject.id === 'general') {
      // General view needs a wider view with less zoom
      fitView({ 
        duration: 800, 
        padding: 0.3,
        minZoom: 0.2,
        maxZoom: 1.0,
        includeHiddenNodes: true
      });
    } else {
      // Project view can be zoomed in more to see details
      fitView({ 
        duration: 800, 
        padding: 0.1,
        minZoom: 0.5,
        maxZoom: 2.0
      });
    }
  };

  // Update nodes and edges based on selected project
  useEffect(() => {
    if (selectedProject && selectedProject.id !== 'general') {
      // For project-specific views, use transaction flow
      const { nodes: projectNodes, edges: projectEdges } = generateProjectFlow(selectedProject);
      setNodes(projectNodes);
      setEdges(projectEdges);
    } else {
      // For general view, use the original nodes and edges
      setNodes(getInitialNodes(selectedProject?.id));
      setEdges(initialEdges);
    }
    
    // Only zoom on initial load or when changing view, not on data updates
    if (isInitialRender.current || selectedProject !== prevSelectedProject.current) {
      setTimeout(() => {
        // Different zoom settings for general view vs project-specific views
        if (!selectedProject || selectedProject.id === 'general') {
          // General view needs a wider view with less zoom
          fitView({ 
            duration: 800, 
            padding: 0.25,
            minZoom: 0.35,
            maxZoom: 1.5
          });
        } else {
          // Project view can be zoomed in more to see details
          fitView({ 
            duration: 800, 
            padding: 0.1,
            minZoom: 0.5,
            maxZoom: 2.0
          });
        }
        // Mark initial render complete after first zoom
        isInitialRender.current = false;
      }, 50);
    }
    
    // Store the current project selection for comparison in the next render
    prevSelectedProject.current = selectedProject;
  }, [selectedProject, blockchainData]);

  // Function to add a new block
  const addBlock = (projectId, blockData) => {
    setBlockchainData(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), {
        ...blockData,
        timestamp: new Date().toLocaleString(),
        hash: `0x${Math.random().toString(16).slice(2)}`,
        status: 'Confirmed'
      }]
    }));
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!selectedProject || selectedProject.id === 'general') {
    // Simulate proposal approval
    setTimeout(() => {
        addBlock('general', {
        type: 'Project Approval',
        amount: '50,000 USDT',
        from: '0x742d...44e',
        to: '0x123...456',
      });
    }, 2000);

    // Simulate donation
    setTimeout(() => {
        addBlock('general', {
        type: 'Donation Received',
        amount: '1,000 USDT',
        from: '0x912d...785',
        to: '0x123...456',
      });
    }, 4000);

    // Simulate milestone approval
    setTimeout(() => {
        addBlock('general', {
        type: 'Milestone Release',
        amount: '15,000 USDT',
        from: '0x123...456',
        to: '0x456...789',
      });
    }, 6000);
    }
  }, [selectedProject]);

  // Initialize nodes for general view with blockchain data
  const getInitialNodes = (currentProjectId) => { // Accept currentProjectId
    const baseNodes = [
      {
        id: 'donor',
        type: 'custom',
        data: { 
          label: 'Donors',
          address: '0x1234...5678',
          created: '2024-03-15',
          description: 'External donors making contributions',
          icon: <FaMoneyBillWave />,
          metrics: {
            label: 'Total Donations',
            value: 'RM 210,135',
            change: 38.26
          },
          progress: {
            label: 'Monthly Target',
            value: 75,
            colorScheme: 'green'
          },
          blocks: blockchainData[currentProjectId || 'general'], // Use correct blocks
          selectedProjectId: currentProjectId // Pass the project ID
        },
        position: { x: 50, y: 300 },
        style: { 
          background: '#E6FFFA', 
          color: '#2C7A7B', 
          border: '2px solid #319795',
          borderRadius: '12px',
        },
      },
      {
        id: 'fpx',
        type: 'custom',
        data: { 
          label: 'FPX Payment',
          address: '0x2345...6789',
          created: '2024-03-15',
          description: 'Malaysian payment gateway',
          icon: <FaExchangeAlt />,
          metrics: {
            label: 'Processing Time',
            value: '2.5s',
            change: -15
          },
          progress: {
            label: 'Success Rate',
            value: 99.8,
            colorScheme: 'green'
          }
        },
        position: { x: 500, y: 300 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'p2p',
        type: 'custom',
        data: { 
          label: 'P2P Exchange\n(MYR to USDT)',
          address: '0x3456...7890',
          created: '2024-03-15',
          description: 'Shariah-compliant exchange',
          icon: <FaHandHoldingUsd />,
          metrics: {
            label: 'Exchange Rate',
            value: '1 USDT = RM 4.75',
            change: 0.5
          },
          progress: {
            label: 'Liquidity Pool',
            value: 85,
            colorScheme: 'blue'
          }
        },
        position: { x: 950, y: 300 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'charityPool',
        type: 'custom',
        data: { 
          label: 'Charity Pool\n(Main Pool)',
          address: '0x4567...8901',
          created: '2024-03-15',
          description: 'Central pool for all donations',
          icon: <FaPiggyBank />,
          metrics: {
            label: 'Total Balance',
            value: 'USDT 95,420',
            change: 12.5
          },
          progress: {
            label: 'Fund Allocation',
            value: 90,
            colorScheme: 'orange'
          },
          blocks: blockchainData[currentProjectId || 'general'], // Add blocks here too if needed
          selectedProjectId: currentProjectId // Pass the project ID
        },
        position: { x: 1400, y: 300 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'investment',
        type: 'custom',
        data: { 
          label: 'Investment Pool',
          address: '0x5678...9012',
          created: '2024-03-15',
          description: 'Shariah-compliant investments',
          icon: <FaChartLine />,
          metrics: {
            label: 'Invested Amount',
            value: 'USDT 76,336',
            change: 8.2
          },
          progress: {
            label: 'ROI',
            value: 65,
            colorScheme: 'blue'
          }
        },
        position: { x: 1850, y: 150 },
        style: { 
          background: '#EDFDFD', 
          color: '#065666', 
          border: '2px solid #0BC5EA',
          borderRadius: '12px',
        },
      },
      {
        id: 'emergency',
        type: 'custom',
        data: { 
          label: 'Emergency Fund',
          address: '0x6789...0123',
          created: '2024-03-15',
          description: 'On-demand emergency relief',
          icon: <FaUserShield />,
          metrics: {
            label: 'Reserved Funds',
            value: 'USDT 9,542',
            change: 0
          },
          progress: {
            label: 'Utilization',
            value: 10,
            colorScheme: 'red'
          }
        },
        position: { x: 1850, y: 500 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'profit',
        type: 'custom',
        data: { 
          label: 'Investment Returns',
          address: '0x7890...1234',
          created: '2024-03-15',
          description: 'Returns from Shariah investments',
          icon: <FaChartLine />,
          metrics: {
            label: 'Monthly Returns',
            value: 'USDT 5,724',
            change: 15.3
          },
          progress: {
            label: 'Target Achievement',
            value: 95,
            colorScheme: 'green'
          }
        },
        position: { x: 2300, y: 150 },
        style: { 
          background: '#EDFDFD', 
          color: '#065666', 
          border: '2px solid #0BC5EA',
          borderRadius: '12px',
        },
      },
      {
        id: 'schoolPool',
        type: 'custom',
        data: { 
          label: 'School Building Pool',
          address: '0x8901...2345',
          created: '2024-03-15',
          description: 'Education infrastructure projects',
          icon: <FaSchool />,
          metrics: {
            label: 'Available Funds',
            value: 'USDT 1,431',
            change: 45
          },
          progress: {
            label: 'Project Progress',
            value: 35,
            colorScheme: 'yellow'
          },
          blocks: blockchainData['schoolBuilding'] || [], // Show specific project blocks
          selectedProjectId: 'schoolBuilding' // Hardcode or pass dynamically if needed
        },
        position: { x: 2750, y: 50 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'floodPool', // Assuming this relates to 'waterProject' ID
        type: 'custom',
        data: { 
          label: 'Flood Relief Pool',
          address: '0x9012...3456',
          created: '2024-03-15',
          description: 'Disaster relief initiatives',
          icon: <FaWater />,
          metrics: {
            label: 'Available Funds',
            value: 'USDT 954',
            change: 30
          },
          progress: {
            label: 'Aid Distribution',
            value: 60,
            colorScheme: 'blue'
          },
          blocks: blockchainData['waterProject'] || [], // Show specific project blocks
          selectedProjectId: 'waterProject' // Hardcode or pass dynamically
        },
        position: { x: 2750, y: 320 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'foodPool', // Assuming this relates to 'foodBank' ID
        type: 'custom',
        data: { 
          label: 'Food Bank Pool',
          address: '0x0123...4567',
          created: '2024-03-15',
          description: 'Food security programs',
          icon: <FaUtensils />,
          metrics: {
            label: 'Available Funds',
            value: 'USDT 763',
            change: 25
          },
          progress: {
            label: 'Distribution Progress',
            value: 80,
            colorScheme: 'orange'
          },
          blocks: blockchainData['foodBank'] || [], // Show specific project blocks
          selectedProjectId: 'foodBank' // Hardcode or pass dynamically
        },
        position: { x: 2750, y: 590 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'healthcarePool',
        type: 'custom',
        data: { 
          label: 'Healthcare Pool',
          address: '0x1234...5678',
          created: '2024-03-15',
          description: 'Healthcare and medical assistance programs',
          icon: <FaMedapps />,
          metrics: {
            label: 'Available Funds',
            value: 'USDT 1,908',
            change: 20
          },
          progress: {
            label: 'Medical Aid Progress',
            value: 70,
            colorScheme: 'purple'
          }
        },
        position: { x: 2750, y: 860 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
    ];

    return baseNodes;
  };

  // Function to generate project-specific transaction flow
  const generateProjectFlow = (project) => {
    const nodes = [];
    const edges = [];
    
    // Set default transaction amount
    const amount = 500;
    const investmentAmount = (amount * 0.9).toFixed(2); // 90% to investment
    const emergencyAmount = (amount * 0.1).toFixed(2); // 10% to emergency fund
    const profitAmount = (amount * 0.9 * 0.05).toFixed(2); // 5% profit from investment

    // Sample recipients data based on project types
    const getRecipients = (projectType) => {
      if (projectType === 'schoolBuilding') {
        return [
          { 
            id: 'school-1',
            name: 'Al-Hidayah School', 
            location: 'Kuala Lumpur, Malaysia',
            status: 'COMPLETED', 
            amount: 'USDT 500',
            type: 'Education Center'
          },
          { 
            id: 'school-2',
            name: 'Ar-Rahman Academy', 
            location: 'Johor Bahru, Malaysia',
            status: 'ACTIVE', 
            amount: 'USDT 350',
            progress: 65, // 65% complete
            type: 'Educational Institution'
          },
          { 
            id: 'school-3',
            name: 'As-Salam Institute', 
            location: 'Penang, Malaysia',
            status: 'INACTIVE', 
            amount: 'USDT 600',
            type: 'University'
          }
        ];
      } else if (projectType === 'waterProject') {
        return [
          { 
            id: 'water-1',
            name: 'Clean Water Initiative', 
            location: 'Kelantan, Malaysia',
            status: 'COMPLETED', 
            amount: 'USDT 200',
            type: 'Water Purification'
          },
          { 
            id: 'water-2',
            name: 'Rural Water Access', 
            location: 'Sabah, Malaysia',
            status: 'ACTIVE', 
            amount: 'USDT 450',
            progress: 40, // 40% complete
            type: 'Well Construction'
          },
          { 
            id: 'water-3',
            name: 'Irrigation System', 
            location: 'Sarawak, Malaysia',
            status: 'INACTIVE', 
            amount: 'USDT 300',
            type: 'Agricultural Support'
          }
        ];
      } else if (projectType === 'foodBank') {
        return [
          { 
            id: 'food-1',
            name: 'Community Food Bank', 
            location: 'Kuala Lumpur, Malaysia',
            status: 'COMPLETED', 
            amount: 'USDT 300',
            type: 'Food Distribution'
          },
          { 
            id: 'food-2',
            name: 'Fresh Food Network', 
            location: 'Ipoh, Malaysia',
            status: 'ACTIVE', 
            amount: 'USDT 250',
            progress: 75, // 75% complete
            type: 'Storage Facility'
          },
          { 
            id: 'food-3',
            name: 'Rural Food Access', 
            location: 'Terengganu, Malaysia',
            status: 'INACTIVE', 
            amount: 'USDT 200',
            type: 'Distribution Network'
          }
        ];
      }
      return [];
    };
    
    // Common nodes with improved positioning - increased spacing between nodes (x values)
    nodes.push({
      id: 'donor',
      type: 'transaction',
      data: { 
        label: 'Donor',
        icon: <FaMoneyBillWave />,
        amount: `USDT ${amount}`,
      },
      position: { x: 50, y: 150 },
      style: { 
        background: '#E6FFFA', 
        color: '#2C7A7B', 
        border: '2px solid #319795',
      },
    });
    
    nodes.push({
      id: 'userWallet',
      type: 'transaction',
      data: { 
        label: 'User Wallet',
        icon: <FaHandHoldingUsd />,
        amount: `USDT ${amount}`,
      },
      position: { x: 350, y: 150 },
      style: { 
        background: '#E6FFFA', 
        color: '#2C7A7B', 
        border: '2px solid #319795',
      },
    });
    
    nodes.push({
      id: 'amanah',
      type: 'transaction',
      data: { 
        label: 'Amanah',
        icon: <FaUserShield />,
        amount: `USDT ${amount}`,
      },
      position: { x: 650, y: 150 },
      style: { 
        background: '#E6FFFA', 
        color: '#2C7A7B', 
        border: '2px solid #319795',
      },
    });
    
    nodes.push({
      id: 'projectPools',
      type: 'transaction',
      data: { 
        label: 'Project Pools',
        icon: <FaPiggyBank />,
        amount: `USDT ${amount}`,
      },
      position: { x: 950, y: 150 },
      style: { 
        background: '#FFF5F5', 
        color: '#742A2A', 
        border: '2px solid #E53E3E',
      },
    });
    
    // Position the investment pool and emergency fund without overlap
    nodes.push({
      id: 'emergencyFund',
      type: 'transaction',
      data: { 
        label: 'Emergency Fund',
        icon: <FaUserShield />,
        amount: `USDT ${emergencyAmount}`,
      },
      position: { x: 1250, y: 30 },
      style: { 
        background: '#FFF5F5', 
        color: '#742A2A', 
        border: '2px solid #E53E3E',
      },
    });
    
    nodes.push({
      id: 'investmentPool',
      type: 'transaction',
      data: { 
        label: 'Investment Pool',
        icon: <FaChartLine />,
        amount: `USDT ${investmentAmount}`,
      },
      position: { x: 1250, y: 270 },
      style: { 
        background: '#EDFDFD', 
        color: '#065666', 
        border: '2px solid #0BC5EA',
      },
    });
    
    // Define which node should be highlighted based on project type
    const getIsHighlighted = (nodeId, projectType) => {
      if (nodeId === 'healthcarePool' && projectType === 'foodBank') return true; // Waqf type
      if (nodeId === 'schoolBuildingPool' && projectType === 'schoolBuilding') return true; // Sadaqah type
      if (nodeId === 'waterProject' && projectType === 'waterProject') return true; // Zakat type
      return false;
    };
    
    // Only add the project pools that are relevant to the selected project
    if (project?.id === 'schoolBuilding' || !project?.id) {
      nodes.push({
        id: 'schoolBuildingPool',
        type: 'transaction',
        data: { 
          label: 'School Building Pool',
          icon: <FaSchool />,
          amount: `USDT ${project?.id === 'schoolBuilding' ? profitAmount : '0'}`,
        },
        position: { x: 1550, y: 30 },
        style: { 
          background: getIsHighlighted('schoolBuildingPool', project?.id) ? '#EDFDFD' : '#E6FFFA',
          color: getIsHighlighted('schoolBuildingPool', project?.id) ? '#065666' : '#2C7A7B',
          border: getIsHighlighted('schoolBuildingPool', project?.id) ? '2px solid #0BC5EA' : '2px solid #319795',
          opacity: getIsHighlighted('schoolBuildingPool', project?.id) ? 1 : 0.6,
        },
      });
    }
    
    if (project?.id === 'foodBank' || !project?.id) {
      nodes.push({
        id: 'healthcarePool',
        type: 'transaction',
        data: { 
          label: 'Healthcare Pool',
          icon: <FaMedapps />,
          amount: `USDT ${project?.id === 'foodBank' ? profitAmount : '0'}`,
        },
        position: { x: 1550, y: 200 },
        style: { 
          background: getIsHighlighted('healthcarePool', project?.id) ? '#EDFDFD' : '#E6FFFA',
          color: getIsHighlighted('healthcarePool', project?.id) ? '#065666' : '#2C7A7B',
          border: getIsHighlighted('healthcarePool', project?.id) ? '2px solid #0BC5EA' : '2px solid #319795',
          opacity: getIsHighlighted('healthcarePool', project?.id) ? 1 : 0.6,
        },
      });
    }
    
    if (project?.id === 'waterProject' || !project?.id) {
      nodes.push({
        id: 'waterProject',
        type: 'transaction',
        data: { 
          label: 'Water Project',
          icon: <FaWater />,
          amount: `USDT ${project?.id === 'waterProject' ? profitAmount : '0'}`,
        },
        position: { x: 1550, y: 370 },
        style: { 
          background: getIsHighlighted('waterProject', project?.id) ? '#EDFDFD' : '#E6FFFA',
          color: getIsHighlighted('waterProject', project?.id) ? '#065666' : '#2C7A7B',
          border: getIsHighlighted('waterProject', project?.id) ? '2px solid #0BC5EA' : '2px solid #319795',
          opacity: getIsHighlighted('waterProject', project?.id) ? 1 : 0.6,
        },
      });
    }
     
    // Add recipient nodes based on the selected project
    if (project?.id) {
      const recipients = getRecipients(project.id);
      
      // Add recipient nodes with proper positioning
      if (recipients.length > 0) {
        // Position recipient nodes vertically to the right of the project pool
        const sourceNodeId = project.id === 'schoolBuilding' ? 'schoolBuildingPool' : 
                           project.id === 'foodBank' ? 'healthcarePool' : 
                           project.id === 'waterProject' ? 'waterProject' : '';
                           
        // Horizontal positioning - spread out around the pool
        const baseX = 2050; // Further to the right of the project pool
        
        // Initial vertical position - based on the project pool
        let baseY;
        if (project.id === 'schoolBuilding') {
          baseY = 30; // Match the Y position of schoolBuildingPool
        } else if (project.id === 'foodBank') {
          baseY = 200; // Match the Y position of healthcarePool
        } else if (project.id === 'waterProject') {
          baseY = 370; // Match the Y position of waterProject
        }
        
        // Add each recipient as a node in a vertical stack with space between them
        recipients.forEach((recipient, index) => {
          nodes.push({
            id: `recipient${index + 1}`,
            type: 'recipient',
            data: { 
              recipient,
              projectId: project.id, // Pass project ID for context
              // Pass the onRecipientClick callback from the Flow component props
              onRecipientClick: onRecipientClick || handleRecipientClickWithoutCallback,
              // Pass the onNavigateToProject callback from the Flow component props
              onNavigateToProject: (recipientId) => {
                console.log(`Navigating to project ${project.id} with recipient ${recipientId}`);
                navigate('/projects-all', { 
                  state: { 
                    openProjectId: project.id, 
                  } 
                });
              }
            },
            position: { 
              x: baseX, 
              y: baseY + (index * 340) // Increased spacing between recipient nodes
            },
          });
        });
      }
    }
     
    // Connect general nodes regardless of project
    edges.push({
      id: 'donor-to-userWallet',
      source: 'donor',
      target: 'userWallet',
      animated: true,
      type: 'transaction',
      style: { stroke: '#319795', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'userWallet-to-amanah',
      source: 'userWallet',
      target: 'amanah',
      animated: true,
      type: 'transaction',
      style: { stroke: '#319795', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'amanah-to-projectPools',
      source: 'amanah',
      target: 'projectPools',
      animated: true,
      type: 'transaction',
      style: { stroke: '#319795', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'projectPools-to-emergencyFund',
      source: 'projectPools',
      target: 'emergencyFund',
      animated: true,
      type: 'transaction',
      style: { stroke: '#319795', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'projectPools-to-investmentPool',
      source: 'projectPools',
      target: 'investmentPool',
      animated: true,
      type: 'transaction',
      style: { stroke: '#319795', strokeWidth: 2 },
    });
    
    // Add edges to connect project pools to their corresponding project-specific nodes
    if (project?.id === 'schoolBuilding') {
      const recipients = getRecipients('schoolBuilding');
      
      // Connect projectPools to schoolBuildingPool
      edges.push({
        id: 'projectPools-to-schoolBuildingPool',
        source: 'projectPools',
        target: 'schoolBuildingPool',
        animated: true,
        type: 'transaction',
        style: { stroke: '#319795', strokeWidth: 2 },
      });
      
      // Connect school building pool directly to each recipient
      recipients.forEach((recipient, index) => {
        edges.push({
          id: `edge-schoolBuildingPool-recipient${index + 1}`,
          source: 'schoolBuildingPool',
          target: `recipient${index + 1}`,
          animated: recipient.status !== 'INACTIVE',
          type: 'transaction',
          data: { label: recipient.type },
          style: { 
            stroke: '#319795', 
            strokeWidth: 2,
            opacity: recipient.status === 'INACTIVE' ? 0.6 : 1
          },
        });
      });
      
    } else if (project?.id === 'foodBank') {
      const recipients = getRecipients('foodBank');
      
      // Connect projectPools to healthcarePool
      edges.push({
        id: 'projectPools-to-healthcarePool',
        source: 'projectPools',
        target: 'healthcarePool',
        animated: true,
        type: 'transaction',
        style: { stroke: '#319795', strokeWidth: 2 },
      });
      
      // Connect healthcare pool directly to each recipient
      recipients.forEach((recipient, index) => {
        edges.push({
          id: `edge-healthcarePool-recipient${index + 1}`,
          source: 'healthcarePool',
          target: `recipient${index + 1}`,
          animated: recipient.status !== 'INACTIVE',
          type: 'transaction',
          data: { label: recipient.type },
          style: { 
            stroke: '#319795', 
            strokeWidth: 2,
            opacity: recipient.status === 'INACTIVE' ? 0.6 : 1
          },
        });
      });
      
    } else if (project?.id === 'waterProject') {
      const recipients = getRecipients('waterProject');
      
      // Connect projectPools to waterProject
      edges.push({
        id: 'projectPools-to-waterProject',
        source: 'projectPools',
        target: 'waterProject',
        animated: true,
        type: 'transaction',
        style: { stroke: '#319795', strokeWidth: 2 },
      });
      
      // Connect water project pool directly to each recipient
      recipients.forEach((recipient, index) => {
        edges.push({
          id: `edge-waterProject-recipient${index + 1}`,
          source: 'waterProject',
          target: `recipient${index + 1}`,
          animated: recipient.status !== 'INACTIVE',
          type: 'transaction',
          data: { label: recipient.type },
          style: { 
            stroke: '#319795', 
            strokeWidth: 2,
            opacity: recipient.status === 'INACTIVE' ? 0.6 : 1
          },
        });
      });
    }

    return { nodes, edges };
  };

  // Check URL for recipient parameter on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const recipientId = url.searchParams.get('recipient');
      const projectId = window.location.pathname.split('/').pop();
      
      // If there's a recipient ID in the URL, select the corresponding project
      if (recipientId && projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
          setSelectedProject(project);
          
          // You can add additional logic here to expand the specific recipient
          // This might involve setting state to track which recipient is expanded
        }
      }
    }
  }, []);

  return (
    <Box>
      <Flex mb={4} justify="space-between" align="center">
        <Menu>
          <MenuButton 
            as={Button} 
            rightIcon={<FaChevronDown />}
            leftIcon={selectedProject && selectedProject.id !== 'general' 
              ? (selectedProject.id === 'schoolBuilding' 
                ? <FaSchool /> 
                : selectedProject.id === 'waterProject' 
                ? <FaWater /> 
                : <FaHandHoldingUsd />)
              : <FaCubes />
            }
            colorScheme={
              selectedProject && selectedProject.id !== 'general' 
                ? (selectedProject.id === 'schoolBuilding' 
                  ? 'teal' 
                  : selectedProject.id === 'waterProject' 
                  ? 'cyan' 
                  : 'orange')
                : 'blue'
            }
            size="md"
            borderRadius="lg"
            px={4}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            transition="all 0.2s"
          >
            <Text color="white">{selectedProject ? selectedProject.name : 'Select Project'}</Text>
          </MenuButton>
          <MenuList>
            {projects.map((project) => (
              <MenuItem 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                icon={project.id === 'general' 
                  ? <FaCubes color="#3182CE" /> 
                  : project.id === 'schoolBuilding' 
                  ? <FaSchool color="#319795" /> 
                  : project.id === 'waterProject' 
                  ? <FaWater color="#319795" /> 
                  : <FaHandHoldingUsd color="#319795" />
                }
              >
                <HStack justify="space-between" width="100%">
                  <Text color="black">{project.name}</Text>
                  <Badge 
                    colorScheme={
                      project.id === 'general' ? 'blue' : 
                      project.id === 'schoolBuilding' ? 'teal' : 
                      project.id === 'waterProject' ? 'cyan' : 
                      'orange'
                    }
                    color="white"
                    fontWeight="bold"
                    bg={
                      project.id === 'general' ? 'blue.500' : 
                      project.id === 'schoolBuilding' ? 'teal.500' : 
                      project.id === 'waterProject' ? 'cyan.500' : 
                      'orange.500'
                    }
                    px={2}
                  >
                    {project.type}
                  </Badge>
                </HStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        
        {/* Zoom to fit button */}
        <Button
          onClick={handleZoomToFit}
          colorScheme="teal"
          size="md"
          borderRadius="lg"
          leftIcon={<FaSearchPlus />}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
          transition="all 0.2s"
        >
          <Text color="white">Zoom to Fit</Text>
        </Button>
      </Flex>

      <Box 
        h="650px" 
        w="100%" 
        bg="rgba(11, 197, 234, 0.05)" 
        borderRadius="md"
        boxShadow="0 4px 12px rgba(0,0,0,0.1)"
        overflow="hidden"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView={isInitialRender.current} // Only auto-fit on initial render
          fitViewOptions={{ 
            duration: 800, 
            padding: !selectedProject || selectedProject.id === 'general' ? 0.25 : 0.1,
            minZoom: !selectedProject || selectedProject.id === 'general' ? 0.35 : 0.5,
            maxZoom: !selectedProject || selectedProject.id === 'general' ? 1.5 : 2.0
          }}
          minZoom={!selectedProject || selectedProject.id === 'general' ? 0.25 : 0.3}
          maxZoom={!selectedProject || selectedProject.id === 'general' ? 1.5 : 2.0}
          defaultZoom={!selectedProject || selectedProject.id === 'general' ? 0.3 : 0.8} // Lower default zoom for general view
          defaultEdgeOptions={{
            type: selectedProject?.id !== 'general' ? 'transaction' : 'custom',
            animated: true,
            style: { stroke: '#319795', strokeWidth: 2 },
          }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={{ hideAttribution: true }}
        >
          <Background 
            color={selectedProject?.id !== 'general' ? '#319795' : '#319795'} 
            gap={16} 
            size={1} 
          />
        </ReactFlow>
      </Box>
    </Box>
  );
};

// Modify DonationFlow wrapper to accept and pass the callback
const DonationFlow = ({ onRecipientClick }) => { // Accept the callback prop
  return (
    <ReactFlowProvider>
      {/* Pass the callback down to the Flow component */}
      <Flow onRecipientClick={onRecipientClick} />
    </ReactFlowProvider>
  );
};

export default DonationFlow;
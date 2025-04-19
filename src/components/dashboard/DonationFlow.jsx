import React, { useState, useEffect } from 'react';
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
} from 'react-icons/fa';

// Blockchain Block Component
const BlockchainBlock = ({ data }) => {
  return (
    <Box
      p={3}
      bg="gray.800"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={data.status === 'Confirmed' ? 'green.500' : 'yellow.500'}
      position="relative"
      mb={2}
      _hover={{ transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text color="white" fontWeight="bold">{data.type}</Text>
          <Badge colorScheme={data.status === 'Confirmed' ? 'green' : 'yellow'}>
            {data.status}
          </Badge>
        </HStack>
        <Text color="gray.400" fontSize="sm">Hash: {data.hash}</Text>
        <Text color="green.300" fontSize="sm">Amount: {data.amount}</Text>
        <Text color="blue.300" fontSize="xs">{data.timestamp}</Text>
      </VStack>
    </Box>
  );
};

// BlockList Component to handle block display with show more functionality
const BlockList = ({ blocks }) => {
  const [showAll, setShowAll] = useState(false);
  const displayBlocks = showAll ? blocks : blocks.slice(-3);
  
  return (
    <VStack align="stretch" spacing={2}>
      {blocks.length > 0 ? (
        <>
          {displayBlocks.map((block, index) => (
            <BlockchainBlock key={index} data={block} />
          ))}
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
    <Tooltip 
      label={
        <Box p={2}>
          <Text fontWeight="bold">{data.label}</Text>
          <Text fontSize="sm">Address: {data.address || '0x...'}</Text>
          <Text fontSize="sm">Created: {data.created || 'N/A'}</Text>
          <Text fontSize="sm">{data.description || ''}</Text>
          {data.blocks && (
            <Box mt={2}>
              <Text fontWeight="bold" mb={2}>Recent Blocks:</Text>
              <BlockList blocks={data.blocks || []} />
            </Box>
          )}
        </Box>
      }
      isOpen={isHovered}
      placement="top"
      hasArrow
    >
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
            <Text fontWeight="bold" fontSize="md">{data.label}</Text>
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
              <Text fontSize="sm" mb={1}>{data.progress.label}</Text>
              <Progress 
                value={data.progress.value} 
                size="sm" 
                colorScheme={data.progress.colorScheme || 'teal'}
                borderRadius="full"
              />
            </Box>
          )}

          {data.blocks && data.blocks.length > 0 && (
            <Box>
              <Text fontSize="sm" mb={1}>Latest Block:</Text>
              <BlockchainBlock data={data.blocks[data.blocks.length - 1]} />
            </Box>
          )}
        </VStack>
        <Handle type="source" position={Position.Right} />
      </Box>
    </Tooltip>
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

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const Flow = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [blockchainData, setBlockchainData] = useState({
    general: [],
    schoolBuilding: [],
    waterProject: [],
    foodBank: [],
  });

  // Sample projects
  const projects = [
    { id: 'general', name: 'General View', type: 'All Projects' },
    { id: 'schoolBuilding', name: 'School Building Project', type: 'Education' },
    { id: 'waterProject', name: 'Clean Water Initiative', type: 'Infrastructure' },
    { id: 'foodBank', name: 'Food Bank Program', type: 'Humanitarian' },
  ];

  // Initialize edges
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

  // Initialize nodes with blockchain data
  const getInitialNodes = () => {
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
          blocks: blockchainData[selectedProject?.id || 'general']
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
          }
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
        position: { x: 1850, y: 450 },
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
          }
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
        id: 'floodPool',
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
          }
        },
        position: { x: 2750, y: 300 },
        style: { 
          background: '#FFF5F5', 
          color: '#742A2A', 
          border: '2px solid #E53E3E',
          borderRadius: '12px',
        },
      },
      {
        id: 'foodPool',
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
          }
        },
        position: { x: 2750, y: 550 },
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
        position: { x: 2750, y: 800 },
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

  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  // Update nodes when blockchain data changes
  useEffect(() => {
    setNodes(getInitialNodes());
  }, [blockchainData, selectedProject]);

  // Simulate real-time updates
  useEffect(() => {
    // Simulate proposal approval
    setTimeout(() => {
      addBlock(selectedProject?.id || 'general', {
        type: 'Project Approval',
        amount: '50,000 USDT',
        from: '0x742d...44e',
        to: '0x123...456',
      });
    }, 2000);

    // Simulate donation
    setTimeout(() => {
      addBlock(selectedProject?.id || 'general', {
        type: 'Donation Received',
        amount: '1,000 USDT',
        from: '0x912d...785',
        to: '0x123...456',
      });
    }, 4000);

    // Simulate milestone approval
    setTimeout(() => {
      addBlock(selectedProject?.id || 'general', {
        type: 'Milestone Release',
        amount: '15,000 USDT',
        from: '0x123...456',
        to: '0x456...789',
      });
    }, 6000);
  }, [selectedProject]);

  return (
    <Box>
      <Flex mb={4}>
        <Menu>
          <MenuButton 
            as={Button} 
            rightIcon={<FaChevronDown />}
            leftIcon={<FaCubes />}
            colorScheme="blue"
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
      </Flex>

      <Box 
        h="400px" 
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
          fitView
          fitViewOptions={{ duration: 800, padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: 'custom',
            animated: true,
            style: { stroke: '#319795', strokeWidth: 2 },
          }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#319795" gap={16} size={1} />
        </ReactFlow>
      </Box>
    </Box>
  );
};

const DonationFlow = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default DonationFlow; 
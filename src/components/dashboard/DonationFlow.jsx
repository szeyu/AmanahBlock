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
} from 'react-icons/fa';

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
  const initialNodes = [
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
        }
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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Initial fit view with animation to accommodate all nodes
    setTimeout(() => {
      fitView({ 
        duration: 800, 
        padding: 0.2,
        includeHiddenNodes: false
      });
    }, 100);
  }, []);

  return (
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
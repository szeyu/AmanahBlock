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
  Box,
  Text,
  Flex,
  Badge,
  Divider,
  VStack,
  HStack,
  useColorModeValue,
  Grid,
  GridItem,
  Icon
} from '@chakra-ui/react';
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
import { FaMoneyBillWave, FaExchangeAlt, FaHandHoldingUsd, FaPiggyBank, FaChartLine, FaUserShield, FaSchool, FaWater, FaUtensils, FaFingerprint, FaTag, FaCalendarAlt } from 'react-icons/fa';

// Custom node component for transaction flow
const TransactionNode = ({ data }) => {
  return (
    <Box
      p={3}
      borderRadius="lg"
      bg={data.style?.background || '#1A202C'}
      color={data.style?.color || '#E2E8F0'}
      border={data.style?.border || '2px solid #3182CE'}
      style={{
        boxShadow: data.isHighlighted ? '0 4px 12px rgba(49, 130, 206, 0.4)' : '0 2px 6px rgba(0,0,0,0.1)',
        width: '200px',
        borderRadius: '12px',
        transform: data.isHighlighted ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Flex direction="column" align="center">
        <Box fontSize="20px" mb={1} color={data.isHighlighted ? 'blue.300' : 'gray.400'}>
          {data.icon}
        </Box>
        <Text fontWeight="bold" fontSize="sm">{data.label}</Text>
        {data.amount && (
          <Text fontSize="xs" color="blue.300">{data.amount}</Text>
        )}
      </Flex>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

// Custom edge with label
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
              fontSize: '12px',
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
  transaction: TransactionNode,
};

const edgeTypes = {
  transaction: TransactionEdge,
};

// Transaction flow component
const TransactionFlow = ({ transaction }) => {
  // Generate nodes and edges based on transaction type
  const generateFlow = () => {
    const nodes = [];
    const edges = [];
    
    // Calculate investment and profit amounts
    let amount = 0;
    
    // Handle different formats of amount (string "500 USDT" or number 500)
    if (transaction?.amount) {
      if (typeof transaction.amount === 'string') {
        // Try to extract the numeric part if it's a string like "500 USDT"
        const match = transaction.amount.match(/(\d+)/);
        amount = match ? parseFloat(match[0]) : 0;
      } else {
        // If it's already a number
        amount = parseFloat(transaction.amount);
      }
    }
    
    const investmentAmount = (amount * 0.9).toFixed(2); // 90% to investment
    const emergencyAmount = (amount * 0.1).toFixed(2); // 10% to emergency fund
    const profitAmount = (amount * 0.9 * 0.05).toFixed(2); // 5% profit from investment
    
    // Common nodes
    nodes.push({
      id: 'donor',
      type: 'transaction',
      data: { 
        label: 'Donor',
        icon: <FaMoneyBillWave />,
        isHighlighted: true,
      },
      position: { x: 50, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'fpx',
      type: 'transaction',
      data: { 
        label: 'FPX Payment',
        icon: <FaExchangeAlt />,
        isHighlighted: true,
      },
      position: { x: 350, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'p2p',
      type: 'transaction',
      data: { 
        label: 'P2P Exchange',
        icon: <FaHandHoldingUsd />,
        isHighlighted: true,
      },
      position: { x: 650, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'charityPool',
      type: 'transaction',
      data: { 
        label: 'Charity Pool',
        icon: <FaPiggyBank />,
        isHighlighted: true,
      },
      position: { x: 950, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'investmentPool',
      type: 'transaction',
      data: { 
        label: 'Investment Pool',
        icon: <FaChartLine />,
        isHighlighted: true,
      },
      position: { x: 1250, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'emergencyFund',
      type: 'transaction',
      data: { 
        label: 'Emergency Fund',
        icon: <FaUserShield />,
        isHighlighted: true,
      },
      position: { x: 1250, y: 100 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '2px solid #3182CE',
      },
    });
    
    nodes.push({
      id: 'waqfFund',
      type: 'transaction',
      data: { 
        label: 'Waqf Fund',
        icon: <FaPiggyBank />,
        isHighlighted: transaction?.type === 'Waqf',
      },
      position: { x: 1550, y: 100 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: transaction?.type === 'Waqf' ? '2px solid #3182CE' : '1px solid #4A5568',
        opacity: transaction?.type === 'Waqf' ? 1 : 0.6,
      },
    });
    
    nodes.push({
      id: 'schoolBuildingPool',
      type: 'transaction',
      data: { 
        label: 'School Building Pool',
        icon: <FaSchool />,
        isHighlighted: transaction?.type === 'Sadaqah',
      },
      position: { x: 1550, y: 200 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: transaction?.type === 'Sadaqah' ? '2px solid #3182CE' : '1px solid #4A5568',
        opacity: transaction?.type === 'Sadaqah' ? 1 : 0.6,
      },
    });
    
    nodes.push({
      id: 'foodBank',
      type: 'transaction',
      data: { 
        label: 'Food Bank',
        icon: <FaUtensils />,
        isHighlighted: false,
      },
      position: { x: 1550, y: 300 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: '1px solid #4A5568',
        opacity: 0.6,
      },
    });
    
    nodes.push({
      id: 'waterProject',
      type: 'transaction',
      data: { 
        label: 'Water Project',
        icon: <FaWater />,
        isHighlighted: transaction?.type === 'Zakat',
      },
      position: { x: 1550, y: 400 },
      style: { 
        background: '#1A202C', 
        color: '#E2E8F0', 
        border: transaction?.type === 'Zakat' ? '2px solid #3182CE' : '1px solid #4A5568',
        opacity: transaction?.type === 'Zakat' ? 1 : 0.6,
      },
    });
    
    // Add edges
    edges.push({
      id: 'e1-2',
      source: 'donor',
      target: 'fpx',
      animated: true,
      type: 'transaction',
      data: { label: transaction?.amount },
      style: { stroke: '#3182CE', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'e2-3',
      source: 'fpx',
      target: 'p2p',
      animated: true,
      type: 'transaction',
      data: { label: transaction?.amount },
      style: { stroke: '#3182CE', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'e3-4',
      source: 'p2p',
      target: 'charityPool',
      animated: true,
      type: 'transaction',
      data: { label: transaction?.amount },
      style: { stroke: '#3182CE', strokeWidth: 2 },
    });
    
    // Charity Pool splits to Investment Pool (90%) and Emergency Fund (10%)
    edges.push({
      id: 'e4-5',
      source: 'charityPool',
      target: 'investmentPool',
      animated: true,
      type: 'transaction',
      data: { label: `${investmentAmount} USDT` },
      style: { stroke: '#3182CE', strokeWidth: 2 },
    });
    
    edges.push({
      id: 'e4-6',
      source: 'charityPool',
      target: 'emergencyFund',
      animated: true,
      type: 'transaction',
      data: { label: `${emergencyAmount} USDT` },
      style: { stroke: '#3182CE', strokeWidth: 2 },
    });
    
    // Investment Pool generates profit that flows to destination pools
    // For Waqf transactions
    edges.push({
      id: 'e5-7',
      source: 'investmentPool',
      target: 'waqfFund',
      animated: transaction?.type === 'Waqf',
      type: 'transaction',
      data: { label: transaction?.type === 'Waqf' ? `${profitAmount} USDT` : '' },
      style: { 
        stroke: transaction?.type === 'Waqf' ? '#3182CE' : '#4A5568', 
        strokeWidth: transaction?.type === 'Waqf' ? 2 : 1,
        opacity: transaction?.type === 'Waqf' ? 1 : 0.6,
      },
    });
    
    // For Sadaqah transactions
    edges.push({
      id: 'e5-8',
      source: 'investmentPool',
      target: 'schoolBuildingPool',
      animated: transaction?.type === 'Sadaqah',
      type: 'transaction',
      data: { label: transaction?.type === 'Sadaqah' ? `${profitAmount} USDT` : '' },
      style: { 
        stroke: transaction?.type === 'Sadaqah' ? '#3182CE' : '#4A5568', 
        strokeWidth: transaction?.type === 'Sadaqah' ? 2 : 1,
        opacity: transaction?.type === 'Sadaqah' ? 1 : 0.6,
      },
    });
    
    // For Zakat transactions
    edges.push({
      id: 'e5-6',
      source: 'investmentPool',
      target: 'waterProject',
      animated: transaction?.type === 'Zakat',
      type: 'transaction',
      data: { label: transaction?.type === 'Zakat' ? `${profitAmount} USDT` : '' },
      style: { 
        stroke: transaction?.type === 'Zakat' ? '#3182CE' : '#4A5568', 
        strokeWidth: transaction?.type === 'Zakat' ? 2 : 1,
        opacity: transaction?.type === 'Zakat' ? 1 : 0.6,
      },
    });
    
    // For other transaction types, default to Food Bank
    if (transaction?.type && !['Waqf', 'Sadaqah', 'Zakat'].includes(transaction.type)) {
      edges.push({
        id: 'e5-9',
        source: 'investmentPool',
        target: 'foodBank',
        animated: true,
        type: 'transaction',
        data: { label: `${profitAmount} USDT` },
        style: { stroke: '#3182CE', strokeWidth: 2 },
      });
    } else {
      edges.push({
        id: 'e5-9',
        source: 'investmentPool',
        target: 'foodBank',
        animated: false,
        type: 'transaction',
        data: { label: '' },
        style: { stroke: '#4A5568', strokeWidth: 1, opacity: 0.6 },
      });
    }
    
    return { nodes, edges };
  };

  const { nodes, edges } = generateFlow();
  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Initial fit view with animation
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.5 });
    }, 100);
  }, []);

  return (
    <Box 
      h="600px" 
      w="100%" 
      bg="rgba(49, 130, 206, 0.05)" 
      borderRadius="md"
      boxShadow="0 4px 12px rgba(0,0,0,0.1)"
      overflow="hidden"
    >
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ duration: 800, padding: 0.5 }}
        minZoom={0.2}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'transaction',
          animated: true,
          style: { stroke: '#3182CE', strokeWidth: 2 },
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#3182CE" gap={16} size={1} />
      </ReactFlow>
    </Box>
  );
};

// Modal component
const TransactionFlowModal = ({ isOpen, onClose, transaction }) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('white', 'gray.100');
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor} maxW="80vw" maxH="80vh" m="auto">
        <ModalHeader>
          <Flex justify="space-between" align="center" pr={8}>
            <Text fontSize="xl">Transaction Details</Text>
            <Badge 
              colorScheme={
                transaction?.status === 'Completed' ? 'green' : 
                transaction?.status === 'Processing' ? 'yellow' : 'blue'
              }
              fontSize="md"
              px={3}
              py={1}
            >
              {transaction?.status}
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton color={textColor} />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <HStack>
                  <Icon as={FaFingerprint} color="blue.300" boxSize={5} />
                  <Text fontWeight="bold" fontSize="md">Transaction ID:</Text>
                </HStack>
                <Text color="blue.300" fontSize="md" isTruncated>{transaction?.id}</Text>
              </GridItem>
              <GridItem>
                <HStack>
                  <Icon as={FaTag} color="blue.300" boxSize={5} />
                  <Text fontWeight="bold" fontSize="md">Type:</Text>
                </HStack>
                <Text fontSize="md">{transaction?.type}</Text>
              </GridItem>
              <GridItem>
                <HStack>
                  <Icon as={FaMoneyBillWave} color="blue.300" boxSize={5} />
                  <Text fontWeight="bold" fontSize="md">Amount:</Text>
                </HStack>
                <Text fontSize="md" color="green.400">{transaction?.amount}</Text>
              </GridItem>
              <GridItem>
                <HStack>
                  <Icon as={FaCalendarAlt} color="blue.300" boxSize={5} />
                  <Text fontWeight="bold" fontSize="md">Date:</Text>
                </HStack>
                <Text fontSize="md">{formatDate(transaction?.date)}</Text>
              </GridItem>
            </Grid>
            
            <Divider my={2} borderColor="gray.600" />
            
            <Text fontWeight="bold" fontSize="lg">Transaction Flow:</Text>
            <ReactFlowProvider>
              <TransactionFlow transaction={transaction} />
            </ReactFlowProvider>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} size="md">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionFlowModal; 
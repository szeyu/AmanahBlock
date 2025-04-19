import React from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  Button,
  Divider,
  Badge,
  Flex,
  Tooltip,
  useClipboard
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaCheckCircle, FaClock, FaCopy, FaEthereum } from 'react-icons/fa';

const BlockchainVerification = ({ 
  transactionHash = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  status = "Confirmed",
  timestamp = "2023-05-15 14:30:45",
  blockNumber = 12345678,
  network = "Ethereum",
  confirmations = 128,
  amount = "500 USDT",
  from = "0x71C...93E4",
  to = "0x82D...45F1",
  gasUsed = "21,000",
  explorerUrl = "https://etherscan.io/tx/"
}) => {
  const { hasCopied, onCopy } = useClipboard(transactionHash);
  
  // Define status badge color
  const getStatusColor = () => {
    switch(status) {
      case "Confirmed":
        return "green";
      case "Pending":
        return "yellow";
      case "Failed":
        return "red";
      default:
        return "gray";
    }
  };
  
  // Define network icon
  const getNetworkIcon = () => {
    switch(network) {
      case "Ethereum":
        return FaEthereum;
      default:
        return FaEthereum;
    }
  };
  
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.700"
      p={6}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="md" color="white">Blockchain Verification</Heading>
          <Badge colorScheme={getStatusColor()} borderRadius="full" px={2} py={1}>
            <HStack spacing={1}>
              <Icon as={status === "Confirmed" ? FaCheckCircle : FaClock} boxSize={3} />
              <Text fontSize="xs">{status}</Text>
            </HStack>
          </Badge>
        </Flex>
        
        <Divider borderColor="gray.700" />
        
        <Box>
          <Text color="gray.400" fontSize="sm" mb={1}>Transaction Hash</Text>
          <HStack>
            <Text color="white" fontSize="sm" fontFamily="monospace">
              {transactionHash.substring(0, 18)}...{transactionHash.substring(transactionHash.length - 4)}
            </Text>
            <Tooltip label={hasCopied ? "Copied!" : "Copy to clipboard"}>
              <Button size="xs" variant="ghost" onClick={onCopy}>
                <Icon as={FaCopy} color="gray.400" />
              </Button>
            </Tooltip>
          </HStack>
        </Box>
        
        <Flex wrap="wrap" gap={4}>
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Network</Text>
            <HStack>
              <Icon as={getNetworkIcon()} color="brand.500" />
              <Text color="white" fontSize="sm">{network}</Text>
            </HStack>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Block</Text>
            <Text color="white" fontSize="sm">{blockNumber}</Text>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Timestamp</Text>
            <Text color="white" fontSize="sm">{timestamp}</Text>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Confirmations</Text>
            <Text color="white" fontSize="sm">{confirmations}</Text>
          </Box>
        </Flex>
        
        <Divider borderColor="gray.700" />
        
        <Flex wrap="wrap" gap={4}>
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>From</Text>
            <Text color="white" fontSize="sm">{from}</Text>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>To</Text>
            <Text color="white" fontSize="sm">{to}</Text>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Amount</Text>
            <Text color="white" fontSize="sm" fontWeight="bold">{amount}</Text>
          </Box>
          
          <Box flex="1" minW="120px">
            <Text color="gray.400" fontSize="sm" mb={1}>Gas Used</Text>
            <Text color="white" fontSize="sm">{gasUsed}</Text>
          </Box>
        </Flex>
        
        <Button 
          rightIcon={<FaExternalLinkAlt />} 
          variant="outline" 
          size="sm"
          as="a"
          href={`${explorerUrl}${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Blockchain Explorer
        </Button>
      </VStack>
    </Box>
  );
};

export default BlockchainVerification; 
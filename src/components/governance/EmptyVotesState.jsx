import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';
import { FaVoteYea, FaEthereum } from 'react-icons/fa';

const EmptyVotesState = () => {
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.5)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={10}
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      textAlign="center"
      py={16}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
    >
      <Icon as={FaVoteYea} boxSize={16} color="brand.300" mb={6} />
      <Heading size="lg" color="white" mb={4}>No Votes Cast Yet</Heading>
      <Text color="gray.300" fontSize="lg" mb={8} maxW="md" mx="auto">
        You haven't voted on any proposals yet. Connect your wallet to participate in governance.
      </Text>
      <Button 
        variant="gradient" 
        leftIcon={<FaEthereum />}
        size="lg"
        px={8}
        py={6}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(128, 90, 213, 0.4)"
        }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default EmptyVotesState; 
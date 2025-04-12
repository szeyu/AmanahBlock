import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button
} from '@chakra-ui/react';

const PastProposalsTable = ({ proposals }) => {
  return (
    <Box 
      bg="rgba(26, 32, 44, 0.5)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
    >
      <Table variant="simple">
        <Thead bg="rgba(26, 32, 44, 0.8)">
          <Tr>
            <Th color="gray.300" fontSize="md">ID</Th>
            <Th color="gray.300" fontSize="md">Title</Th>
            <Th color="gray.300" fontSize="md">Category</Th>
            <Th color="gray.300" fontSize="md">Result</Th>
            <Th color="gray.300" fontSize="md">Date</Th>
            <Th color="gray.300" fontSize="md">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal) => (
            <Tr key={proposal.id} _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}>
              <Td color="white">{proposal.id}</Td>
              <Td color="white" fontWeight="medium">{proposal.title}</Td>
              <Td>
                <Badge 
                  colorScheme="blue" 
                  borderRadius="full" 
                  px={2}
                  py={1}
                >
                  {proposal.category}
                </Badge>
              </Td>
              <Td>
                <Badge 
                  colorScheme={proposal.status === 'Passed' ? 'green' : 'red'} 
                  borderRadius="full" 
                  px={2}
                  py={1}
                >
                  {proposal.status}
                </Badge>
              </Td>
              <Td color="gray.300">{proposal.date}</Td>
              <Td>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  colorScheme="brand"
                  _hover={{
                    bg: 'rgba(128, 90, 213, 0.2)'
                  }}
                >
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PastProposalsTable; 
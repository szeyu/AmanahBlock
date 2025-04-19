import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Table, 
  Thead, 
  Tbody, 
  Th, 
  Td, 
  Badge, 
  Text, 
  Flex, 
  Select, 
  Input, 
  Button, 
  HStack, 
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tr
} from '@chakra-ui/react';
import { FaSearch, FaFileDownload, FaExternalLinkAlt } from 'react-icons/fa';

const AuditTrail = () => {
  // Mock data for transactions
  const transactions = [
    { id: '0x1a2b...3c4d', type: 'Donation', subtype: 'Waqf', amount: '100 USDT', pool: 'School Building', date: '2023-05-15', status: 'Completed' },
    { id: '0x5e6f...7g8h', type: 'Investment', subtype: 'DeFi', amount: '500 USDT', pool: 'Charity Pool', date: '2023-05-10', status: 'Active' },
    { id: '0x9i0j...1k2l', type: 'Project Funding', subtype: 'Milestone', amount: '300 USDT', pool: 'Food Bank', date: '2023-05-05', status: 'Milestone 1/3' },
    { id: '0xm3n4...5o6p', type: 'Donation', subtype: 'Zakat', amount: '250 USDT', pool: 'General', date: '2023-05-01', status: 'Completed' },
    { id: '0xq7r8...9s0t', type: 'Profit Distribution', subtype: 'Return', amount: '50 USDT', pool: 'Charity Pool', date: '2023-04-28', status: 'Completed' },
    { id: '0xu1v2...3w4x', type: 'Donation', subtype: 'Sadaqah', amount: '75 USDT', pool: 'Emergency Fund', date: '2023-04-25', status: 'Completed' },
  ];

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={6} color="white">Donation Audit Trail</Heading>
      
      <Tabs variant="soft-rounded" colorScheme="purple" mb={6}>
        <TabList>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>All Transactions</Tab>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>My Donations</Tab>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Project Milestones</Tab>
        </TabList>
      </Tabs>
      
      <Box className="card" p={6} borderRadius="md" mb={8}>
        {/* Search and Filter */}
        <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
          <Input 
            placeholder="Search by transaction ID" 
            bg="#1A1A2E" 
            borderColor="gray.600"
            flex="1"
          />
          <Select 
            placeholder="Transaction Type" 
            bg="#1A1A2E" 
            borderColor="gray.600"
            maxW={{ base: 'full', md: '200px' }}
          >
            <option value="donation">Donation</option>
            <option value="investment">Investment</option>
            <option value="funding">Project Funding</option>
            <option value="profit">Profit Distribution</option>
          </Select>
          <Select 
            placeholder="Status" 
            bg="#1A1A2E" 
            borderColor="gray.600"
            maxW={{ base: 'full', md: '200px' }}
          >
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </Select>
          <Button leftIcon={<FaSearch />} colorScheme="blue">
            Search
          </Button>
        </Flex>
        
        <Text mb={4} color="gray.300">
          Track the journey of your donations through our transparent blockchain system
        </Text>
        
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="gray.300">Transaction ID</Th>
                <Th color="gray.300">Type</Th>
                <Th color="gray.300">Amount</Th>
                <Th color="gray.300">Pool</Th>
                <Th color="gray.300">Date</Th>
                <Th color="gray.300">Status</Th>
                <Th color="gray.300">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx, idx) => (
                <Tr key={idx}>
                  <Td color="blue.300">{tx.id}</Td>
                  <Td>
                    <Text color="white">{tx.type}</Text>
                    <Text fontSize="xs" color="gray.400">{tx.subtype}</Text>
                  </Td>
                  <Td color="white">{tx.amount}</Td>
                  <Td color="white">{tx.pool}</Td>
                  <Td color="white">{tx.date}</Td>
                  <Td>
                    <Badge 
                      colorScheme={
                        tx.status === 'Completed' ? 'green' : 
                        tx.status === 'Active' ? 'blue' : 
                        tx.status.includes('Milestone') ? 'yellow' : 'purple'
                      }
                    >
                      {tx.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="xs" leftIcon={<FaExternalLinkAlt />} variant="ghost" colorScheme="blue">
                        View
                      </Button>
                      <Button size="xs" leftIcon={<FaFileDownload />} variant="ghost" colorScheme="green">
                        Export
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        <Flex justify="space-between" align="center" mt={6}>
          <Text color="gray.400">Showing 6 of 24 transactions</Text>
          <HStack spacing={2}>
            <Button size="sm" variant="outline" colorScheme="blue">Previous</Button>
            <Button size="sm" variant="solid" colorScheme="blue">1</Button>
            <Button size="sm" variant="outline" colorScheme="blue">2</Button>
            <Button size="sm" variant="outline" colorScheme="blue">3</Button>
            <Button size="sm" variant="outline" colorScheme="blue">Next</Button>
          </HStack>
        </Flex>
      </Box>
      
      <Box className="card" p={6} borderRadius="md">
        <Heading size="md" mb={4} color="white">Blockchain Verification</Heading>
        <Text color="gray.400" mb={4}>
          All transactions are permanently recorded on the blockchain for complete transparency and auditability.
        </Text>
        
        <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
          <Button leftIcon={<FaExternalLinkAlt />} colorScheme="blue" flex="1">
            View on Blockchain Explorer
          </Button>
          <Button leftIcon={<FaFileDownload />} colorScheme="green" flex="1">
            Download Transaction History
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AuditTrail; 
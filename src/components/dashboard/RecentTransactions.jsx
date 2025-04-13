import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
  Text,
} from '@chakra-ui/react';
import { 
  FaExternalLinkAlt, 
  FaWallet, 
  FaHandHoldingUsd, 
  FaMoneyBillWave,
  FaSearch
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions, handleTransactionClick }) => {
  // Define transaction type icons
  const typeIcons = {
    'waqf': FaHandHoldingUsd,
    'zakat': FaWallet,
    'sadaqah': FaMoneyBillWave,
  };

  return (
    <Box 
      p={6} 
      borderRadius="xl"
      mb={8}
      bg="rgba(13, 16, 25, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth="1px"
      borderColor="gray.700"
      position="relative"
      overflow="hidden"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
      _before={{
        content: '""',
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        bottom: "-1px",
        borderRadius: "xl",
        padding: "1px",
        background: "linear-gradient(135deg, rgba(11, 197, 234, 0.3), rgba(95, 21, 242, 0.3))",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        zIndex: 0,
      }}
    >
      <Flex 
        justify="space-between" 
        align="center" 
        mb={6}
        position="relative"
        zIndex="1"
      >
        <Heading 
          size="md" 
          color="white"
          display="flex"
          alignItems="center"
          _after={{
            content: '""',
            display: 'block',
            width: '30px',
            height: '2px',
            bgGradient: "linear(to-r, brand.500, transparent)",
            ml: 2
          }}
        >
          Recent Transactions
        </Heading>
        <Button 
          as={Link} 
          to="/transactions" 
          size="sm" 
          rightIcon={<FaExternalLinkAlt />} 
          variant="outline" 
          colorScheme="brand"
          borderRadius="full"
          _hover={{
            bg: "rgba(11, 197, 234, 0.1)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(11, 197, 234, 0.2)"
          }}
          transition="all 0.3s ease"
        >
          View All
        </Button>
      </Flex>
      
      <Box overflowX="auto" position="relative" zIndex="1">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th color="gray.400" borderColor="gray.700">TRANSACTION ID</Th>
              <Th color="gray.400" borderColor="gray.700">TYPE</Th>
              <Th color="gray.400" borderColor="gray.700">AMOUNT</Th>
              <Th color="gray.400" borderColor="gray.700">DATE</Th>
              <Th color="gray.400" borderColor="gray.700">STATUS</Th>
              <Th color="gray.400" borderColor="gray.700">ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((tx) => {
              const typeIcon = typeIcons[tx.type.toLowerCase()] || FaMoneyBillWave;
              
              return (
                <Tr 
                  key={tx.id}
                  transition="all 0.2s"
                  _hover={{
                    bg: "rgba(11, 197, 234, 0.05)",
                  }}
                >
                  <Td 
                    color="blue.300" 
                    borderColor="gray.700" 
                    fontFamily="mono"
                    fontWeight="medium"
                  >
                    {tx.id}
                  </Td>
                  <Td borderColor="gray.700">
                    <Flex align="center">
                      <Icon 
                        as={typeIcon} 
                        color="brand.400" 
                        mr={2} 
                      />
                      <Text color="gray.300">{tx.type}</Text>
                    </Flex>
                  </Td>
                  <Td color="green.400" borderColor="gray.700" fontWeight="medium">
                    {tx.amount}
                  </Td>
                  <Td color="gray.300" borderColor="gray.700">{tx.date}</Td>
                  <Td borderColor="gray.700">
                    <Badge 
                      colorScheme={tx.status.toLowerCase() === 'completed' ? 'green' : 'yellow'} 
                      borderRadius="full"
                      px={2}
                      py={1}
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      {tx.status}
                    </Badge>
                  </Td>
                  <Td borderColor="gray.700">
                    <Button 
                      size="xs" 
                      colorScheme="blue"
                      borderRadius="full"
                      leftIcon={<FaSearch size={10} />}
                      onClick={() => handleTransactionClick(tx)}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(11, 197, 234, 0.2)"
                      }}
                      transition="all 0.2s"
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RecentTransactions; 
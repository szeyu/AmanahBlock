import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Flex,
  Text,
  Icon,
  HStack,
  VStack,
  useColorModeValue,
  Tooltip,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagLeftIcon,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEthereum,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaChartLine,
  FaFileContract,
  FaTools,
  FaHandHoldingUsd,
  FaExclamationTriangle,
  FaFileAlt,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionTr = motion(Tr);

const PastProposalsTable = ({ proposals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'PROJECT FUNDING': return FaHandHoldingUsd;
      case 'PROTOCOL': return FaTools;
      case 'EMERGENCY FUNDING': return FaExclamationTriangle;
      case 'GOVERNANCE': return FaFileContract;
      default: return FaFileAlt;
    }
  };
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'PROJECT FUNDING': return '#00B5D8';
      case 'PROTOCOL': return '#805AD5';
      case 'EMERGENCY FUNDING': return '#DD6B20';
      case 'GOVERNANCE': return '#3182CE';
      default: return '#718096';
    }
  };
  
  const getStatusColor = (status) => {
    return status === 'Passed' ? 'green' : 'red';
  };
  
  const filteredProposals = proposals
    .filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           proposal.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || proposal.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || proposal.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      bg="rgba(13, 16, 31, 0.7)"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.05)"
    >
      <Table variant="simple">
        <Thead bg="rgba(0, 0, 0, 0.3)">
          <Tr>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">ID</Th>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">TITLE</Th>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">CATEGORY</Th>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">RESULT</Th>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">DATE</Th>
            <Th color="gray.400" borderColor="rgba(255, 255, 255, 0.05)">ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredProposals.map((proposal) => (
            <Tr 
              key={proposal.id}
              _hover={{ bg: "rgba(0, 224, 255, 0.05)" }}
              transition="all 0.2s"
            >
              <Td color="gray.300" borderColor="rgba(255, 255, 255, 0.05)">{proposal.id}</Td>
              <Td color="white" fontWeight="medium" borderColor="rgba(255, 255, 255, 0.05)">{proposal.title}</Td>
              <Td borderColor="rgba(255, 255, 255, 0.05)">
                <Badge 
                  bg={proposal.category === 'PROJECT FUNDING' ? 'rgba(0, 181, 216, 0.2)' : 
                      proposal.category === 'PROTOCOL' ? 'rgba(128, 90, 213, 0.2)' :
                      proposal.category === 'EMERGENCY FUNDING' ? 'rgba(221, 107, 32, 0.2)' :
                      'rgba(49, 130, 206, 0.2)'}
                  color={proposal.category === 'PROJECT FUNDING' ? '#00B5D8' : 
                         proposal.category === 'PROTOCOL' ? '#805AD5' :
                         proposal.category === 'EMERGENCY FUNDING' ? '#DD6B20' :
                         '#3182CE'}
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {proposal.category}
                </Badge>
              </Td>
              <Td borderColor="rgba(255, 255, 255, 0.05)">
                <Badge 
                  colorScheme={proposal.status === 'Passed' ? 'green' : 'red'}
                  display="flex"
                  alignItems="center"
                  width="fit-content"
                  px={2}
                  py={1}
                >
                  <Icon 
                    as={proposal.status === 'Passed' ? FaCheckCircle : FaTimesCircle} 
                    mr={1} 
                  />
                  <Text>{proposal.status}</Text>
                </Badge>
              </Td>
              <Td color="gray.300" borderColor="rgba(255, 255, 255, 0.05)">{proposal.date}</Td>
              <Td borderColor="rgba(255, 255, 255, 0.05)">
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: "#00E0FF" }}
                  rightIcon={<FaExternalLinkAlt />}
                >
                  View
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </MotionBox>
  );
};

export default PastProposalsTable; 
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Badge,
  Divider,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Flex,
  Progress
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaChartLine, FaShieldAlt, FaHandHoldingHeart, FaRegCheckCircle } from 'react-icons/fa';
import ShariahComplianceBadge from '../ShariahComplianceBadge';

const PoolDetailsModal = ({ isOpen, onClose, pool }) => {
  if (!pool) return null;
  
  // Sample data for projects funded by this pool
  const fundedProjects = [
    { name: "Yemen School Construction", amount: 25000, date: "2023-03-15", status: "Completed" },
    { name: "Bangladesh Flood Relief", amount: 18000, date: "2023-04-22", status: "Active" },
    { name: "Somalia Water Wells", amount: 12000, date: "2023-05-10", status: "Active" },
  ];
  
  // Sample performance data
  const performanceData = [
    { period: "Q1 2023", return: "5.2%", benchmark: "4.1%" },
    { period: "Q2 2023", return: "4.8%", benchmark: "3.9%" },
    { period: "Q3 2023", return: "6.1%", benchmark: "4.5%" },
  ];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
          {pool.name} Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList mb={4}>
              <Tab>Overview</Tab>
              <Tab>Performance</Tab>
              <Tab>Funded Projects</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text color="gray.400" mb={1}>Investment Pool</Text>
                    <Heading size="md" color="white">{pool.name}</Heading>
                    <HStack mt={2}>
                      <ShariahComplianceBadge level={pool.shariahStatus} showDetails={false} />
                      <Badge colorScheme="blue" borderRadius="full" px={2}>
                        {pool.riskLevel} Risk
                      </Badge>
                      <Badge colorScheme="green" borderRadius="full" px={2}>
                        {pool.expectedReturn}% Return
                      </Badge>
                    </HStack>
                  </Box>
                  
                  <Text color="gray.300">
                    {pool.description} This pool follows strict Shariah guidelines and is regularly audited by our board of Islamic scholars.
                  </Text>
                  
                  <Divider borderColor="gray.700" />
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel color="gray.400">Total Value Locked</StatLabel>
                      <StatNumber color="white">${(pool.tvl/1000000).toFixed(2)}M</StatNumber>
                      <StatHelpText color="green.400">
                        From {pool.investors} donations
                      </StatHelpText>
                    </Stat>
                    
                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel color="gray.400">Annual Return</StatLabel>
                      <StatNumber color="green.400">{pool.expectedReturn}%</StatNumber>
                      <StatHelpText color="white">
                        Reinvested in charity
                      </StatHelpText>
                    </Stat>
                  </Grid>
                  
                  <Divider borderColor="gray.700" />
                  
                  <Box>
                    <Heading size="sm" mb={3} color="white">Fund Allocation</Heading>
                    <VStack align="stretch" spacing={3}>
                      {pool.assetAllocation.map((asset, idx) => (
                        <Box key={idx}>
                          <Flex justify="space-between" mb={1}>
                            <Text color="white">{asset.name}</Text>
                            <Text color="white" fontWeight="bold">{asset.percentage}%</Text>
                          </Flex>
                          <Progress 
                            value={asset.percentage} 
                            size="sm" 
                            colorScheme={
                              idx === 0 ? "purple" : 
                              idx === 1 ? "blue" : 
                              idx === 2 ? "green" : 
                              "orange"
                            } 
                            borderRadius="full" 
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                  
                  <Divider borderColor="gray.700" />
                  
                  <Box>
                    <Heading size="sm" mb={3} color="white">Shariah Compliance</Heading>
                    <VStack align="stretch" spacing={3} bg="gray.700" p={4} borderRadius="md">
                      <HStack>
                        <Icon as={FaShieldAlt} color="brand.500" />
                        <Text color="white">Fully Shariah-compliant investment strategy</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaRegCheckCircle} color="green.500" />
                        <Text color="white">No interest-based (riba) transactions</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaHandHoldingHeart} color="purple.500" />
                        <Text color="white">Ethical investments only</Text>
                      </HStack>
                      
                      <Divider borderColor="gray.600" />
                      
                      <Text color="gray.300" fontSize="sm">Approved by:</Text>
                      <VStack align="stretch" spacing={1}>
                        {pool.scholars.map((scholar, idx) => (
                          <Text key={idx} color="white" fontSize="sm">• {scholar}</Text>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
              
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" color="white" mb={2}>Performance History</Heading>
                  <Text color="gray.300" mb={4}>
                    Historical returns of this investment pool compared to benchmark indices.
                  </Text>
                  
                  <Box bg="gray.700" p={4} borderRadius="md" mb={4}>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th color="gray.400">Period</Th>
                          <Th color="gray.400" isNumeric>Return</Th>
                          <Th color="gray.400" isNumeric>Benchmark</Th>
                          <Th color="gray.400">Performance</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {performanceData.map((period, idx) => (
                          <Tr key={idx}>
                            <Td color="white">{period.period}</Td>
                            <Td color="green.400" isNumeric>{period.return}</Td>
                            <Td color="gray.300" isNumeric>{period.benchmark}</Td>
                            <Td>
                              <Badge 
                                colorScheme={parseFloat(period.return) > parseFloat(period.benchmark) ? "green" : "red"}
                              >
                                {parseFloat(period.return) > parseFloat(period.benchmark) ? "Outperforming" : "Underperforming"}
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                  
                  <Box bg="gray.700" p={4} borderRadius="md">
                    <Heading size="sm" color="white" mb={4}>Key Performance Indicators</Heading>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <Stat>
                        <StatLabel color="gray.400">Annualized Return</StatLabel>
                        <StatNumber color="green.400">{pool.expectedReturn}%</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel color="gray.400">Volatility</StatLabel>
                        <StatNumber color="white">Low</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel color="gray.400">Sharpe Ratio</StatLabel>
                        <StatNumber color="white">1.8</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel color="gray.400">Max Drawdown</StatLabel>
                        <StatNumber color="white">-3.2%</StatNumber>
                      </Stat>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>
              
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Heading size="md" color="white" mb={2}>Projects Funded</Heading>
                  <Text color="gray.300" mb={4}>
                    Charitable projects that have received funding from returns generated by this investment pool.
                  </Text>
                  
                  <Box bg="gray.700" p={4} borderRadius="md">
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th color="gray.400">Project Name</Th>
                          <Th color="gray.400" isNumeric>Amount</Th>
                          <Th color="gray.400">Date</Th>
                          <Th color="gray.400">Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {fundedProjects.map((project, idx) => (
                          <Tr key={idx}>
                            <Td color="white">{project.name}</Td>
                            <Td color="white" isNumeric>${project.amount.toLocaleString()}</Td>
                            <Td color="gray.300">{new Date(project.date).toLocaleDateString()}</Td>
                            <Td>
                              <Badge 
                                colorScheme={project.status === "Completed" ? "green" : "blue"}
                              >
                                {project.status}
                              </Badge>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                  
                  <Box bg="gray.700" p={4} borderRadius="md">
                    <Flex justify="space-between" align="center">
                      <Heading size="sm" color="white">Total Impact</Heading>
                      <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                        ${(55000).toLocaleString()} Distributed
                      </Badge>
                    </Flex>
                    <Text color="gray.300" mt={2}>
                      Returns from this pool have funded 3 major charitable projects, helping approximately 2,500 people.
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="gray.700">
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="gradient" 
            leftIcon={<FaExternalLinkAlt />}
            as="a"
            href="/donate"
          >
            Donate to This Fund
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PoolDetailsModal; 
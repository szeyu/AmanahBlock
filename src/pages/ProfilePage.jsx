import React from 'react';
import { Box, Heading, Text, VStack, HStack, Avatar, Flex, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Grid, Badge, Progress, Divider, Icon } from '@chakra-ui/react';
import { FaEdit, FaCog, FaWallet, FaHistory, FaRegClock, FaRegCheckCircle, FaRegStar } from 'react-icons/fa';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: 'Ahmed Abdullah',
    email: 'ahmed@example.com',
    joinDate: 'May 2023',
    totalDonated: 2450,
    donationCount: 12,
    impactScore: 78,
    badges: ['Early Supporter', 'Monthly Donor', 'Zakat Contributor']
  };

  // Mock donation history
  const donationHistory = [
    { id: '0x1a2b...3c4d', type: 'Waqf', amount: '500 USDT', date: '2023-05-15', status: 'Completed' },
    { id: '0x5e6f...7g8h', type: 'Zakat', amount: '1200 USDT', date: '2023-05-10', status: 'Completed' },
    { id: '0x9i0j...1k2l', type: 'Sadaqah', amount: '300 USDT', date: '2023-05-05', status: 'Completed' },
  ];

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Profile Sidebar */}
        <Box w={{ base: 'full', md: '300px' }}>
          <Box className="card" p={6} borderRadius="md">
            <VStack spacing={4} align="center">
              <Avatar size="xl" name={user.name} bg="accent.500" />
              <Box textAlign="center">
                <Heading size="md" color="white">{user.name}</Heading>
                <Text color="gray.400">{user.email}</Text>
                <Text fontSize="sm" color="gray.500">Member since {user.joinDate}</Text>
              </Box>
              
              <Button leftIcon={<FaEdit />} variant="outline" size="sm" w="full" borderColor="gray.600" color="white">
                Edit Profile
              </Button>
              
              <Button leftIcon={<FaCog />} variant="outline" size="sm" w="full" borderColor="gray.600" color="white">
                Account Settings
              </Button>
              
              <Button leftIcon={<FaWallet />} variant="outline" size="sm" w="full" borderColor="gray.600" color="white">
                Connect Wallet
              </Button>
            </VStack>
            
            <Divider my={6} borderColor="gray.700" />
            
            <VStack spacing={4} align="stretch">
              <Heading size="sm" color="white">Donation Stats</Heading>
              
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" color="gray.400">Total Donated</Text>
                  <Text fontSize="sm" color="white">{user.totalDonated} USDT</Text>
                </Flex>
                <Progress value={70} size="xs" colorScheme="green" borderRadius="full" />
              </Box>
              
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" color="gray.400">Donation Count</Text>
                  <Text fontSize="sm" color="white">{user.donationCount}</Text>
                </Flex>
                <Progress value={60} size="xs" colorScheme="blue" borderRadius="full" />
              </Box>
              
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" color="gray.400">Impact Score</Text>
                  <Text fontSize="sm" color="white">{user.impactScore}/100</Text>
                </Flex>
                <Progress value={user.impactScore} size="xs" colorScheme="purple" borderRadius="full" />
              </Box>
            </VStack>
            
            <Divider my={6} borderColor="gray.700" />
            
            <VStack spacing={4} align="stretch">
              <Heading size="sm" color="white">Badges</Heading>
              <Flex wrap="wrap" gap={2}>
                {user.badges.map((badge, idx) => (
                  <Badge key={idx} colorScheme="purple" p={2} borderRadius="md">
                    {badge}
                  </Badge>
                ))}
              </Flex>
            </VStack>
          </Box>
        </Box>
        
        {/* Main Content */}
        <Box flex="1">
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList mb={6}>
              <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Overview</Tab>
              <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Donation History</Tab>
              <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Impact</Tab>
              <Tab color="gray.300" _selected={{ color: 'white', bg: 'purple.500' }}>Preferences</Tab>
            </TabList>
            
            <TabPanels>
              {/* Overview Tab */}
              <TabPanel p={0}>
                <Box className="card" p={6} mb={6}>
                  <Heading size="md" mb={4} color="white">Your Donation Summary</Heading>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <Box bg="rgba(72, 187, 120, 0.1)" p={4} borderRadius="md">
                      <HStack spacing={4}>
                        <Icon as={FaHistory} boxSize={10} color="green.500" />
                        <Box>
                          <Text color="gray.400">Total Donated</Text>
                          <Text color="white" fontSize="2xl" fontWeight="bold">{user.totalDonated} USDT</Text>
                        </Box>
                      </HStack>
                    </Box>
                    
                    <Box bg="rgba(66, 153, 225, 0.1)" p={4} borderRadius="md">
                      <HStack spacing={4}>
                        <Icon as={FaRegClock} boxSize={10} color="blue.500" />
                        <Box>
                          <Text color="gray.400">Donation Count</Text>
                          <Text color="white" fontSize="2xl" fontWeight="bold">{user.donationCount}</Text>
                        </Box>
                      </HStack>
                    </Box>
                    
                    <Box bg="rgba(128, 90, 213, 0.1)" p={4} borderRadius="md">
                      <HStack spacing={4}>
                        <Icon as={FaRegStar} boxSize={10} color="purple.500" />
                        <Box>
                          <Text color="gray.400">Impact Score</Text>
                          <Text color="white" fontSize="2xl" fontWeight="bold">{user.impactScore}/100</Text>
                        </Box>
                      </HStack>
                    </Box>
                  </Grid>
                </Box>
                
                <Box className="card" p={6}>
                  <Heading size="md" mb={4} color="white">Recent Donations</Heading>
                  <VStack spacing={4} align="stretch">
                    {donationHistory.map((donation, idx) => (
                      <Box key={idx} p={4} borderRadius="md" bg="rgba(26, 32, 44, 0.4)">
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text color="white" fontWeight="medium">{donation.type} Donation</Text>
                            <Text color="gray.400" fontSize="sm">{donation.date}</Text>
                          </Box>
                          <Box textAlign="right">
                            <Text color="white" fontWeight="bold">{donation.amount}</Text>
                            <Badge colorScheme="green">{donation.status}</Badge>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                  
                  <Button as="a" href="/audit-trail" variant="outline" mt={6} w="full" borderColor="gray.600" color="white">
                    View All Donations
                  </Button>
                </Box>
              </TabPanel>
              
              {/* Other tabs would be implemented similarly */}
              <TabPanel p={0}>
                <Box className="card" p={6}>
                  <Heading size="md" mb={4} color="white">Donation History</Heading>
                  <Text color="gray.400">Your complete donation history will be displayed here.</Text>
                </Box>
              </TabPanel>
              
              <TabPanel p={0}>
                <Box className="card" p={6}>
                  <Heading size="md" mb={4} color="white">Your Impact</Heading>
                  <Text color="gray.400">Detailed information about the impact of your donations will be displayed here.</Text>
                </Box>
              </TabPanel>
              
              <TabPanel p={0}>
                <Box className="card" p={6}>
                  <Heading size="md" mb={4} color="white">Donation Preferences</Heading>
                  <Text color="gray.400">Your donation preferences and settings will be displayed here.</Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfilePage; 
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  VStack,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Link as ChakraLink,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaRegCheckCircle, 
  FaHandHoldingUsd,
  FaExternalLinkAlt,
  FaChartLine,
  FaMoneyBillWave,
  FaPercentage
} from 'react-icons/fa';

const ShariahComplianceSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  // Sample data for Shariah-compliant platforms
  const compliancePlatforms = [
    { 
      name: "Firoza Finance", 
      offering: "Nine investment pools with up to 20% APY", 
      mechanism: "Uses Mudarabah (profit-sharing), invests in halal assets",
      description: "Launched in November 2024, Firoza Finance offers nine different investment pools with APYs up to 20%. The platform uses the Mudarabah principle, where investors provide capital, and Firoza manages investments in low-risk commodities, balanced portfolios, and high-reward sectors.",
      earnings: "Profits are shared with investors based on pre-agreed ratios, with no guaranteed returns. This aligns with Islamic finance by avoiding interest and sharing both profits and risks.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
    },
    { 
      name: "IslamicCoin (HAQQ)", 
      offering: "Interest-free investments, halal trading", 
      mechanism: "Operates on ethics-first blockchain, avoids riba",
      description: "IslamicCoin is the native currency of the HAQQ Network, facilitating Shariah-compliant DeFi products like interest-free investments and halal trading. The platform includes a peer-to-peer lending platform and a Shariah-compliant liquidity platform.",
      earnings: "The platform earns through transaction fees, staking rewards, and other DeFi activities. They offer products like Deenar Gold (DEEN), a halal stablecoin pegged to gold.",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2069"
    },
    { 
      name: "Biokript", 
      offering: "Shariah-compliant liquidity mining with APYs up to 300%", 
      mechanism: "Vets tokens, ensures returns are percentage-based, not fixed",
      description: "Biokript's Shariah-compliant liquidity mining involves liquidity providers locking up cryptocurrency assets in pools to facilitate trades. The platform offers APYs of 60% for 3 months, 140% for 6 months, and 300% for 12 months lock-up periods.",
      earnings: "Liquidity providers earn rewards from trading fees. Tokens are vetted to exclude unethical industries, and returns are structured as a percentage share of pool earnings, not fixed amounts.",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070"
    },
    { 
      name: "HAQQ Network", 
      offering: "Lending, liquidity platforms, Zakat management", 
      mechanism: "Peer-to-peer lending without interest, profit-loss sharing",
      description: "HAQQ Network supports multiple DeFi applications, including lending and borrowing without interest, liquidity provision based on profit-and-loss sharing, and charity management (Zakat and Waqf) through blockchain-powered DApps.",
      earnings: "Earnings come from fees for services, with lending platforms using peer-to-peer mechanisms and liquidity pools operating on Mudarabah principles. They offer FairShare for transparent charity donations.",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2070"
    },
    { 
      name: "Halal DeFi", 
      offering: "Venture fund for Web3 projects targeting 22% IRR", 
      mechanism: "Invests in halal blockchain projects, no riba",
      description: "As a micro venture fund, Halal DeFi invests in early-stage blockchain and DeFi projects, ensuring all investments align with Islamic finance principles. They aim for a target Internal Rate of Return (IRR) of 22% through disciplined project selection.",
      earnings: "Returns come from equity investments in high-growth Web3 projects. They strictly avoid riba, gambling, and other non-permissible activities while providing access to opportunities typically reserved for institutional investors.",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=2067"
    }
  ];

  return (
    <Box 
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={10}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="md" color="white" mb={1}>Shariah Compliance Framework</Heading>
          <Text color="gray.400">Our investment pools adhere to strict Islamic finance principles</Text>
        </Box>
        <Button 
          leftIcon={<FaShieldAlt />} 
          variant="outline"
          as={Link}
          // to="/learn/shariah-finance"
        >
          Learn More
        </Button>
      </Flex>
      
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
        <VStack align="flex-start" spacing={3}>
          <Flex 
            w="50px" 
            h="50px" 
            bg="rgba(128, 90, 213, 0.2)" 
            borderRadius="lg"
            justify="center"
            align="center"
            mb={2}
          >
            <Icon as={FaRegCheckCircle} color="accent.500" boxSize={6} />
          </Flex>
          <Heading size="sm" color="white">No Riba (Interest)</Heading>
          <Text color="gray.400" fontSize="sm">
            All returns are generated through profit-sharing (Mudarabah) or asset-backed investments (Sukuk), never through interest.
          </Text>
        </VStack>
        
        <VStack align="flex-start" spacing={3}>
          <Flex 
            w="50px" 
            h="50px" 
            bg="rgba(11, 197, 234, 0.2)" 
            borderRadius="lg"
            justify="center"
            align="center"
            mb={2}
          >
            <Icon as={FaShieldAlt} color="brand.500" boxSize={6} />
          </Flex>
          <Heading size="sm" color="white">Scholar Oversight</Heading>
          <Text color="gray.400" fontSize="sm">
            Every investment pool is reviewed and approved by our board of Islamic scholars to ensure Shariah compliance.
          </Text>
        </VStack>
        
        <VStack align="flex-start" spacing={3}>
          <Flex 
            w="50px" 
            h="50px" 
            bg="rgba(72, 187, 120, 0.2)" 
            borderRadius="lg"
            justify="center"
            align="center"
            mb={2}
          >
            <Icon as={FaHandHoldingUsd} color="green.500" boxSize={6} />
          </Flex>
          <Heading size="sm" color="white">Ethical Investments</Heading>
          <Text color="gray.400" fontSize="sm">
            Funds are only invested in projects that benefit humanity and avoid prohibited industries (haram).
          </Text>
        </VStack>
      </Grid>
      
      <Box mt={10}>
        <Heading size="md" color="white" mb={6}>Examples of Shariah-Compliant DeFi Platforms</Heading>
        
        <Text color="gray.300" mb={6}>
          AmanahBlock partners with leading Shariah-compliant DeFi platforms to maximize returns while maintaining strict adherence to Islamic principles. Below are some examples of platforms in this growing ecosystem:
        </Text>
        
        <Tabs 
          variant="soft-rounded" 
          colorScheme="brand" 
          onChange={(index) => setTabIndex(index)}
          mb={8}
        >
          <TabList mb={6} overflowX="auto" py={2} css={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
            }
          }}>
            {compliancePlatforms.map((platform, idx) => (
              <Tab 
                key={idx}
                _selected={{ 
                  color: 'white', 
                  bg: 'rgba(0, 224, 255, 0.2)',
                  borderColor: 'brand.500'
                }}
                color="gray.400"
                borderWidth="1px"
                borderColor="transparent"
                mr={2}
                minW="max-content"
              >
                {platform.name}
              </Tab>
            ))}
          </TabList>
          
          <TabPanels>
            {compliancePlatforms.map((platform, idx) => (
              <TabPanel key={idx} p={0}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                  <Box>
                    <Image 
                      src={platform.image} 
                      alt={platform.name} 
                      borderRadius="lg" 
                      w="full" 
                      h="250px" 
                      objectFit="cover"
                      mb={4}
                    />
                    
                    <HStack spacing={4} mb={4}>
                      <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                        Shariah-Compliant
                      </Badge>
                      <Badge colorScheme="blue" px={2} py={1} borderRadius="full">
                        DeFi Platform
                      </Badge>
                    </HStack>
                  </Box>
                  
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" color="white">{platform.name}</Heading>
                    
                    <Box>
                      <Text color="gray.400" fontSize="sm" mb={1}>Primary Offering</Text>
                      <Text color="white">{platform.offering}</Text>
                    </Box>
                    
                    <Box>
                      <Text color="gray.400" fontSize="sm" mb={1}>Description</Text>
                      <Text color="gray.300">{platform.description}</Text>
                    </Box>
                    
                    <Box>
                      <Flex align="center" mb={1}>
                        <Icon as={FaMoneyBillWave} color="green.400" mr={2} />
                        <Text color="gray.400" fontSize="sm">How They Earn Money</Text>
                      </Flex>
                      <Text color="gray.300">{platform.earnings}</Text>
                    </Box>
                    
                    <Box>
                      <Flex align="center" mb={1}>
                        <Icon as={FaShieldAlt} color="brand.500" mr={2} />
                        <Text color="gray.400" fontSize="sm">Compliance Mechanism</Text>
                      </Flex>
                      <Text color="gray.300">{platform.mechanism}</Text>
                    </Box>
                  </VStack>
                </Grid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        
        <Box bg="rgba(0, 224, 255, 0.05)" p={4} borderRadius="md" borderWidth="1px" borderColor="rgba(0, 224, 255, 0.2)">
          <Text color="gray.300" fontSize="sm">
            Note: AmanahBlock showcases these platforms for informational purposes. We carefully vet our investment partners to ensure they meet our strict Shariah compliance standards. The returns shown are based on historical data and are not guaranteed for future performance.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ShariahComplianceSection; 
import React, { useState } from 'react';
import {
  Box, 
  Heading, 
  Text, 
  Grid, 
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  VStack
} from '@chakra-ui/react';

// Import components
import DefiStats from '../components/islamicDefi/DefiStats';
import InvestmentPoolCard from '../components/islamicDefi/InvestmentPoolCard';
import ShariahComplianceSection from '../components/islamicDefi/ShariahComplianceSection';
import PoolDetailsModal from '../components/islamicDefi/PoolDetailsModal';

// Import data
import { defiStats, investmentPools } from '../data/islamicDefiData';

const IslamicDefiPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePool, setActivePool] = useState(null);
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  
  const handleViewPoolDetails = (pool) => {
    setActivePool(pool);
    onOpen();
  };
  
  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <Heading mb={2} color="white" size="xl">Islamic DeFi Dashboard</Heading>
      <Text color="gray.400" mb={6}>Tracking returns from Shariah-compliant investment pools funded by donations</Text>
      
      {showInfoAlert && (
        <Alert 
          status="info" 
          variant="subtle" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          textAlign="center" 
          borderRadius="lg"
          bg="rgba(66, 153, 225, 0.15)"
          borderWidth="1px"
          borderColor="blue.600"
          mb={8}
          p={4}
        >
          <AlertIcon color="blue.400" boxSize="6" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg" color="white">
            How AmanahBlock Grows Your Donations
          </AlertTitle>
          <AlertDescription maxWidth="md" color="gray.300">
            90% of all donations are allocated to these Shariah-compliant investment pools. 
            The returns generated are used to fund additional charitable projects, maximizing the impact of your contribution.
          </AlertDescription>
          <CloseButton 
            position="absolute" 
            right="8px" 
            top="8px" 
            onClick={() => setShowInfoAlert(false)} 
          />
        </Alert>
      )}
      
      {/* DeFi Stats */}
      <DefiStats stats={defiStats} />
      
      {/* Investment Pools */}
      <Heading size="md" color="white" mb={4}>Shariah-Compliant Investment Pools</Heading>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6} mb={10}>
        {investmentPools.map((pool) => (
          <InvestmentPoolCard 
            key={pool.id} 
            pool={pool} 
            onViewDetails={handleViewPoolDetails} 
          />
        ))}
      </Grid>
      
      {/* Shariah Compliance Section */}
      <ShariahComplianceSection />
      
      {/* Pool Details Modal */}
      <PoolDetailsModal 
        isOpen={isOpen} 
        onClose={onClose} 
        pool={activePool}
      />
    </Box>
  );
};

export default IslamicDefiPage; 
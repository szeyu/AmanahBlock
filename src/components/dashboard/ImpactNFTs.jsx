import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Image,
  Text,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaReceipt, FaCertificate } from 'react-icons/fa';

const ImpactNFTs = ({ nftCollection, handleNftClick, onOpenReceiptModal }) => {
  // Define rarity styles
  const rarityStyles = {
    'Platinum': {
      color: 'purple.500',
      bgGradient: 'linear(to-r, purple.500, pink.500)',
      glow: '0 0 15px rgba(159, 122, 234, 0.7)',
    },
    'Gold': {
      color: 'yellow.500',
      bgGradient: 'linear(to-r, yellow.500, orange.500)',
      glow: '0 0 15px rgba(236, 201, 75, 0.7)',
    },
    'Bronze': {
      color: 'orange.700',
      bgGradient: 'linear(to-r, orange.700, orange.900)',
      glow: '0 0 15px rgba(192, 86, 33, 0.7)',
    },
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
        background: "linear-gradient(135deg, rgba(159, 122, 234, 0.3), rgba(236, 110, 76, 0.3))",
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
            bgGradient: "linear(to-r, purple.500, transparent)",
            ml: 2
          }}
        >
          Impact NFTs
        </Heading>
        <Button 
          onClick={onOpenReceiptModal}
          size="sm" 
          rightIcon={<FaReceipt />} 
          variant="outline" 
          colorScheme="purple"
          borderRadius="full"
          _hover={{
            bg: "rgba(159, 122, 234, 0.1)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(159, 122, 234, 0.2)"
          }}
          transition="all 0.3s ease"
        >
          View Receipt
        </Button>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} position="relative" zIndex="1">
        {nftCollection.map((nft) => {
          const rarity = rarityStyles[nft.rarity] || rarityStyles.Bronze;
          
          return (
            <Box 
              key={nft.id}
              bg="rgba(26, 32, 44, 0.6)"
              borderRadius="xl"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.3s ease"
              position="relative"
              borderWidth="1px"
              borderColor="gray.700"
              _hover={{ 
                transform: "translateY(-8px) scale(1.02)", 
                boxShadow: rarity.glow,
                borderColor: rarity.color,
              }}
              onClick={() => handleNftClick(nft)}
            >
              <Box position="relative">
                <Image 
                  src={nft.image} 
                  alt={nft.name} 
                  w="100%" 
                  h="210px" 
                  objectFit="cover" 
                />
                <Badge 
                  position="absolute" 
                  top={3} 
                  right={3} 
                  px={3}
                  py={1}
                  borderRadius="full"
                  bgGradient={rarity.bgGradient}
                  color="white"
                  fontWeight="bold"
                  boxShadow={rarity.glow}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaCertificate} mr={1} boxSize={3} />
                  {nft.rarity}
                </Badge>
              </Box>
              <Box p={4}>
                <Heading 
                  size="sm" 
                  color="white" 
                  mb={2}
                  bgGradient={rarity.bgGradient}
                  bgClip="text"
                >
                  {nft.name}
                </Heading>
                <Text color="gray.400" fontSize="sm">{nft.type}</Text>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      
    </Box>
  );
};

export default ImpactNFTs; 
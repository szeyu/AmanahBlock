import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Text,
  Image,
  Grid,
  Divider,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const NFTModal = ({ isOpen, onClose, selectedNft }) => {
  if (!selectedNft) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white" borderRadius="xl">
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box display={{ md: "flex" }}>
            <Box 
              position="relative" 
              h="300px" 
              className="nft-animation"
            >
              <Image 
                src={selectedNft.image} 
                alt={selectedNft.name}
                w="100%"
                h="100%"
                objectFit="cover"
              />
              <Box 
                position="absolute" 
                bottom="0" 
                left="0" 
                right="0" 
                bg="rgba(0,0,0,0.7)" 
                p={4}
                backdropFilter="blur(5px)"
              >
                <Heading size="md" color="white">{selectedNft.name}</Heading>
                <Text color="gray.300" fontSize="sm">Impact Certificate</Text>
              </Box>
            </Box>
            <Box p={6}>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">Type</Text>
                  <Text color="white" fontWeight="bold">{selectedNft.type}</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Rarity</Text>
                  <Text color="white" fontWeight="bold">{selectedNft.rarity}</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Issue Date</Text>
                  <Text color="white">{selectedNft.issueDate}</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Token ID</Text>
                  <Text color="white">#{selectedNft.id.toString().padStart(4, '0')}</Text>
                </Box>
              </Grid>
              
              <Divider my={4} borderColor="gray.700" />
              
              <Text color="gray.300" fontSize="sm" mb={4}>
                This NFT represents your contribution to a real-world impact project. 
                It's a permanent record on the blockchain of your support.
              </Text>
              
              <Flex justify="space-between">
                <Button 
                  leftIcon={<FaExternalLinkAlt />} 
                  colorScheme="purple" 
                  variant="outline" 
                  size="sm"
                >
                  View on Explorer
                </Button>
                <Button 
                  colorScheme="brand" 
                  size="sm"
                  onClick={onClose}
                >
                  Close
                </Button>
              </Flex>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal; 
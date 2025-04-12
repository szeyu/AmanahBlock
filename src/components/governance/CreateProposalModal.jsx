import React, { useState } from 'react';
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Icon
} from '@chakra-ui/react';
import { FaFileAlt } from 'react-icons/fa';

const CreateProposalModal = ({ isOpen, onClose }) => {
  const [proposalType, setProposalType] = useState('project');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag) && tag) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white" borderRadius="xl">
        <ModalHeader 
          borderBottomWidth="1px" 
          borderColor="gray.700"
          py={6}
          fontSize="xl"
        >
          Create New Proposal
        </ModalHeader>
        <ModalCloseButton size="lg" mt={2} />
        <ModalBody py={8}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Proposal Title</FormLabel>
              <Input placeholder="Enter a clear, descriptive title" />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Proposal Type</FormLabel>
              <Select 
                value={proposalType} 
                onChange={(e) => setProposalType(e.target.value)}
              >
                <option value="project">Project Funding</option>
                <option value="protocol">Protocol Change</option>
                <option value="governance">Governance Change</option>
                <option value="treasury">Treasury Allocation</option>
              </Select>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea 
                placeholder="Provide a detailed description of your proposal" 
                minH="150px"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Flex wrap="wrap" gap={2} mb={2}>
                {selectedTags.map((tag, index) => (
                  <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="purple">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                  </Tag>
                ))}
              </Flex>
              <Select 
                placeholder="Select tags" 
                onChange={(e) => handleAddTag(e.target.value)}
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Water">Water</option>
                <option value="Food">Food</option>
                <option value="Emergency">Emergency</option>
                <option value="Governance">Governance</option>
                <option value="DeFi">DeFi</option>
                <option value="Sustainability">Sustainability</option>
              </Select>
            </FormControl>
            
            {proposalType === 'project' && (
              <>
                <FormControl isRequired>
                  <FormLabel>Requested Amount (USDT)</FormLabel>
                  <Input type="number" placeholder="Enter amount" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Project Timeline (days)</FormLabel>
                  <Input type="number" placeholder="Enter number of days" />
                </FormControl>
              </>
            )}
            
            <FormControl>
              <FormLabel>Additional Documentation</FormLabel>
              <Input type="file" pt={1} />
              <Text fontSize="sm" color="gray.400" mt={1}>
                Upload any supporting documents (PDF, max 10MB)
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter 
          borderTopWidth="1px" 
          borderColor="gray.700"
          py={6}
        >
          <Button 
            variant="outline" 
            mr={4} 
            onClick={onClose}
            size="lg"
          >
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            leftIcon={<FaFileAlt />}
            size="lg"
          >
            Submit Proposal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProposalModal; 
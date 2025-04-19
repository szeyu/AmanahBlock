import React from 'react';
import { 
  Flex, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Select, 
  Button, 
  Icon, 
  Tag, 
  TagLabel, 
  TagCloseButton 
} from '@chakra-ui/react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ProjectFilters = ({ filters, setFilters, addFilter, removeFilter }) => {
  return (
    <>
      {/* Search and Filter */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search projects" />
        </InputGroup>
        
        <Select 
          placeholder="Category" 
          maxW={{ base: 'full', md: '200px' }} 
          onChange={(e) => addFilter(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          _hover={{ borderColor: "brand.500" }}
          sx={{
            option: {
              bg: "gray.700",
              color: "white"
            },
          }}
        >
          <option value="Education">Education</option>
          <option value="Disaster">Disaster Relief</option>
          <option value="Food">Food & Nutrition</option>
          <option value="Water">Water & Sanitation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Children">Children & Orphans</option>
        </Select>
        
        <Select 
          placeholder="Location" 
          maxW={{ base: 'full', md: '200px' }} 
          onChange={(e) => addFilter(e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          _hover={{ borderColor: "brand.500" }}
          sx={{
            option: {
              bg: "gray.700",
              color: "white"
            },
          }}
        >
          <option value="Yemen">Yemen</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Egypt">Egypt</option>
          <option value="Somalia">Somalia</option>
          <option value="Jordan">Jordan</option>
          <option value="Pakistan">Pakistan</option>
        </Select>
        
        <Button leftIcon={<FaFilter />} colorScheme="purple" variant="outline">
          More Filters
        </Button>
      </Flex>
      
      {/* Active Filters */}
      {filters.length > 0 && (
        <Flex wrap="wrap" gap={2} mb={6}>
          {filters.map((filter, index) => (
            <Tag key={index} size="md" borderRadius="full" variant="subtle" colorScheme="purple">
              <TagLabel>{filter}</TagLabel>
              <TagCloseButton onClick={() => removeFilter(filter)} />
            </Tag>
          ))}
          <Button size="sm" variant="link" color="gray.400" onClick={() => setFilters([])}>
            Clear All
          </Button>
        </Flex>
      )}
    </>
  );
};

export default ProjectFilters; 
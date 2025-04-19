import React from 'react';
import { Box, Flex, Select } from '@chakra-ui/react';

const ProjectFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box 
      bg="rgba(26, 32, 44, 0.4)"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={4}
      mb={6}
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.05)"
    >
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Select 
          placeholder="Filter by Category" 
          value={filters.category || ""}
          onChange={(e) => handleFilterChange('category', e.target.value)}
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
          <option value="Healthcare">Healthcare</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Water">Water</option>
          <option value="Food Security">Food Security</option>
        </Select>
        
        <Select 
          placeholder="Filter by Status" 
          value={filters.status || ""}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          _hover={{ borderColor: "brand.500" }}
          sx={{
            option: {
              bg: "gray.700",
              color: "white"
            }
          }}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed">Delayed</option>
          <option value="Failed">Failed</option>
        </Select>
        
        <Select 
          placeholder="Sort by" 
          value={filters.sortBy || ""}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          _hover={{ borderColor: "brand.500" }}
          sx={{
            option: {
              bg: "gray.700",
              color: "white"
            }
          }}
        >
          <option value="progress">Progress</option>
          <option value="deadline">Deadline</option>
          <option value="amount">Amount</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default ProjectFilters; 
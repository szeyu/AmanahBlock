import React from 'react';
import {
  Badge,
  Tooltip,
  HStack,
  Text,
  Icon,
  Box,
  Flex,
  Avatar,
  AvatarGroup
} from '@chakra-ui/react';
import { FaCheckCircle, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa';

const ShariahComplianceBadge = ({ level, scholars = [], showDetails = false }) => {
  let color, icon, text;
  
  switch (level) {
    case 'Fully Compliant':
      color = 'green';
      icon = FaCheckCircle;
      text = 'Fully Compliant';
      break;
    case 'Under Review':
      color = 'orange';
      icon = FaExclamationTriangle;
      text = 'Under Review';
      break;
    case 'Non-Compliant':
      color = 'red';
      icon = FaExclamationTriangle;
      text = 'Non-Compliant';
      break;
    default:
      color = 'gray';
      icon = FaQuestionCircle;
      text = 'Pending Review';
  }
  
  if (!showDetails) {
    return (
      <Badge 
        colorScheme={color} 
        borderRadius="full" 
        px={3}
        py={1}
        display="flex"
        alignItems="center"
      >
        <Icon as={icon} mr={1} />
        <Text>{text}</Text>
      </Badge>
    );
  }
  
  return (
    <Tooltip
      hasArrow
      label={
        <Box p={2}>
          <Text fontWeight="bold" mb={2}>Shariah Review Status</Text>
          <Text mb={2}>This proposal has been reviewed by {scholars.length} scholars.</Text>
          {scholars.map((scholar, index) => (
            <Text key={index} fontSize="sm">{scholar}</Text>
          ))}
        </Box>
      }
      bg="gray.800"
      color="white"
      borderRadius="md"
      placement="top"
    >
      <Badge 
        colorScheme={color} 
        borderRadius="full" 
        px={3}
        py={1}
        display="flex"
        alignItems="center"
        cursor="pointer"
      >
        <Icon as={icon} mr={1} />
        <Text>{text}</Text>
      </Badge>
    </Tooltip>
  );
};

export default ShariahComplianceBadge; 
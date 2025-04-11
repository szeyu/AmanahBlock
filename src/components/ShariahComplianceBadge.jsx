import React from 'react';
import { 
  Box, 
  HStack, 
  Text, 
  Icon, 
  Tooltip, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge
} from '@chakra-ui/react';
import { FaShieldAlt, FaCheckCircle, FaExternalLinkAlt, FaUserTie } from 'react-icons/fa';

const ShariahComplianceBadge = ({ level = "Fully Compliant", scholars = [], certificationDate = "2023-05-01", showDetails = true }) => {
  // Define color scheme based on compliance level
  const getColorScheme = () => {
    switch(level) {
      case "Fully Compliant":
        return "green";
      case "Partially Compliant":
        return "yellow";
      case "Under Review":
        return "orange";
      default:
        return "purple";
    }
  };
  
  const colorScheme = getColorScheme();
  
  // Simple badge if details not needed
  if (!showDetails) {
    return (
      <Badge colorScheme={colorScheme} borderRadius="full" px={2} py={1}>
        <HStack spacing={1}>
          <Icon as={FaShieldAlt} boxSize={3} />
          <Text fontSize="xs">{level}</Text>
        </HStack>
      </Badge>
    );
  }
  
  // Detailed badge with popover
  return (
    <Popover placement="bottom" trigger="hover">
      <PopoverTrigger>
        <Box as="span" cursor="pointer">
          <Badge colorScheme={colorScheme} borderRadius="full" px={2} py={1}>
            <HStack spacing={1}>
              <Icon as={FaShieldAlt} boxSize={3} />
              <Text fontSize="xs">{level}</Text>
              <Icon as={FaExternalLinkAlt} boxSize={2} />
            </HStack>
          </Badge>
        </Box>
      </PopoverTrigger>
      <PopoverContent bg="gray.800" borderColor="gray.700" color="white" _focus={{ boxShadow: 'none' }}>
        <PopoverArrow bg="gray.800" />
        <PopoverCloseButton />
        <PopoverHeader borderBottomWidth="1px" borderColor="gray.700" fontWeight="bold">
          Shariah Compliance Certification
        </PopoverHeader>
        <PopoverBody>
          <Text fontSize="sm" mb={3}>
            This project has been verified and certified as {level.toLowerCase()} with Islamic principles by our Shariah board.
          </Text>
          
          {scholars.length > 0 && (
            <>
              <Text fontSize="sm" fontWeight="bold" mb={1}>Certifying Scholars:</Text>
              <List spacing={1} mb={3}>
                {scholars.map((scholar, index) => (
                  <ListItem key={index} fontSize="xs">
                    <ListIcon as={FaUserTie} color={`${colorScheme}.400`} />
                    {scholar}
                  </ListItem>
                ))}
              </List>
            </>
          )}
          
          <Divider borderColor="gray.700" my={2} />
          
          <HStack fontSize="xs" color="gray.400" justify="space-between">
            <Text>Certification Date: {certificationDate}</Text>
            <Icon as={FaCheckCircle} color={`${colorScheme}.400`} />
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ShariahComplianceBadge; 
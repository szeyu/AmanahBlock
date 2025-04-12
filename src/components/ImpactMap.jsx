import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { Box, Text, VStack, HStack, Badge, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';

// Sample data - replace with your actual data
const impactLocations = [
  {
    id: 1,
    name: 'Community Center',
    type: 'Education',
    description: 'Built a new community center providing education and healthcare services',
    coordinates: [101.6869, 3.1390], // Kuala Lumpur coordinates
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2023-12-15',
    beneficiaries: 150
  },
  {
    id: 2,
    name: 'Food Distribution Center',
    type: 'Food Aid',
    description: 'Established a food distribution center serving 200 families monthly',
    coordinates: [101.6097, 3.0319], // Petaling Jaya coordinates
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
    date: '2023-11-20',
    beneficiaries: 200
  },
  {
    id: 3,
    name: 'Medical Clinic',
    type: 'Healthcare',
    description: 'Opened a medical clinic providing free healthcare services',
    coordinates: [101.7073, 2.9545], // Shah Alam coordinates
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    date: '2023-10-05',
    beneficiaries: 500
  }
];

// Malaysia GeoJSON data
const malaysiaGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Malaysia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [99.0, 0.0],
          [119.0, 0.0],
          [119.0, 7.0],
          [99.0, 7.0],
          [99.0, 0.0]
        ]]
      }
    }
  ]
};

const ImpactMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    onOpen();
  };

  return (
    <Box h="600px" w="100%" borderRadius="xl" overflow="hidden" boxShadow="xl" bg="gray.800">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [101.6869, 3.1390] // Centered on Malaysia
        }}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup center={[101.6869, 3.1390]} zoom={4}>
          {/* Base map - Malaysia outline */}
          <Geographies geography={malaysiaGeoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1A202C"
                  stroke="#4A5568"
                  strokeWidth={1}
                />
              ))
            }
          </Geographies>
          
          {/* State boundaries */}
          <Geographies geography="/malaysia-states.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2D3748"
                  stroke="#4A5568"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#4A5568",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#4A5568",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Markers */}
          {impactLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onClick={() => handleMarkerClick(location)}
            >
              <Box
                w="24px"
                h="24px"
                bg="brand.500"
                borderRadius="full"
                border="2px solid white"
                boxShadow="0 0 10px rgba(11, 197, 234, 0.5)"
                cursor="pointer"
                _hover={{
                  transform: 'scale(1.2)',
                  transition: 'transform 0.2s'
                }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={4}>
            {selectedLocation && (
              <VStack align="stretch" spacing={3}>
                <Image
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  borderRadius="md"
                  h="150px"
                  objectFit="cover"
                />
                <Text fontWeight="bold" fontSize="lg">
                  {selectedLocation.name}
                </Text>
                <HStack>
                  <Badge colorScheme="brand">{selectedLocation.type}</Badge>
                  <Badge colorScheme="green">
                    {selectedLocation.beneficiaries} beneficiaries
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {selectedLocation.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Established: {new Date(selectedLocation.date).toLocaleDateString()}
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImpactMap; 
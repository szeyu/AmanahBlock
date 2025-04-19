import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Box,
  Heading,
  Text,
  Grid,
  Image,
  HStack,
  Badge,
  Button,
  Icon,
  Tooltip,
  Flex,
  SimpleGrid,
  VStack,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  CloseButton,
  List,         // Import List
  ListItem,     // Import ListItem
  ListIcon,      // Import ListIcon
  Container
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaCamera,
  FaVrCardboard,
  FaGlobeAfrica,
  FaTint,        // Water crisis
  FaSchool,      // Education crisis
  FaHamburger,   // Food crisis
  FaHome,        // New crisis
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for user location
const UserLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    ">
      <div style="
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 50%;
        padding: 4px;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E53E3E">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock data for featured impact stories
const impactStories = [
  {
    id: 1,
    title: "Clean Water Initiative in Kuala Lumpur",
    location: "Kuala Lumpur, Malaysia",
    category: "Water",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 1200,
    completionDate: "March 2023",
    description: "This project provided clean water access to underserved communities in Kuala Lumpur, reducing waterborne diseases by 85% and improving overall community health.",
    status: "Completed",
    hasVR: false
  },
  {
    id: 2,
    title: "School Reconstruction in Penang",
    location: "Penang, Malaysia",
    category: "Education",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 850,
    completionDate: "Ongoing",
    description: "This project is rebuilding a school damaged in recent floods, providing education facilities for 850 children and employment for 35 teachers in Penang.",
    status: "In Progress",
    hasVR: false
  },
  {
    id: 3,
    title: "Food Security Program in Johor Bahru",
    location: "Johor Bahru, Malaysia",
    category: "Food",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    beneficiaries: 5000,
    completionDate: "January 2023",
    description: "This emergency response provided food packages to 5,000 people facing food insecurity in Johor Bahru, with special focus on vulnerable communities and children.",
    status: "Completed",
    hasVR: false
  }
];

// Sample heatmap data for Malaysia showing critical areas
const heatmapData = [
  // Marker 1: Kuala Lumpur: Clean Water Project (Reduced intensity)
  { lat: 3.1390, lng: 101.6869, intensity: 0.6 }, // Main point
  { lat: 3.1390, lng: 101.6869, intensity: 0.55 }, // Surrounding area
  { lat: 3.1390, lng: 101.6869, intensity: 0.5 }, // Extended area
  { lat: 3.1390, lng: 101.6869, intensity: 0.45 }, // Outer area
  
  // Marker 2: Penang: School Rebuilding (Lower intensity)
  { lat: 5.4164, lng: 100.3298, intensity: 0.4 }, // Main point
  { lat: 5.4164, lng: 100.3298, intensity: 0.35 }, // Surrounding area
  { lat: 5.4164, lng: 100.3298, intensity: 0.3 }, // Extended area
  { lat: 5.4164, lng: 100.3298, intensity: 0.25 }, // Outer area
  
  // Marker 3: Johor Bahru: Emergency Food Relief
  { lat: 1.3521, lng: 103.8198, intensity: 0.9 }, // Main point
  { lat: 1.3521, lng: 103.8198, intensity: 0.85 }, // Surrounding area
  { lat: 1.3521, lng: 103.8198, intensity: 0.8 }, // Extended area
  { lat: 1.3521, lng: 103.8198, intensity: 0.75 }, // Outer area,

  // Marker 4: Putra Heights: Housing Crisis (High intensity)
  { lat: 2.9936, lng: 101.5739, intensity: 0.95 }, // Main point
  { lat: 2.9936, lng: 101.5739, intensity: 0.9 }, // Surrounding area
  { lat: 2.9936, lng: 101.5739, intensity: 0.85 }, // Extended area
  { lat: 2.9936, lng: 101.5739, intensity: 0.8 }, // Outer area
];

// Custom Popup Component
const CustomPopup = ({ content, position }) => {
  return (
    <Popover isOpen={true} placement="top">
      <PopoverTrigger>
        <Box 
          position="absolute" 
          left={`${position[1]}px`} 
          top={`${position[0]}px`}
          transform="translate(-50%, -100%)"
          pointerEvents="none"
        />
      </PopoverTrigger>
      <PopoverContent 
        bg="gray.800" 
        color="white" 
        border="none" 
        borderRadius="md"
        boxShadow="lg"
        _focus={{ outline: 'none' }}
        maxW="200px"
      >
        <PopoverArrow bg="gray.800" />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="medium">
            {content}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const GlobalImpactMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestPoints, setNearestPoints] = useState([]);
  const [showNearestPoints, setShowNearestPoints] = useState(false);
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([4.5, 109.5]);
  const [mapZoom, setMapZoom] = useState(6);
  const heatmapLayerRef = useRef(null);
  const throttleTimeoutRef = useRef(null);
  const lastUpdatedZoomRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Convert heatmap data
      const heatmapDataPoints = heatmapData.map(point => [point.lat, point.lng, point.intensity * 100]);
      
      // Create heatmap layer
      const heatmapLayer = L.heatLayer(heatmapDataPoints, {
        radius: 40, // Base radius at baseZoom
        blur: 35,   // Base blur at baseZoom
        maxZoom: 12,
        max: 75,       // Lowered max value from 100
        minOpacity: 0.2, // Increased minimum opacity from 0.1
        gradient: {
          0.1: 'cyan',  // Start gradient slightly warmer
          0.3: 'lime',
          0.5: 'yellow',
          0.7: 'orange',
          0.9: 'red'   // Push red to higher end
        }
      });
      
      heatmapLayerRef.current = heatmapLayer;
      heatmapLayer.addTo(map);

      // Function to update heatmap options based on zoom
      const updateHeatmapOptionsIfNeeded = () => {
        if (!heatmapLayerRef.current) return;
        
        const currentZoom = map.getZoom();
        const baseZoom = 6; // Reference zoom level
        
        // Only update if zoom level has actually changed
        if (currentZoom !== lastUpdatedZoomRef.current) {
          // Reversed scaling: smaller radius when zoomed out, larger when zoomed in
          let newRadius = 40;
          if (currentZoom < baseZoom) {
            newRadius = Math.max(15, 40 - (baseZoom - currentZoom) * 5); // Decrease when zoomed out
          } else {
            newRadius = 40 + (currentZoom - baseZoom) * 5; // Increase when zoomed in
          }
          
          let newBlur = 35;
          if (currentZoom < baseZoom) {
            newBlur = Math.max(15, 35 - (baseZoom - currentZoom) * 4); // Decrease when zoomed out
          } else {
            newBlur = 35 + (currentZoom - baseZoom) * 4; // Increase when zoomed in
          }
          
          heatmapLayerRef.current.setOptions({
            radius: Math.round(newRadius),
            blur: Math.round(newBlur)
          });
          lastUpdatedZoomRef.current = currentZoom; // Record the zoom level we updated for
        }
      };

      // Throttle function for updates
      const throttledUpdate = () => {
        if (throttleTimeoutRef.current) return; // Already waiting

        updateHeatmapOptionsIfNeeded(); // Check/update immediately first time

        throttleTimeoutRef.current = setTimeout(() => {
          throttleTimeoutRef.current = null; // Clear timeout ref
          // Check/update again after throttle period, in case map settled on a new zoom level
          updateHeatmapOptionsIfNeeded(); 
        }, 30); // Throttle delay: Reduced to 30ms
      };
      
      // Initial zoom setup
      lastUpdatedZoomRef.current = map.getZoom();
      updateHeatmapOptionsIfNeeded(); // Ensure initial options are set correctly

      // Attach throttled listeners to zoom and move
      map.on('zoom', throttledUpdate);
      map.on('move', throttledUpdate);

      // Cleanup
      return () => {
        map.off('zoom', throttledUpdate);
        map.off('move', throttledUpdate);
        if (throttleTimeoutRef.current) {
          clearTimeout(throttleTimeoutRef.current);
        }
        if (heatmapLayerRef.current) {
          map.removeLayer(heatmapLayerRef.current);
        }
      };
    }
  }, [mapRef.current]);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Calculate nearest points when user location changes
  useEffect(() => {
    if (userLocation) {
      const points = [
        { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, type: "Clean Water Project" },
        { name: "Penang", lat: 5.4164, lng: 100.3298, type: "School Rebuilding" },
        { name: "Johor Bahru", lat: 1.3521, lng: 103.8198, type: "Emergency Food Relief" },
        { name: "Putra Heights", lat: 2.9936, lng: 101.5739, type: "Housing Crisis" }
      ];

      const pointsWithDistance = points.map(point => ({
        ...point,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          point.lat,
          point.lng
        )
      }));

      // Sort by distance and take top 3
      const nearest = pointsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setNearestPoints(nearest);
    }
  }, [userLocation]);

  const handleMarkerMouseEnter = (content, event) => {
    setTooltipContent(content);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleMarkerMouseLeave = () => {
    setShowTooltip(false);
  };

  const handlePointClick = (point) => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // First step: Move to the location
      map.flyTo([point.lat, point.lng], map.getZoom(), {
        duration: 1,
        easeLinearity: 0.25,
      });

      // Second step: Zoom in after a short delay (allows move to start)
      setTimeout(() => {
        map.flyTo([point.lat, point.lng], 14, {
          duration: 1,
          easeLinearity: 0.25
        });
      }, 100); // Delay ensures zoom starts after move has initiated
    }
  };

  return (
    <Box className="w-full bg-gray.900 rounded-lg shadow-lg p-4 relative" style={{ height: '500px' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        zoomControl={true}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        {userLocation && (
          <LeafletMarker 
            position={[userLocation.lat, userLocation.lng]}
            icon={UserLocationIcon}
            zIndexOffset={1000}
          >
            <Popup className="custom-popup">
              <Box 
                bg="blue.800" 
                color="white" 
                p={2}
                borderRadius="lg"
                minW="220px"
                borderWidth="1px"
                borderColor="blue.700"
                boxShadow="lg"
              >
                <HStack spacing={2} align="center" mb={1} height={10}>
                  <Icon as={FaMapMarkerAlt} color="blue.300" boxSize={4} />
                  <Text fontSize="lg" fontWeight="bold" letterSpacing="wide" lineHeight="1">
                    Your Location
                  </Text>
                </HStack>
                <Box w="90%" textAlign="center" mt={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => setShowNearestPoints(!showNearestPoints)}
                  >
                    {showNearestPoints ? "Hide Nearest Points" : "Show Nearest Points"}
                  </Button>
                </Box>
              </Box>
            </Popup>
          </LeafletMarker>
        )}

        {/* Existing markers */}
        <LeafletMarker position={[3.1390, 101.6869]}>
          <Popup className="custom-popup">
            <Link to="/projects" state={{ openProjectId: 1 }}>
              <Box 
                bg="gray.800" 
                color="white" 
                p={2}
                borderRadius="lg"
                minW="220px"
                borderWidth="1px"
                borderColor="gray.700"
                boxShadow="lg"
                cursor="pointer"
                _hover={{ bg: "gray.700" }}
              >
                <HStack spacing={2} align="center" mb={1} height={10}>
                  <Icon as={FaTint} color="blue.300" boxSize={4} />
                  <Text fontSize="lg" fontWeight="bold" letterSpacing="wide" lineHeight="1">
                    Kuala Lumpur
                  </Text>
                </HStack>
                <HStack spacing={1.5} align="center" mb={1} height={6}>
                  <Icon as={FaRegCheckCircle} color="blue.300" boxSize={4} />
                  <Text fontSize="md" color="gray.300" lineHeight="1.2">
                    Clean Water Project
                  </Text>
                </HStack>
                <Box mt={1}>
                  <Text fontSize="sm" color="gray.400" mb={0.5} fontWeight="medium" lineHeight="1.2">
                    Recommended Donations:
                  </Text>
                  <List spacing={0}>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Water Filters
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Water Storage Containers
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Water Testing Kits
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Link>
          </Popup>
        </LeafletMarker>
        <LeafletMarker position={[5.4164, 100.3298]}>
          <Popup className="custom-popup">
            <Link to="/projects" state={{ openProjectId: 2 }}>
              <Box 
                bg="gray.800" 
                color="white" 
                p={2}
                borderRadius="lg"
                minW="220px"
                borderWidth="1px"
                borderColor="gray.700"
                boxShadow="lg"
                cursor="pointer"
                _hover={{ bg: "gray.700" }}
              >
                <HStack spacing={2} align="center" mb={1} height={10}>
                  <Icon as={FaSchool} color="orange.300" boxSize={4} />
                  <Text fontSize="lg" fontWeight="bold" letterSpacing="wide" lineHeight="1">
                    Penang
                  </Text>
                </HStack>
                <HStack spacing={1.5} align="center" mb={1} height={6}>
                  <Icon as={FaRegCheckCircle} color="orange.300" boxSize={4} />
                  <Text fontSize="md" color="gray.300" lineHeight="1.2">
                    School Rebuilding
                  </Text>
                </HStack>
                <Box mt={1}>
                  <Text fontSize="sm" color="gray.400" mb={0.5} fontWeight="medium" lineHeight="1.2">
                    Recommended Donations:
                  </Text>
                  <List spacing={0}>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      School Supplies
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Books
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Building Materials
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Link>
          </Popup>
        </LeafletMarker>
        <LeafletMarker position={[1.3521, 103.8198]}>
          <Popup className="custom-popup">
            <Link to="/projects" state={{ openProjectId: 3 }}>
              <Box 
                bg="gray.800" 
                color="white" 
                p={2}
                borderRadius="lg"
                minW="220px"
                borderWidth="1px"
                borderColor="gray.700"
                boxShadow="lg"
                cursor="pointer"
                _hover={{ bg: "gray.700" }}
              >
                <HStack spacing={2} align="center" mb={1} height={10}>
                  <Icon as={FaHamburger} color="yellow.300" boxSize={4} />
                  <Text fontSize="lg" fontWeight="bold" letterSpacing="wide" lineHeight="1">
                    Johor Bahru
                  </Text>
                </HStack>
                <HStack spacing={1.5} align="center" mb={1} height={6}>
                  <Icon as={FaRegCheckCircle} color="yellow.300" boxSize={4} />
                  <Text fontSize="md" color="gray.300" lineHeight="1.2">
                    Emergency Food Relief
                  </Text>
                </HStack>
                <Box mt={1}>
                  <Text fontSize="sm" color="gray.400" mb={0.5} fontWeight="medium" lineHeight="1.2">
                    Recommended Donations:
                  </Text>
                  <List spacing={0}>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Non-perishable Food
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Cooking Utensils
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Food Storage Containers
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Link>
          </Popup>
        </LeafletMarker>
        <LeafletMarker position={[2.9936, 101.5739]}>
          <Popup className="custom-popup">
            <Link to="/projects" state={{ openProjectId: 4 }}>
              <Box 
                bg="gray.800" 
                color="white" 
                p={2}
                borderRadius="lg"
                minW="220px"
                borderWidth="1px"
                borderColor="gray.700"
                boxShadow="lg"
                cursor="pointer"
                _hover={{ bg: "gray.700" }}
              >
                <HStack spacing={2} align="center" mb={1} height={10}>
                  <Icon as={FaHome} color="red.300" boxSize={4} />
                  <Text fontSize="lg" fontWeight="bold" letterSpacing="wide" lineHeight="1">
                    Putra Heights
                  </Text>
                </HStack>
                <HStack spacing={1.5} align="center" mb={1} height={6}>
                  <Icon as={FaRegCheckCircle} color="red.300" boxSize={4} />
                  <Text fontSize="md" color="gray.300" lineHeight="1.2">
                    Housing Crisis
                  </Text>
                </HStack>
                <Box mt={1}>
                  <Text fontSize="sm" color="gray.400" mb={0.5} fontWeight="medium" lineHeight="1.2">
                    Recommended Donations:
                  </Text>
                  <List spacing={0}>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Building Materials
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Home Essentials
                    </ListItem>
                    <ListItem fontSize="sm" color="gray.300" lineHeight="1.2">
                      <ListIcon as={FaRegCheckCircle} color="green.400" />
                      Emergency Shelter Kits
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Link>
          </Popup>
        </LeafletMarker>
      </MapContainer>

      {/* Nearest Points Panel */}
      {showNearestPoints && nearestPoints.length > 0 && (
        <Box
          position="absolute"
          bottom={4}
          right={4}
          bg="gray.800"
          color="white"
          p={4}
          borderRadius="lg"
          boxShadow="lg"
          maxW="300px"
          zIndex={1000}
        >
          <CloseButton 
            position="absolute" 
            top="8px" 
            right="8px" 
            size="sm"
            onClick={() => setShowNearestPoints(false)}
            aria-label="Close nearest points panel"
          />
          <Heading size="sm" mb={2} mr={6}>Nearest Donation Points</Heading>
          <VStack align="stretch" spacing={2}>
            {nearestPoints.map((point, index) => (
              <Box
                key={index}
                p={2}
                borderRadius="md"
                bg="gray.700"
                _hover={{ bg: "gray.600" }}
                cursor="pointer"
                onClick={() => handlePointClick(point)}
              >
                <Text fontWeight="bold">{point.name}</Text>
                <Text fontSize="sm" color="gray.300">{point.type}</Text>
                <Text fontSize="xs" color="gray.400">
                  Distance: {point.distance.toFixed(1)} km
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
      
      {showTooltip && (
        <Box
          position="absolute"
          bg="gray.800"
          color="white"
          px={3}
          py={2}
          borderRadius="md"
          boxShadow="lg"
          zIndex={10}
          style={{ 
            left: `${tooltipPosition.x}px`, 
            top: `${tooltipPosition.y - 40}px`,
            transform: 'translateX(-50%)'
          }}
          _before={{
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            width: '0',
            height: '0',
            border: '10px solid transparent',
            borderTopColor: 'gray.800',
            borderBottom: '0',
            marginLeft: '-10px',
            marginBottom: '-10px'
          }}
        >
          <Text fontSize="sm" fontWeight="medium">
          {tooltipContent}
          </Text>
        </Box>
      )}
    </Box>
  );
};

// Add custom CSS for Leaflet popup
const style = document.createElement('style');
style.textContent = `
  .custom-popup .leaflet-popup-content-wrapper {
    background: transparent;
    box-shadow: none;
    padding: 0;
    width: 200px;
  }
  .custom-popup .leaflet-popup-content {
    margin: 0;
    width: 200px !important;
  }
  .custom-popup .leaflet-popup-tip-container {
    display: none;
  }
  .custom-popup .leaflet-popup-close-button {
    display: none;
  }
  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 0.5rem;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Add custom CSS for user location marker
const userLocationStyle = document.createElement('style');
userLocationStyle.textContent = `
  .user-location-marker {
    z-index: 1000 !important;
  }
  .user-location-marker div {
    z-index: 1000 !important;
  }
`;
document.head.appendChild(userLocationStyle);

const ImpactSection = () => {
  return (
    <Box 
      py={20} 
      bg="transparent" // Ensure transparent background
      position="relative" // Keep relative for zIndex context
      zIndex={1} // Ensure content is above LandingPage background
      overflow="visible"
    >
      <Container maxW="container.xl">
        {/* Featured Impact Stories */}
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading
              as="h2" 
              size="xl" 
              mb={2}
              bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
              bgClip="text"
              fontWeight="bold"
            >
              Featured Impact Stories
            </Heading>
            <Text color="gray.400" textAlign="center">
              See how your contributions are making a real difference in communities worldwide
            </Text>
        </VStack>

        <Box mb={16}>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
            {impactStories.map((story) => (
              <Box 
                key={story.id}
                bg="rgba(26, 32, 44, 0.7)" // Keep card background
                backdropFilter="blur(10px)"
                borderRadius="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor="gray.700"
                transition="all 0.3s"
                _hover={{ 
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                  borderColor: "brand.500"
                }}
              >
                <Box position="relative">
                  <Image 
                    src={story.image} 
                    alt={story.title} 
                    w="full" 
                    h="200px" 
                    objectFit="cover" 
                  />
                  <HStack position="absolute" top={2} right={2} spacing={2}>
                    {story.hasVR && (
                      <Tooltip label="VR Experience Available">
                        <Button 
                          size="sm" 
                          borderRadius="full" 
                          colorScheme="purple"
                          leftIcon={<FaVrCardboard />}
                        >
                          VR
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip label="Coming Soon" placement="top">
                      <Button 
                        size="sm" 
                        borderRadius="full" 
                        colorScheme="blue"
                        leftIcon={<FaCamera />}
                        isDisabled
                        opacity={0.7}
                        _hover={{ opacity: 0.7 }}
                      >
                        B/A
                      </Button>
                    </Tooltip>
                  </HStack>
                  <HStack position="absolute" bottom={2} left={2} spacing={2}>
                    <Badge colorScheme="green" borderRadius="full" px={2} py={1}>
                      {story.category}
                    </Badge>
                    <Badge 
                      colorScheme={story.status === "Completed" ? "green" : "orange"} 
                      borderRadius="full" 
                      px={2} 
                      py={1}
                    >
                      <HStack spacing={1}>
                        <Icon as={story.status === "Completed" ? FaRegCheckCircle : FaRegClock} boxSize={3} />
                        <Text fontSize="xs">{story.status}</Text>
                      </HStack>
                    </Badge>
                  </HStack>
                </Box>
                
                <Box p={4}>
                  <Heading size="md" mb={2} color="white" noOfLines={1}>
                    {story.title}
                  </Heading>
                  
                  <HStack mb={4} color="gray.400" fontSize="sm">
                    <Icon as={FaMapMarkerAlt} />
                    <Text>{story.location}</Text>
                  </HStack>
                  
                  <Text color="gray.300" mb={4} noOfLines={3}>
                    {story.description}
                  </Text>
                  
                  <Divider borderColor="gray.700" mb={4} />
                  
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Beneficiaries</Text>
                      <Text color="white" fontWeight="bold">{story.beneficiaries.toLocaleString()}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="sm">Completion</Text>
                      <Text color="white" fontWeight="bold">{story.completionDate}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  <Button 
                    as={Link}
                    to={`/impact/story/${story.id}`}
                    variant="gradient" 
                    size="sm" 
                    w="full"
                  >
                    Explore Impact
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Global Impact Map Container */}
        <Box 
          bg="rgba(26, 32, 44, 0.7)" // Keep map container background
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
          height={{ base: "600px", md: "700px" }} // Adjusted height slightly
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
            <Heading 
            as="h2" 
            size="xl" 
            mb={2}
            bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
            bgClip="text"
            fontWeight="bold"
            >
              Global Impact Map
            </Heading>
              <Text color="gray.400">Explore our projects and their impact around the world</Text>
            </Box>
            <Tooltip label="Coming Soon" placement="top">
              <Button 
                leftIcon={<FaGlobeAfrica />} 
                variant="outline"
                isDisabled
                opacity={0.7}
                _hover={{ opacity: 0.7 }}
              >
                Open Full Map
              </Button>
            </Tooltip>
          </Flex>
          
          <GlobalImpactMap />
        </Box>
      </Container>
    </Box>
  );
};

export default ImpactSection; 
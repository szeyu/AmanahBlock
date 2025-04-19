import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Grid,
  HStack,
  Icon,
  Button,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Divider,
  VStack,
  Flex,
  Badge,
  useDisclosure, // Import useDisclosure
  useToast, // Import useToast
} from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  FaWallet, 
  FaCreditCard, 
  FaUniversity, 
  FaMobileAlt, 
  FaMoneyBillWave, 
  FaBitcoin, 
  FaClock,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaPercentage
} from 'react-icons/fa';
import PhysicalDonationConfirmationModal from './PhysicalDonationConfirmationModal'; // Import the new modal

// Fix for default marker icons in Leaflet
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

// Add custom CSS for Leaflet popup and user location marker
const setupLeafletCSS = () => {
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
      color: white;
    }
    .user-location-marker {
      z-index: 1000 !important;
    }
    .user-location-marker div {
      z-index: 1000 !important;
    }
  `;
  document.head.appendChild(style);
};

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

const DonationComponent = ({ 
  donationMode, 
  setDonationMode, 
  donationAmount, 
  setDonationAmount, 
  paymentMethod, 
  handlePaymentMethodSelect, 
  onOpen, // Keep this for the money donation modal
  donationType
}) => {
  // Web3 style colors and effects
  const glassBackground = "rgba(13, 16, 25, 0.7)";
  const selectedGlow = "0 0 15px rgba(11, 197, 234, 0.4)";
  const hoverGlow = "0 4px 15px rgba(11, 197, 234, 0.3)";
  
  // Mock exchange rate (in practice, this would come from an API)
  const usdtToMyrRate = 4.72; // 1 USDT = 4.72 MYR
  
  // State for physical items donation
  const [deliveryMethod, setDeliveryMethod] = useState('self');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [charityCentersWithDistance, setCharityCentersWithDistance] = useState([]);
  const mapRef = useRef(null);
  // Default map center (Malaysia)
  const [mapCenter, setMapCenter] = useState([4.2105, 101.9758]); 
  const [mapZoom, setMapZoom] = useState(7); // Initial zoom
  
  // Mock data for charity centers (In a real app, this would come from an API)
  const charityCenters = [
    { id: 'center1', name: 'Charity Center - Subang Jaya', address: '123 Jalan Example, Taman Example, Subang Jaya', hours: 'Mon-Fri 9AM-5PM, Sat 10AM-2PM', contact: '012-345-6789', coords: { lat: 3.0738, lng: 101.5860 } },
    { id: 'center2', name: 'Charity Center - Petaling Jaya', address: '456 Jalan Sample, Taman Sample, Petaling Jaya', hours: 'Mon-Fri 10AM-6PM, Sat 11AM-3PM', contact: '012-345-6790', coords: { lat: 3.1073, lng: 101.6304 } },
    { id: 'center3', name: 'Charity Center - Kuala Lumpur', address: '789 Jalan Demo, Taman Demo, Kuala Lumpur', hours: 'Mon-Sat 9AM-7PM', contact: '012-345-6791', coords: { lat: 3.1390, lng: 101.6869 } },
    { id: 'center4', name: 'Charity Center - Shah Alam', address: '101 Jalan Test, Taman Test, Shah Alam', hours: 'Mon-Fri 8AM-5PM', contact: '012-345-6792', coords: { lat: 3.0733, lng: 101.5185 } },
    { id: 'center5', name: 'Charity Center - Klang', address: '202 Jalan Experiment, Taman Experiment, Klang', hours: 'Mon-Sat 10AM-6PM', contact: '012-345-6793', coords: { lat: 3.0449, lng: 101.4456 } },
  ];
  
  // Initialize Leaflet CSS
  useEffect(() => {
    setupLeafletCSS();
  }, []);
  
  // Get user location, calculate distances, and update map state
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          
          // Update map state ONLY
          setMapCenter([userLoc.lat, userLoc.lng]);
          setMapZoom(13); 

          // Calculate distance to each charity center
          const centersWithDistance = charityCenters.map(center => ({
            ...center,
            distance: calculateDistance(
              userLoc.lat,
              userLoc.lng,
              center.coords.lat,
              center.coords.lng
            )
          }));
          
          const sortedCenters = [...centersWithDistance].sort((a, b) => a.distance - b.distance);
          setCharityCentersWithDistance(sortedCenters);

          // --- REMOVED explicit setView call from here ---
        },
        (error) => {
          console.error("Error getting location:", error);
          setCharityCentersWithDistance(charityCenters); 
        }
      );
    } else {
      console.log("Geolocation not supported.");
      setCharityCentersWithDistance(charityCenters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  // Effect to invalidate map size when the physical donation tab / self-delivery becomes active
  useEffect(() => {
    // Check if the map should be visible
    if (donationMode === 'physical' && deliveryMethod === 'self') {
      const timer = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.setView(mapCenter, mapZoom); // Set the view to the current center and zoom
        } else {
          console.error("Map reference is not available.");
        }
      }, 100); // Delay to ensure map is rendered
      return () => clearTimeout(timer);
    }
  }, [donationMode, deliveryMethod]);


  // Mock delivery fees for Lalamove
  const originalDeliveryFee = 40.00;
  const discountedDeliveryFee = 25.00;
  const discountPercentage = Math.round(((originalDeliveryFee - discountedDeliveryFee) / originalDeliveryFee) * 100);
  
  // Add a utility function to validate coordinates
  const isValidCoordinate = (coord) => {
    if (!coord) return false;
    const lat = parseFloat(coord.lat);
    const lng = parseFloat(coord.lng);
    return !isNaN(lat) && !isNaN(lng) && 
           lat >= -90 && lat <= 90 && 
           lng >= -180 && lng <= 180;
  };

  // Select a center from the map using two-step animation like in ImpactSection
  const handleCenterSelect = (centerId) => {
    setSelectedCenter(centerId);
    
    try {
      // Find the selected center
      const center = charityCentersWithDistance.length > 0 
        ? charityCentersWithDistance.find(c => c.id === centerId)
        : charityCenters.find(c => c.id === centerId);
      
      // Focus and zoom the map to the selected center
      if (center && mapRef.current && isValidCoordinate(center.coords)) {
        const lat = parseFloat(center.coords.lat);
        const lng = parseFloat(center.coords.lng);
        
        // Two-step animation: First move to the location
        mapRef.current.flyTo(
          [lat, lng],
          mapRef.current.getZoom(), // Keep current zoom level for first step
          {
            duration: 1,
            easeLinearity: 0.25,
          }
        );

        // Second step: Zoom in after a short delay
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.flyTo(
              [lat, lng],
              14, // Zoom level for second step
              {
                duration: 1,
                easeLinearity: 0.25
              }
            );
          }
        }, 100); // Delay ensures zoom starts after move has initiated
      } else {
        console.error("Invalid center or coordinates:", center);
      }
    } catch (error) {
      console.error("Error in handleCenterSelect:", error);
    }
  };

  // Add a separate handler for the "View nearest center" button
  const handleViewNearestCenter = () => {
    try {
      if (charityCentersWithDistance.length > 0) {
        // Find the first center with valid coordinates
        const nearestCenter = charityCentersWithDistance.find(center => 
          isValidCoordinate(center.coords)
        );
        
        if (nearestCenter) {
          handleCenterSelect(nearestCenter.id);
        } else {
          console.error("No centers with valid coordinates found");
        }
      }
    } catch (error) {
      console.error("Error in handleViewNearestCenter:", error);
    }
  };

  // Find the selected center details
  const selectedCenterDetails = charityCentersWithDistance.length > 0 
    ? charityCentersWithDistance.find(center => center.id === selectedCenter)
    : charityCenters.find(center => center.id === selectedCenter);

  // Disclosure hook for the physical donation confirmation modal
  const { 
    isOpen: isPhysicalConfirmOpen, 
    onOpen: onPhysicalConfirmOpen, 
    onClose: onPhysicalConfirmClose 
  } = useDisclosure();

  // State for loading status during physical donation confirmation
  const [isConfirmingPhysical, setIsConfirmingPhysical] = useState(false);

  // State for Lalamove delivery details
  const [lalamoveAddress, setLalamoveAddress] = useState('');
  const [lalamoveContact, setLalamoveContact] = useState('');
  const [lalamoveDate, setLalamoveDate] = useState('');
  const [lalamoveTime, setLalamoveTime] = useState('');
  const [lalamoveNote, setLalamoveNote] = useState(''); // Optional note

  // Initialize useToast hook
  const toast = useToast();

  /**
   * @function handleConfirmPhysicalDonation
   * @description Placeholder function to handle the confirmation action for physical items.
   *              In a real app, this would likely involve API calls or blockchain interactions.
   */
  const handleConfirmPhysicalDonation = async () => {
    setIsConfirmingPhysical(true);
    const isLalamove = deliveryMethod === 'lalamove';
    
    console.log("Confirming physical donation...");
    console.log("Item Description:", itemDescription);
    console.log("Delivery Method:", deliveryMethod);
    if (deliveryMethod === 'self') {
      console.log("Selected Center:", selectedCenterDetails);
    } else {
      // Log actual Lalamove details
      console.log("Pickup Details:", {
        address: lalamoveAddress,
        contact: lalamoveContact,
        date: lalamoveDate,
        time: lalamoveTime,
        note: lalamoveNote,
      });
    }

    try {
      // Simulate API call/blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); 

      console.log("Physical donation confirmed/scheduled!");
      
      // Close the confirmation modal first
      onPhysicalConfirmClose(); 

      // Show success toast
      toast({
        title: isLalamove ? "Pickup Scheduled" : "Donation Confirmed",
        description: isLalamove 
          ? "Your Lalamove pickup has been scheduled. We'll contact you shortly."
          : "Your self-delivery donation details have been recorded.",
        status: "success",
        duration: 5000, // 5 seconds
        isClosable: true,
        position: "top", // Position the toast at the top
      });

      // Optionally clear form fields after successful submission
      setItemDescription('');
      if (isLalamove) {
        setLalamoveAddress('');
        setLalamoveContact('');
        setLalamoveDate('');
        setLalamoveTime('');
        setLalamoveNote('');
      } else {
        setSelectedCenter(''); // Reset selected center for self-delivery
      }

    } catch (error) {
      console.error("Error confirming physical donation:", error);
      // Show error toast
      toast({
        title: "Confirmation Failed",
        description: "There was an error processing your donation confirmation. Please try again.",
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    } finally {
      // Ensure loading state is turned off regardless of success or failure
      setIsConfirmingPhysical(false);
    }
  };

  // Determine if the Lalamove form is valid
  const isLalamoveFormValid = 
    lalamoveAddress && lalamoveContact && lalamoveDate && lalamoveTime;

  return (
    <Box 
      bg={glassBackground}
      backdropFilter="blur(10px)"
      borderRadius="xl"
      p={6}
      borderWidth="1px"
      borderColor="gray.700"
      mb={8}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        bottom: "-1px",
        borderRadius: "xl",
        padding: "1px",
        background: "linear-gradient(135deg, rgba(11, 197, 234, 0.3), rgba(95, 21, 242, 0.3))",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        zIndex: 0,
      }}
    >
      <Heading size="md" color="white" mb={4} fontWeight="600">Donate Now</Heading>
      
      {/* Donation Mode Selector - Hide physical items tab for zakat and waqf */}
      <Tabs 
        variant="soft-rounded" 
        colorScheme="brand" 
        mb={6} 
        onChange={(index) => setDonationMode(index === 0 ? 'money' : 'physical')} 
        index={donationMode === 'money' ? 0 : 1}
      >
        <TabList>
          <Tab 
            _selected={{ 
              color: 'white', 
              bg: 'brand.500',
              boxShadow: '0 0 15px rgba(11, 197, 234, 0.5)'
            }}
            _hover={{
              bg: 'rgba(11, 197, 234, 0.1)'
            }}
          >
            Donate Money
          </Tab>
          {donationType !== 'zakat' && donationType !== 'waqf' && (
            <Tab 
              _selected={{ 
                color: 'white', 
                bg: 'accent.500',
                boxShadow: '0 0 15px rgba(236, 110, 76, 0.5)'
              }}
              _hover={{
                bg: 'rgba(236, 110, 76, 0.1)'
              }}
            >
              Donate Physical Items
            </Tab>
          )}
        </TabList>
    
        <TabPanels>
          <TabPanel px={0}>
            {/* Money Donation UI */}
            <FormControl mb={6}>
              <FormLabel color="gray.300">Enter Amount (USDT)</FormLabel>
              <NumberInput 
                value={donationAmount} 
                onChange={(valueString) => setDonationAmount(parseFloat(valueString))}
                min={10}
                max={1000000}
              >
                <NumberInputField 
                  bg="rgba(26, 32, 44, 0.6)" 
                  borderColor="gray.600" 
                  _hover={{ borderColor: "brand.400" }}
                  _focus={{ 
                    borderColor: "brand.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  fontSize="lg"
                  height="50px"
                  pl="2.5rem"
                />
                <Box position="absolute" left="1rem" top="50%" transform="translateY(-50%)" color="gray.400" zIndex="1">
                  $
                </Box>
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                  <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                </NumberInputStepper>
              </NumberInput>
              <Text color="gray.400" mt={2} fontSize="sm">
                ≈ RM {(donationAmount * usdtToMyrRate).toFixed(2)} MYR
              </Text>
            </FormControl>

            {/* Payment Method Selection */}
            <Box mb={6}>
              <Text color="gray.300" mb={4}>Select payment method</Text>
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                {/* Card Payment */}
                <Box
                  p={4}
                  bg={paymentMethod === 'card' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'card' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('card')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'card' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'card' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaCreditCard} 
                      boxSize="24px" 
                      color={paymentMethod === 'card' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'card' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Card Payment</Text>
                  </HStack>
                </Box>

                {/* Online Banking */}
                <Box
                  p={4}
                  bg={paymentMethod === 'bank' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'bank' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('bank')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'bank' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'bank' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaUniversity} 
                      boxSize="24px" 
                      color={paymentMethod === 'bank' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'bank' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Online Banking</Text>
                  </HStack>
                </Box>

                {/* E-Wallet */}
                <Box
                  p={4}
                  bg={paymentMethod === 'ewallet' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'ewallet' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('ewallet')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'ewallet' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'ewallet' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaMobileAlt} 
                      boxSize="24px" 
                      color={paymentMethod === 'ewallet' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'ewallet' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">e-Wallet</Text>
                  </HStack>
                </Box>

                {/* Cash */}
                <Box
                  p={4}
                  bg={paymentMethod === 'cash' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'cash' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('cash')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'cash' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'cash' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaMoneyBillWave} 
                      boxSize="24px" 
                      color={paymentMethod === 'cash' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'cash' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Cash</Text>
                  </HStack>
                </Box>

                {/* Crypto */}
                <Box
                  p={4}
                  bg={paymentMethod === 'crypto' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'crypto' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('crypto')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'crypto' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'crypto' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaBitcoin} 
                      boxSize="24px" 
                      color={paymentMethod === 'crypto' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'crypto' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Crypto</Text>
                  </HStack>
                </Box>

                {/* Buy Now Pay Later */}
                <Box
                  p={4}
                  bg={paymentMethod === 'bnpl' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={paymentMethod === 'bnpl' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => handlePaymentMethodSelect('bnpl')}
                  transition="all 0.3s ease"
                  boxShadow={paymentMethod === 'bnpl' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                  _after={paymentMethod === 'bnpl' ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(11, 197, 234, 0.1))",
                    zIndex: 0,
                  } : {}}
                >
                  <HStack spacing={3} position="relative" zIndex="1">
                    <Icon 
                      as={FaClock} 
                      boxSize="24px" 
                      color={paymentMethod === 'bnpl' ? "brand.500" : "gray.400"}
                      filter={paymentMethod === 'bnpl' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                    />
                    <Text color="white">Buy Now Pay Later</Text>
                  </HStack>
                </Box>
              </Grid>
            </Box>

            {/* Payment Method Details Sections */}
            {/* Card Payment Details */}
            {paymentMethod === 'card' && (
              <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                <Text color="white" fontWeight="medium" mb={3}>Card Payment Details</Text>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Card Type</FormLabel>
                  <RadioGroup defaultValue="credit">
                    <Stack direction="row" spacing={5}>
                      <Radio value="credit" colorScheme="brand">Credit Card</Radio>
                      <Radio value="debit" colorScheme="brand">Debit Card</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Card Network</FormLabel>
                  <RadioGroup defaultValue="visa">
                    <Stack direction="row" spacing={5}>
                      <Radio value="visa" colorScheme="brand">Visa</Radio>
                      <Radio value="mastercard" colorScheme="brand">Mastercard</Radio>
                      <Radio value="amex" colorScheme="brand">American Express</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Card Number</FormLabel>
                  <Input 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    bg="gray.700" 
                    borderColor="gray.600"
                  />
                </FormControl>
                
                <Grid templateColumns="1fr 1fr" gap={3}>
                  <FormControl>
                    <FormLabel color="gray.300" fontSize="sm">Expiry Date</FormLabel>
                    <Input 
                      placeholder="MM/YY" 
                      bg="gray.700" 
                      borderColor="gray.600"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel color="gray.300" fontSize="sm">CVV</FormLabel>
                    <Input 
                      placeholder="XXX" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      type="password"
                      maxLength={4}
                    />
                  </FormControl>
                </Grid>
                
                <FormControl mt={3}>
                  <FormLabel color="gray.300" fontSize="sm">Cardholder Name (Optional)</FormLabel>
                  <Input 
                    placeholder="Name as it appears on card" 
                    bg="gray.700" 
                    borderColor="gray.600"
                  />
                </FormControl>
                
                <Text color="gray.400" fontSize="xs" mt={3}>
                  Your payment information is securely processed and we do not store your card details.
                </Text>
              </Box>
            )}
            
            {/* Online Banking Details */}
            {paymentMethod === 'bank' && (
              <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                <Text color="white" fontWeight="medium" mb={3}>Online Banking Details</Text>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Select Bank</FormLabel>
                  <Select 
                    placeholder="Choose your bank" 
                    bg="gray.700" 
                    borderColor="gray.600"
                  >
                    <option value="maybank">Maybank</option>
                    <option value="cimb">CIMB Bank</option>
                    <option value="publicbank">Public Bank</option>
                    <option value="rhb">RHB Bank</option>
                    <option value="hongleong">Hong Leong Bank</option>
                    <option value="ambank">AmBank</option>
                    <option value="bsn">Bank Simpanan Nasional</option>
                    <option value="bankislam">Bank Islam</option>
                    <option value="ocbc">OCBC Bank</option>
                    <option value="hsbc">HSBC Bank</option>
                    <option value="standardchartered">Standard Chartered</option>
                  </Select>
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Account Number</FormLabel>
                  <Input 
                    placeholder="Enter your account number" 
                    bg="gray.700" 
                    borderColor="gray.600"
                  />
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Account Holder Name</FormLabel>
                  <Input 
                    placeholder="Enter account holder name" 
                    bg="gray.700" 
                    borderColor="gray.600"
                  />
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Transfer Amount</FormLabel>
                  <NumberInput 
                    value={donationAmount} 
                    onChange={(valueString) => setDonationAmount(parseFloat(valueString))}
                    min={10}
                    max={1000000}
                  >
                    <NumberInputField bg="gray.700" borderColor="gray.600" />
                    <NumberInputStepper>
                      <NumberIncrementStepper borderColor="gray.600" color="gray.400" />
                      <NumberDecrementStepper borderColor="gray.600" color="gray.400" />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300" fontSize="sm">Reference/Description</FormLabel>
                  <Input 
                    placeholder="e.g., Donation for AmanahBlock" 
                    bg="gray.700" 
                    borderColor="gray.600"
                    defaultValue={`${donationType ? donationType.toUpperCase() : 'Donation'} Donation`}
                  />
                </FormControl>
                
                <Text color="gray.400" fontSize="xs" mt={2}>
                  You will be redirected to your bank's secure login page to complete the payment after clicking "Donate Now".
                </Text>
              </Box>
            )}

            <Button 
              variant="gradient" 
              size="lg" 
              w="full"
              leftIcon={<FaWallet />}
              onClick={onOpen} // Uses the original onOpen for money modal
              isDisabled={!paymentMethod}
              bgGradient="linear(to-r, brand.500, accent.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.600, accent.600)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px -10px rgba(11, 197, 234, 0.5)"
              }}
              _active={{
                bgGradient: "linear(to-r, brand.700, accent.700)",
                transform: "translateY(0)",
              }}
              transition="all 0.3s ease"
              height="56px"
              fontSize="md"
              fontWeight="600"
              borderRadius="xl"
              mt={4}
            >
              Donate Now
            </Button>
          </TabPanel>
          
          <TabPanel px={0}>
            {/* Physical Items Donation UI */}
            <Box>
              <Text color="gray.300" mb={4}>
                Donate physical items such as clothing, books, toys, electronics, or furniture to those in need.
              </Text>
              
              {/* Item Description */}
              <FormControl mb={5}>
                <FormLabel color="gray.300">Describe your items</FormLabel>
                <Textarea
                  placeholder="Describe the items you want to donate (type, condition, quantity, etc.)"
                  bg="rgba(26, 32, 44, 0.6)"
                  borderColor="gray.600"
                  _hover={{ borderColor: "brand.400" }}
                  _focus={{ 
                    borderColor: "brand.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                  }}
                  rows={4}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </FormControl>
              
              <Divider mb={5} borderColor="gray.700" />
              
              {/* Delivery Method Selection */}
              <Text color="gray.300" fontWeight="medium" mb={3}>How would you like to deliver these items?</Text>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={5}>
                {/* Self Delivery */}
                <Box
                  p={4}
                  bg={deliveryMethod === 'self' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={deliveryMethod === 'self' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => setDeliveryMethod('self')}
                  transition="all 0.3s ease"
                  boxShadow={deliveryMethod === 'self' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                >
                  <VStack spacing={3} align="flex-start">
                    <HStack>
                      <Icon 
                        as={FaBox} 
                        boxSize="24px" 
                        color={deliveryMethod === 'self' ? "brand.500" : "gray.400"}
                        filter={deliveryMethod === 'self' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                      />
                      <Text color="white" fontWeight="medium">Self Delivery</Text>
                    </HStack>
                    <Text color="gray.400" fontSize="sm">
                      Deliver items yourself to a charity center near you
                    </Text>
                  </VStack>
                </Box>
                
                {/* Lalamove Delivery */}
                <Box
                  p={4}
                  bg={deliveryMethod === 'lalamove' ? "rgba(11, 197, 234, 0.1)" : "rgba(26, 32, 44, 0.6)"}
                  borderWidth="1px"
                  borderColor={deliveryMethod === 'lalamove' ? "brand.500" : "gray.700"}
                  borderRadius="xl"
                  cursor="pointer"
                  onClick={() => setDeliveryMethod('lalamove')}
                  transition="all 0.3s ease"
                  boxShadow={deliveryMethod === 'lalamove' ? selectedGlow : "none"}
                  _hover={{
                    borderColor: "brand.400",
                    transform: "translateY(-2px)",
                    boxShadow: hoverGlow
                  }}
                  position="relative"
                  overflow="hidden"
                >
                  <VStack spacing={3} align="flex-start">
                    <HStack>
                      <Icon 
                        as={FaTruck} 
                        boxSize="24px" 
                        color={deliveryMethod === 'lalamove' ? "brand.500" : "gray.400"}
                        filter={deliveryMethod === 'lalamove' ? "drop-shadow(0 0 5px rgba(11, 197, 234, 0.5))" : "none"}
                      />
                      <Text color="white" fontWeight="medium">Lalamove Delivery</Text>
                      <Badge colorScheme="green" variant="solid" fontSize="xs">Recommended</Badge>
                    </HStack>
                    <Text color="gray.400" fontSize="sm">
                      Let Lalamove pick up and deliver your items
                    </Text>
                  </VStack>
                </Box>
              </Grid>
              
              {/* Self Delivery Details */}
              {deliveryMethod === 'self' && (
                <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                  <Text color="white" fontWeight="medium" mb={3}>
                    <Icon as={FaMapMarkerAlt} mr={2} color="brand.500" />
                    Select a charity center
                  </Text>
                  
                  <FormControl mb={4}>
                    <Select 
                      placeholder="Choose a center near you" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      value={selectedCenter}
                      onChange={(e) => handleCenterSelect(e.target.value)}
                      // Add sx prop to style the options
                      sx={{
                        '> option': {
                          background: 'gray.800', // Set background for options
                          color: 'white',         // Ensure text is readable
                        },
                        '> option:hover': {
                          background: 'gray.600', // Optional hover style
                        }
                      }}
                    >
                      {charityCentersWithDistance.length > 0 ? (
                        charityCentersWithDistance.map(center => (
                          <option key={center.id} value={center.id}>
                            {center.name} {center.distance ? `(${center.distance.toFixed(1)} km)` : ''}
                          </option>
                        ))
                      ) : (
                        charityCenters.map(center => (
                          <option key={center.id} value={center.id}>{center.name}</option>
                        ))
                      )}
                    </Select>
                  </FormControl>
                  
                  {/* Charity Centers Map */}
                  <Box 
                    height="300px" 
                    bg="gray.700" 
                    borderRadius="md" 
                    mb={4} 
                    position="relative"
                    overflow="hidden"
                  >
                    <MapContainer
                      center={mapCenter} // Use state
                      zoom={mapZoom}     // Use state
                      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                      zoomControl={true}
                      scrollWheelZoom={true}
                      // Use whenReady for initialization logic
                      whenReady={(mapEvent) => {
                        // mapEvent.target is the map instance
                        const mapInstance = mapEvent.target;
                        mapRef.current = mapInstance; // Store instance if needed
                        
                        // Invalidate size immediately when map is ready
                        mapInstance.invalidateSize();
                        
                        // Set the view using the current state AFTER invalidating
                        mapInstance.setView(mapCenter, mapZoom);
                      }} 
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      {/* User Location Marker */}
                      {userLocation && userLocation.lat && userLocation.lng && !isNaN(userLocation.lat) && !isNaN(userLocation.lng) && (
                        <Marker 
                          position={[userLocation.lat, userLocation.lng]}
                          icon={UserLocationIcon}
                          zIndexOffset={1000}
                        >
                          <Popup className="custom-popup">
                            <Box 
                              bg="red.800" 
                              color="white" 
                              p={2}
                              borderRadius="md"
                              borderWidth="1px"
                              borderColor="red.700"
                            >
                              <Text fontWeight="bold">Your Location</Text>
                              {selectedCenterDetails && selectedCenterDetails.distance && (
                                <Text fontSize="sm">
                                  {selectedCenterDetails.distance.toFixed(1)} km to selected center
                                </Text>
                              )}
                            </Box>
                          </Popup>
                        </Marker>
                      )}
                      
                      {/* Charity Center Markers */}
                      {(charityCentersWithDistance.length > 0 ? charityCentersWithDistance : charityCenters).map((center) => {
                        // Validate coordinates
                        const lat = parseFloat(center.coords.lat);
                        const lng = parseFloat(center.coords.lng);
                        
                        // Only render if coordinates are valid
                        if (isNaN(lat) || isNaN(lng)) {
                          return null;
                        }
                        
                        return (
                          <Marker 
                            key={center.id}
                            position={[lat, lng]}
                            eventHandlers={{
                              click: () => handleCenterSelect(center.id),
                            }}
                          >
                            <Popup className="custom-popup">
                              <Box 
                                bg={selectedCenter === center.id ? "brand.800" : "gray.800"}
                                color="white" 
                                p={2}
                                borderRadius="md"
                                borderWidth="1px"
                                borderColor={selectedCenter === center.id ? "brand.500" : "gray.700"}
                                onClick={() => handleCenterSelect(center.id)}
                                cursor="pointer"
                                _hover={{ bg: "gray.700" }}
                              >
                                <Text fontWeight="bold">{center.name}</Text>
                                <Text fontSize="sm">{center.address}</Text>
                                <Text fontSize="xs" mt={1}>Hours: {center.hours}</Text>
                                {center.distance && (
                                  <Text fontSize="xs" mt={1} color="brand.300">
                                    Distance: {center.distance.toFixed(1)} km
                                  </Text>
                                )}
                                <Button 
                                  size="xs" 
                                  colorScheme="brand" 
                                  mt={2} 
                                  onClick={() => handleCenterSelect(center.id)}
                                  width="100%"
                                >
                                  Select This Center
                                </Button>
                              </Box>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </MapContainer>
                  </Box>
                  
                  {selectedCenterDetails && (
                    <Box p={3} bg="gray.700" borderRadius="md">
                      <Text color="white" fontWeight="medium">{selectedCenterDetails.name}</Text>
                      <Text color="gray.300" fontSize="sm">{selectedCenterDetails.address}</Text>
                      <Text color="gray.300" fontSize="sm">Open: {selectedCenterDetails.hours}</Text>
                      <Text color="gray.300" fontSize="sm">Contact: {selectedCenterDetails.contact}</Text>
                      {selectedCenterDetails.distance && (
                        <Text color="brand.300" fontSize="sm">Distance: {selectedCenterDetails.distance.toFixed(1)} km</Text>
                      )}
                    </Box>
                  )}
                  
                  <Text color="gray.400" fontSize="xs" mt={3}>
                    Please ensure you bring your items during operating hours. You'll receive a donation receipt upon delivery.
                  </Text>
                </Box>
              )}
              
              {/* Lalamove Delivery Details */}
              {deliveryMethod === 'lalamove' && (
                <Box mt={4} p={4} bg="rgba(26, 32, 44, 0.6)" borderRadius="md" borderWidth="1px" borderColor="gray.700">
                  <Text color="white" fontWeight="medium" mb={3}>
                    <Icon as={FaTruck} mr={2} color="brand.500" />
                    Lalamove Delivery Details
                  </Text>
                  
                  <Box mb={4} p={3} bg="rgba(11, 197, 234, 0.05)" borderRadius="md" borderLeftWidth="3px" borderLeftColor="brand.500">
                    <HStack>
                      <Icon as={FaPercentage} color="brand.500" boxSize="16px" />
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        Special Discount for Donors!
                      </Text>
                    </HStack>
                    <Text color="gray.300" fontSize="xs" mt={1}>
                      Thank you for your generosity! As a token of appreciation for your donation, we're subsidizing your delivery fee by {discountPercentage}%.
                    </Text>
                  </Box>
                  
                  <FormControl mb={3} isRequired> {/* Add isRequired */}
                    <FormLabel color="gray.300" fontSize="sm">Your Address</FormLabel>
                    <Input 
                      placeholder="Enter your full address" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      value={lalamoveAddress}
                      onChange={(e) => setLalamoveAddress(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl mb={3} isRequired> {/* Add isRequired */}
                    <FormLabel color="gray.300" fontSize="sm">Contact Number</FormLabel>
                    <Input 
                      placeholder="Enter your phone number" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      value={lalamoveContact}
                      onChange={(e) => setLalamoveContact(e.target.value)}
                      type="tel" // Use tel type for phone numbers
                    />
                  </FormControl>
                  
                  <FormControl mb={3} isRequired> {/* Add isRequired */}
                    <FormLabel color="gray.300" fontSize="sm">Delivery Date</FormLabel>
                    <Input 
                      type="date" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      min={new Date().toISOString().split('T')[0]}
                      value={lalamoveDate}
                      onChange={(e) => setLalamoveDate(e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl mb={3} isRequired> {/* Add isRequired */}
                    <FormLabel color="gray.300" fontSize="sm">Preferred Time</FormLabel>
                    <Select 
                      placeholder="Select preferred time" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      value={lalamoveTime}
                      onChange={(e) => setLalamoveTime(e.target.value)}
                      sx={{ // Style options for dark mode
                        '> option': {
                          background: 'gray.800',
                          color: 'white',
                        },
                        '> option:hover': {
                          background: 'gray.600',
                        }
                      }}
                    >
                      <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                      <option value="Afternoon (12PM - 3PM)">Afternoon (12PM - 3PM)</option>
                      <option value="Evening (3PM - 6PM)">Evening (3PM - 6PM)</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl mb={3}>
                    <FormLabel color="gray.300" fontSize="sm">Delivery Note (Optional)</FormLabel>
                    <Textarea 
                      placeholder="Any additional instructions for the driver" 
                      bg="gray.700" 
                      borderColor="gray.600"
                      rows={2}
                      value={lalamoveNote}
                      onChange={(e) => setLalamoveNote(e.target.value)}
                    />
                  </FormControl>
                  
                  <Flex justify="space-between" align="center" mt={4} p={3} bg="gray.700" borderRadius="md">
                    <VStack align="flex-start" spacing={1}>
                      <Text color="white">Delivery Fee:</Text>
                      <HStack spacing={2}>
                        <Text color="gray.400" fontSize="sm" textDecoration="line-through">
                          RM {originalDeliveryFee.toFixed(2)}
                        </Text>
                        <Badge colorScheme="green" variant="solid">
                          {discountPercentage}% OFF
                        </Badge>
                      </HStack>
                    </VStack>
                    <Text color="white" fontWeight="bold">
                      RM {discountedDeliveryFee.toFixed(2)}
                    </Text>
                  </Flex>
                  
                  <Text color="gray.400" fontSize="xs" mt={3}>
                    The delivery fee shown is subsidized for donors. Our team will contact you to confirm the pickup details.
                  </Text>
                </Box>
              )}
              
              <Button 
                variant="gradient" 
                size="lg" 
                w="full"
                leftIcon={deliveryMethod === 'self' ? <FaBox /> : <FaTruck />}
                // Use the new onOpen for the physical confirmation modal
                onClick={onPhysicalConfirmOpen} 
                // Update isDisabled logic
                isDisabled={
                  !itemDescription || 
                  (deliveryMethod === 'self' && !selectedCenter) ||
                  (deliveryMethod === 'lalamove' && !isLalamoveFormValid) 
                }
                bgGradient="linear(to-r, accent.500, brand.500)"
                _hover={{
                  bgGradient: "linear(to-r, accent.600, brand.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px -10px rgba(236, 110, 76, 0.5)"
                }}
                _active={{
                  bgGradient: "linear(to-r, accent.700, brand.700)",
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                height="56px"
                fontSize="md"
                fontWeight="600"
                borderRadius="xl"
                mt={5}
              >
                {deliveryMethod === 'self' ? 'Confirm Donation' : 'Schedule Pickup'}
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Physical Donation Confirmation Modal */}
      <PhysicalDonationConfirmationModal
        isOpen={isPhysicalConfirmOpen}
        onClose={onPhysicalConfirmClose}
        itemDescription={itemDescription}
        deliveryMethod={deliveryMethod}
        selectedCenterDetails={selectedCenterDetails}
        // Pass Lalamove details as props
        lalamoveAddress={lalamoveAddress}
        lalamoveContact={lalamoveContact}
        lalamoveDate={lalamoveDate}
        lalamoveTime={lalamoveTime}
        lalamoveNote={lalamoveNote}
        handleConfirm={handleConfirmPhysicalDonation}
        loading={isConfirmingPhysical}
      />
    </Box>
  );
};

export default DonationComponent;
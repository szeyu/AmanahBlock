import React from 'react';
import { Box, Heading, Text, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import hataLogo from '../../assets/images/hata.jpeg'; // Importing the Hata logo
import lunoLogo from '../../assets/images/luno.png'; // Importing the Luno logo
import sinergyLogo from '../../assets/images/sinergy.png'; // Importing the Sinergy logo

// Placeholder data for partner logos from logoipsum.com
const partners = [
  { name: 'Hata', logo: hataLogo }, // Using the Hata logo
  { name: 'Luno', logo: lunoLogo },
  { name: 'Sinergy', logo: sinergyLogo },
  { name: 'Wayne Enterprises', logo: 'https://logoipsum.com/assets/logo/logo-10.svg' },
  { name: 'Cyberdyne Systems', logo: 'https://logoipsum.com/assets/logo/logo-11.svg' },
  { name: 'Umbrella Corp', logo: 'https://logoipsum.com/assets/logo/logo-13.svg' },
  { name: 'Buy N Large', logo: 'https://logoipsum.com/assets/logo/logo-15.svg' },
  { name: 'Initech', logo: 'https://logoipsum.com/assets/logo/logo-16.svg' },
  { name: 'Soylent Corp', logo: 'https://logoipsum.com/assets/logo/logo-17.svg' },
  { name: 'Massive Dynamic', logo: 'https://logoipsum.com/assets/logo/logo-18.svg' },
  { name: 'Blue Sun', logo: 'https://logoipsum.com/assets/logo/logo-21.svg' },
  { name: 'Virtucon', logo: 'https://logoipsum.com/assets/logo/logo-23.svg' },
];

// Split partners into two rows
const firstRowPartners = partners.slice(0, 6);
const secondRowPartners = partners.slice(6);

// Define keyframes for scrolling animations
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const PartnersSection = () => {
  const filterValue = useColorModeValue('none', 'invert(1) grayscale(100%) brightness(2)');
  const bgValue = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.2)');

  // Create a logo item for the scrolling row
  const renderLogoItem = (partner, index) => (
    <Box
      key={`${partner.name}-${index}`}
      p={4}
      mx={2}
      borderRadius="md"
      bg="transparent"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="80px"
      width={{ base: "140px", md: "180px" }}
      flexShrink={0}
      transition="transform 0.3s ease, background-color 0.3s ease"
      position="relative" // Needed for z-index to work
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        maxH="40px"
        maxW="80%"
        objectFit="contain"
        filter={filterValue}
      />
    </Box>
  );

  // Create a row of logos with duplicates to ensure it fills the space
  const createLogoRow = (partnerList, scrollDirection) => {
    // Duplicate the list multiple times to ensure it fills the space
    const duplicatedPartners = [...partnerList, ...partnerList, ...partnerList, ...partnerList];
    
    return (
      <Flex
        w="full"
        overflow="hidden"
        position="relative"
        mb={scrollDirection === scrollLeft ? 8 : 0}

        // Add hover pause effect
        sx={{
          '&:hover > div': { // Target direct children divs on hover
            animationPlayState: 'paused',
          },
        }}
      >
        <Flex
          position="absolute"
          width="max-content" 
          animation={`${scrollDirection} 30s linear infinite`}
        >
          {duplicatedPartners.map((partner, index) => renderLogoItem(partner, index))}
        </Flex>
        {/* Create a duplicate set for seamless looping */}
        <Flex
          ml="0"
          width="max-content"
          animation={`${scrollDirection} 30s linear infinite`}
        >
          {duplicatedPartners.map((partner, index) => renderLogoItem(partner, `dup-${index}`))}
        </Flex>
      </Flex>
    );
  };

  return (
    <Box 
      bg="transparent"
      py={20} 
      position="relative"
      zIndex={1}
    >
      <Box maxW="container.xl" mx="auto" px={4} textAlign="center" mb={12}>
        <Heading 
          as="h2" 
          size="xl" 
          mb={2}
          bgGradient="linear(to-r, #00E0FF, #8A7CFB)" 
          bgClip="text"
          fontWeight="bold"
        >
          Our Partners & Collaborators
        </Heading>
        <Text color="white" fontSize="lg">
          We are proud to collaborate with forward-thinking organizations.
        </Text>
      </Box>

      {/* First row scrolling left */}
      {createLogoRow(firstRowPartners, scrollLeft)}
    </Box>
  );
};

export default PartnersSection; 
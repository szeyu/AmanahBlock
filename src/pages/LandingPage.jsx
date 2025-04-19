import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Import keyframes

// Import refactored components
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';
import ImpactSection from '../components/landing/ImpactSection';
import PartnersSection from '../components/landing/PartnersSection';

// Keyframes for floating animation (Define once here)
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const floatAnimation = (duration, direction = 'alternate') => `${float} ${duration} infinite ${direction} ease-in-out`;

const LandingPage = () => {
  return (
    <Box 
      // bg="#0D101F" // Base dark background for the whole page
      bg="transparent"
      position="relative" 
      overflow="hidden" // Prevent orbs from spilling out
    >
      {/* Background Elements Applied to the Entire Page */}
      <Box 
        position="fixed" // Use fixed to stay in viewport during scroll
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial-gradient(circle at 10% 20%, rgba(0, 224, 255, 0.08) 0%, transparent 50%), 
                     radial-gradient(circle at 90% 80%, rgba(138, 124, 251, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 50% 50%, rgba(72, 187, 120, 0.06) 0%, transparent 40%)" // Combined gradients
        opacity={0.7}
        zIndex={-1} // Ensure it's behind content
      />
      <Box 
        position="fixed" // Use fixed for orbs
        top="5%" 
        left="10%" 
        w={{ base: "100px", md: "180px" }} 
        h={{ base: "100px", md: "180px" }} 
        borderRadius="full" 
        bg="#00E0FF" 
        opacity={0.08} 
        filter="blur(70px)"
        animation={floatAnimation('12s')}
        zIndex={-1}
      />
      <Box 
        position="fixed" // Use fixed for orbs
        bottom="10%" 
        right="5%" 
        w={{ base: "120px", md: "220px" }} 
        h={{ base: "120px", md: "220px" }} 
        borderRadius="full" 
        bg="#8A7CFB" 
        opacity={0.08} 
        filter="blur(90px)"
        animation={floatAnimation('15s', 'alternate-reverse')}
        zIndex={-1}
      />

      {/* Page Content Sections */}
      {/* Ensure content sections have zIndex > 0 or default */}
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ImpactSection />
      <PartnersSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage; 
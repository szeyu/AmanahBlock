import React from 'react';
import { Box } from '@chakra-ui/react';

// Import refactored components
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage; 
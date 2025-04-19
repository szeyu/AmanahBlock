import React from 'react';
import { Box, Container, Flex, Text, Link, VStack, HStack, Icon, Divider, Image } from '@chakra-ui/react';
import { FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg="#1A1A2E" py={10} mt={10}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" mb={8}>
          {/* Logo and Description */}
          <VStack align={{ base: 'center', md: 'flex-start' }} mb={{ base: 6, md: 0 }}>
            <Flex align="center" mb={2}>
              <Box w="50px" h="50px" borderRadius="full" mr={2}>
                <Image src={"/Amanah Block Logo.png"} alt="Logo" boxSize="50px" />
              </Box>
              <Box fontWeight="bold" fontSize="lg" bgGradient="linear(to-r, brand.500, accent.500)" bgClip="text">
                AmanahBlock
              </Box>
            </Flex>
            <Text color="gray.400" maxW="300px" textAlign={{ base: 'center', md: 'left' }}>
              A Shariah-compliant blockchain charity platform for transparent and ethical donations.
            </Text>
            <HStack spacing={4} mt={4}>
              <Link href="#" isExternal>
                <Icon as={FaTwitter} w={5} h={5} color="gray.400" _hover={{ color: 'brand.500' }} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaDiscord} w={5} h={5} color="gray.400" _hover={{ color: 'brand.500' }} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaGithub} w={5} h={5} color="gray.400" _hover={{ color: 'brand.500' }} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaTelegram} w={5} h={5} color="gray.400" _hover={{ color: 'brand.500' }} />
              </Link>
            </HStack>
          </VStack>

          {/* Links */}
          <Flex direction={{ base: 'column', sm: 'row' }} gap={8}>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
              <Text fontWeight="bold" mb={2}>Platform</Text>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>How it Works</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Shariah Compliance</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Transparency</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>FAQ</Link>
            </VStack>

            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
              <Text fontWeight="bold" mb={2}>Donate</Text>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Waqf</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Zakat</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Sadaqah</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Projects</Link>
            </VStack>

            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
              <Text fontWeight="bold" mb={2}>Legal</Text>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Terms of Service</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Privacy Policy</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Shariah Certification</Link>
              <Link href="#" color="gray.400" _hover={{ color: 'brand.500' }}>Contact Us</Link>
            </VStack>
          </Flex>
        </Flex>

        <Divider borderColor="gray.700" />

        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" pt={6}>
          <Text color="gray.500" fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
            © 2023 AmanahBlock. All rights reserved.
          </Text>
          <Text color="gray.500" fontSize="sm" mt={{ base: 2, md: 0 }}>
            Certified by Islamic Scholars Council
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 
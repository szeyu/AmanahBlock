import React, { useState } from 'react';
import { 
  Box, 
  Flex, 
  Button, 
  Image, 
  HStack, 
  useDisclosure, 
  IconButton, 
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  Badge,
  Tooltip,
  useToast,
  Divider
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerIcon, ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { 
  FaWallet, 
  FaEthereum, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaHistory, 
  FaCog, 
  FaGavel, 
  FaGlobeAfrica, 
  FaChartLine, 
  FaCalculator,
  FaProjectDiagram,
  FaRegClipboard,
  FaExclamationTriangle,
  FaHandHoldingHeart
} from 'react-icons/fa';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();
  const toast = useToast();

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }, 1000);
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Main navigation items including Funding Tracker and Emergency Fund
  const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/donate', label: 'Donate' },
    { path: '/projects', label: 'Projects' },
    { path: '/project-funding', label: 'Funding Tracker', icon: FaProjectDiagram },
    { path: '/emergency-fund', label: 'Emergency Fund', icon: FaExclamationTriangle },
    { path: '/governance', label: 'Governance', icon: FaGavel }
  ];

  // Secondary navigation items for dropdown
  const secondaryNavItems = [
    { path: '/islamic-defi', label: 'Islamic DeFi', icon: FaChartLine },
    { path: '/zakat-calculator', label: 'Zakat Calculator', icon: FaCalculator },
    { path: '/impact', label: 'Impact Explorer' },
    { path: '/beneficiary-feedback', label: 'Beneficiary Feedback' }
  ];

  return (
    <Box as="header" bg="rgba(10, 15, 30, 0.8)" py={4} px={8} position="sticky" top={0} zIndex={10} backdropFilter="blur(10px)" boxShadow="0 2px 10px rgba(0,0,0,0.3)">
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        {/* Logo */}
        <Link to="/">
          <Flex align="center">
            <Box 
              w="40px" 
              h="40px" 
              bg="accent.500" 
              borderRadius="full" 
              mr={2} 
              position="relative"
              overflow="hidden"
              _after={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 20%)',
              }}
            />
            <Box fontWeight="bold" fontSize="xl" bgGradient="linear(to-r, brand.500, accent.500)" bgClip="text">
              SadaqahChain
            </Box>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
          {mainNavItems.slice(0, 4).map((item) => (
            <Link to={item.path} key={item.path}>
              <Text 
                color={isActive(item.path) ? 'brand.500' : 'white'} 
                fontWeight={isActive(item.path) ? 'bold' : 'normal'} 
                _hover={{ color: 'brand.500' }}
              >
                {item.label}
              </Text>
            </Link>
          ))}
          
          <Link to={mainNavItems[4].path}>
            <Tooltip label="Emergency Fund" placement="bottom">
              <Flex 
                align="center" 
                color={isActive(mainNavItems[4].path) ? 'red.500' : 'white'} 
                fontWeight={isActive(mainNavItems[4].path) ? 'bold' : 'normal'} 
                _hover={{ color: 'red.500' }}
              >
                <Box as={mainNavItems[4].icon} mr={1} />
                <Text>{mainNavItems[4].label}</Text>
              </Flex>
            </Tooltip>
          </Link>
          
          <Link to={mainNavItems[5].path}>
            <Tooltip label="Community Governance" placement="bottom">
              <Flex 
                align="center" 
                color={isActive(mainNavItems[5].path) ? 'brand.500' : 'white'} 
                fontWeight={isActive(mainNavItems[5].path) ? 'bold' : 'normal'} 
                _hover={{ color: 'brand.500' }}
              >
                <Box as={mainNavItems[5].icon} mr={1} />
                <Text>{mainNavItems[5].label}</Text>
              </Flex>
            </Tooltip>
          </Link>
          
          {/* More dropdown for secondary items */}
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              variant="ghost" 
              color="white" 
              _hover={{ bg: 'whiteAlpha.200' }}
              _active={{ bg: 'whiteAlpha.300' }}
            >
              More
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.700">
              {secondaryNavItems.map((item) => (
                <MenuItem 
                  key={item.path} 
                  as={Link} 
                  to={item.path} 
                  bg="gray.800" 
                  _hover={{ bg: 'whiteAlpha.200' }}
                  icon={item.icon ? <Box as={item.icon} /> : null}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>

        {/* Auth/Wallet Section */}
        <HStack spacing={4}>
          {!isWalletConnected ? (
            <>
              <Link to="/login" display={{ base: 'none', md: 'block' }}>
                <Button variant="outline" borderColor="brand.500" color="brand.500">
                  Login
                </Button>
              </Link>
              <Button 
                leftIcon={<FaWallet />}
                variant="gradient"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton 
                as={Button} 
                variant="outline" 
                borderColor="gray.600"
                _hover={{ borderColor: 'brand.500' }}
              >
                <HStack>
                  <Box as={FaEthereum} color="brand.500" />
                  <Text>0x71C...93E4</Text>
                  <Badge colorScheme="green" ml={2}>2.14 ETH</Badge>
                </HStack>
              </MenuButton>
              <MenuList bg="gray.800" borderColor="gray.700">
                <MenuItem 
                  as={Link} 
                  to="/profile" 
                  bg="gray.800" 
                  _hover={{ bg: 'whiteAlpha.200' }}
                  icon={<Box as={FaUserCircle} />}
                >
                  My Profile
                </MenuItem>
                <MenuItem 
                  as={Link} 
                  to="/donations" 
                  bg="gray.800" 
                  _hover={{ bg: 'whiteAlpha.200' }}
                  icon={<Box as={FaHistory} />}
                >
                  My Donations
                </MenuItem>
                <MenuItem 
                  bg="gray.800" 
                  _hover={{ bg: 'whiteAlpha.200' }}
                  icon={<Box as={FaSignOutAlt} color="red.500" />}
                  onClick={handleDisconnectWallet}
                  color="red.400"
                >
                  Disconnect Wallet
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="white"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
        />

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
          <DrawerOverlay backdropFilter="blur(10px)" />
          <DrawerContent bg="gray.800" color="white">
            <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Box 
                    w="30px" 
                    h="30px" 
                    bg="accent.500" 
                    borderRadius="full" 
                    mr={2} 
                  />
                  <Text fontWeight="bold">SadaqahChain</Text>
                </Flex>
                <DrawerCloseButton position="static" />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" mt={4}>
                {/* Main Navigation Items */}
                {mainNavItems.map((item) => (
                  <Link to={item.path} key={item.path} onClick={onClose}>
                    <Flex align="center">
                      {item.icon && <Box as={item.icon} mr={2} color={isActive(item.path) ? 'brand.500' : 'gray.400'} />}
                      <Text 
                        color={isActive(item.path) ? 'brand.500' : 'white'} 
                        fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                        fontSize="lg"
                        py={2}
                      >
                        {item.label}
                      </Text>
                    </Flex>
                  </Link>
                ))}
                
                <Divider borderColor="gray.700" />
                <Text color="gray.400" fontWeight="bold" fontSize="sm">Features</Text>
                
                {/* Secondary Navigation Items */}
                {secondaryNavItems.map((item) => (
                  <Link to={item.path} key={item.path} onClick={onClose}>
                    <Flex align="center">
                      {item.icon && <Box as={item.icon} mr={2} color={isActive(item.path) ? 'brand.500' : 'gray.400'} />}
                      <Text 
                        color={isActive(item.path) ? 'brand.500' : 'white'} 
                        fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                      >
                        {item.label}
                      </Text>
                    </Flex>
                  </Link>
                ))}
                
                <Divider borderColor="gray.700" />
                
                {/* Auth/Wallet Section */}
                {!isWalletConnected ? (
                  <>
                    <Link to="/login" onClick={onClose}>
                      <Button variant="outline" w="full" borderColor="brand.500" color="brand.500">
                        Login
                      </Button>
                    </Link>
                    <Button 
                      w="full"
                      leftIcon={<FaWallet />}
                      variant="gradient"
                      onClick={() => {
                        handleConnectWallet();
                        onClose();
                      }}
                    >
                      Connect Wallet
                    </Button>
                  </>
                ) : (
                  <VStack align="stretch" spacing={4} p={3} bg="gray.700" borderRadius="md">
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Box as={FaEthereum} />
                        <Text fontWeight="medium">0x71C...93E4</Text>
                      </HStack>
                      <Badge colorScheme="green" variant="solid">2.14 ETH</Badge>
                    </Flex>
                    <Link to="/profile" onClick={onClose}>
                      <Button leftIcon={<Box as={FaUserCircle} />} variant="ghost" size="sm" justifyContent="flex-start" w="full">
                        My Profile
                      </Button>
                    </Link>
                    <Link to="/donations" onClick={onClose}>
                      <Button leftIcon={<Box as={FaHistory} />} variant="ghost" size="sm" justifyContent="flex-start" w="full">
                        My Donations
                      </Button>
                    </Link>
                    <Button 
                      leftIcon={<Box as={FaSignOutAlt} />} 
                      variant="outline" 
                      size="sm" 
                      colorScheme="red" 
                      onClick={() => {
                        handleDisconnectWallet();
                        onClose();
                      }}
                    >
                      Disconnect Wallet
                    </Button>
                  </VStack>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Header; 
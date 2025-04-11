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
  FaExclamationTriangle
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
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link to="/dashboard">
            <Text color={isActive('/dashboard') ? 'brand.500' : 'white'} fontWeight={isActive('/dashboard') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Dashboard
            </Text>
          </Link>
          <Link to="/donate">
            <Text color={isActive('/donate') ? 'brand.500' : 'white'} fontWeight={isActive('/donate') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Donate
            </Text>
          </Link>
          <Link to="/projects">
            <Text color={isActive('/projects') ? 'brand.500' : 'white'} fontWeight={isActive('/projects') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Projects
            </Text>
          </Link>
          <Link to="/project-funding">
            <Text color={isActive('/project-funding') ? 'brand.500' : 'white'} fontWeight={isActive('/project-funding') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Funding Tracker
            </Text>
          </Link>
          <Link to="/emergency-fund">
            <Text color={isActive('/emergency-fund') ? 'brand.500' : 'white'} fontWeight={isActive('/emergency-fund') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Emergency Fund
            </Text>
          </Link>
          <Link to="/beneficiary-feedback">
            <Text color={isActive('/beneficiary-feedback') ? 'brand.500' : 'white'} fontWeight={isActive('/beneficiary-feedback') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Beneficiary Feedback
            </Text>
          </Link>
          <Link to="/governance">
            <Text color={isActive('/governance') ? 'brand.500' : 'white'} fontWeight={isActive('/governance') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Governance
            </Text>
          </Link>
          <Link to="/impact">
            <Text color={isActive('/impact') ? 'brand.500' : 'white'} fontWeight={isActive('/impact') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Impact
            </Text>
          </Link>
          <Link to="/islamic-defi">
            <Text color={isActive('/islamic-defi') ? 'brand.500' : 'white'} fontWeight={isActive('/islamic-defi') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Islamic DeFi
            </Text>
          </Link>
          <Link to="/zakat-calculator">
            <Text color={isActive('/zakat-calculator') ? 'brand.500' : 'white'} fontWeight={isActive('/zakat-calculator') ? 'bold' : 'normal'} _hover={{ color: 'brand.500' }}>
              Zakat
            </Text>
          </Link>
        </HStack>

        {/* Connect Wallet Button (Desktop) */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {!isWalletConnected ? (
            <>
              <Link to="/login">
                <Button variant="outline" borderColor="brand.500" color="brand.500">
                  Login
                </Button>
              </Link>
              <Button 
                leftIcon={<FaWallet />}
                variant="gradient"
                onClick={handleConnectWallet}
                loadingText="Connecting..."
              >
                Connect Wallet
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.2)"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<FaEthereum />}
              >
                <HStack>
                  <Text>0x71C...93E4</Text>
                  <Badge colorScheme="green" variant="solid" borderRadius="full" px={2}>
                    2.14 ETH
                  </Badge>
                </HStack>
              </MenuButton>
              <MenuList bg="gray.800" borderColor="gray.700">
                <Link to="/profile">
                  <MenuItem icon={<FaUserCircle />} _hover={{ bg: 'gray.700' }}>My Profile</MenuItem>
                </Link>
                <Link to="/donations">
                  <MenuItem icon={<FaHistory />} _hover={{ bg: 'gray.700' }}>My Donations</MenuItem>
                </Link>
                <Link to="/settings">
                  <MenuItem icon={<FaCog />} _hover={{ bg: 'gray.700' }}>Settings</MenuItem>
                </Link>
                <MenuDivider borderColor="gray.700" />
                <MenuItem icon={<FaSignOutAlt />} onClick={handleDisconnectWallet} _hover={{ bg: 'gray.700' }}>
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
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="ghost"
          color="white"
        />

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.800" color="white">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" mt={4}>
                <Link to="/dashboard" onClick={onClose}>
                  <Text color={isActive('/dashboard') ? 'brand.500' : 'white'} fontWeight={isActive('/dashboard') ? 'bold' : 'normal'}>
                    Dashboard
                  </Text>
                </Link>
                <Link to="/donate" onClick={onClose}>
                  <Text color={isActive('/donate') ? 'brand.500' : 'white'} fontWeight={isActive('/donate') ? 'bold' : 'normal'}>
                    Donate
                  </Text>
                </Link>
                <Link to="/projects" onClick={onClose}>
                  <Text color={isActive('/projects') ? 'brand.500' : 'white'} fontWeight={isActive('/projects') ? 'bold' : 'normal'}>
                    Projects
                  </Text>
                </Link>
                
                <Link to="/project-funding" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaRegClipboard} mr={2} color={isActive('/project-funding') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/project-funding') ? 'brand.500' : 'white'} fontWeight={isActive('/project-funding') ? 'bold' : 'normal'}>
                      Funding Tracker
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/emergency-fund" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaExclamationTriangle} mr={2} color={isActive('/emergency-fund') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/emergency-fund') ? 'brand.500' : 'white'} fontWeight={isActive('/emergency-fund') ? 'bold' : 'normal'}>
                      Emergency Fund
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/beneficiary-feedback" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaUserCircle} mr={2} color={isActive('/beneficiary-feedback') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/beneficiary-feedback') ? 'brand.500' : 'white'} fontWeight={isActive('/beneficiary-feedback') ? 'bold' : 'normal'}>
                      Beneficiary Feedback
                    </Text>
                  </Flex>
                </Link>
                
                <Divider borderColor="gray.700" />
                <Text color="gray.400" fontWeight="bold" fontSize="sm">Web3 Features</Text>
                
                <Link to="/governance" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaGavel} mr={2} color={isActive('/governance') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/governance') ? 'brand.500' : 'white'} fontWeight={isActive('/governance') ? 'bold' : 'normal'}>
                      Governance
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/impact" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaGlobeAfrica} mr={2} color={isActive('/impact') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/impact') ? 'brand.500' : 'white'} fontWeight={isActive('/impact') ? 'bold' : 'normal'}>
                      Impact Explorer
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/islamic-defi" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaChartLine} mr={2} color={isActive('/islamic-defi') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/islamic-defi') ? 'brand.500' : 'white'} fontWeight={isActive('/islamic-defi') ? 'bold' : 'normal'}>
                      Islamic DeFi
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/zakat-calculator" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaCalculator} mr={2} color={isActive('/zakat-calculator') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/zakat-calculator') ? 'brand.500' : 'white'} fontWeight={isActive('/zakat-calculator') ? 'bold' : 'normal'}>
                      Zakat Calculator
                    </Text>
                  </Flex>
                </Link>
                
                <Link to="/audit-trail" onClick={onClose}>
                  <Flex align="center">
                    <Box as={FaHistory} mr={2} color={isActive('/audit-trail') ? 'brand.500' : 'gray.400'} />
                    <Text color={isActive('/audit-trail') ? 'brand.500' : 'white'} fontWeight={isActive('/audit-trail') ? 'bold' : 'normal'}>
                      Audit Trail
                    </Text>
                  </Flex>
                </Link>
                
                <Divider borderColor="gray.700" />
                
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
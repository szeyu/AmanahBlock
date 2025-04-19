import React, { useState } from "react";
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
  Divider,
  Icon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ExternalLinkAlt,
} from "@chakra-ui/icons";
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
  FaHandHoldingHeart,
  FaBookOpen,
  FaRegLightbulb,
  FaComments,
  FaChartPie,
  FaSearch,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import WalletConnect from "../wallet/WalletConnect";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();
  const toast = useToast();

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet has been successfully connected.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      as="header"
      bg="rgba(10, 15, 30, 0.8)"
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
        px={4}
        py={3}
      >
        {/* Logo and Navigation */}
        <Flex align="center">
          <Link to="/">
            <Flex align="center" mr={8}>
              <Box
                w="45px"
                h="45px"
                // bg="accent.500"
                borderRadius="full"
                mr={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={"/Amanah Block Logo.png"}
                  alt="Logo"
                  boxSize="50px"
                />
              </Box>
              <Text
                fontWeight="bold"
                fontSize="xl"
                bgGradient="linear(to-r, brand.500, accent.500)"
                bgClip="text"
              >
                AmanahBlock
              </Text>
            </Flex>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={1} display={{ base: "none", md: "flex" }}>
            <NavLink
              to="/dashboard"
              label="Dashboard"
              isActive={isActive("/dashboard")}
            />

            <NavLink
              to="/donate"
              label="Donate"
              isActive={isActive("/donate")}
              isPrimary={true}
            />

            <NavLink
              to="/governance"
              label="Governance"
              isActive={isActive("/governance")}
            />

            <NavLink
              to="/islamic-defi"
              label="Islamic Defi"
              isActive={isActive("/islamic-defi")}
            />

            <NavLink
              to="/projects-all"
              label="All Projects"
              isActive={isActive("/projects-all")}
            />

            {/* More dropdown menu */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                rightIcon={<ChevronDownIcon />}
                color={
                  isActive("/zakat-calculator") ||
                  isActive("/impact") ||
                  isActive("/beneficiary-feedback")
                    ? "white"
                    : "gray.300"
                }
                fontWeight={
                  isActive("/zakat-calculator") ||
                  isActive("/impact") ||
                  isActive("/beneficiary-feedback")
                    ? "bold"
                    : "normal"
                }
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
                _active={{
                  bg: "rgba(255, 255, 255, 0.1)",
                }}
              >
                More
              </MenuButton>
              <MenuList bg="gray.800" borderColor="gray.700">
                <MenuItem
                  as={Link}
                  to="/zakat-calculator"
                  icon={<FaCalculator />}
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                >
                  Zakat Calculator
                </MenuItem>
                <MenuItem
                  as={Link}
                  to="/impact"
                  icon={<FaChartPie />}
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                >
                  Impact Explorer
                </MenuItem>
                <MenuItem
                  as={Link}
                  to="/beneficiary-feedback"
                  icon={<FaComments />}
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                >
                  Beneficiary Feedback
                </MenuItem>
                <MenuDivider borderColor="gray.700" />
                <MenuItem
                  as={Link}
                  to="/learn"
                  icon={<FaBookOpen />}
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                >
                  Learn
                </MenuItem>
              </MenuList>
            </Menu>

            <NavLink
              to="/admin"
              label="Admin"
              isActive={isActive("/admin")}
              icon={<FaShieldAlt />}
            />
          </HStack>
        </Flex>

        {/* Right side - Auth & Wallet */}
        <HStack spacing={3}>
          {/* Login Button - Only show when not connected */}
          {!isWalletConnected && (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                }}
              >
                Login
              </Button>
            </Link>
          )}

          {/* Wallet Connection Button */}
          <WalletConnect />

          {/* Mobile menu button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            color="white"
            _hover={{
              bg: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </HStack>

        {/* Mobile drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay backdropFilter="blur(10px)" />
          <DrawerContent bg="gray.800" color="white">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
              <Flex align="center">
                <Box
                  w="30px"
                  h="30px"
                  bg="accent.500"
                  borderRadius="full"
                  mr={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box as={FaHandHoldingHeart} color="white" size="16px" />
                </Box>
                <Text fontWeight="bold">SadaqahChain</Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack align="stretch" spacing={4} mt={4}>
                <MobileNavLink
                  to="/dashboard"
                  label="Dashboard"
                  icon={FaChartLine}
                  onClick={onClose}
                />
                <MobileNavLink
                  to="/donate"
                  label="Donate"
                  icon={FaHandHoldingHeart}
                  onClick={onClose}
                  isPrimary={true}
                />

                <Divider borderColor="gray.700" />

                <Text color="gray.400" fontSize="sm" fontWeight="bold" px={3}>
                  Projects
                </Text>
                <MobileNavLink
                  to="/projects-all"
                  label="All Projects"
                  icon={FaProjectDiagram}
                  onClick={onClose}
                />

                <Divider borderColor="gray.700" />

                <MobileNavLink
                  to="/governance"
                  label="Governance"
                  icon={FaGavel}
                  onClick={onClose}
                />

                <Divider borderColor="gray.700" />

                <Text color="gray.400" fontSize="sm" fontWeight="bold" px={3}>
                  More
                </Text>
                <MobileNavLink
                  to="/zakat-calculator"
                  label="Zakat Calculator"
                  icon={FaCalculator}
                  onClick={onClose}
                />
                <MobileNavLink
                  to="/impact"
                  label="Impact Explorer"
                  icon={FaChartPie}
                  onClick={onClose}
                />
                <MobileNavLink
                  to="/beneficiary-feedback"
                  label="Beneficiary Feedback"
                  icon={FaComments}
                  onClick={onClose}
                />
                <MobileNavLink
                  to="/learn"
                  label="Learn"
                  icon={FaBookOpen}
                  onClick={onClose}
                />

                <Divider borderColor="gray.700" />
                
                <Text color="gray.400" fontSize="sm" fontWeight="bold" px={3}>More</Text>
                <MobileNavLink to="/impact" label="Impact Explorer" icon={FaChartPie} onClick={onClose} />
                <MobileNavLink to="/beneficiary-feedback" label="Beneficiary Feedback" icon={FaComments} onClick={onClose} />
                <MobileNavLink to="/learn" label="Learn" icon={FaBookOpen} onClick={onClose} />
                

                <MobileNavLink
                  to="/admin"
                  label="Admin"
                  icon={FaShieldAlt}
                  onClick={onClose}
                />

                <Divider borderColor="gray.700" />

                {isWalletConnected ? (
                  <VStack
                    align="stretch"
                    spacing={4}
                    p={3}
                    bg="gray.700"
                    borderRadius="md"
                  >
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Box as={FaEthereum} />
                        <Text fontWeight="medium">0x71C...93E4</Text>
                      </HStack>
                      <Badge colorScheme="green" variant="solid">
                        2.14 ETH
                      </Badge>
                    </Flex>
                    <Link to="/profile" onClick={onClose}>
                      <Button
                        leftIcon={<Box as={FaUserCircle} />}
                        variant="ghost"
                        size="sm"
                        justifyContent="flex-start"
                        w="full"
                      >
                        My Profile
                      </Button>
                    </Link>
                    <Link to="/donations" onClick={onClose}>
                      <Button
                        leftIcon={<Box as={FaHistory} />}
                        variant="ghost"
                        size="sm"
                        justifyContent="flex-start"
                        w="full"
                      >
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
                ) : (
                  <VStack spacing={3}>
                    <Button
                      w="full"
                      bg="#00E0FF"
                      color="gray.800"
                      _hover={{
                        bg: "#00B5D8",
                      }}
                      leftIcon={<FaWallet />}
                      onClick={() => {
                        handleConnectWallet();
                        onClose();
                      }}
                    >
                      Connect Wallet
                    </Button>
                    <Link
                      to="/login"
                      onClick={onClose}
                      style={{ width: "100%" }}
                    >
                      <Button
                        variant="outline"
                        w="full"
                        borderColor="rgba(255, 255, 255, 0.2)"
                      >
                        Login
                      </Button>
                    </Link>
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

// Desktop Navigation Link
const NavLink = ({ to, label, isActive, isPrimary = false }) => {
  return (
    <Link to={to}>
      <Button
        variant={isPrimary ? "solid" : "ghost"}
        size="sm"
        px={4}
        bg={isPrimary ? "#00E0FF" : "transparent"}
        color={isPrimary ? "gray.800" : isActive ? "white" : "gray.300"}
        fontWeight={isActive ? "bold" : "normal"}
        position="relative"
        _hover={{
          bg: isPrimary ? "#00B5D8" : "rgba(255, 255, 255, 0.1)",
          color: isPrimary ? "gray.800" : "white",
        }}
        _after={{
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: isActive && !isPrimary ? "20px" : "0",
          height: "2px",
          bg: "#00E0FF",
          transition: "all 0.3s ease",
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, label, icon, onClick, isPrimary = false }) => {
  const Icon = icon;
  return (
    <Link to={to} onClick={onClick} style={{ width: "100%" }}>
      <Button
        variant={isPrimary ? "solid" : "ghost"}
        justifyContent="flex-start"
        w="full"
        leftIcon={<Icon />}
        bg={isPrimary ? "#00E0FF" : "transparent"}
        color={isPrimary ? "gray.800" : "white"}
        _hover={{
          bg: isPrimary ? "#00B5D8" : "rgba(255, 255, 255, 0.1)",
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default Header;

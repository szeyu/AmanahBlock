import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Box,
  Text,
  Flex,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaWallet, FaEthereum, FaUserCircle, FaHistory, FaGavel, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Contract ABIs and addresses
const CONTRACT_ADDRESSES = {
  USDT: '0xCe09eAC57455bC82808c44543dbc70d753E2b73d',
  P2P_EXCHANGE: '0x233B1eE8a06F51BA3B26b29aeF719564D7c48588',
  DONATION: '0x787F981dB30c0AeBa969f39E85669DD02c447105',
  FOOD_NFT: '0x57F9d5ccf2Aa2b0944f601aBEEAE69EfcF5D2A49'
};

const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const toast = useToast();

  useEffect(() => {
    initializeEthereum();
  }, []);

  const initializeEthereum = async () => {
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
        
        // Handle account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
        
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          handleAccountsChanged(accounts);
        }
      } else {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask to use this feature",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error initializing ethereum:", error);
    }
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setAccount(null);
      setBalance(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      // Get and set the balance
      if (provider) {
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      handleAccountsChanged(accounts);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (account) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          bg="#00E0FF"
          color="gray.800"
          _hover={{
            bg: "#00B5D8"
          }}
          _active={{
            bg: "#00B5D8"
          }}
          leftIcon={<FaWallet />}
          rightIcon={<ChevronDownIcon />}
        >
          {formatAddress(account)}
        </MenuButton>
        <MenuList bg="gray.800" borderColor="gray.700">
          <Box px={4} py={2}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text color="gray.400" fontSize="sm">Balance</Text>
              <Badge colorScheme="green" variant="solid">
                {parseFloat(balance).toFixed(4)} ETH
              </Badge>
            </Flex>
            <Flex align="center" mb={2}>
              <Box as={FaEthereum} color="brand.500" mr={2} />
              <Text color="white" fontSize="sm" fontFamily="mono">
                {account}
              </Text>
            </Flex>
          </Box>
          <MenuDivider borderColor="gray.700" />
          <MenuItem
            icon={<FaUserCircle />}
            as={Link}
            to="/profile"
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            icon={<FaHistory />}
            as={Link}
            to="/donations"
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
          >
            My Donations
          </MenuItem>
          <MenuItem
            icon={<FaGavel />}
            as={Link}
            to="/governance"
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
          >
            My Votes
          </MenuItem>
          <MenuDivider borderColor="gray.700" />
          <MenuItem
            icon={<FaSignOutAlt />}
            onClick={disconnectWallet}
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            color="red.300"
          >
            Disconnect Wallet
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button
      size="sm"
      bg="#00E0FF"
      color="gray.800"
      _hover={{
        bg: "#00B5D8"
      }}
      leftIcon={<FaWallet />}
      onClick={connectWallet}
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnect; 
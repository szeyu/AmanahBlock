import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractActions, CONTRACT_ADDRESSES } from '../utils/contracts';
import { useToast } from '@chakra-ui/react';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Initialize provider and signer
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setSigner(provider.getSigner());
        }
      }
    };
    init();
  }, []);

  // Handle donations
  const makeDonation = async (amount, donationType, projectId = "") => {
    try {
      setLoading(true);
      if (!signer) throw new Error("Please connect your wallet first");

      // Convert amount to wei (assuming USDT has 18 decimals like ETH)
      const amountInWei = ethers.utils.parseEther(amount.toString());
      
      await contractActions.donate(signer, amountInWei, donationType, projectId);
      
      toast({
        title: "Donation successful!",
        description: `Your ${donationType} of ${amount} USDT has been processed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Donation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle food NFT donations
  const makeFoodDonation = async (foodItems) => {
    try {
      setLoading(true);
      if (!signer) throw new Error("Please connect your wallet first");

      for (const item of foodItems) {
        const price = ethers.utils.parseEther(item.price.toString());
        const tokenURI = `ipfs://your-ipfs-hash/${item.id}`; // You'll need to implement IPFS storage
        
        await contractActions.createFoodNFT(
          signer,
          item.name,
          price,
          tokenURI
        );
      }

      toast({
        title: "Food donation successful!",
        description: "Your food donation NFTs have been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Food donation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle P2P exchange requests
  const requestP2PExchange = async (myrAmount, usdtAmount) => {
    try {
      setLoading(true);
      if (!signer) throw new Error("Please connect your wallet first");

      const myrAmountInWei = ethers.utils.parseEther(myrAmount.toString());
      const usdtAmountInWei = ethers.utils.parseEther(usdtAmount.toString());
      
      await contractActions.requestExchange(signer, myrAmountInWei, usdtAmountInWei);
      
      toast({
        title: "Exchange request created",
        description: `Your request to exchange ${myrAmount} MYR for ${usdtAmount} USDT has been created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Exchange request error:", error);
      toast({
        title: "Exchange request failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    account,
    signer,
    loading,
    makeDonation,
    makeFoodDonation,
    requestP2PExchange,
    CONTRACT_ADDRESSES
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}; 
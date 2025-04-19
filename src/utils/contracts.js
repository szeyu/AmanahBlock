import { ethers } from 'ethers';

// Contract ABIs
import DonationContractABI from '../contracts/DonationContract.json';
import P2PExchangeABI from '../contracts/P2PExchange.json';
import FoodDonationNFTABI from '../contracts/FoodDonationNFT.json';
import USDTMockABI from '../contracts/USDTMock.json';

export const CONTRACT_ADDRESSES = {
  USDT: '0xCe09eAC57455bC82808c44543dbc70d753E2b73d',
  P2P_EXCHANGE: '0x233B1eE8a06F51BA3B26b29aeF719564D7c48588',
  DONATION: '0x787F981dB30c0AeBa969f39E85669DD02c447105',
  FOOD_NFT: '0x57F9d5ccf2Aa2b0944f601aBEEAE69EfcF5D2A49'
};

export const getContracts = (signer) => {
  return {
    usdt: new ethers.Contract(CONTRACT_ADDRESSES.USDT, USDTMockABI, signer),
    p2pExchange: new ethers.Contract(CONTRACT_ADDRESSES.P2P_EXCHANGE, P2PExchangeABI, signer),
    donation: new ethers.Contract(CONTRACT_ADDRESSES.DONATION, DonationContractABI, signer),
    foodNFT: new ethers.Contract(CONTRACT_ADDRESSES.FOOD_NFT, FoodDonationNFTABI, signer)
  };
};

// Example contract interactions
export const contractActions = {
  // Donation actions
  async donate(signer, amount, donationType, projectId) {
    const contracts = getContracts(signer);
    
    // First approve USDT transfer
    const tx1 = await contracts.usdt.approve(CONTRACT_ADDRESSES.DONATION, amount);
    await tx1.wait();
    
    // Then make donation
    const tx2 = await contracts.donation.donate(amount, donationType, projectId);
    return await tx2.wait();
  },

  // P2P Exchange actions
  async requestExchange(signer, myrAmount, usdtAmount) {
    const contracts = getContracts(signer);
    const tx = await contracts.p2pExchange.requestExchange(myrAmount, usdtAmount);
    return await tx.wait();
  },

  // Food NFT actions
  async createFoodNFT(signer, foodType, price, tokenURI) {
    const contracts = getContracts(signer);
    const tx = await contracts.foodNFT.createFoodNFT(foodType, price, tokenURI);
    return await tx.wait();
  },

  async purchaseFoodNFT(signer, tokenId, price) {
    const contracts = getContracts(signer);
    
    // First approve USDT transfer
    const tx1 = await contracts.usdt.approve(CONTRACT_ADDRESSES.FOOD_NFT, price);
    await tx1.wait();
    
    // Then purchase NFT
    const tx2 = await contracts.foodNFT.purchaseNFT(tokenId);
    return await tx2.wait();
  }
}; 
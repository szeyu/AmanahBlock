const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the contract factories
  const DonationContract = await hre.ethers.getContractFactory("DonationContract");
  const P2PExchange = await hre.ethers.getContractFactory("P2PExchange");
  const FoodDonationNFT = await hre.ethers.getContractFactory("FoodDonationNFT");

  console.log("Deploying contracts...");

  // Deploy USDT Mock for testing
  const USDTMock = await hre.ethers.getContractFactory("USDTMock");
  const usdt = await USDTMock.deploy();
  await usdt.waitForDeployment();
  console.log("USDT Mock deployed to:", await usdt.getAddress());

  // Deploy P2P Exchange
  const p2pExchange = await P2PExchange.deploy(await usdt.getAddress());
  await p2pExchange.waitForDeployment();
  console.log("P2P Exchange deployed to:", await p2pExchange.getAddress());

  // Deploy Donation Contract
  const donationContract = await DonationContract.deploy(await usdt.getAddress());
  await donationContract.waitForDeployment();
  console.log("Donation Contract deployed to:", await donationContract.getAddress());

  // Deploy Food Donation NFT (needs USDT and Food Bank Pool address)
  // For testing, we'll use the donation contract as the food bank pool
  const foodDonationNFT = await FoodDonationNFT.deploy(
    await usdt.getAddress(),
    await donationContract.getAddress()
  );
  await foodDonationNFT.waitForDeployment();
  console.log("Food Donation NFT deployed to:", await foodDonationNFT.getAddress());

  // Register pools in donation contract
  await donationContract.registerPool("FOOD_BANK", await foodDonationNFT.getAddress());
  console.log("Registered Food Bank pool");

  console.log("\nDeployment complete! Contract addresses:");
  console.log("======================================");
  console.log("USDT Mock:", await usdt.getAddress());
  console.log("P2P Exchange:", await p2pExchange.getAddress());
  console.log("Donation Contract:", await donationContract.getAddress());
  console.log("Food Donation NFT:", await foodDonationNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

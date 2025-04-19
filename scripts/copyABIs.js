const fs = require('fs');
const path = require('path');

const contractNames = [
  'DonationContract',
  'P2PExchange',
  'FoodDonationNFT',
  'USDTMock'
];

const sourceDir = path.join(__dirname, '../amanahblock-backend/artifacts/contracts');
const targetDir = path.join(__dirname, '../src/contracts');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

contractNames.forEach(contractName => {
  let sourcePath;
  if (contractName === 'USDTMock') {
    sourcePath = path.join(sourceDir, 'mocks', contractName + '.sol', contractName + '.json');
  } else {
    sourcePath = path.join(sourceDir, 'core', contractName + '.sol', contractName + '.json');
  }
  
  const targetPath = path.join(targetDir, contractName + '.json');
  
  try {
    const artifact = require(sourcePath);
    // We only need the ABI for the frontend
    fs.writeFileSync(targetPath, JSON.stringify(artifact.abi, null, 2));
    console.log(`Copied ABI for ${contractName}`);
  } catch (error) {
    console.error(`Error copying ABI for ${contractName}:`, error);
  }
}); 
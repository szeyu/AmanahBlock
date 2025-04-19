// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title FoodDonationNFT
 * @dev NFT marketplace for food donations
 */
contract FoodDonationNFT is ERC721, ERC721URIStorage, ReentrancyGuard, Ownable {
    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        address creator,
        uint256 price,
        string foodType
    );
    event NFTPurchased(
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    // Structs
    struct FoodNFT {
        string foodType;
        uint256 price;
        bool isAvailable;
        address creator;
    }

    // State variables
    IERC20 public usdtToken;
    address public foodBankPool;
    uint256 public nextTokenId;
    mapping(uint256 => FoodNFT) public foodNFTs;

    constructor(
        address _usdtToken,
        address _foodBankPool
    ) ERC721("AmanahBlock Food Donation", "FOOD") {
        usdtToken = IERC20(_usdtToken);
        foodBankPool = _foodBankPool;
        nextTokenId = 1;
    }

    /**
     * @dev Create new food donation NFT
     * @param _foodType Type of food package
     * @param _price Price in USDT
     * @param _tokenURI IPFS URI containing metadata
     */
    function createFoodNFT(
        string memory _foodType,
        uint256 _price,
        string memory _tokenURI
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than 0");
        
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        foodNFTs[tokenId] = FoodNFT({
            foodType: _foodType,
            price: _price,
            isAvailable: true,
            creator: msg.sender
        });

        emit NFTMinted(tokenId, msg.sender, _price, _foodType);
    }

    /**
     * @dev Purchase food donation NFT
     * @param _tokenId Token ID to purchase
     */
    function purchaseNFT(uint256 _tokenId) external nonReentrant {
        FoodNFT storage nft = foodNFTs[_tokenId];
        require(nft.isAvailable, "NFT not available");
        require(msg.sender != nft.creator, "Creator cannot buy own NFT");

        // Transfer USDT from buyer
        require(
            usdtToken.transferFrom(msg.sender, foodBankPool, nft.price),
            "USDT transfer failed"
        );

        // Transfer NFT to buyer
        _transfer(ownerOf(_tokenId), msg.sender, _tokenId);
        nft.isAvailable = false;

        emit NFTPurchased(_tokenId, msg.sender, nft.price);
    }

    /**
     * @dev Update food bank pool address
     * @param _newPool New food bank pool address
     */
    function setFoodBankPool(address _newPool) external onlyOwner {
        require(_newPool != address(0), "Invalid address");
        foodBankPool = _newPool;
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 
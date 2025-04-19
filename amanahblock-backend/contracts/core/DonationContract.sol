// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title DonationContract
 * @dev Main contract for handling donations in AmanahBlock platform
 */
contract DonationContract is Ownable, ReentrancyGuard {
    // Events
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        string donationType,
        string projectId
    );
    event FundsAllocated(
        string indexed poolId,
        uint256 amount,
        string projectId
    );

    // Structs
    struct Donation {
        address donor;
        uint256 amount;
        string donationType; // "general", "specific", "emergency"
        uint256 timestamp;
        string projectId; // Empty if general donation
    }

    // State variables
    mapping(address => Donation[]) public donorHistory;
    mapping(string => address) public pools; // poolId => pool contract address
    uint256 public totalDonations;
    IERC20 public usdtToken;

    constructor(address _usdtToken) {
        usdtToken = IERC20(_usdtToken);
    }

    /**
     * @dev Receive donation in USDT
     * @param _amount Amount in USDT
     * @param _donationType Type of donation
     * @param _projectId Project ID if specific donation
     */
    function donate(
        uint256 _amount,
        string memory _donationType,
        string memory _projectId
    ) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer USDT from donor to contract
        require(
            usdtToken.transferFrom(msg.sender, address(this), _amount),
            "USDT transfer failed"
        );

        // Record donation
        Donation memory newDonation = Donation({
            donor: msg.sender,
            amount: _amount,
            donationType: _donationType,
            timestamp: block.timestamp,
            projectId: _projectId
        });

        donorHistory[msg.sender].push(newDonation);
        totalDonations += _amount;

        emit DonationReceived(msg.sender, _amount, _donationType, _projectId);

        // Route funds based on donation type
        _routeFunds(_amount, _donationType, _projectId);
    }

    /**
     * @dev Internal function to route funds to appropriate pools
     */
    function _routeFunds(
        uint256 _amount,
        string memory _donationType,
        string memory _projectId
    ) internal {
        address poolAddress = pools[_donationType];
        require(poolAddress != address(0), "Pool not found");

        require(
            usdtToken.transfer(poolAddress, _amount),
            "Pool transfer failed"
        );

        emit FundsAllocated(_donationType, _amount, _projectId);
    }

    /**
     * @dev Register a new pool
     * @param _poolId Pool identifier
     * @param _poolAddress Pool contract address
     */
    function registerPool(
        string memory _poolId,
        address _poolAddress
    ) external onlyOwner {
        require(_poolAddress != address(0), "Invalid pool address");
        pools[_poolId] = _poolAddress;
    }

    /**
     * @dev Get donor's donation history
     * @param _donor Donor address
     */
    function getDonorHistory(address _donor)
        external
        view
        returns (Donation[] memory)
    {
        return donorHistory[_donor];
    }
} 
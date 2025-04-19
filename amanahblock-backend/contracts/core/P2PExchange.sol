// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title P2PExchange
 * @dev Facilitates P2P exchange of MYR to USDT without Riba (interest)
 */
contract P2PExchange is Ownable, ReentrancyGuard {
    // Events
    event ExchangeRequested(
        uint256 indexed requestId,
        address requester,
        uint256 myrAmount,
        uint256 usdtAmount
    );
    event ExchangeCompleted(
        uint256 indexed requestId,
        address requester,
        address provider,
        uint256 myrAmount,
        uint256 usdtAmount
    );
    event ExchangeCancelled(uint256 indexed requestId);

    // Structs
    struct ExchangeRequest {
        address requester;
        uint256 myrAmount;
        uint256 usdtAmount;
        uint256 timestamp;
        bool isActive;
        bool isCompleted;
        address provider;
    }

    // State variables
    IERC20 public usdtToken;
    uint256 public nextRequestId;
    mapping(uint256 => ExchangeRequest) public exchangeRequests;
    mapping(address => uint256[]) public userRequests;

    constructor(address _usdtToken) {
        usdtToken = IERC20(_usdtToken);
        nextRequestId = 1;
    }

    /**
     * @dev Request MYR to USDT exchange
     * @param _myrAmount Amount in MYR (scaled by 1e18)
     * @param _usdtAmount Equivalent amount in USDT
     */
    function requestExchange(
        uint256 _myrAmount,
        uint256 _usdtAmount
    ) external nonReentrant {
        require(_myrAmount > 0, "Invalid MYR amount");
        require(_usdtAmount > 0, "Invalid USDT amount");

        uint256 requestId = nextRequestId++;
        
        ExchangeRequest memory newRequest = ExchangeRequest({
            requester: msg.sender,
            myrAmount: _myrAmount,
            usdtAmount: _usdtAmount,
            timestamp: block.timestamp,
            isActive: true,
            isCompleted: false,
            provider: address(0)
        });

        exchangeRequests[requestId] = newRequest;
        userRequests[msg.sender].push(requestId);

        emit ExchangeRequested(requestId, msg.sender, _myrAmount, _usdtAmount);
    }

    /**
     * @dev Complete exchange after off-chain MYR transfer
     * @param _requestId Exchange request ID
     */
    function completeExchange(uint256 _requestId) external nonReentrant {
        ExchangeRequest storage request = exchangeRequests[_requestId];
        require(request.isActive, "Request not active");
        require(!request.isCompleted, "Exchange already completed");
        
        // Transfer USDT from provider to requester
        require(
            usdtToken.transferFrom(msg.sender, request.requester, request.usdtAmount),
            "USDT transfer failed"
        );

        request.isActive = false;
        request.isCompleted = true;
        request.provider = msg.sender;

        emit ExchangeCompleted(
            _requestId,
            request.requester,
            msg.sender,
            request.myrAmount,
            request.usdtAmount
        );
    }

    /**
     * @dev Cancel exchange request
     * @param _requestId Exchange request ID
     */
    function cancelExchange(uint256 _requestId) external {
        ExchangeRequest storage request = exchangeRequests[_requestId];
        require(msg.sender == request.requester, "Not requester");
        require(request.isActive, "Request not active");
        require(!request.isCompleted, "Exchange already completed");

        request.isActive = false;
        emit ExchangeCancelled(_requestId);
    }

    /**
     * @dev Get all exchange requests for a user
     * @param _user User address
     */
    function getUserRequests(address _user)
        external
        view
        returns (uint256[] memory)
    {
        return userRequests[_user];
    }
} 
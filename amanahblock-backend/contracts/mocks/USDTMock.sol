// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDTMock is ERC20 {
    constructor() ERC20("USDT Mock", "USDT") {
        _mint(msg.sender, 1000000 * 10**decimals()); // Mint 1M USDT to deployer
    }
} 
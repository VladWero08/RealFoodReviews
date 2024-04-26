// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UserContract {
    
    // maybe a string is enough because we already append to the users[userCount]  
    struct MetaMaskID {
        uint userID;
        bytes32 metaMaskID;
    }

    struct User {
        uint userID;
        MetaMaskID[] metaMaskIDs;
        uint[] orders;
    }

    mapping(uint => User) public users;
    uint public userCount;

    event UserAdded(uint userCount);
    event OrderPlaced(uint orderID, uint userID);

    function createUser(bytes32 _metaMaskID) external {
        userCount++;
        users[userCount] = User(userCount, new MetaMaskID[](0), new uint[](0));
        users[userCount].metaMaskIDs.push(MetaMaskID(userCount, _metaMaskID));

        emit UserAdded(userCount - 1);
    }
    
    function addOrder(uint _userID, uint _orderID) external {
        users[_userID].orders.push(_orderID);

        emit OrderPlaced(_orderID, _userID);
    }
}


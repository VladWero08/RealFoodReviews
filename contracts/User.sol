// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";

contract User {
    
    struct UserStruct {
        uint userID;
        address metaMaskIDs;
        uint[] orders;
    }

    MyERC20 public tokenContract;

    mapping(uint => UserStruct) public users;
    uint public userCount;

    event UserAdded(uint userCount);
    event OrderPlaced(uint orderID, uint userID);

    constructor(address _tokenAddress) {
        tokenContract = MyERC20(_tokenAddress);
    }

    function createUser(address _metaMaskID) external {
        users[userCount] = UserStruct(userCount, _metaMaskID, new uint[](0));
        userCount++;
        emit UserAdded(userCount - 1);
    }
    
    function addOrder(uint _userID, uint _orderID) external {
        users[_userID].orders.push(_orderID);

        emit OrderPlaced(_orderID, _userID);
    }

    function getUserBalance(address userAddress) public view returns (uint) {
        return tokenContract.balanceOf(userAddress);
    }
}


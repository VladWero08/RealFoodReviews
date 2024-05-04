// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";
import "./Review.sol";

contract User {
    
    struct UserStruct {
        address metaMaskID;
    }

    MyERC20 public myERC20Contract;
    Review public reviewContract;

    mapping(address => UserStruct) public users;
    uint public userCount;


    event UserAdded(uint userCount, address _uderAddress);
    event OrderPlaced(address indexed from, address indexed to, uint256 amount);
    event ReviewAdded(uint _orderID, uint reviewID, uint _rating);


    constructor(address _myERC20Address, address _reviewAddress) {
        myERC20Contract = MyERC20(_myERC20Address);
        reviewContract = Review(_reviewAddress);
    }

    function userExists(address _metaMaskID) internal view returns (bool) {
        return users[_metaMaskID].metaMaskID != address(0);
    }

    function createUser(address _metaMaskID) external {
        require(!userExists(_metaMaskID), "User already exists");
        userCount++;
        users[_metaMaskID] = UserStruct(_metaMaskID);
        
        emit UserAdded(userCount -1, _metaMaskID);
    }
}


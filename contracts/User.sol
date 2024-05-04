// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract User {
    
    struct UserStruct {
        address metaMaskID;
    }

    mapping(address => UserStruct) public users;
    uint public userCount;
    
    event UserAdded(uint userCount, address _uderAddress);
    event OrderPlaced(address indexed from, address indexed to, uint256 amount);
    event ReviewAdded(uint _orderID, uint reviewID, uint _rating);

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


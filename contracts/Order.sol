pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";

contract OrderContract {
    address public tokenAddress; // Address of the ERC20 token contract
    MyERC20 token; // Instance of the ERC20 token contract

    event OrderPlaced(address indexed sender, address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        token = MyERC20(_tokenAddress); // Initialize the ERC20 token instance
    }

    function placeOrder(address _recipient, uint256 _amount) external {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid order amount");

        // Transfer tokens from the sender to the recipient
        token.transferFrom(msg.sender, _recipient, _amount);

        // Emit an event to log the order placement
        emit OrderPlaced(msg.sender, _recipient, _amount);
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Restaurant.sol";
import "./User.sol";

contract MyERC20{

    uint256 nbTokens;   
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) spendlimit;

    User userToken;
    Restaurant restaurantToken;

    struct OrderData {
        address from;
        address to;
        uint256 amount;
    }
    mapping (uint => OrderData) public orders;
    mapping (address => uint[]) public userOrders;
    
    uint public orderCount;
    mapping (address => mapping(address => bool)) public userRestaurantOrders;


    string public name ="Token optional BC";               
    uint8 public decimals = 0;                
    string public symbol = 'TOP';  

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    modifier checkBalance (address owner, uint tokens) {
        require(tokens <= balances[owner], 'Insufficient funds!');
        _;
    }

    modifier checkApproval (address owner, address delegate, uint tokens) {
        require(tokens <= spendlimit[owner][delegate], 'Insufficient allowance!');
        _;
    }

    constructor(address _userContract, address _restaurantContract) {
        userToken = User(_userContract);
        restaurantToken = Restaurant(_restaurantContract);
    }

    function deposit(uint256 tokens) public {
        balances[msg.sender] += tokens;
        nbTokens += tokens;
    }

    function totalSupply() public view returns (uint256) { 
        return nbTokens;
    }

    function balanceOf(address tokenOwner) public view returns (uint) { 
        return balances[tokenOwner]; 
    }

    function transfer(address receiver, uint tokens) public checkBalance (msg.sender ,tokens) 
								returns (bool) {   
        balances[msg.sender] = balances[msg.sender] - tokens;
        balances[receiver] = balances[receiver] + tokens;
        emit Transfer(msg.sender, receiver, tokens);
        return true;    
    }

    function approve(address spender, uint tokens)  public returns (bool) {
        spendlimit[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view 
								returns(uint) { 
        return spendlimit[tokenOwner][spender];
    }
 
    function transferFrom(address from, address to, uint tokens) 
            public  checkBalance (from, tokens) 
                    checkApproval(from, msg.sender, tokens) returns (bool) {
        balances[from] = balances[from] - tokens;
        spendlimit[from][msg.sender] = spendlimit[from][msg.sender]- tokens;
        balances[to] = balances[to] + tokens;
        emit Transfer(from, to, tokens);
        return true;
    }

    // order contract methods
    function placeOrder(address _to, uint256 _amount) external {
        require(userToken.userExists(_to) || restaurantToken.restaurantExists(_to), 
        "Invalid recipient address");
        require(_amount > 0, "Invalid order amount");
        
        orderCount++;
        transfer(_to, _amount);
        orders[orderCount] = OrderData(msg.sender, _to, _amount);
        userOrders[msg.sender].push(orderCount);  
        userRestaurantOrders[msg.sender][_to] = true;      
    }

    function getOrderById(uint _orderId) external view returns (
        address from, address to, uint256 amount) {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");

        OrderData storage order = orders[_orderId];
        return (order.from, order.to, order.amount);
    }

    function getOrderCount() external view returns (uint) {
        return orderCount;
    }

    function getOrdersByUser(address _userAddress) external view returns (OrderData[] memory) {
        uint[] memory orderIndexes = userOrders[_userAddress];
        OrderData[] memory userOrderData = new OrderData[](orderIndexes.length);

        for (uint i = 0; i < orderIndexes.length; i++) {
            OrderData storage order = orders[orderIndexes[i]];
            userOrderData[i] = order;
        }

        return userOrderData;
    }

    function hasOrderedFromRestaurant(address _userAddress, address _restaurantAddress) external view returns (bool) {
        return userRestaurantOrders[_userAddress][_restaurantAddress];
    } 
}
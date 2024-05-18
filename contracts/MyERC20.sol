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
        uint[] products;
    }
    mapping (uint => OrderData) public orders;
    mapping (address => uint[]) public userOrders;
    
    uint public orderCount;
    mapping (address => mapping(address => bool)) public userRestaurantOrders;


    string public name ="Real Food Reviews Token";               
    uint8 public decimals = 0;                
    string public symbol = 'RFR';  

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
    function placeOrder(address _to, uint[] memory products) external {
        require(userToken.userExists(_to) || restaurantToken.restaurantExists(_to), 
        "Invalid recipient address");
        uint amount = restaurantToken.sumProducts(_to, products);
        require(amount > 0, "Invalid order amount");
        
        orderCount++;
        transfer(_to, amount);
        orders[orderCount] = OrderData(msg.sender, _to, amount, products);
        userOrders[msg.sender].push(orderCount);  
        userRestaurantOrders[msg.sender][_to] = true;      
    }

    function getOrderCount() external view returns (uint) {
        return orderCount;
    }

    function getOrderById(uint _orderId) external view returns (
        address from, 
        address to, 
        uint256 amount, 
        uint[] memory productIDs, 
        uint[] memory prices, 
        string[] memory names,
        string[] memory descriptions, 
        string[] memory gramajs) {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");

        OrderData storage order = orders[_orderId];
        uint[] memory _productIDs = new uint[](order.products.length);
        uint[] memory _prices = new uint[](order.products.length);
        string[] memory _names = new string[](order.products.length);
        string[] memory _descriptions = new string[](order.products.length);
        string[] memory _gramajs = new string[](order.products.length);

        for (uint i = 0; i < order.products.length; i++) {
            (uint productID, string memory _name, uint price, string memory description, string memory gramaj) =
                restaurantToken.getProduct(order.to, order.products[i]);

            _productIDs[i] = productID;
            _prices[i] = price;
            _names[i] = _name;
            _descriptions[i] = description;
            _gramajs[i] = gramaj;
        }

        return (order.from, order.to, order.amount, _productIDs, _prices, _names,  _descriptions, _gramajs);        
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
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";


contract Order {
    MyERC20 myERC20Contract; 

    struct OrderData {
        address from;
        address to;
        uint256 amount;
        uint[] reviews;
    }

    mapping (uint => OrderData) public orders;
    mapping (address => uint[]) public userOrders;
    uint public orderCount;

    constructor(address _tokenAddress) {
        myERC20Contract = MyERC20(_tokenAddress);
    }

    function placeOrder(address _to, uint256 _amount) external {
        require(_to != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid order amount");

        myERC20Contract.transfer(_to, _amount);
        orders[orderCount] = OrderData(msg.sender, _to, _amount, new uint[](0));
        userOrders[msg.sender].push(orderCount);

        orderCount++;        
    }

    function addReview(uint _orderId, uint _reviewId) external {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");

        orders[_orderId].reviews.push(_reviewId);
    }

    function getOrderById(uint _orderId) external view returns (address from, address to, uint256 amount) {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");

        OrderData storage order = orders[_orderId];
        return (order.from, order.to, order.amount);
    }

    function getOrderCount() external view returns (uint) {
        return orderCount;
    }

    function list_all_orders_from_user(address _userID) external view returns (uint[] memory) {
        return userOrders[_userID];
    }
}

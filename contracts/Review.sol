// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ReviewContract {
    
    struct Review {
        uint reviewID;
        string description;
        uint rating;
    }
    
    // mapping(uint => Review) public reviews;  already defined in Order.sol
    uint public reviewCount;

    function addReview(uint _orderID, string memory _description, uint _rating) public {
        reviews[reviewCount] = Review(
            reviewCount,
            _description,
            _rating
        );

        // Link review to order
        Order ordersContract = Order(0xAddressOfOrdersContract);
        ordersContract.orders[_orderID].reviews.push(reviewCount);

        reviewCount++;
    }

}
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Order.sol";

contract Review {
    
    struct ReviewStruct {
        uint reviewID;
        string description;
        uint rating;
    }

    Order public orderContract;
    uint public reviewCount;
    mapping(uint => ReviewStruct) public reviews;

    constructor(address _orderAddress) {
        orderContract = Order(_orderAddress);
    }


    modifier onlyOrderParticipant(uint orderID) {
        (address orderSender, address orderRecipient, uint256 ammount) = orderContract.getOrderById(orderID);
        require(msg.sender == orderSender || msg.sender == orderRecipient, "Only participants of the order can call this function");
        _;
    }

    modifier validReviewRating(uint rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }
    
    modifier orderExists(uint orderID) {
        require(orderID < orderContract.getOrderCount(), "Order does not exist");
        _;
    }

    function addReview(uint _orderID, string memory _description, uint _rating) public onlyOrderParticipant(_orderID) validReviewRating(_rating) orderExists(_orderID) {
        reviews[reviewCount] = ReviewStruct(
            reviewCount,
            _description,
            _rating
        );

        // Add review to order
        orderContract.addReview(_orderID, reviewCount);
        
        reviewCount++;
    }

}
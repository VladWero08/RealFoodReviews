// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";

contract Review {
    
    struct ReviewStruct {
        uint reviewID;
        string description;
        uint rating;
    }

    MyERC20 public myERC20Contract;
    uint public reviewCount;
    mapping(uint => ReviewStruct) public reviews;

    constructor(address _myERC20Address) {
        myERC20Contract = MyERC20(_myERC20Address);
    }

    modifier onlyOrderParticipant(uint orderID) {
        (address orderSender, address orderRecipient, uint256 ammount) = myERC20Contract.getOrderById(orderID);
        require(msg.sender == orderSender || msg.sender == orderRecipient, "Only participants of the order can call this function");
        _;
    }

    modifier validReviewRating(uint rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }
    
    modifier orderExists(uint orderID) {
        require(orderID < myERC20Contract.getOrderCount(), "Order does not exist");
        _;
    }

    function addReview(uint _orderID, string memory _description, uint _rating) public onlyOrderParticipant(_orderID) validReviewRating(_rating) orderExists(_orderID) {
        reviews[reviewCount] = ReviewStruct(
            reviewCount,
            _description,
            _rating
        );

        // Add review to order
        myERC20Contract.addReview(_orderID, reviewCount);
        
        reviewCount++;
    }

}
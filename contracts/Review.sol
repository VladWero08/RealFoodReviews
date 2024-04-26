// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ReviewContract {
    
    struct Review {
        uint reviewID;
        string description;
        uint rating;
    }
    
    event ReviewAdded(uint _orderID, uint reviewID, uint _rating);

    // only participants of the order can add a review
    modifier onlyOrderParticipant(uint orderID) {
        require(msg.sender == orders[orderID].from || msg.sender == orders[orderID].to, "Only participants of the order can call this function");
        _;
    }

    modifier validReviewRating(uint rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    modifier orderExists(uint orderID) {
        require(orderID < orderCount, "Order does not exist");
        _;
    }

    uint public reviewCount;

    function addReview(uint _orderID, string memory _description, uint _rating) public onlyOrderParticipant(_orderID) validReviewRating(_rating) orderExists(_orderID) {
        reviews[reviewCount] = Review(
            reviewCount,
            _description,
            _rating
        );

        // Link review to order
        Order ordersContract = Order(0xAddressOfOrdersContract);
        ordersContract.orders[_orderID].reviews.push(reviewCount);
        emit ReviewAdded(_orderID, reviewCount, _rating);

        reviewCount++;
    }

}
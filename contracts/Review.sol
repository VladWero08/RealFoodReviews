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
    mapping (address => ReviewStruct[]) public restaurantReviews;


    constructor(address _myERC20Address) {
        myERC20Contract = MyERC20(_myERC20Address);
    }

    modifier onlyOrderParticipant(address user, address restaurant) {
        require(myERC20Contract.hasOrderedFromRestaurant(user, restaurant) == true, "Only participants of the order can call this function");
        _;
    }

    modifier validReviewRating(uint rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    function addReview(address _restaurantAddress, string memory _description, uint _rating) 
        public onlyOrderParticipant(msg.sender, _restaurantAddress) validReviewRating(_rating) {
        reviewCount++;
        
        restaurantReviews[_restaurantAddress].push(ReviewStruct(
            reviewCount,
            _description,
            _rating
        ));

    }

    function getUserReviewsForRestaurant(address _restaurantAddress) external view returns (ReviewStruct[] memory) {
        return restaurantReviews[_restaurantAddress];
    }

}
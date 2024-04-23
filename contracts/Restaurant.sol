// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RestaurantContract {
    
    struct Product {
        uint productID;
        uint price;
        string description;
        string gramaj;
    }
    
    struct Restaurant {
        uint restaurantID;
        address metaMaskID;
        string name;
        string description;
        Product[] products;
    }
    
    mapping(uint => Restaurant) public restaurants;
    uint public restaurantCount;
    
    function createRestaurant(address _metaMaskID, string memory _name, string memory _description) external {
        restaurantCount++;
        restaurants[restaurantCount] = Restaurant(restaurantCount, _metaMaskID, _name, _description, new Product[](0));
    }
    
    function addProduct(uint _restaurantID, uint _price, string memory _description, string memory _gramaj) external {
        restaurants[_restaurantID].products.push(Product(restaurants[_restaurantID].products.length + 1, _price, _description, _gramaj));
    }
}
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";

contract Restaurant {
    
    struct Product {
        uint productID;
        uint price;
        string description;
        string gramaj;
    }
    
    struct RestaurantStruct {
        address metaMaskID;
        string name;
        string description;
        uint productCount;
    }

    MyERC20 public tokenContract;

    mapping(uint => RestaurantStruct) public restaurants;
    mapping(uint => mapping(uint => Product)) public restaurantProducts; 
    
    uint public restaurantCount;

    event RestaurantAdded(uint indexed restaurantID, address metaMaskID, string name, string description);
    event ProductAdded(uint indexed restaurantID, uint indexed productID, uint price, string description, string gramaj);
    event BalanceUpdated(uint indexed restaurantID, uint newBalance);

    constructor(address _tokenAddress) {
        tokenContract = MyERC20(_tokenAddress);
    }

    function getRestaurant(uint _restaurantID) external view returns (
        address metaMaskID,
        string memory name,
        string memory description,
        uint productCount
    ) {
        RestaurantStruct memory restaurant = restaurants[_restaurantID];
        return (
            restaurant.metaMaskID,
            restaurant.name,
            restaurant.description,
            restaurant.productCount
        );
    }

    function getRestaurantCount() external view returns (uint) {
        return restaurantCount;
    }

    function getProduct(uint _restaurantID, uint _productID) external view returns (
        uint productID,
        uint price,
        string memory description,
        string memory gramaj
    ) {
        Product memory product = restaurantProducts[_restaurantID][_productID];
        return (
            product.productID,
            product.price,
            product.description,
            product.gramaj
        );
    }

    function getAllProductsForRestaurant(uint _restaurantID) external view returns (
        Product[] memory products
    ) {
        uint count = restaurants[_restaurantID].productCount;
        products = new Product[](count);

        for (uint i = 0; i < count; i++) {
            products[i] = restaurantProducts[_restaurantID][i];
        }

        return products;
    }

    
    function createRestaurant(address _metaMaskID, string memory _name, string memory _description) external {
        restaurants[restaurantCount] = RestaurantStruct(_metaMaskID, _name, _description, 0);
        restaurantCount++;
        
        emit RestaurantAdded(restaurantCount, _metaMaskID, _name, _description);
    }
    
    function addProduct(uint _restaurantID, uint _price, string memory _description, string memory _gramaj) external {
        uint productID = restaurants[_restaurantID].productCount;
        restaurantProducts[_restaurantID][productID] = Product(productID, _price, _description, _gramaj);
        restaurants[_restaurantID].productCount++;

        emit ProductAdded(_restaurantID, productID, _price, _description, _gramaj);
    }

    function getRestaurantBalance(address restaurantAddress) public view returns (uint) {
        return tokenContract.balanceOf(restaurantAddress);
    }
}

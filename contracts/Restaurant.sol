pragma solidity >=0.7.0 <0.9.0;

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

    mapping(address => RestaurantStruct) public restaurants;
    mapping(address => mapping(uint => Product)) public restaurantProducts; 
    

    uint public restaurantCount;

    event RestaurantAdded(uint indexed restaurantID, address metaMaskID, string name, string description);
    event ProductAdded(address indexed restaurantID, uint indexed productID, uint price, string description, string gramaj);
    event BalanceUpdated(address indexed restaurantID, uint newBalance);

    function restaurantExists(address _restaurantAddress) public view returns (bool) {
        return restaurants[_restaurantAddress].metaMaskID != address(0);
    }

    function getRestaurant(address _restaurantID) external view returns (
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

    function getProduct(address _restaurantID, uint _productID) external view returns (
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

    function getAllProductsForRestaurant(address _restaurantID) external view returns (
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
        restaurantCount++;
        restaurants[_metaMaskID] = RestaurantStruct(_metaMaskID, _name, _description, 0);
        
        emit RestaurantAdded(restaurantCount, _metaMaskID, _name, _description);
    }
    
    function addProduct(address _restaurantID, uint _price, string memory _description, string memory _gramaj) external {
        restaurants[_restaurantID].productCount++;
        uint productID = restaurants[_restaurantID].productCount;
        restaurantProducts[_restaurantID][productID] = Product(productID, _price, _description, _gramaj);
        
        emit ProductAdded(_restaurantID, productID, _price, _description, _gramaj);
    }
}

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

    mapping(uint => address) public restaurantsByIndex;
    mapping(address => RestaurantStruct) public restaurants;
    mapping(address => mapping(uint => Product)) public restaurantProducts; 
    

    uint public restaurantCount;

    event RestaurantAdded(uint indexed restaurantID, address metaMaskID, string name, string description);
    event ProductAdded(address indexed restaurantID, uint indexed productID, uint price, string description, string gramaj);
    event BalanceUpdated(address indexed restaurantID, uint newBalance);

    function restaurantExists(address _restaurantAddress) public view returns (bool) {
        return restaurants[_restaurantAddress].metaMaskID != address(0);
    }

    function createRestaurant(address _metaMaskID, string memory _name, string memory _description) external {
        restaurantCount++;
        restaurants[_metaMaskID] = RestaurantStruct(_metaMaskID, _name, _description, 0);
        restaurantsByIndex[restaurantCount] = _metaMaskID;

        emit RestaurantAdded(restaurantCount, _metaMaskID, _name, _description);
    }

    function getRestaurant(address _restaurantID) external view returns (
        address metaMaskID,
        string memory name,
        string memory description,
        uint productCount,
        Product[] memory products
    ) {
        RestaurantStruct memory restaurant = restaurants[_restaurantID];
        uint count = restaurant.productCount;

        products = new Product[](count);
        for (uint i = 0; i < count; i++) {
            products[i] = restaurantProducts[_restaurantID][i + 1]; // Product IDs start from 1
        }

        return (
            restaurant.metaMaskID,
            restaurant.name,
            restaurant.description,
            count,
            products
        );
    }

    function getAllRestaurants() external view returns (
        string[] memory restaurantNames,
        string[] memory restaurantDescriptions
    ) {
        restaurantNames = new string[](restaurantCount);
        restaurantDescriptions = new string[](restaurantCount);
        
        for (uint i = 0; i < restaurantCount; i++) {
            address restaurantAddress = restaurantsByIndex[i + 1];
            restaurantNames[i] = restaurants[restaurantAddress].name;
            restaurantDescriptions[i] = restaurants[restaurantAddress].description;
        }

        return (restaurantNames, restaurantDescriptions);
    }

    function getRestaurantCount() external view returns (uint) {
        return restaurantCount;
    }

    // product related methosd
    function addProduct(address _restaurantAddress, uint _price, string memory _description, string memory _gramaj) external {
        restaurants[_restaurantAddress].productCount++;
        uint productID = restaurants[_restaurantAddress].productCount;
        restaurantProducts[_restaurantAddress][productID] = Product(productID, _price, _description, _gramaj);
        
        emit ProductAdded(_restaurantAddress, productID, _price, _description, _gramaj);
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

    function sumProducts(address _restaurantAddress, uint[] memory _productIndexes) external view returns (uint) {
        uint sum = 0;
        for (uint i = 0; i < _productIndexes.length; i++) {
            uint productId = _productIndexes[i];
            require(productId > 0 && productId <= restaurants[_restaurantAddress].productCount, "Invalid product index");
            sum += restaurantProducts[_restaurantAddress][productId].price;
        }
        return sum;
    }
}

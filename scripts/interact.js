require('dotenv').config(); // Load environment variables
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { TLSSocket } = require("tls");

async function interact() {
    [owner, user1] = await ethers.getSigners();

    let deployedTokenAddress = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44"
    let token = await ethers.getContractAt("Restaurant", deployedTokenAddress)
    
    const metaMaskID = ethers.constants.AddressZero;
    const name = "Restaurant 2";
    const description = "Restaurant 2 Description";

    // Create a new restaurant
    //await token.createRestaurant(metaMaskID, name, description);
    // // Add a product to the restaurant (assuming restaurant with ID 1 exists)
    //await token.addProduct(0, 2000, "Product 2 Description", "200g");
    // Retrieve information about the added product
    // let productInfo = await token.getProduct(0, 2);
    // console.log('Product Info:', productInfo);

    // Retrieve the number of restaurants
    // let restaurantCount = await token.getRestaurantCount();
    // console.log('Number of restaurants:', restaurantCount.toNumber());

    // Retrieve information about a specific restaurant (assuming restaurant with ID 1 exists)
    // let restaurantInfo = await token.getRestaurant(0);
    let restaurantInfo = await token.getAllProductsForRestaurant(0);
    console.log('Restaurant Info 0:', restaurantInfo); 
    // console.log('Restaurant Info 0:', restaurantInfo); 
    // restaurantInfo = await token.getRestaurant(1);
    // console.log('Restaurant Info 1:', restaurantInfo); 
    //restaurantInfo = await token.getRestaurant(2);
    // console.log('Restaurant Info 3:', restaurantInfo); 
    // restaurantInfo = await token.getRestaurant(3);
    // console.log('Restaurant Info 4:', restaurantInfo); 
}

interact()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
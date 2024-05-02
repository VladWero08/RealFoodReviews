require('dotenv').config(); // Load environment variables
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { TLSSocket } = require("tls");

async function interact() {
    [owner, user1] = await ethers.getSigners();

    let deployedTokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    let restaurant = await ethers.getContractAt("Restaurant", deployedTokenAddress)
    
    // deployedTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    // let order = await ethers.getContractAt("Order", deployedTokenAddress)
    
    // deployedTokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    // let review = await ethers.getContractAt("Review", deployedTokenAddress)
    
    deployedTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    let user = await ethers.getContractAt("User", deployedTokenAddress)
    
    // deployedTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    // let myerc20 = await ethers.getContractAt("MyERC20", deployedTokenAddress)
    

    // // create restaurant 
    const RestaurantMetaMaskID = "0xD83e298cED38baC91838bb1a62078BD0DB5FB6F6";
    const name = "Restaurant 1";
    const description = "Restaurant 1 Description";
    //await restaurant.createRestaurant(RestaurantMetaMaskID, name, description);

    // // create user1
    const userMetaMaskID = "0x48114256Fd1e080321F1d3a0a6c885971c5eB217"
    //await user.createUser(userMetaMaskID);

    // // make a transaction
    // //await user.placeOrder(RestaurantMetaMaskID, 100)

    // check restaurant info
    //let restaurantInfo = await restaurant.getRestaurant(RestaurantMetaMaskID);
    //console.log('Restaurant Info 0:', restaurantInfo);
    let restaurantCount = await restaurant.getRestaurantCount(); 
    console.log('resturantCount:', restaurantCount); 
    //let restaurantBalance = await restaurant.getRestaurantBalance(RestaurantMetaMaskID);
    //console.log('restaurantBalance:', restaurantBalance);

    // check user balance
    //let userBalance = await user.getUserBalance(userMetaMaskID);
    //console.log('userBalance:', userBalance);
}

interact()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
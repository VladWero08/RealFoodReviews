require('dotenv').config(); // Load environment variables
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
async function deploy() {

    async function createUser(userToken, owner) {
        let user = await userToken.connect(owner).createUser(owner.address)
        await user.wait()
    }

    async function createRestaurant(restaurantToken, restaurantAddress, owner, name, description) {
        let restaurant = await restaurantToken.connect(owner).createRestaurant(restaurantAddress, name, description)
        await restaurant.wait()
    }

    async function getBalance(token, address) {
        let balance = await token.balanceOf(address)
        return balance
    }

    async function getRestaurantDetails(restaurantToken, restaurantAddress) {
        let restaurantDetails = await restaurantToken.getRestaurant(restaurantAddress);
        console.log("Restaurant MetaMask ID: ", restaurantDetails.metaMaskID);
        console.log("Restaurant Name: ", restaurantDetails.name);
        console.log("Restaurant Description: ", restaurantDetails.description);
        console.log("Product Count: ", restaurantDetails.productCount);

        let restaurantCount = await restaurantToken.getRestaurantCount();
        console.log("Restaurant Count: ", restaurantCount);
    }

    async function getOrderById(orderContract, orderId) {
        let order = await orderContract.getOrderById(orderId);
        console.log("Order Details:");
        console.log("From:", order.from);
        console.log("To:", order.to);
        console.log("Amount:", order.amount);
    }



    // get signers
    [user, restaurant] = await ethers.getSigners();

    let tokenAddress = "0x33EaCB2aB0Ecd1C93c14D88faCFaea71796e7996"
    let myerc20Token = await ethers.getContractAt("MyERC20", tokenAddress)
    
    tokenAddress = "0x61FD5495aa2D422580CD7129EE5BeA1aB09D4f25"
    let restaurantToken = await ethers.getContractAt("Restaurant", tokenAddress)

    tokenAddress = "0x2E432B644Ec3717780E34B6470bBA6bb9e30dFEe"
    let userToken = await ethers.getContractAt("User", tokenAddress)

    
    
    //create user and restaurant
    let name = "restaurant 2"
    let description = "restaurant 2 description"
    //await createUser(userToken, user, user.address)
    //await createRestaurant(restaurantToken, restaurant.address, user, name, description)
    //await getRestaurantDetails(restaurantToken, restaurant.address);

    //deposit into user balance
    // let deposit = await myerc20Token.connect(user).deposit(ethers.utils.parseUnits("10", 18))
    // await deposit.wait()

    //transfer
    let transfer = await myerc20Token.connect(user).transfer(restaurant.address, ethers.utils.parseUnits("10", 18))
    await transfer.wait()
    
    // // place order
    // let signer = ethers.provider.getSigner(userAddress)
    // let orderStatus = await orderToken.connect(signer).placeOrder(restaurantAddress, ethers.utils.parseUnits("10", 18))
    // await orderStatus.wait()
    
    // let orderId = 1;
    // await orderToken.getOrderById(orderId);

    let userBalance = await getBalance(myerc20Token, user.address)
    console.log("user balance: ", userBalance)
    let restaurantBalance = await getBalance(myerc20Token, restaurant.address)
    console.log("restaurant balance: ", restaurantBalance)

}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

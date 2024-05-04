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
        let orderCount = await orderContract.getOrderCount()
        console.log('\norderCount ', orderCount)
        

        let order = await orderContract.getOrderById(orderId);
        console.log("Order Details:");
        console.log("From:", order.from);
        console.log("To:", order.to);
        console.log("Amount:", order.amount);
        console.log("Reviews:", order.reviews);
    }

    async function list_all_orders_from_user(token, userAddress) {
        let orders = await token.list_all_orders_from_user(userAddress)
        console.log('User orders: ', orders)
    }

    async function getReviewById(token, reviewId) {
        let review = await token.getReviewById(reviewId)
        console.log('Review Details')
        console.log('description', review.description)
        console.log('rating', review.rating)
    }

    // get signers
    [user, restaurant] = await ethers.getSigners();

    let tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let myerc20Token = await ethers.getContractAt("MyERC20", tokenAddress)
    
    tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    let restaurantToken = await ethers.getContractAt("Restaurant", tokenAddress)

    tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    let userToken = await ethers.getContractAt("User", tokenAddress)

    tokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    let reviewToken = await ethers.getContractAt("Review", tokenAddress)

    
    //create user and restaurant
    // let name = "restaurant 1"
    // let description = "restaurant 1 description"
    // await createUser(userToken, user, user.address)
    // await createRestaurant(restaurantToken, restaurant.address, user, name, description)
    // await getRestaurantDetails(restaurantToken, restaurant.address);

    // //deposit into user balance
    // let deposit = await myerc20Token.connect(user).deposit(ethers.utils.parseUnits("10", 18))
    // await deposit.wait()

    // //transfer
    // let transfer = await myerc20Token.connect(user).transfer(restaurant.address, ethers.utils.parseUnits("1", 18))
    // await transfer.wait()

    // place order
    // let orderStatus = await myerc20Token.connect(user).placeOrder(restaurant.address, ethers.utils.parseUnits("2", 18))
    // await orderStatus.wait()
    await getOrderById(myerc20Token, 1)
    //await list_all_orders_from_user(myerc20Token, user.address)
    
    // give review
    // let review = await reviewToken.connect(user).addReview(1, "good food", 5)
    // await review.wait()
    // let reviewResponse = await reviewToken.connect(restaurant).addReview(1, "good response", 5)
    // await reviewResponse.wait()
    
    await getReviewById(reviewToken, 4)
    let ownerEthBalance = await ethers.provider.getBalance(user.address)
    console.log('user ETH balance ', ethers.utils.formatEther(ownerEthBalance)) 
    let restaurantEthBalance = await ethers.provider.getBalance(restaurant.address)
    console.log('restaurant ETH balance ', ethers.utils.formatEther(restaurantEthBalance)) 
    
    let userBalance = await getBalance(myerc20Token, user.address)
    console.log("\nuser balance: ", userBalance)
    let restaurantBalance = await getBalance(myerc20Token, restaurant.address)
    console.log("restaurant balance: ", restaurantBalance)
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

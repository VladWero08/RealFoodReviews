const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Myerc Contract", function () {
  let restaurantToken;
  let userToken;
  let myerc20Token;
  let restaurant;
  let user;
  let myerc20;

  beforeEach(async function () {
    [owner, restaurant] = await ethers.getSigners();

    restaurant = await ethers.getContractFactory("Restaurant");
    restaurantToken = await restaurant.connect(owner).deploy();
    await restaurantToken.deployed();

    user = await ethers.getContractFactory("User");
    userToken = await user.connect(owner).deploy()
    await userToken.deployed();

    myerc20 = await ethers.getContractFactory("MyERC20");
    myerc20Token = await myerc20.connect(owner).deploy(userToken.address, restaurantToken.address);
    await myerc20Token.deployed();
    
  });

  it("Should add a product to the newly created restaurant", async function () {
    const metaMaskID = owner.address;
    const name = "Restaurant A";
    const description = "A nice place to eat";
    
    let newRestaurant = await restaurantToken.createRestaurant(metaMaskID, name, description);
    await newRestaurant.wait();
    let newProduct = await restaurantToken.addProduct(metaMaskID, ethers.utils.parseUnits("2"), "product 1", "100g");
    await newProduct.wait();

    // //deposit into user balance
    // let deposit = await myerc20Token.connect(user).deposit(ethers.utils.parseUnits("10", 18))
    // await deposit.wait()

    // //place order
    // let orderStatus = await myerc20Token.connect(user).placeOrder(restaurant.address, [1])
    // await orderStatus.wait()

    // let orderCount = await orderContract.getOrderCount();
    
    // let { from, to, amount, productIDs, prices, descriptions, gramajs } = await orderContract.getOrderById(orderId);

    // expect(from).to.equal(owner.address);
    // expect(to).to.equal(restaurant.address);
    // expect(amount.toString()).to.equal(ethers.utils.parseUnits("2").toString()); 
    
    // expect(productIDs[0].toString()).to.equal(1); 
    // expect(prices[0].toString()).to.equal(ethers.utils.parseUnits("2").toString()); 
    // expect(descriptions[0]).to.equal("product 1"); 
    // expect(gramajs[0]).to.equal("100g"); 
   });
});


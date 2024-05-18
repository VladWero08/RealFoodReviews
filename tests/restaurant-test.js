const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Restaurant Contract", function () {
  let Restaurant;
  let restaurant;

  beforeEach(async function () {
    [owner, restaurant] = await ethers.getSigners();
    
    Restaurant = await ethers.getContractFactory("Restaurant");
    restaurant = await Restaurant.deploy();
    await restaurant.deployed()
    
    User = await ethers.getContractFactory("User");
    user = await User.deploy();
    await user.deployed();
    
    MyERC20 = await ethers.getContractFactory("MyERC20");
    myERC20 = await MyERC20.deploy(user.address, restaurant.address);
    await myERC20.deployed();

    Review = await ethers.getContractFactory("Review");
    review = await Review.deploy(myERC20.address);
    await review.deployed();
  });

  it("Should add a product to the newly created restaurant", async function () {
    const metaMaskID = restaurant.address;
    const name = "Restaurant A";
    const description = "A nice place to eat";
    
    let newRestaurant = await restaurant.createRestaurant(metaMaskID, name, description);
    await newRestaurant.wait();
    let newProduct = await restaurant.addProduct(metaMaskID, "product 1", ethers.utils.parseUnits("2"), "product 1 description", "100g");
    await newProduct.wait();

    let [
        _metaMaskID,
        _name,
        _description,
        _productCount,
        _products
    ] = await restaurant.getRestaurant(metaMaskID);
    
    
    expect(_metaMaskID).to.equal(metaMaskID);
    expect(_name).to.equal(name);
    expect(_description).to.equal(description);
    
    expect(_products[0].price.toString()).to.equal(ethers.utils.parseUnits("2").toString());
    expect(_products[0].description).to.equal("product 1 description");
    expect(_products[0].gramaj).to.equal("100g");
  });

  it("Should retrieve all restaurants and their descriptions", async function () {
    const metaMaskID1 = owner.address;
    const metaMaskID2 = restaurant.address;
    
    let newRestaurant = await restaurant.createRestaurant(metaMaskID1, "Restaurant A", "Description A");
    await newRestaurant.wait();
    newRestaurant = await restaurant.createRestaurant(metaMaskID2, "Restaurant B", "Description B");
    await newRestaurant.wait();

    let [
        restaurantAddresses,
        restaurantNames,
        restaurantDescriptions,
        restautrantProductCounts
    ] = await restaurant.getAllRestaurants();

    expect(restaurantNames[0]).to.equal("Restaurant A");
    expect(restaurantNames[1]).to.equal("Restaurant B");
    expect(restaurantDescriptions[0]).to.equal("Description A");
    expect(restaurantDescriptions[1]).to.equal("Description B");
  });

  it("Should place an order", async function () {
    const userMetaMaskID = owner.address;
    const restaurantMetaMaskID = restaurant.address;
    
    let newRestaurant = await restaurant.createRestaurant(restaurantMetaMaskID, "Restaurant A", "Description A");
    await newRestaurant.wait();
    
    let newUser = await user.createUser(userMetaMaskID);
    await newUser.wait();

    let newProduct = await restaurant.addProduct(restaurantMetaMaskID, "product 1", ethers.utils.parseUnits("2"), "product 1 description", "100g");
    await newProduct.wait();
    newProduct = await restaurant.addProduct(restaurantMetaMaskID, "product 2", ethers.utils.parseUnits("1"), "product 2 description", "200g");
    await newProduct.wait();
    
    let deposit = await myERC20.connect(owner).deposit(ethers.utils.parseUnits("10", 18));
    await deposit.wait();

    let placeOrder = await myERC20.connect(owner).placeOrder(restaurant.address, [1, 2]);
    await placeOrder.wait();

    let orderCount = await myERC20.getOrderCount();
    let order = await myERC20.getOrderById(orderCount);
    
    expect(order.from).to.equal(owner.address);
    expect(order.to).to.equal(restaurant.address);
    expect(order.amount.toString()).to.equal(ethers.utils.parseUnits("3").toString());
    
    expect(order.productIDs[0].toString()).to.equal("1");
    expect(order.productIDs[1].toString()).to.equal("2");
    expect(order.prices[0].toString()).to.equal(ethers.utils.parseUnits("2").toString());
    expect(order.descriptions[0]).to.equal("product 1 description");
    expect(order.gramajs[0]).to.equal("100g");
  });

  it("Should give a review", async function () {
    const userMetaMaskID = owner.address;
    const restaurantMetaMaskID = restaurant.address;
    
    let newRestaurant = await restaurant.createRestaurant(restaurantMetaMaskID, "Restaurant A", "Description A");
    await newRestaurant.wait();
    
    let newUser = await user.createUser(userMetaMaskID);
    await newUser.wait();

    let newProduct = await restaurant.addProduct(restaurantMetaMaskID, "product 1", ethers.utils.parseUnits("2"), "product 1 description", "100g");
    await newProduct.wait();
    newProduct = await restaurant.addProduct(restaurantMetaMaskID, "product 2", ethers.utils.parseUnits("1"), "product 2 description", "200g");
    await newProduct.wait();
    
    let deposit = await myERC20.connect(owner).deposit(ethers.utils.parseUnits("10", 18));
    await deposit.wait();

    let placeOrder = await myERC20.connect(owner).placeOrder(restaurant.address, [1, 2]);
    await placeOrder.wait();

    let addReview = await review.addReview(restaurant.address, "good food", 4);
    await addReview.wait();

    let review1 = await review.getReviewsForRestaurant(restaurant.address);

    expect(review1[0].description).to.equal("good food");
    expect(review1[0].rating.toString()).to.equal("4");
  });

});


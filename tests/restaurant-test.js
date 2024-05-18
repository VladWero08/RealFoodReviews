const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Restaurant Contract", function () {
  let Restaurant;
  let restaurant;

  beforeEach(async function () {
    [owner, restaurant] = await ethers.getSigners();
    Restaurant = await ethers.getContractFactory("Restaurant");
    restaurant = await Restaurant.deploy();
    await restaurant.deployed();
  });

  it("Should add a product to the newly created restaurant", async function () {
    const metaMaskID = owner.address;
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
});


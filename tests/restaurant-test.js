const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { ethers } = require("hardhat");

describe("Restaurant Contract", function () {
  let Restaurant;
  let restaurant;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Restaurant = await ethers.getContractFactory("Restaurant");
    restaurant = await Restaurant.deploy();
    await restaurant.deployed();
  });

  it("Should create a restaurant", async function () {
        const metaMaskID = owner.address;
        const name = "Restaurant A";
        const description = "A nice place to eat";
        
        await restaurant.createRestaurant(metaMaskID, name, description);
        const restaurantInfo = await restaurant.getRestaurant(metaMaskID);
    
        expect(restaurantInfo.name).to.equal(name);
        expect(restaurantInfo.description).to.equal(description);
        expect(restaurantInfo.productCount).to.equal(0); // Assuming product count starts at 0
       });
});

//   it("Should create a restaurant", async function () {
//     const metaMaskID = owner.address;
//     const name = "Restaurant A";
//     const description = "A nice place to eat";
    
//     await restaurant.createRestaurant(metaMaskID, name, description);
//     const restaurantInfo = await restaurant.getRestaurant(metaMaskID);

//     expect(restaurantInfo.name).to.equal(name);
//     expect(restaurantInfo.description).to.equal(description);
//     expect(restaurantInfo.productCount).to.equal(0); // Assuming product count starts at 0
//    });

//   it("Should add a product to the restaurant", async function () {
//     const metaMaskID = owner.address;
//     const price = 100; // Price in wei
//     const description = "Product A";
//     const gramaj = "100g";

//     await restaurant.createRestaurant(metaMaskID, "Restaurant A", "A nice place to eat");
//     await restaurant.addProduct(metaMaskID, price, description, gramaj);

//     const productInfo = await restaurant.getProduct(metaMaskID, 1); // Assuming product ID starts at 1

//     expect(productInfo.price).to.equal(price);
//     expect(productInfo.description).to.equal(description);
//     expect(productInfo.gramaj).to.equal(gramaj);
//   });

//   it("Should calculate the sum of selected products' prices", async function () {
//     const metaMaskID = owner.address;
//     const productPrices = [100, 200, 150]; // Prices in wei

//     await restaurant.createRestaurant(metaMaskID, "Restaurant A", "A nice place to eat");
//     for (const price of productPrices) {
//       await restaurant.addProduct(metaMaskID, price, "Product", "100g");
//     }

//     const sum = await restaurant.sumProducts(metaMaskID, [1, 3]); // Assuming product IDs start at 1

//     expect(sum).to.equal(productPrices[0] + productPrices[2]);
//   });
// });

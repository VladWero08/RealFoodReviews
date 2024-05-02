require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function deploy() {
    [owner] = await ethers.getSigners();

    let myerc20 = await ethers.getContractFactory("MyERC20");
    
    let supply = ethers.utils.parseUnits("0", 0); // 50 * 1e18
    let token = await myerc20.connect(owner).deploy(supply);
    await token.deployed();
    console.log("ERC20 address: ", token.address)

    let restaurant = await ethers.getContractFactory("Restaurant");
    let token2 = await restaurant.connect(owner).deploy(token.address);
    await token2.deployed();
    console.log("Restaurant address: ", token2.address)

    let order = await ethers.getContractFactory("Order");
    let token3 = await order.connect(owner).deploy(token.address);
    await token3.deployed();
    console.log("Order address: ", token3.address)

    let review = await ethers.getContractFactory("Review");
    let token4 = await review.connect(owner).deploy(token3.address);
    await token4.deployed();
    console.log("Review address: ", token4.address)

    let user = await ethers.getContractFactory("User");
    let token5 = await user.connect(owner).deploy(
        token.address, token3.address, token4.address);
    await token5.deployed();
    console.log("User address: ", token5.address)

}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
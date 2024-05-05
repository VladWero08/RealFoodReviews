require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function deploy() {
    [owner] = await ethers.getSigners();

    let restaurant = await ethers.getContractFactory("Restaurant");
    let token2 = await restaurant.connect(owner).deploy();
    await token2.deployed();
    console.log("Restaurant address: ", token2.address)

    let user = await ethers.getContractFactory("User");
    let token4 = await user.connect(owner).deploy()
    await token4.deployed();
    console.log("User address: ", token4.address)

    let myerc20 = await ethers.getContractFactory("MyERC20");
    let token = await myerc20.connect(owner).deploy(token4.address, token2.address);
    await token.deployed();
    console.log("ERC20 address: ", token.address)
    
    let review = await ethers.getContractFactory("Review");
    let token3 = await review.connect(owner).deploy(token.address);
    await token3.deployed();
    console.log("Review address: ", token3.address)

    let eth = await ethers.getContractFactory("EthTransfer");
    let token5 = await eth.connect(owner).deploy()
    await token5.deployed();
    console.log("Eth address: ", token5.address)

}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
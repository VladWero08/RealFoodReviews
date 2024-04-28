require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function deploy() {
    [owner, user1, user2, user3, user4, user5] = await ethers.getSigners();

    let tokenFactory = await ethers.getContractFactory("Restaurant");
    let token = await tokenFactory.connect(owner).deploy();
    await token.deployed();
    console.log("Restaurant address: ", token.address)
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
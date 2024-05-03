require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function deploy() {
    [owner, user1, user2, user3, user4, user5] = await ethers.getSigners();

    let tokenFactory = await ethers.getContractFactory("User");
    let token = await tokenFactory.connect(owner).deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    await token.deployed();
    console.log("User address: ", token.address)
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
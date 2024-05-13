require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const fs = require('fs');

/**
 * Function to copy all the compiled contracts from
 * the ./artifcats directory to the ./frontend/utils directory.
 * 
 * It is supposed that the contracts have been compiled
 * when this function is executed.
 */
function copyCompiledContractsJSONs() {
    fs.copyFileSync(
        "./artifacts/contracts/EthTransfer.sol/EthTransfer.json",
        "./frontend/utils/EthTransfer.json",
    );
    fs.copyFileSync(
        "./artifacts/contracts/MyERC20.sol/MyERC20.json",
        "./frontend/utils/MyERC20.json",
    );
    fs.copyFileSync(
        "./artifacts/contracts/Restaurant.sol/Restaurant.json",
        "./frontend/utils/Restaurant.json",
    );
    fs.copyFileSync(
        "./artifacts/contracts/Review.sol/Review.json",
        "./frontend/utils/Review.json",
    );
    fs.copyFileSync(
        "./artifacts/contracts/User.sol/User.json",
        "./frontend/utils/User.json",
    );
}

/**
 * Creates a JS file with all the constants needed
 * for the contracts: ABI and their address.
 */
function createContractConstantsFile(
    restaurantAddress,
    userAddress,
    EC20Address,
    reviewAddress,
    ethTransferAddress
) {
    const contractConstants = `
        import EthTransfer from './EthTransfer.json';
        import MyERC20 from './MyERC20.json';
        import Restaurant from './Restaurant.json';
        import Review from './Review.json';
        import User from './User.json';
        
        export const restaurantAbi = Restaurant.abi;
        export const restaurantAddress = "${restaurantAddress}";

        export const userAbi = User.abi;
        export const userAddress = "${userAddress}";

        export const myERC20Abi = MyERC20.abi;
        export const myERC20Address = "${EC20Address}";
        
        export const reviewAbi = Review.abi;
        export const reviewAddress = "${reviewAddress}";

        export const ethTransferAbi = EthTransfer.abi;
        export const ethTransferAddress = "${ethTransferAddress}";
    `;

    // create the utils/constants.js file, which will contain
    // the ABI and address of each contract
    fs.writeFileSync("./frontend/utils/constants.js", contractConstants, (error) => {
        if (error) {
            console.log("Couldn't create contract constants file:", error);
        } else {
            console.log("Succesfully create contract constants file.");
        }
    });
}

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

    copyCompiledContractsJSONs();
    createContractConstantsFile(
        token.address,
        token2.address,
        token3.address,
        token4.address,
        token5.address,
    );
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
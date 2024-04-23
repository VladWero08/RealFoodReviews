require('dotenv').config(); // Load environment variables
require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");
const { TLSSocket } = require("tls");

async function interact() {
    [owner, user1] = await ethers.getSigners();

    let deployedTokenAddress = process.env.DEPLOYED_TOKEN_ADDRESS
    let token = await ethers.getContractAt("MyERC20", deployedTokenAddress)

    // Call some methods from the token
    let totalSupply = await token.totalSupply();
    console.log("total supply: ", totalSupply)

    let userBalance = await token.balanceOf(owner.address)
    console.log("user balance: ", userBalance)


    // Transfer funds from owner to user1
    let amount = ethers.utils.parseUnits("3", 8) // 3 * 10^8
    // let transferTx = await token.connect(owner).transfer(user1.address, amount)
    // await transferTx.wait()

    // Check user 1 balance
    let user1Balance = await token.balanceOf(user1.address)
    console.log("user1 balance: ", user1Balance)

    // Approve user 1 to spend from owner
    allowance = await token.allowance(owner.address, user1.address)
    console.log("allowance: ", allowance)

    let approveTx = await token.connect(owner).approve(user1.address, amount);
    await approveTx.wait();

    // Check if there are sufficent funds
    let amountToSend = ethers.utils.parseUnits("0.000001", 8) // 3 * 10^8
    let estimatedGas = await token.connect(user1).estimateGas.transferFrom(owner.address, user1.address, amountToSend)
    console.log("estimatedGas ", estimatedGas)
    let gasPrice = await ethers.provider.getGasPrice()
    console.log("gasPrice ", gasPrice)
    let costInWei = estimatedGas.mul(gasPrice)
    console.log("gasPrice in wei ", costInWei) // cost in wei
    let ownerEthBalance = await ethers.provider.getBalance(owner.address)
    console.log("ownerEthBalance ", ownerEthBalance)
    
    if(ownerEthBalance.gt(costInWei)) {
        console.log("Enough ETH balance")
        let transferFrom = await token.connect(user1).transferFrom(owner.address, user1.address, amountToSend)
        await transferFrom.wait()
    } else {
        console.log("Not enough ETH balance")
    }

    userBalance = await token.balanceOf(owner.address)
    console.log("user balance at the end: ", userBalance)
    user1Balance = await token.balanceOf(user1.address)
    console.log("user1 balance at the end: ", user1Balance)


}

interact()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
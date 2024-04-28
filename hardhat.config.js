require('dotenv').config(); // Load environment variables
require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      gas: "auto",
      mining: {
        interval: 2000, //ms
      }
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: ["3d37a49d751c40039190398c680177f52eb19e5b56ab6683daa02625a3d462ab",  "df7e2e435a9f79f5e55045b4f30e3a7ad1ce2b4a0145c1e9733f0cef97e01cb1"]
    }
  },
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000
          }
        }
      }
    ]
  }
};

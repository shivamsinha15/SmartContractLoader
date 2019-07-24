var ethers = require('ethers');
const Web3 = require('web3');
let provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
let networkId = process.env.NETWORK_ID;

const web3 = new Web3(provider);

module.exports = {
    provider, wallet, networkId, web3
}


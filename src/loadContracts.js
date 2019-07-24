var ethers = require('ethers');
const { provider, wallet, networkId } = require('./config')

var contracts = require('require-all')({
    dirname     :  process.env.CONTRACTS_PATH
  });


const getContractInstance = (name,address) => {
    let contractDetails = contracts[name];
     if(!address){
        address = contractDetails.networks[networkId].address;
    }
    let contract = new ethers.Contract(address, contractDetails.abi, wallet);
    return contract; 
}

module.exports = {
      contracts,
      getContractInstance
}
const ethers = require('ethers');
const abiDecoder = require('abi-decoder');

export default class ContractManager {
    
    constructor(contractsPath,privateKey,blockchainURL,networkId) {
        this.INSTANCES = {};
        this.contractsPath = contractsPath;
        this.networkId = networkId
        this.provider = new ethers.providers.JsonRpcProvider(blockchainURL)
        this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.contracts = require('require-all')({
            dirname     :  contractsPath
          });
    }

    getContractsInstances(contractToLoad) {
        contractToLoad.forEach( x => {   this.INSTANCES[x] = this.getContractInstance(x); });
        contractToLoad.forEach( x =>  abiDecoder.addABI(this.contracts[x].abi) );
        return this.INSTANCES;
    }

    getContractInstance(name,address) {
        let contractDetails = this.contracts[name];
         if(!address){
            address = contractDetails.networks[this.networkId].address;
        }
        let contract = new ethers.Contract(address, contractDetails.abi, this.wallet);
        return contract;  
    }

    decodeLogs (eventName, txReceipt) {
        let event;
        let decoded = (abiDecoder.decodeLogs(txReceipt.logs))
            .find(e => (e.name == eventName || e.name == "ErrorLog"))
        if(decoded){
            event = decoded.events;
            
            let reducedEvent = event.reduce((acc, current) => {
            let newObj = {};
            newObj[current.name] = current.value;
            return Object.assign(acc, newObj)
            }, {});
            console.log(reducedEvent);
        
            if(reducedEvent.hasOwnProperty('error')){
            throw  reducedEvent.error
            }
            return reducedEvent;    
        }
        
        return event;
    }
    
    
}


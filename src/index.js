require('dotenv-flow').config();

var {
    contracts,
    getContractInstance,
} = require('./loadContracts.js');
const abiDecoder = require('abi-decoder');

const INSTANCES = {};

const validateProcessEnvAttributes = () => {
    if( !process.env.CONTRACTS_PATH ||
        !process.env.PRIVATE_KEY ||
        !process.env.BLOCKCHAIN_URL ||
        !process.env.NETWORK_ID
    ) {
        throw new Error(`Please ensure process env properties are correctly set."`);
    }
    
}

const loadContracts = (contractToLoad) => {
    validateProcessEnvAttributes();
    contractToLoad.forEach( x => {  INSTANCES[x] = getContractInstance(x); });
    contractToLoad.forEach( x =>  abiDecoder.addABI(contracts[x].abi) );
    return INSTANCES;
} 

const decodeLogs = (eventName, txReceipt) => {
    let event;
    let decoded = (abiDecoder.decodeLogs(txReceipt.logs))
      .find(e => (e.name == eventName || e.name == "ErrorLog"))
    if(decoded){
      red("Utils.decodeLogs");
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
  
/* 
    const CAMPAIGN_LOAD_ABIS = new Set([
        "CampaignTrust",
        "PollingBooth",
        "DistributionFactory",
        "CampaignRegistry",
        "CampaignManager",
        "KingTokenERC667",
        "TestContract",
        "RealMath"
    ]);


const test = async () => {
    
    try{
        loadContracts(CAMPAIGN_LOAD_ABIS);
        console.log( await INSTANCES.CampaignManager.rewardToken());
    } catch (e){
        console.error(e);
    }
}

test();
 */
 
module.exports = {
    loadContracts,
    decodeLogs 
}
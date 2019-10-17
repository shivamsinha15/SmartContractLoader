require('dotenv-flow').config();

import ContractManager from './ContractManager';

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
        let contractManager = new ContractManager(process.env.CONTRACTS_PATH, process.env.PRIVATE_KEY, process.env.BLOCKCHAIN_URL, process.env.NETWORK_ID);
        let instances = contractManager.getContractsInstances(CAMPAIGN_LOAD_ABIS);
        let userAddress = (await contractManager.getWallet()).address
        console.log("Invoking KingTokenERC667 SmartContract To Get User Balance:")
        console.log(`User Balance For ${userAddress} is`, parseInt(await instances.KingTokenERC667.balanceOf(userAddress)));
    } catch (e){
        console.error(e);
    }
}

test(); 

*/
 
module.exports = {
    ContractManager
}
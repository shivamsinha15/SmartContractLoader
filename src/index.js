require('dotenv-flow').config();

import ContractManager from './ContractManager';

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


/* 
const test = async () => {
    
    try{
        let contractManager = new ContractManager(process.env.CONTRACTS_PATH, process.env.PRIVATE_KEY, process.env.BLOCKCHAIN_URL, process.env.NETWORK_ID);
        let instances = contractManager.getContractsInstances(CAMPAIGN_LOAD_ABIS);
        console.log( await instances.CampaignManager.rewardToken());
    } catch (e){
        console.error(e);
    }
}

test(); */
 
 
module.exports = {
    ContractManager
}
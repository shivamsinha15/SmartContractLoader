# Truffle Smart Contract Loader For Server Side:

Use case: You want to use the generate truffle build/contracts abi definitions to call SmartContracts from a Server:

Example:

CONSTRUCTOR VARIABLES:

    CONTRACTS_PATH="<PATH TO TRUFFLE PROJECT>/build/contracts"
    PRIVATE_KEY=""
    BLOCKCHAIN_URL="http://localhost:7545"
    NETWORK_ID=5777


CODE:

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

    let contractManager = new ContractManager(process.env.CONTRACTS_PATH, process.env.PRIVATE_KEY, process.env.BLOCKCHAIN_URL, process.env.NETWORK_ID);
    let instances = contractManager.getContractsInstances(CAMPAIGN_LOAD_ABIS);
    
    //Invoke SmartContract
    let userAddress = (await contractManager.getWallet()).address
    console.log("Invoking KingTokenERC667 SmartContract To Get User Balance:")
    console.log(`User Balance For ${userAddress} is`, parseInt(await instances.KingTokenERC667.balanceOf(userAddress)));

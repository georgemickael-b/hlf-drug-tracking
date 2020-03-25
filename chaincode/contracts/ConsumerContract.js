const { Contract , Context} = require("fabric-contract-api");
const log = require("loglevel");
const allCommons = require('../commons/AllCommons')
const DrugList = require('../lists/DrugList')

/**
 * Custom Context for DistributorContext
 */
class ConsumerContext extends Context {
    constructor() {
        super();
		this.drugList = new DrugList(this);
    }
}


/**
 * ConsumentContract contains all the function that should be invoked by manufacturer
 */
class ConsumerContract extends Contract {
	constructor() {
		// Custom name to refer to this smart contract
		super("org.pharma-network.pharmanet.contract.consumer");
	}

	// Override beforeTransaction method from Contract class
	async beforeTransaction(ctx) {
		// Allow only the manufacturer peers to initiate any transaction on this contract
	}

    	// Built in method used to build and return the context for this smart contract on every transaction invoke
	createContext() {
		return new ConsumerContext();
    }
    
	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		log.info("Consumer Smart Contract Instantiated");
    }
    
    async viewDrugCurrentState(...args){
		return allCommons.viewDrugCurrentState(...args)
	}

	async viewHistory (ctx , drugName, serialNo){
		return allCommons.viewHistory (ctx , drugName, serialNo)
	}

}

module.exports = ConsumerContract
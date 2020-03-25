const { Contract, Context } = require("fabric-contract-api");
const CompanyList = require('../lists/CompanyList');
const DrugList = require('../lists/DrugList')
const Drug = require('../models/Drug');
const log = require("loglevel");
const Validators = require("../validators");
const companyCommons = require("../commons/CompanyCommons")
const allCommons = require('../commons/AllCommons')
const purchaseOrderCommons = require('../commons/PurchaseOrderCommons')
const shipmentCommons = require('../commons/ShipmentCommons')
const PurchaseOrderList = require('../lists/PurchaseOrderList')
const ShipmentList = require('../lists/ShipmentList')

/**
 * Custom Context for DistributorContext
 */
class DistributorContext extends Context {
    constructor() {
        super();
        this.companyList = new CompanyList(this);
		this.drugList = new DrugList(this);
		this.purchaseOrderList  = new PurchaseOrderList(this);
		this.shipmentList = new ShipmentList(this);
    }
}

/**
 * ManufacturerContract contains all the function that should be invoked by manufacturer
 */
class DistributorContract extends Contract {
	constructor() {
		// Custom name to refer to this smart contract
		super("org.pharma-network.pharmanet.contract.distributor");
	}

	// Built in method used to build and return the context for this smart contract on every transaction invoke
	createContext() {
		return new DistributorContext();
	}

	// Override beforeTransaction method from Contract class
	async beforeTransaction(ctx) {
		// Allow only the manufacturer peers to initiate any transaction on this contract
	}

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		log.info("Distributor Smart Contract Instantiated");
	}

	async createPO (ctx, buyerCRN, sellerCRN, drugName, quantity){
		return await purchaseOrderCommons.createPO(ctx,buyerCRN, sellerCRN, drugName, quantity)
	}
	
	async createShipment (ctx, buyerCRN, drugName, listOfAssets, transporterCRN ){
		return shipmentCommons.createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN )
	}

	async registerCompany(...args) {
		return companyCommons.registerCompany(...args)
	}


}

module.exports = DistributorContract
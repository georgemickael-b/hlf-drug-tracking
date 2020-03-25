const { Contract, Context } = require("fabric-contract-api");
const Company = require('../models/Company')
const CompanyList = require('../lists/CompanyList');
const DrugList = require('../lists/DrugList')
const Drug = require('../models/Drug');
const log = require("loglevel");
const Validators = require("../validators");
const companyCommons = require("../commons/CompanyCommons")
const allCommons = require('../commons/AllCommons')
const shipmentCommons = require('../commons/ShipmentCommons')
const ShipmentList = require('../lists/ShipmentList')
const Shipment = require('../models/Shipment')
const PurchaseOrderList = require('../lists/PurchaseOrderList')
const constants = require('../constants')

/**
 * Custom Context for CompanyContract
 */
class TransporterContext extends Context {
    constructor() {
        super();
        this.companyList = new CompanyList(this);
		this.drugList = new DrugList(this);
		this.purchaseOrderList  = new PurchaseOrderList(this)
		this.shipmentList = new ShipmentList(this);
    }
}

/**
 * ManufacturerContract contains all the function that should be invoked by manufacturer
 */
class TransporterContract extends Contract {
	constructor() {
		// Custom name to refer to this smart contract
		super("org.pharma-network.pharmanet.contract.transporter");
	}

	// Built in method used to build and return the context for this smart contract on every transaction invoke
	createContext() {
		return new TransporterContext();
	}

	// Override beforeTransaction method from Contract class
	async beforeTransaction(ctx) {
		// Allow only the transporter peers to initiate any transaction on this contract
	}

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		log.info("Transporter Smart Contract Instantiated");
	}

	async updateShipment(ctx, buyerCRN, drugName, transporterCRN){
		const shipmentKey = Shipment.makeKey([buyerCRN, drugName])
		let transporterCompany;
		let shipment;
		let buyerCompany;
		
		// Get shipment object from ledger else throw error
        try{
			shipment = await ctx.shipmentList.getShipment(shipmentKey)
        }catch(e){
            throw new Error("Shipment not found")
		}

		// Get buyer company object from ledger else throw error
        try{
			buyerCompany = await ctx.companyList.getCompanyByPartialKey([buyerCRN])
        }catch(e){
            throw new Error("Buyer Company not found")
		}

		//Get transporter object from ledger for given transporterCRN else throw error
		try{
			transporterCompany = await ctx.companyList.getCompany(shipment.transporter)
        }catch(e){
			log.error(e)
            throw new Error("Transporter not found")
		}

		// Check if calling tranporter is the one who is assigned to deliver this shipment
		if(transporterCompany.companyCRN!==transporterCRN)
			throw new Error("Incorrect transporter for this shipment")

		// Change status to delivered
		shipment.status = constants.SHIPMENT_DELIVERED
		const shipmentObject = Shipment.createInstance(shipment)
		try{
			await ctx.shipmentList.updateShipment(shipmentObject)
		}catch(e){
			log.error(e)
			throw new Error("Oops, Cannot update shipment")
		}

		// Add the shipment object key to all the drug objects 
		for (let assetKey of shipmentObject.assets) {
			const drugKey = Drug.makeKey([drugName, assetKey])
			let drug = await ctx.drugList.getDrug(drugKey)
			drug.shipment.push(shipmentKey)
			drug.owner = buyerCompany.companyID

			let drugObject = Drug.createInstance(drug)
			await ctx.drugList.updateDrug(drugObject)

		}
		return shipmentObject
	}
	
	async registerCompany(...args) {
		return companyCommons.registerCompany(...args)
	}

}

module.exports = TransporterContract
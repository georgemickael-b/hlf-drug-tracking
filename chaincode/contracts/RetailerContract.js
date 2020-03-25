const { Contract, Context } = require("fabric-contract-api");
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
const purchaseOrderCommons = require("../commons/PurchaseOrderCommons")

/**
 * Custom Context for CompanyContract
 */
class RetailerContext extends Context {
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
class RetailerContract extends Contract {
	constructor() {
		// Custom name to refer to this smart contract
		super("org.pharma-network.pharmanet.contract.retailer");
	}

	// Built in method used to build and return the context for this smart contract on every transaction invoke
	createContext() {
		return new RetailerContext();
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

    async retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar){
        const drugKey = Drug.makeKey([drugName, serialNo])
        let drug;
        let retailerCompany;

        //Get drug object from ledger
        try{
            drug = await ctx.drugList.getDrug(drugKey)
        }catch(e){
            log.error(e)
            throw new Error("Drug not found")
        }

        //Get retailer object from ledger else throw error
		try{
			retailerCompany = await ctx.companyList.getCompanyByPartialKey([retailerCRN])
        }catch(e){
			log.error(e)
            throw new Error("Retailer not found")
        }

        console.log("drug and retailer company", drug, retailerCompany)
        
        // Check if calling tranporter is the one who is assigned to deliver this shipment
		if(drug.owner != retailerCompany.companyID)
            throw new Error("Incorrect Owner for this Drug")


        // Change ownership of drug and update
		drug.owner = customerAadhar
		const drugObject = Drug.createInstance(drug)
		try{
			await ctx.drugList.updateDrug(drugObject)
		}catch(e){
			log.error(e)
			throw new Error("Oops, Cannot update shipment")
        }
        return drugObject
    }

    async createPO (ctx, buyerCRN, sellerCRN, drugName, quantity){
		return await purchaseOrderCommons.createPO(ctx,buyerCRN, sellerCRN, drugName, quantity)
	}
	async registerCompany(...args) {
		return companyCommons.registerCompany(...args)
	}

	async viewDrugCurrentState(...args){
		return allCommons.viewDrugCurrentState(...args)
	}

	async viewHistory (ctx , drugName, serialNo){
		return allCommons.viewHistory (ctx , drugName, serialNo)
	}
    
}

module.exports = RetailerContract
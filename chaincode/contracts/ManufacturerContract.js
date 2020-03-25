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
const PurchaseOrderList = require('../lists/PurchaseOrderList')

/**
 * Custom Context for CompanyContract
 */
class ManufacturerContext extends Context {
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
class ManufacturerContract extends Contract {
	constructor() {
		// Custom name to refer to this smart contract
		super("org.pharma-network.pharmanet.contract.manufacturer");
	}

	// Built in method used to build and return the context for this smart contract on every transaction invoke
	createContext() {
		return new ManufacturerContext();
	}

	// Override beforeTransaction method from Contract class
	async beforeTransaction(ctx) {
		// Allow only the manufacturer peers to initiate any transaction on this contract
	}

	// This is a basic user defined function used at the time of instantiating the smart contract
	// to print the success message on console
	async instantiate(ctx) {
		log.info("Manufacturer Smart Contract Instantiated");
	}

	async addDrug(ctx, drugName,serialNo, mfgDate, expDate, companyCRN) {
		const drugKey =  Drug.makeKey([drugName, serialNo ])
		const manufacturer = await ctx.companyList.getCompanyByPartialKey([companyCRN])
		
		let drug;
        try {
            drug = await ctx.drugList.getDrug(drugKey)
        } catch (e) {
            log.info(`addDrug : ${drugKey} is unique!`)
        }
        if (!!drug) {
            throw new Error(`Drug with name=${drugName} and serialNo=${serialNo} already exists.`)
		}
		let drugData = {
			name : drugName,
			manufacturer : manufacturer.companyID,
			manufacturingDate : mfgDate,
			expiryDate : expDate,
			owner : manufacturer.companyID,
			shipment : [],
			serialNo
		}
		
        const drugObject = Drug.createInstance(drugData);
        if (Validators.validateDrugRegistrationDetails(drugData)) {
            await ctx.drugList.addDrug(drugObject)
        }
        return drugObject
	}

	async viewCompany(...args) {
		return companyCommons.viewCompany(...args)
	}
	
	async registerCompany(...args) {
		return companyCommons.registerCompany(...args)
	}

	async  createShipment (ctx, buyerCRN, drugName, listOfAssets, transporterCRN ){
		return shipmentCommons.createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN )
	}

	async viewDrugCurrentState(...args){
		return allCommons.viewDrugCurrentState(...args)
	}

	async viewHistory (ctx , drugName, serialNo){
		return allCommons.viewHistory (ctx , drugName, serialNo)
	}
}

module.exports = ManufacturerContract
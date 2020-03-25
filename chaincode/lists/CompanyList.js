'use strict';

const Company = require('../models/Company.js');

class CompanyList {
	
	constructor(ctx) {
		this.ctx = ctx;
		this.name = 'org.pharma-network.pharmanet.lists.company';
	}
	
	/**
	 * Returns the Company model stored in blockchain identified by this key
	 * @param companyKey
	 * @returns {Promise<Company>}
	 */
	async getCompany(companyKey) {
        let companyCompositeKey = this.ctx.stub.createCompositeKey(this.name, companyKey.split(':'));
		let companyBuffer = await this.ctx.stub.getState(companyCompositeKey);
		return Company.fromBuffer(companyBuffer);
	}
	
	/**
	 * Returns the Company model stored in blockchain identified by a partial key
	 * @param partialKeyParts array of partial key parts
	 * @returns {Promise<Company>}
	 */
	async getCompanyByPartialKey(partialKeyParts){
		let companyStateIterator = await this.ctx.stub.getStateByPartialCompositeKey(this.name, Company.makeKey(partialKeyParts).split(":"));
		let matchingCompanies = []
		while(true){
			const companyData = await companyStateIterator.next()
			console.log("Company Data", companyData)
			matchingCompanies.push(Company.fromBuffer(companyData.value.value.toBuffer()))
			if(companyData.done)
				break;
		}
		await companyStateIterator.close()
		return matchingCompanies[0]
	}

	/**
	 * Adds a company model to the blockchain
	 * @param companyObject {Company}
	 * @returns {Promise<void>}
	 */
	async addCompany(companyObject) {
		let companyCompositeKey = this.ctx.stub.createCompositeKey(this.name, companyObject.getKeyArray());
		let companyBuffer = companyObject.toBuffer();
		await this.ctx.stub.putState(companyCompositeKey, companyBuffer);
	}
	
	/**
	 * Updates a company model on the blockchain
	 * @param companyObject {Company}
	 * @returns {Promise<void>}
	 */
	async updateCompany(companyObject) {
		let companyCompositeKey = this.ctx.stub.createCompositeKey(this.name, companyObject.getKeyArray());
		let companyBuffer = companyObject.toBuffer();
		await this.ctx.stub.putState(companyCompositeKey, companyBuffer);
	}
}

module.exports = CompanyList;
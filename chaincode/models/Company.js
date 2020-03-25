'use strict';

class Company {

	/**
	 * Constructor function
	 * @param companyObject {Object}
	 */
	constructor(companyObject) {
		this.companyID = Company.makeKey([companyObject.companyCRN, companyObject.companyName]);
		console.log("CompanyID", this.companyID)
		Object.assign(this, companyObject);
	}

	/**
	 * Get class of this model
	 * @returns {string}
	 */
	static getClass() {
		return 'org.pharma-network.pharmanet.models.company';
	}

	/**
	 * Convert the buffer stream received from blockchain into an object of this model
	 * @param buffer {Buffer}
	 */
	static fromBuffer(buffer) {
		let json = JSON.parse(buffer.toString());
		return new Company(json);
	}

	/**
	 * Convert the object of this model to a buffer stream
	 * @returns {Buffer}
	 */
	toBuffer() {
		return Buffer.from(JSON.stringify(this));
	}

	/**
	 * Create a key string joined from different key parts
	 * @param keyParts {Array}
	 * @returns {*}
	 */
	static makeKey(keyParts) {
		return [Company.getClass(),...keyParts].map(part => JSON.stringify(part)).join(":");
	}

	/**
	 * Create an array of key parts for this model instance
	 * @returns {Array}
	 */
	getKeyArray() {
		return this.companyID.split(":");
	}

	/**
	 * Create a new instance of this model
	 * @returns {Company}
	 * @param companyObject {Object}
	 */
	static createInstance(companyObject) {
		return new Company(companyObject);
	}

}

module.exports = Company;
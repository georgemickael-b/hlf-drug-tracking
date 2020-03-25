'use strict';

class PurchaseOrder {

	/**
	 * Constructor function
	 * @param purchaseOrderObject {Object}
	 */
	constructor(purchaseOrderObject) {
        this.poID = PurchaseOrder.makeKey([purchaseOrderObject.buyer, purchaseOrderObject.drugName]);
		Object.assign(this, purchaseOrderObject);
	}

	/**
	 * Get class of this model
	 * @returns {string}
	 */
	static getClass() {
		return 'org.pharma-network.pharmanet.models.purchase-order';
	}

	/**
	 * Convert the buffer stream received from blockchain into an object of this model
	 * @param buffer {Buffer}
	 */
	static fromBuffer(buffer) {
		let json = JSON.parse(buffer.toString());
		return new PurchaseOrder(json);
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
		return [PurchaseOrder.getClass(),...keyParts].map(part => JSON.stringify(part)).join(":");
	}

	/**
	 * Create an array of key parts for this model instance
	 * @returns {Array}
	 */
	getKeyArray() {
		return this.poID.split(":");
	}

	/**
	 * Create a new instance of this model
	 * @returns {PurchaseOrder}
	 * @param purchaseOrderObject {Object}
	 */
	static createInstance(purchaseOrderObject) {
		return new PurchaseOrder(purchaseOrderObject);
	}

}

module.exports = PurchaseOrder;
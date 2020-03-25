'use strict';

const PurchaseOrder = require('../models/PurchaseOrder.js');

class PurchaseOrderList {
	
	constructor(ctx) {
		this.ctx = ctx;
		this.name = 'org.pharma-network.pharmanet.lists.purchase-order';
	}
	
	/**
	 * Returns the PurchaseOrder model stored in blockchain identified by this key
	 * @param purchaseOrderKey
	 * @returns {Promise<PurchaseOrder>}
	 */
	async getPurchaseOrder(purchaseOrderKey) {
        let purchaseOrderCompositeKey = this.ctx.stub.createCompositeKey(this.name, purchaseOrderKey.split(':'));
		let purchaseOrderBuffer = await this.ctx.stub.getState(purchaseOrderCompositeKey);
		return PurchaseOrder.fromBuffer(purchaseOrderBuffer);
	}
	
	/**
	 * Returns the PurchaseOrder model stored in blockchain identified by a partial key
	 * @param partialKeyParts array of partial key parts
	 * @returns {Promise<PurchaseOrder>}
	 */
	async getPurchaseOrderByPartialKey(partialKeyParts){
		let purchaseOrderStateIterator = await this.ctx.stub.getStateByPartialCompositeKey(this.name, PurchaseOrder.makeKey(partialKeyParts).split(":"));
		let matchingPurchaseOrders = []
		while(true){
			const purchaseOrderData = await purchaseOrderStateIterator.next()
			matchingPurchaseOrders.push(PurchaseOrder.fromBuffer(purchaseOrderData.value.value.toBuffer()))
			if(purchaseOrderData.done)
				break;
		}
		await purchaseOrderStateIterator.close()
		return matchingPurchaseOrders[0]
	}

	/**
	 * Adds a purchaseOrder model to the blockchain
	 * @param purchaseOrderObject {PurchaseOrder}
	 * @returns {Promise<void>}
	 */
	async addPurchaseOrder(purchaseOrderObject) {
		let purchaseOrderCompositeKey = this.ctx.stub.createCompositeKey(this.name, purchaseOrderObject.getKeyArray());
		let purchaseOrderBuffer = purchaseOrderObject.toBuffer();
		await this.ctx.stub.putState(purchaseOrderCompositeKey, purchaseOrderBuffer);
	}
	
	/**
	 * Updates a purchaseOrder model on the blockchain
	 * @param purchaseOrderObject {PurchaseOrder}
	 * @returns {Promise<void>}
	 */
	async updatePurchaseOrder(purchaseOrderObject) {
		let purchaseOrderCompositeKey = this.ctx.stub.createCompositeKey(this.name, purchaseOrderObject.getKeyArray());
		let purchaseOrderBuffer = purchaseOrderObject.toBuffer();
		await this.ctx.stub.putState(purchaseOrderCompositeKey, purchaseOrderBuffer);
	}
}

module.exports = PurchaseOrderList;
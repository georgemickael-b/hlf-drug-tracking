'use strict';

const Shipment = require('../models/Shipment.js');

class ShipmentList {
	
	constructor(ctx) {
		this.ctx = ctx;
		this.name = 'org.pharma-network.pharmanet.lists.shipment';
	}
	
	/**
	 * Returns the Shipment model stored in blockchain identified by this key
	 * @param shipmentKey
	 * @returns {Promise<Shipment>}
	 */
	async getShipment(shipmentKey) {
        let shipmentCompositeKey = this.ctx.stub.createCompositeKey(this.name, shipmentKey.split(':'));
		let shipmentBuffer = await this.ctx.stub.getState(shipmentCompositeKey);
		return Shipment.fromBuffer(shipmentBuffer);
	}
	
	/**
	 * Returns the Shipment model stored in blockchain identified by a partial key
	 * @param partialKeyParts array of partial key parts
	 * @returns {Promise<Shipment>}
	 */
	async getShipmentByPartialKey(partialKeyParts){
		let shipmentStateIterator = await this.ctx.stub.getStateByPartialCompositeKey(this.name, Shipment.makeKey(partialKeyParts).split(":"));
		let matchingShipments = []
		while(true){
			const shipmentData = await shipmentStateIterator.next()
			if(shipmentData.done)
				break;
			matchingShipments.push(Shipment.fromBuffer(shipmentData.value.value.toBuffer()))
		}
		await shipmentStateIterator.close()
		return matchingShipments[0]
	}

	/**
	 * Adds a shipment model to the blockchain
	 * @param shipmentObject {Shipment}
	 * @returns {Promise<void>}
	 */
	async addShipment(shipmentObject) {
		let shipmentCompositeKey = this.ctx.stub.createCompositeKey(this.name, shipmentObject.getKeyArray());
		let shipmentBuffer = shipmentObject.toBuffer();
		await this.ctx.stub.putState(shipmentCompositeKey, shipmentBuffer);
	}
	
	/**
	 * Updates a shipment model on the blockchain
	 * @param shipmentObject {Shipment}
	 * @returns {Promise<void>}
	 */
	async updateShipment(shipmentObject) {
		let shipmentCompositeKey = this.ctx.stub.createCompositeKey(this.name, shipmentObject.getKeyArray());
		let shipmentBuffer = shipmentObject.toBuffer();
		await this.ctx.stub.putState(shipmentCompositeKey, shipmentBuffer);
	}
}

module.exports = ShipmentList;
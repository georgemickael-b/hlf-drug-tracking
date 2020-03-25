'use strict';

const Drug = require('../models/Drug.js');

class DrugList {
	
	constructor(ctx) {
		this.ctx = ctx;
		this.name = 'org.pharma-network.pharmanet.lists.drug';
	}
	
	/**
	 * Returns the Drug model stored in blockchain identified by this key
	 * @param drugKey
	 * @returns {Promise<Drug>}
	 */
	async getDrug(drugKey) {
        let drugCompositeKey = this.ctx.stub.createCompositeKey(this.name, drugKey.split(':'));
		let drugBuffer = await this.ctx.stub.getState(drugCompositeKey);
		return Drug.fromBuffer(drugBuffer);
	}

	async getDrugHistory(drugKey){
		let drugCompositeKey = this.ctx.stub.createCompositeKey(this.name, drugKey.split(':'));
		let historyQueryIterator = await this.ctx.stub.getHistoryForKey(drugCompositeKey)
		let drugHistory = []
        while(true){
            let history = await historyQueryIterator.next()
			console.log(history)
			drugHistory.push(Drug.fromBuffer(history.value.value.toBuffer()))
            if(history.done)
                break;
		}
		return drugHistory
	}
	
	/**
	 * Adds a drug model to the blockchain
	 * @param drugObject {Drug}
	 * @returns {Promise<void>}
	 */
	async addDrug(drugObject) {
		let drugCompositeKey = this.ctx.stub.createCompositeKey(this.name, drugObject.getKeyArray());
		let drugBuffer = drugObject.toBuffer();
		await this.ctx.stub.putState(drugCompositeKey, drugBuffer);
	}
	
	/**
	 * Updates a drug model on the blockchain
	 * @param drugObject {Drug}
	 * @returns {Promise<void>}
	 */
	async updateDrug(drugObject) {
		let drugCompositeKey = this.ctx.stub.createCompositeKey(this.name, drugObject.getKeyArray());
		let drugBuffer = drugObject.toBuffer();
		await this.ctx.stub.putState(drugCompositeKey, drugBuffer);
	}
}

module.exports = DrugList;
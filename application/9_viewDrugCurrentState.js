'use strict';

const helper = require('./contractHelper');

async function main(org, drugName, serialNo) {
	try {
		const contract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Getting CurrentState of the drug');
		const drugCurrentStateBuffer = await contract.submitTransaction('viewDrugCurrentState', drugName, serialNo);

		// process response
		console.log('.....Processing View Drug Current State  Transaction Response \n\n');
		let drugCurrentState = JSON.parse(drugCurrentStateBuffer.toString());
		console.log(drugCurrentStateBuffer);
		console.log('\n\n.....View Drug Current State Transaction Complete!');
		return drugCurrentState;

	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {
		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();
	}
}
module.exports.execute = main;

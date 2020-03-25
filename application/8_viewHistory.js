'use strict';

const helper = require('./contractHelper');

async function main(org, drugName, serialNo) {
	try {
		const contract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Getting history of the drug');
		const historyBuffer = await contract.submitTransaction('viewHistory', drugName, serialNo);

		// process response
		console.log('.....Processing View History  Transaction Response \n\n');
		let history = JSON.parse(historyBuffer.toString());
		console.log(historyBuffer);
		console.log('\n\n.....View History Transaction Complete!');
		return history;

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

'use strict';

const helper = require('./contractHelper');

async function main(org, drugName, serialNo, retailerCRN, customerAadhar) {
	try {
		const retailerContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Retail the drug');
		const drugBuffer = await retailerContract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);

		// process response
		console.log('.....Processing Retail Drug Transaction Response \n\n');
		let drug = JSON.parse(drugBuffer.toString());
		console.log(drug);
		console.log('\n\n.....Retail Drug Transaction Complete!');
		return drug;

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

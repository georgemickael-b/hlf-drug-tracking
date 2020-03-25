'use strict';

const helper = require('./contractHelper');

async function main(org, drugName, serialNo, mfgDate, expDate, companyCRN) {
	try {
		const manufacturerContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Adding the drug');
		const drugBuffer = await manufacturerContract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyCRN);

		// process response
		console.log('.....Processing Add Drug Transaction Response \n\n');
		let newDrug = JSON.parse(drugBuffer.toString());
		console.log(newDrug);
		console.log('\n\n.....Add Drug Transaction Complete!');
		return newDrug;

	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {
		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();
	}
}

/*
main("manufacturer","Paracetamol","001","01-01-2019","01-01-202","MAN001").then(() => {
	console.log('Drug Added');
});
*/
module.exports.execute = main;

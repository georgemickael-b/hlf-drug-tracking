'use strict';

const helper = require('./contractHelper');

async function main(org, buyerCRN, sellerCRN, drugName, quantity) {
	try {
		const companyContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Creating Purchase Order');
		const POBuffer = await companyContract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity);

		// process response
		console.log('.....Processing Create Purchase Order Transaction Response \n\n');
		let newPO = JSON.parse(POBuffer.toString());
		console.log(newPO);
		console.log('\n\n.....Create PO Complete!');
		return newPO;

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
main("distributor","DIST001","MAN001","Paracetamol","1").then(() => {
	console.log('Purchase Order Created');
});
*/
module.exports.execute = main;

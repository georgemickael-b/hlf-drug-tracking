'use strict';

const helper = require('./contractHelper');

async function main(org, buyerCRN, drugName, listOfAssets, transporterCRN) {
	try {
		const companyContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Creating Shipment');
		const shipmentBuffer = await companyContract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterCRN);

		// process response
		console.log('.....Processing Create Shipment Transaction Response \n\n');
		let newShipment = JSON.parse(shipmentBuffer.toString());
		console.log(newShipment);
		console.log('\n\n.....Create Shipment Complete!');
		return newShipment;

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
main("manufacturer","DIST001","Paracetamol","001","TRA001").then(() => {
	console.log('Purchase Order Created');
});
*/
module.exports.execute = main;

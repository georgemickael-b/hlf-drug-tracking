'use strict';

const helper = require('./contractHelper');

async function main(org, buyerCRN, drugName, transporterCRN) {
	try {
		const companyContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Updating Shipment');
		const shipmentBuffer = await companyContract.submitTransaction('updateShipment', buyerCRN, drugName, transporterCRN);

		// process response
		console.log('.....Processing Update Shipment Transaction Response \n\n');
		let updatedShipment = JSON.parse(shipmentBuffer.toString());
		console.log(updatedShipment);
		console.log('\n\n.....Update Shipment Complete!');
		return updatedShipment;

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

'use strict';

const helper = require('./contractHelper');

async function main(org, companyCRN, companyName, location, organisationRole) {
	try {
		const manufacturerContract = await helper.getContractInstance(org);
		// Create a new student account
		console.log('.....Registering the company');
		const companyBuffer = await manufacturerContract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);

		// process response
		console.log('.....Processing Register Company Transaction Response \n\n');
		let newCompany = JSON.parse(companyBuffer.toString());
		console.log(newCompany);
		console.log('\n\n.....Register Company Transaction Complete!');
		return newCompany;

	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {
		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();
	}
}


/*main("manufacturer","DIST001","VG Pharma","Vizag","distributor").then(() => {
	console.log('Company Registered');
});*/


/*
main("manufacturer","MAN001","Sun Pharma","Chennai","manufacturer").then(() => {
	console.log('Company Registered');
});
main("manufacturer","TRA001","FedEx","Delhi","transporter").then(() => {
	console.log('Company Registered');
});
*/
module.exports.execute = main;

'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

const constants = require('./constants')
const ORG_MSP_MAP = constants.ORG_MSP_MAP
const ORG_ADMIN_IDENTITY_LABEL_MAP = constants.ORG_ADMIN_IDENTITY_LABEL_MAP

async function main(user, org) {
	// A wallet is a filesystem path that stores a collection of Identities
	const wallet = new FileSystemWallet('./identity/'+org);
	const certificatePath = `../network/crypto-config/peerOrganizations/${org}.pharma-network.com/users/${user}@${org}.pharma-network.com/msp/signcerts/${user}@${org}.pharma-network.com-cert.pem`
	
	const keystoreDir = `../network/crypto-config/peerOrganizations/${org}.pharma-network.com/users/${user}@${org}.pharma-network.com/msp/keystore`
	const keystoreFiles = fs.readdirSync(keystoreDir);
	const privateKeyPath = path.join(keystoreDir, keystoreFiles[0])

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = ORG_ADMIN_IDENTITY_LABEL_MAP[org];
		const identity = X509WalletMixin.createIdentity(ORG_MSP_MAP[org], certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

/*
main('Admin', 'manufacturer').then(() => {
	console.log('User identity added to wallet.');
});

main('Admin', 'distributor').then(() => {
	console.log('User identity added to wallet.');
});
*/

module.exports.execute = main;
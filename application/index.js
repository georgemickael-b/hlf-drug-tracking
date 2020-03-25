const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules
const addToWallet = require('./1_addToWallet');
const registerCompany = require('./2_registerCompany')
const addDrug = require('./3_addDrug')
const createPO = require('./4_createPO')
const createShipment = require('./5_createShipment')
const updateShipment = require('./6_updateShipment')


// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharma App');

app.get('/', (req, res) => res.send('Pharma App'));

app.post('/addToWallet', (req, res) => {
    addToWallet.execute(req.body.user, req.body.org)
        .then(() => {
            console.log('User credentials added to wallet');
            const result = {
                status: 'success',
                message: 'User credentials added to wallet'
            };
            res.json(result);
        })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});

app.post('/registerCompany', (req, res) => {
    const {companyCRN, companyName, location, organisationRole} = req.body
	registerCompany.execute(organisationRole, companyCRN, companyName, location, organisationRole)
			.then((company) => {
				console.log('Company registered');
				const result = {
					status: 'success',
					message: 'Company registered',
					company: company
				};
				res.json(result);
            })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});

app.post('/addDrug/:org', (req, res) => {
    const { drugName, serialNo, mfgDate, expDate, companyCRN } = req.body
    addDrug.execute(req.params.org, drugName, serialNo, mfgDate, expDate, companyCRN)
        .then((drug) => {
            console.log('Drug Added');
            const result = {
                status: 'success',
                message: 'Drug Added',
                drug: drug
            };
            res.json(result);
        })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});


app.post('/createPO/:org', (req, res) => {
    const { buyerCRN, sellerCRN, drugName, quantity } = req.body
    createPO.execute(req.params.org, buyerCRN, sellerCRN, drugName, quantity)
        .then((purchaseOrder) => {
            console.log('Purchase Order Created');
            const result = {
                status: 'success',
                message: 'Purchase Order Created',
                purchaseOrder
            };
            res.json(result);
        })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});

app.post('/createShipment/:org', (req, res) => {
    const {buyerCRN, drugName, listOfAssets, transporterCRN  } = req.body
    createShipment.execute(req.params.org, buyerCRN, drugName, listOfAssets, transporterCRN )
        .then((shipment) => {
            console.log('Shipment Created');
            const result = {
                status: 'success',
                message: 'Shipment Created',
                shipment
            };
            res.json(result);
        })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});

app.post('/updateShipment/:org', (req, res) => {
    const { buyerCRN, drugName, transporterCRN } = req.body
    updateShipment.execute(req.params.org,  buyerCRN, drugName, transporterCRN )
        .then((shipment) => {
            console.log('Shipment Updated');
            const result = {
                status: 'success',
                message: 'Shipment Updated',
                shipment
            };
            res.json(result);
        })
        .catch((e) => {
            const result = {
                status: 'error',
                message: 'Failed',
                error: e
            };
            res.status(500).send(result);
        });
});

app.listen(port, () => console.log(`Distributed Pharma App listening on port ${port}!`));
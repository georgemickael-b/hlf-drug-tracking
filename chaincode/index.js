'use strict';

const manufacturerContract = require('./contracts/ManufacturerContract');
const distributorContract = require('./contracts/DistributorContract');
const transporterContract = require('./contracts/TransporterContract');
const retailerContract = require('./contracts/RetailerContract')

module.exports.contracts = [manufacturerContract, distributorContract, transporterContract, retailerContract];

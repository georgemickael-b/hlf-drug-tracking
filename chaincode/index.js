'use strict';

const manufacturerContract = require('./contracts/ManufacturerContract');
const distributorContract = require('./contracts/DistributorContract');
const transporterContract = require('./contracts/TransporterContract');
const retailerContract = require('./contracts/RetailerContract')
const consumerContract = require('./contracts/ConsumerContract')

module.exports.contracts = [manufacturerContract, distributorContract, transporterContract, retailerContract, consumerContract];

const log = require("loglevel");
const PurchaseOrder = require('../models/PurchaseOrder')
const Drug = require('../models/Drug')
const Company = require('../models/Company')
const constants = require('../constants')
const Validators = require('../validators')
const Shipment = require('../models/Shipment')

class ShipmentCommons {
    async  createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {
        const purchaseOrderKey = PurchaseOrder.makeKey([buyerCRN, drugName]);
        let purchaseOrder;
        try {
            purchaseOrder = await ctx.purchaseOrderList.getPurchaseOrder(purchaseOrderKey);
        }
        catch (e) {
            throw new Error(`There is not purchase order with buyer ${buyerCRN} for drug ${drugName}`)
        }
        listOfAssets = listOfAssets.split(";")
        if (listOfAssets.length !== Number(purchaseOrder.quantity)) {
            throw new Error(`The quantity in PO and quanityt of assets dont match.`)
        }
        for (let assetKey of listOfAssets) {
            try {
                const drugKey = Drug.makeKey([drugName, assetKey])
                await ctx.drugList.getDrug(drugKey)
            }
            catch (e) {
                throw new Error(`One of more of drug asset not found in ledger`)
            }
        }

        let transporter;
        try{
            transporter = await ctx.companyList.getCompanyByPartialKey([transporterCRN])
        }
        catch(e){
            throw new Error("Transporter not found")
        }
        let shipmentData = {
            creator: purchaseOrder.seller,
            assets: listOfAssets,
            transporter: transporter.companyID,
            status: constants.SHIPMENT_IN_TRANSIT,
            buyerCRN,
            drugName
        }

        Validators.validateShipmentData(shipmentData)

        const shipmentObject = Shipment.createInstance(shipmentData);
        await ctx.shipmentList.addShipment(shipmentObject);
        return shipmentObject;
    }
}

module.exports = new ShipmentCommons()
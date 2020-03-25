const log = require("loglevel");
const Validators = require('../validators')
const PurchaseOrder = require('../models/PurchaseOrder')

class PurchaseOrderCommons {
    async createPO (ctx, buyerCRN, sellerCRN, drugName, quantity){
    
        let buyer;
        let seller;
        try{
            buyer = await ctx.companyList.getCompanyByPartialKey([buyerCRN])
            seller = await ctx.companyList.getCompanyByPartialKey([sellerCRN])    
        }
        catch(e){
            if(!buyer)
                throw new Error("Buyer CRN is invalid")
            else if(!seller)
                throw new Error("Seller CRN is invalid")
        }

        console.log("buyer", buyer)
        console.log("selller", seller)

        let purcahseOrderData = {
            drugName,
            quantity,
            buyer : buyerCRN,
            seller : sellerCRN
        }

        Validators.validatePurchaseOrder(purcahseOrderData, buyer, seller)

        const purchaseOrderObject = PurchaseOrder.createInstance(purcahseOrderData);
        await ctx.purchaseOrderList.addPurchaseOrder(purchaseOrderObject);
        return purchaseOrderObject;
    }
}

module.exports = new PurchaseOrderCommons()
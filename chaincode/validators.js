const utils = require('./utils')

class Validators{

    static validateCompanyRegistrationDetails(companyData){
        let {companyCRN, companyName, location, organisationRole} = companyData;
        if(!utils.getOrgTypes().includes(organisationRole.toLowerCase()))
            throw new Error("Invalid organisationRole")
        if(!companyCRN || !companyName || !location)
            throw new Error("Invalid data. Fields cannot be empty")
        return true
    }

    static validateDrugRegistrationDetails(drugData){
        return true
    }
    static validateShipmentData(shipmentData){
        return true
    }
    static validatePurchaseOrder(purchaseOrderData, buyer, seller){
        const buyerHierarchyKey = Number(buyer.hierarchyKey)
        const sellerHierarchyKey = Number(seller.hierarchyKey)

        console.log("beerw", buyerHierarchyKey, sellerHierarchyKey, purchaseOrderData.quantity)
        if( buyerHierarchyKey  < sellerHierarchyKey || Math.abs(buyerHierarchyKey-sellerHierarchyKey) > 1){
            throw new Error("You cannot raise Purcahse Order with this company")
        }
        
        if(isNaN(purchaseOrderData.quantity) || Number(purchaseOrderData.quantity)<=0){
            throw new Error("Invalid Quantity")
        }
        if(!purchaseOrderData.drugName){
            throw new Error("Invaldi Drug Name")
        }
        return true
    }
}

module.exports=Validators
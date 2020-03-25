

class ACL {
    constructor(ctx) {
        this.mspID = ctx.clientIdentity.getMSPID();
        console.log(ctx.clientIdentity.getID())
    }

    allowOnlyCompanysMSP() {
        if( [MANUFACTURER_MSP_ID,DISTRIBUTOR_MSP_ID,RETAILER_MSP_ID,CONSUMER_MSP_ID,TRANSPORTER_MSP_ID].includes(this.mspID)){
            return true
        }
        else{
            throw new Error("You are not allowed to carry this operation out.")
        }
    }
}

module.exports = ACL
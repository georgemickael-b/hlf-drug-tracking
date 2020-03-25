const constants = require('./constants')

class Utils{
    static getOrgTypes(){
        return [constants.CONSUMER_TYPE , constants.DISTRIBUTOR_TYPE, constants.MANUFACTURER_TYPE,
        constants.RETAILER_TYPE, constants.TRANSPORTER_TYPE]
    }
}

module.exports = Utils
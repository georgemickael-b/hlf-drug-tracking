const log = require("loglevel");
const Drug = require('../models/Drug')

class AllCommons {
    async viewDrugCurrentState(ctx, drugName , serialNo){
        const drugKey = Drug.makeKey([drugName , serialNo]);
        return ctx.drugList.getDrug(drugKey).catch(err => {
            log.error(err);
            throw new Error(`Drug not found!`);
        });
    }

    async viewHistory (ctx , drugName, serialNo){
        const drugKey = Drug.makeKey([drugName , serialNo]);
        return await ctx.drugList.getDrugHistory(drugKey)
    }
}

module.exports = new AllCommons()
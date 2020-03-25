const Company = require('../models/Company');
const Validators = require('../validators');
const log = require("loglevel");
const constants = require("../constants");

class CompanyCommons {

    async registerCompany(ctx, companyCRN, companyName, location, organisationRole) {
        const companyKey = Company.makeKey([companyCRN, companyName])
        let company;
        try {
            company = await ctx.companyList.getCompany(companyKey)
        } catch (e) {
            log.info(`registerCompany : ${companyKey} is unique!`)
        }
        if (!!company) {
            throw new Error(`Company with CRN=${companyCRN} and Name=${companyName} already exists.`)
        }
        let companyData = {
            companyCRN, companyName, location, organisationRole
        }
        const hierarchyKey = constants.COMPANY_TYPE_HIERARCHY_MAPPING[organisationRole]
        if (hierarchyKey) {
            companyData = { ...companyData, hierarchyKey }
        }
        const companyObject = Company.createInstance(companyData);
        if (Validators.validateCompanyRegistrationDetails(companyData)) {
            await ctx.companyList.addCompany(companyObject)
        }
        return companyObject
    }

    async viewCompany(ctx, companyCRN, companyName) {
        const companyKey = Company.makeKey([companyCRN, companyName]);
        return ctx.companyList.getCompany(companyKey).catch(err => {
            log.error(err);
            throw new Error(`Company not found!`);
        });
    }
}

module.exports = new CompanyCommons()
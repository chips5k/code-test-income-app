class PaySlip {
	constructor(params) {
		this.properties = Object.assign({
			firstName: null,
			lastName: null,
			contractType: null,
			paymentPeriodStartDate: null,
			paymentPeriodEndDate: null,
			grossIncomeAmount: null,
			incomeTaxAmount: null,
			netIncomeAmount: null,
			superContributionAmount: null
		}, params ? params : {});
	}
}

module.exports = PaySlip;
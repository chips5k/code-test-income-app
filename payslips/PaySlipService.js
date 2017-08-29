class PaySlipService {


	constructor(paySlipFactory) {
		this.paySlipFactory = paySlipFactory;

	}

	getPayeeByName(firstName, lastName) {
		return new Payee();	

		//TODO Payee Factory, FullTime, Contractor etc...
		//Part time support .5, .75 etc...

		//Maybe expand to support  full time/parttime and casual etc....
		Payee = {
			firstName,
			lastName,
			contractType,
			annualSalary,
			superContributionPercentage
		};
	}

	generateMonthlyPaySlip(firstName, lastName, contractType, annualSalary, superContributionPercentage, paymentPeriodStartDate) {
		let self = this;

		return this.paySlipFactory.createPaySlip({
			firstName: firstName,
			lastName: lastName,
			contractType: contractType,
			paymentPeriodStartDate: paymentPeriodStartDate,
			paymentPeriodEndDate: paymentPeriodStartDate,
			grossIncomeAmount: 0,
			incomeTaxAmount: 0,
			netIncomeAmount: 0,
			superContributionAmount: 0
		});

	}

}

module.exports = PaySlipService;
"use strict";

class PayslipService {

	constructor(incomeTaxService, payslipFactory) {
		this._incomeTaxService = incomeTaxService;
		this._payslipFactory = payslipFactory;

	}

	validateGeneratePayslip(payee, dateFrom) {
		let errors = [];

		if(!payee.firstName) {
			errors.push(['Payee First Name is required']);
		}

		if(!payee.lastName) {
			errors.push(['Payee Last Name is required']);
		}


		if(typeof dateFrom !== 'object' || dateFrom.hasOwnProperty('getMonth')) {
			errors.push(['Date From is invalid']);
		}

		if(payee.annualSalary < 1) {
			errors.push['Gross Annual Salary must be a positive amount'];
		}

		if(parseInt(payee.annualSalary) != payee.annualSalary) {
			errors.push(['Gross Annual Salary must be an integer value']);
		}
		
		if(!(payee.superRate >= 0 && payee.superRate <= 0.5)) {
			errors.push(['Payee Super Rate must be between 0% and 50% (inclusive)']);
		}

		return errors;
	}

	async generatePayslip(payee, dateFrom) {
		let self = this;

		let year = dateFrom.getFullYear();
		let startOfMonth = new Date(Date.UTC(year, dateFrom.getMonth(), 1));
		let endOfMonth = new Date(Date.UTC(year, dateFrom.getMonth() + 1, 0));

		let monthlyIncomeTax = await this._incomeTaxService.calculateMonthlyIncomeTax(payee.annualSalary, endOfMonth);
		
		return self._payslipFactory.create({
			payee: payee,
			dateFrom:  startOfMonth,
			dateTo: endOfMonth,
			grossIncome: payee.monthlySalary,
			incomeTax: monthlyIncomeTax,
			superContribution: payee.monthlySuper
		});
	}
}

module.exports = PayslipService;
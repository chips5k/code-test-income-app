"use strict";

class PayslipService {

	constructor(incomeTaxService, payslipFactory) {
		this._incomeTaxService = incomeTaxService;
		this._payslipFactory = payslipFactory;

	}

	async generatePayslip(payee, dateFrom) {
		let self = this;

		let year = dateFrom.getFullYear();
		let startOfMonth = new Date(Date.UTC(year, dateFrom.getMonth(), 1));
		let endOfMonth = new Date(Date.UTC(year, dateFrom.getMonth() + 1, 0));

		let monthlyIncomeTax = await this._incomeTaxService.calculateMonthlyIncomeTax(payee.annualSalary, endOfMonth);
		monthlyIncomeTax = Math.round(monthlyIncomeTax);
		
		return self._payslipFactory.create({
			payee: payee,
			dateFrom:  startOfMonth,
			dateTo: endOfMonth,
			grossIncome: payee.monthlySalary,
			incomeTax: Math.round(monthlyIncomeTax),
			netIncome: payee.monthlySalary - monthlyIncomeTax,
			superContribution: payee.monthlySuper
		});
	}
}

module.exports = PayslipService;
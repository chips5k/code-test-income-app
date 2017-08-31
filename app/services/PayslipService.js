"use strict";

class PayslipService {

	constructor(incomeTaxService) {
		this._incomeTaxService = incomeTaxService;

	}

	generatePayslip(firstName, lastName, grossAnnualSalary, superRate, paymentStartDate) {
		return new Promise((fulfill, reject) => {
			let grossMonthlyIncome = grossAnnualSalary / 12;

			this._incomeTaxService.calculateMonthlyIncomeTax(grossAnnualSalary, 2012)
			.then(monthlyIncomeTax => {
				let monthlySuper = grossMonthlyIncome * superRate;
				let monthlyNetIncome = grossMonthlyIncome - monthlyIncomeTax;

				fulfill({
					firstName: firstName,
					lastName: lastName,
					payPeriodStart:  new Date(2012, 3, 1),
					payPeriodEnd: new Date(2012, 3, 31),
					grossIncome: Math.round(grossMonthlyIncome),
					incomeTax: Math.round(monthlyIncomeTax),
					netIncome: Math.round(monthlyNetIncome),
					super: Math.round(monthlySuper)
				});
				
			});
		});
	}
}

module.exports = PayslipService;
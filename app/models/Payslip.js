"use strict";

class Payslip {
	constructor(
		payee, 
		dateFrom, 
		dateTo,
		grossIncome,
		incomeTax,
		superContribution,
		taxBracket
	) {

		//TODO Add exception checking ?
		this.payee = payee;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.grossIncome = grossIncome;
		this.incomeTax = incomeTax;
		this.superContribution = superContribution;
	}

	get netIncome() {
		return this.grossIncome - this.incomeTax;
	}
}

module.exports Payslip;
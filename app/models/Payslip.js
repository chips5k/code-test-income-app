"use strict";

class Payslip {
	constructor(
		payee, 
		dateFrom, 
		dateTo,
		grossIncome,
		incomeTax,
		superContribution
	) {
		this._properties = {
			payee: payee,
			dateFrom: dateFrom,
			dateTo: dateTo,
			grossIncome: grossIncome,
			incomeTax: incomeTax,
			superContribution: superContribution
		};
	}

	get netIncome() {
		return this.grossIncome - this.incomeTax;
	}

	get payee() {
		return this._properties.payee;
	}

	get dateFrom() {
		return this._properties.dateFrom;
	}

	get dateTo() {
		return this._properties.dateFrom;
	}

	get grossIncome() {
		return this._properties.grossIncome;
	}

	get incomeTax() {
		return this._properties.incomeTax;
	}

	get netIncome() {
		return Math.round(this.grossIncome - this.incomeTax);
	}

	get superContribution() {
		return this._properties.superContribution;
	}

	toJSON() {
		return {
			payee: this.payee,
			dateFrom: this.dateFrom,
			dateTo: this.dateTo,
			netIncome: this.netIncome,
			grossIncome: this.grossIncome,
			incomeTax: this.incomeTax,
			netIncome: this.netIncome,
			superContribution: this.superContribution
		};
	}

}

module.exports = Payslip;
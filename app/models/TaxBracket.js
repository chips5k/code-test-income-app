"use strict";

class TaxBracket {

	constructor(
		label,
		thresholdLower,
		thresholdUpper,
		baseAmount,
		rate
	) {

		if(thresholdLower !== 0 && !thresholdLower) {
			throw new Error('A lower threshold MUST be provided');
		}
		this._properties = {
			label: label,
			thresholdLower: thresholdLower,
			thresholdUpper: thresholdUpper,
			baseAmount: baseAmount,
			rate: rate 
		};
	}

	get thresholdLower() {
		return this._properties.thresholdLower;
	}

	get thresholdUpper() {
		return this._properties.thresholdUpper;
	}

	get label() {
		return this._properties.label;
	}

	get baseAmount() {
		return this._properties.baseAmount;
	}

	get rate() {
		return this._properties.rate;
	}

	test(grossAnnualSalary) {
		if(this.thresholdUpper) {
			return grossAnnualSalary >= this.thresholdLower && grossAnnualSalary < this.thresholdUpper;
		}

		return grossAnnualSalary >= this.thresholdLower;
	}

	calculate(grossAnnualSalary) {
		let amount = this.baseAmount + (grossAnnualSalary - this.thresholdLower) * this.rate;
		return amount > 0 ? amount : 0;
	}

	calculateMonthlyIncomeTax(grossAnnualSalary) {
		let amount = this.calculate(grossAnnualSalary);
		return amount > 0 ? Math.round(amount / 12) : 0;
	}
}

module.exports = TaxBracket;
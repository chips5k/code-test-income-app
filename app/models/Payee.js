"use strict";

class Payee {
	constructor(
		id,
		firstName, 
		lastName, 
		annualSalary,
		superRate
	) {

		this._properties = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			annualSalary: annualSalary,
			superRate: superRate
		}
	}

	get id() { return this._properties.id; }
	get firstName() { return this._properties.firstName; }
	get lastName() { return this._properties.firstName; }
	get annualSalary() { return this._properties.annualSalary; }
	get superRate() { return this._properties.superRate; }
	get monthlySalary() { return Math.round(this.annualSalary / 12); }
	get monthlySuper() { return Math.round(this.monthlySalary * this.superRate); }

	toJSON() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			annualSalary: this.annualSalary,
			superRate: this.superRate,
			monthlySalary: this.monthlySalary,
			monthlySuper: this.monthlySuper
		};
	}
}

module.exports = Payee;
"use strict";

class Payee {
	constructor(
		firstName, 
		lastName, 
		annualSalary,
		superRate
	) {

		this._properties = {
			firstName: firstName,
			lastName: lastName,
			annualSalary: annualSalary,
			superRate: superRate
		}
	}

	get firstName() { return this._properties.firstName; }
	get lastName() { return this._properties.firstName; }
	get annualSalary() { return this._properties.annualSalary; }
	get superRate() { return this._properties.superRate; }
	get monthlySalary() { return this.annualSalary / 12; }
	get monthlySuper() { return this.monthlySalary * this.superRate; }
}

module.exports = Payee;
"use strict";

class Payee {
	constructor(
		firstName, 
		lastName, 
		annualSalary,
		superRate
	) {

		this._properties = {
			//TODO Add exception checking ?
			firstName: firstName;
			lastName: lastName;
			annualSalary: annualSalary;
			superRate: superRate;
		}
	}

	get firstName() { return this._properties.firstName; }
	get lastName() { return this._properties.firstName; }
	get annualSalary() { return this._properties.firstName; }
	get superRate() { return this._properties.firstName; }
}

module.exports Payee;
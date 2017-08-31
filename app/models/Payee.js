"use strict";

class Payee {
	constructor(
		firstName, 
		lastName, 
		annualSalary,
		superRate
	) {

		//TODO Add exception checking ?
		this.firstName = firstName;
		this.lastName = lastName;
		this.annualSalary = annualSalary;
		this.superRate = superRate;
	}
}

module.exports Payee;
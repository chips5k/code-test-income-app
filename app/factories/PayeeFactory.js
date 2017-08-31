"use strict";
let Payee = require('../models/Payee');

class PayeeFactory {

	create(params) {
		return new Payee(
			params.firstName, 
			params.lastName,
			params.annualSalary,
			params.superRate
		);
	}
}

module.exports = PayeeFactory;
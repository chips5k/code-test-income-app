"use strict";
let Payslip = require('../models/Payslip');

class PayslipFactory {

	create(params) {
		return new Payslip(params.payee);
	}
}

module.exports = PayslipFactory;
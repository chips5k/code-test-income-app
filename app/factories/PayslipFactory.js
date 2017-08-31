"use strict";
let Payslip = require('../models/Payslip');

class PayslipFactory {

	create(params) {
		return new Payslip(
			params.payee,
			params.dateFrom, 
			params.dateTo,
			params.grossIncome,
			params.incomeTax,
			params.superContribution
		);
	}
}

module.exports = PayslipFactory;
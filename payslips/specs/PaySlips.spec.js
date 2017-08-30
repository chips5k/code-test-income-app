let expect = require('chai').expect;
let PayslipService = require('../PayslipService');

describe('PayslipService', function() {

	let service = new PayslipService();
	
	/**
	 * Given an employees details
	 * First name, last name, annual salary, super rate and payment start date
	 */
	it('Should generate valid payslips', function() {

		/** #Payslip validation Test A */
		let expectedPayslipA = {
			firstName: 'David',
			lastName: 'Rudd',
			payPeriodStart:  new Date(2012, 03, 01),
			payPeriodEnd: new Date(2012, 03, 31),
			grossIncome: 5004,
			incomeTax: 922,
			netIncome: 4082,
			super: 450
		};

		let actualPayslipA = service.generatePayslip(
			'David', 
			'Rudd', 
			60050, 
			0.09, 
			new Date(2012, 03, 01)
		);

		expect(actualPayslipA).to.deep.equal(expectedPayslipA);


		/** #Payslip validation Test B */
		let expectedPayslipB = {
			firstName: 'Ryan',
			lastName: 'Chen',
			payPeriodStart:  new Date(2012, 03, 01),
			payPeriodEnd: new Date(2012, 03, 31),
			grossIncome: 10000,
			incomeTax: 2696,
			netIncome: 7304,
			super: 1000
		};

		let actualPayslipB = service.generatePayslip(
			'Ryan', 
			'Chen', 
			120000, 
			0.1, 
			new Date(2012, 03, 01)
		);

		expect(actualPayslipB).to.deep.equal(expectedPayslipB);

	});

});
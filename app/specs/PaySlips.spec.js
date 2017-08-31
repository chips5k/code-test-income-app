"use strict";

let expect = require('chai').expect;
let PayslipService = require('../services/PayslipService');
let IncomeTaxService = require('../services/IncomeTaxService');
let TaxBracketRepository = require('../repositories/TaxBracketRepository');
let TaxBracketFactory = require('../factories/TaxBracketFactory');

describe('PayslipService', function() {
	
	let taxBracketRepository = new TaxBracketRepository(new TaxBracketFactory());
	let incomeTaxService = new IncomeTaxService(taxBracketRepository);
	let payslipService = new PayslipService(incomeTaxService);

	/**
	 * Given an employees details
	 * First name, last name, annual salary, super rate and payment start date
	 */
	it('Should generate valid payslips',  function (done) {

		/** #Payslip validation Test A */
		let expectedPayslips = [
			{
				firstName: 'David',
				lastName: 'Rudd',
				payPeriodStart:  new Date(2012, 3, 1),
				payPeriodEnd: new Date(2012, 3, 31),
				grossIncome: 5004,
				incomeTax: 922,
				netIncome: 4082,
				super: 450
			},
			{
				firstName: 'Ryan',
				lastName: 'Chen',
				payPeriodStart:  new Date(2012, 3, 1),
				payPeriodEnd: new Date(2012, 3, 31),
				grossIncome: 10000,
				incomeTax: 2696,
				netIncome: 7304,
				super: 1000
			}
		];

		Promise.all([
			payslipService.generatePayslip(
				'David', 
				'Rudd', 
				60050, 
				0.09, 
				new Date(2012, 3, 1)
			),
			payslipService.generatePayslip(
				'Ryan', 
				'Chen', 
				120000, 
				0.1, 
				new Date(2012, 3, 1)
			)
		]).then(payslips => {
			for(let i = 0; i < payslips.length; i++) {
				expect(payslips[i]).to.deep.equal(expectedPayslips[i]);
			}

			done();
		});
		

	});

});
"use strict";

let expect = require('chai').expect;
let PayslipService = require('../services/PayslipService');
let IncomeTaxService = require('../services/IncomeTaxService');
let TaxBracketRepository = require('../repositories/TaxBracketRepository');
let TaxBracketFactory = require('../factories/TaxBracketFactory');
let PayeeFactory = require('../factories/PayeeFactory');
let PayslipFactory = require('../factories/PayslipFactory');

describe('PayslipService', function() {
	
	let payeeFactory = new PayeeFactory();
	let payslipFactory = new PayslipFactory();
	let taxBracketRepository = new TaxBracketRepository(new TaxBracketFactory());
	let incomeTaxService = new IncomeTaxService(taxBracketRepository);
	let payslipService = new PayslipService(incomeTaxService, payslipFactory);
	

	/**
	 * Given an employees details
	 * First name, last name, annual salary, super rate and payment start date
	 */
	it('Should generate valid payslips',  async function() {

		
		let payees = {
			a: payeeFactory.create({
				firstName: 'David',
				lastName: 'Rudd',
				annualSalary: 60050,
				superRate: 0.09
			}),

			b: payeeFactory.create({
				firstName: 'Ryan',
				lastName: 'Chen',
				annualSalary: 120000,
				superRate: 0.1
			}),

			c: payeeFactory.create({
				firstName: 'Vincent',
				lastName: 'Pittard',
				annualSalary: 180000,
				superRate: 0.15
			})
		};


		let expectations = [
			{
				input: {
					payee: payees.a,
					dateFrom: new Date("2012-03-01")
				},
				expected: payslipFactory.create({
					payee: payees.a,
					dateFrom:  new Date("2012-03-01"),
					dateTo: new Date("2012-03-31"),
					grossIncome: 5004,
					incomeTax: 922,
					netIncome: 4082,
					superContribution: 450
				})
			},
			{
				input: {
					payee: payees.b,
					dateFrom: new Date("2012-03-01")
				},
				expected: payslipFactory.create({
					payee: payees.b,
					dateFrom: new Date("2012-03-01"),
					dateTo: new Date("2012-03-31"),
					grossIncome: 10000,
					incomeTax: 2696,
					netIncome: 7304,
					superContribution: 1000
				})
			},
			{
				input: {
					payee: payees.c,
					dateFrom: new Date("2012-04-16")
				},
				expected: payslipFactory.create({
					payee: payees.c,
					dateFrom: new Date("2012-04-01"),
					dateTo: new Date("2012-04-30"),
					grossIncome: 15000,
					incomeTax: 4546,
					netIncome: 125453,
					superContribution: 2250
				})
			}
		];	
		
		return Promise.all(expectations.map(async n => {
			let actual = await payslipService.generatePayslip(n.input.payee, n.input.dateFrom);
			expect(actual).to.deep.equal(n.expected);
		}));

	});

});
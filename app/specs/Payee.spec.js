"use strict";

let expect = require('chai').expect;
let Payee = require('../models/Payee');

describe('Payee', function() {
	
	describe('annualSalary', function() {
		it('does not round annual salary', function() {
			let payeeA = new Payee(1, 't', 't', 330000.333, 0.123);
			expect(payeeA.annualSalary).to.equal(330000.333);

			let payeeB = new Payee(1, 't', 't', 12314.0005, 0.123);
			expect(payeeB.annualSalary).to.equal(12314.0005);
		});
	});

	describe('superRate', function() {
		it('does not round super rate', function() {
			let payeeA = new Payee(1, 't', 't', 330000.333, 0.123);
			expect(payeeA.superRate).to.equal(0.123);

			let payeeB = new Payee(1, 't', 't', 12314.0005, 0.05);
			expect(payeeB.superRate).to.equal(0.05);
		});
	})

	describe('monthlySalary', function() {
		it('returns monthly salary rounded to the nearest whole dollar', function() {
			let payeeA = new Payee(1, 't', 't', 330000.333, 0.123);
			expect(payeeA.monthlySalary).to.equal(27500);

			let payeeB = new Payee(1, 't', 't', 18000.333, 0.05);
			expect(payeeB.monthlySalary).to.equal(1500);
		});

		it('rounds up on .5 values', function() {
			let payee = new Payee(1, 't', 't', 6, 12);
			expect(payee.monthlySalary).to.equal(1);
		});
	});

	describe('monthlySuper', function() {
		it('returns monthly super rounded to the nears whole dollar',  function() {
			let payeeA = new Payee(1, 't', 't', 18000.333, 0.05);
			expect(payeeA.monthlySuper).to.equal(75);

			let payeeB = new Payee(1, 't', 't', 1234.333, 0.15);
			expect(payeeB.monthlySuper).to.equal(15);
		});

		it('rounds up on .5 values', function() {
			let payee = new Payee(1, 't', 't', 330000.333, 0.123);
			expect(payee.monthlySuper).to.equal(3383);
		});
	});
});
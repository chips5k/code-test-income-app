"use strict";

let expect = require('chai').expect;
let TaxBracket = require('../models/TaxBracket');

describe('TaxBracket', function() {
	
	describe('Test', function() {
 		it('correctly test provided salaries',  function() {

			let taxBracket = new TaxBracket(
				'A',
				0,
				1000,
				0,
				0
			);

			expect(taxBracket.test(500)).to.equal(true);
			expect(taxBracket.test(1000)).to.equal(false);


			taxBracket = new TaxBracket(
				'A',
				50,
				1000,
				0,
				0
			);

			expect(taxBracket.test(500)).to.equal(true);
			expect(taxBracket.test(1000)).to.equal(false);

		});

		it('should be inclusive on the lower threshold', function() {

			let taxBracket = new TaxBracket(
				'A',
				50,
				1000,
				0,
				0
			);

			expect(taxBracket.test(50)).to.equal(true);

		});

		it('should be exclusive on the upper threshold', function() {
			let taxBracket = new TaxBracket(
				'A',
				50,
				1000,
				0,
				0
			);

			expect(taxBracket.test(1000)).to.equal(false);
		});

		it('should support no upper threshold', function() {
			let taxBracket = new TaxBracket(
				'A',
				50,
				null,
				0,
				0
			);

			expect(taxBracket.test(1500)).to.equal(true);
			expect(taxBracket.test(50)).to.equal(true);
			expect(taxBracket.test(999999)).to.equal(true);
			expect(taxBracket.test(2)).to.equal(false);
			expect(taxBracket.test(49.99)).to.equal(false);
		});

		it('should throw on missing lower threshold', function() {

			let creator = function() {
				let t = new TaxBracket(
					'A',
					null,
					null,
					0,
					0
				);
			};

			expect(creator).to.throw('A lower threshold MUST be provided');
		});
	});

	describe('calculate', function() {

		it('should calculate annual income tax from gross annual salary', function() {
			let taxBracket = new TaxBracket(
				'A',
				62000,
				null,
				1250.5,
				0.12
			);

			expect(taxBracket.calculate(80000)).to.equal(3410.5);
		});

	});

	describe('calculateMonthlyIncomeTax', function() {

		it('should round monthly income tax to the nearest whole dollar', function() {
			let taxBracket = new TaxBracket(
				'A',
				50,
				null,
				50,
				0.12312
			);

			expect(taxBracket.calculateMonthlyIncomeTax(1521.33333)).to.equal(19);

		});

		it('should round up up on .5 values', function() {

			let taxBracket = new TaxBracket(
				'A',
				0,
				null,
				0,
				0.5
			);

			expect(taxBracket.calculateMonthlyIncomeTax(12)).to.equal(1);
		});

	})
});
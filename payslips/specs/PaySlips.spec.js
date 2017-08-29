let PaySlipFactory = require('../PaySlipFactory');
let PaySlipService = require('../PaySlipService');
let PaySlip = require('../PaySlip');
let StandardPaySlip = require('../StandardPaySlip');
let CasualPaySlip = require('../CasualPaySlip');
var expect = require('chai').expect


describe('PaySlipFactory', function() {

	it('should be instansiatable', function() {
		let factory = new PaySlipFactory();
	});

	it('should create payslips', function() {

		let factory = new PaySlipFactory();
		expect(factory.createPaySlip({
			contractType: 'Full Time'
		})).to.be.an.instanceOf(PaySlip);
	});

	it('should create casual payslips for casual employees', function() {

		let factory = new PaySlipFactory();
		expect(factory.createPaySlip({
			contractType: 'Casual'
		})).to.be.an.instanceOf(CasualPaySlip);

	});

	it('should create standard payslips for non-casual employees', function() {

		let factory = new PaySlipFactory();
		expect(factory.createPaySlip({
			contractType: 'Full Time'
		})).to.be.an.instanceOf(StandardPaySlip);

		expect(factory.createPaySlip({
			contractType: 'Part Time'
		})).to.be.an.instanceOf(StandardPaySlip);

	});

	it('should throw if contract type is not supplied', function() {
		let factory = new PaySlipFactory();
		expect(factory.createPaySlip.bind(factory)).to.throw('Unable to determine employee type');
	});
});


describe('PaySlipService', function() {

	it('should be instansiatable', function() {
		let service = new PaySlipService();
	});


	it('should generate payslips', function() {

		let factory = new PaySlipFactory();
		let service = new PaySlipService(factory);

		let paySlipA = service.generateMonthlyPaySlip('David', 'Rudd', 'Full Time', 60050, 0.09, new Date(2012, 3, 01));
		
		expect(paySlipA).to.deep.equal(factory.createPaySlip({
			firstName: 'David',
			lastName: 'Rudd',
			contractType: 'Full Time',
			paymentPeriodStartDate: new Date(2012, 3, 1),
			paymentPeriodEndDate: new Date(2012, 3, 31),
			grossIncomeAmount: 5004,
			incomeTaxAmount: 922,
			netIncomeAmount: 4082,
			superContributionAmount: 450
		}));

		let paySlipB = service.generateMonthlyPaySlip('Ryan', 'Chen', 'Casual', 120000, 0.1, new Date(2012, 3, 01));
		expect(paySlipB).to.deep.equal(factory.createPaySlip({
			firstName: 'David',
			lastName: 'Rudd',
			contractType: 'Casual',
			paymentPeriodStartDate: new Date(2012, 3, 1),
			paymentPeriodEndDate: new Date(2012, 3, 31),
			grossIncomeAmount: 10000,
			incomeTaxAmount: 2696,
			netIncomeAmount: 7304,
			superContributionAmount: 1000
		}));
	});

});

describe('PaySlip', function() {

	it('should be instansiatable', function() {
		let payslip = new PaySlip();
	});

});
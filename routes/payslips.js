"use strict";

let express = require('express');
let router = express.Router();

let PayeeFactory = require('../app/factories/PayeeFactory');
let PayeeRepository = require('../app/repositories/PayeeRepository');

let PayslipService = require('../app/services/PayslipService');
let IncomeTaxService = require('../app/services/IncomeTaxService');
let TaxBracketRepository = require('../app/repositories/TaxBracketRepository');
let TaxBracketFactory = require('../app/factories/TaxBracketFactory');
let PayslipFactory = require('../app/factories/PayslipFactory');

let payeeFactory = new PayeeFactory();
let payslipFactory = new PayslipFactory();
let taxBracketRepository = new TaxBracketRepository(new TaxBracketFactory());
let incomeTaxService = new IncomeTaxService(taxBracketRepository);
let payslipService = new PayslipService(incomeTaxService, payslipFactory);
let payeeRepository = new PayeeRepository(new PayeeFactory);

/** Generate Payslip Resource for Payee resource */
router.post('/generate', function(req, res, next) {
	payeeRepository.getPayee(req.body.payeeId).then(payee => {
		payslipService.generatePayslip(payee, new Date(req.body.date))
		.then(payslip => {
			res.json(payslip);
		}).catch(e => {
			res.status(416);
			res.json({ error: ['Failed to generate payslip']});
		});
	}).catch((e) => {

		res.status(404);
		res.json({ error: ['Failed to locate payee']});
	});
});



module.exports = router;

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
	
	let action = (payee, date) => {
			
		//Validate the request/action details
		let errors = payslipService.validateGeneratePayslip(payee, new Date(date));

		//If no issues
		if(errors.length === 0) {
			//Try proceeding with payslip generation
			payslipService.generatePayslip(payee, new Date(date))
			.then(payslip => {
				res.json(payslip);
			}).catch(e => {
				res.status(418);
				res.json({ errors: e});
			});
		} else {
			res.status(418);
			res.json({ errors: errors });
		}
	};

	//If payee id supplied
	if(req.body.payeeId) {
		//Retrieve the payee 
		payeeRepository.getPayee(req.body.payeeId).then(payee => {
			//and proceed with the action
			action(payee, req.body.paymentDate);
		}).catch(e => {
			res.status(404);
			res.json({ errors: [e]});
		});
	} else {
		//otherwise, try creating a payee and performing the action
		action(payeeFactory.create(req.body), req.body.paymentDate);
	}
});



module.exports = router;

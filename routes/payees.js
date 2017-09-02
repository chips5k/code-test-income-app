"use strict";

let express = require('express');
let router = express.Router();

let PayeeFactory = require('../app/factories/PayeeFactory');
let PayeeRepository = require('../app/repositories/PayeeRepository');

let repository = new PayeeRepository(new PayeeFactory);


/* GET Payee resource listing. */
router.get('/', function(req, res, next) {
	repository.getPayees().then(payees => {
		res.json(payees);
	});
});

/** Get Payee resource */
router.get('/:id', function(req, res, next) {
	repository.getPayee(req.params.id).then(payee => {
		res.json(payee);
	}).catch(function() {
		res.status(404);
		res.json({ error: ['Failed to locate payee']});
	});
});



module.exports = router;

"use strict";

let TaxBracket = require('../models/TaxBracket');

class TaxBracketFactory {

	create(params) {
		//Generate predicate etc...
		//Generate calc function
		return new TaxBracket(params.label, params.predicate, params.calculator);
	}

}

module.exports = TaxBracketFactory;
"use strict";
let TaxBracket = require('../models/TaxBracket');

class TaxBracketFactory {

	create(params) {
		return new TaxBracket(
			params.label,
			params.thresholdLower,
			params.thresholdUpper,
			params.baseAmount,
			params.rate
		);
	}

}

module.exports = TaxBracketFactory;
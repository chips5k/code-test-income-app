"use strict";

class TaxBracket {

	constructor(
		label,
		predicate,
		calcualtor
	) {

		this._properties = {
			label: label,
			predicate: predicate,
			calculator: calculator 
		};

	}

	test(grossAnnualSalary) {
		return this._propties.predicate(grossAnnualSalary);
	}

	calculate(grossAnnualSalary) {
		return this._properties.calculator(grossAnnualSalary);
	}

}

module.exports = TaxBracket;
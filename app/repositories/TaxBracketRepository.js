"use strict";

class TaxBracketRepository {

	constructor(taxBracketFactory) {
		this._factory = taxBracketFactory;

		this._taxBrackets = {
			2012: [
				{
					label: 'A',
					test: n => n < 18200,
					calc: n => 0
				},
				{	
					label: 'B',
					test: n => n < 37000,
					calc: n => 0.19 * n - 18200
				},
				{
					label: 'C',
					test: n => n < 80000,
					calc: n => 3572 + 0.325 * (n - 37000),
				},
				{	
					label: 'D',
					test: n => n < 180000,
					calc: n => 17547 + 0.37 * (n - 80000)
				},
				{
					label: 'E',
					test: n => n >= 180000,
					calc: n => 54547 + 0.45 * (n - 180000)
				}
			]
		};
	}

	getTaxBracketsForFinancialYear(year) {
		let self = this;
		return new Promise(function (fulfill, reject){
			setTimeout(() => {
		    	if(self._taxBrackets.hasOwnProperty(year)) {
		    		fulfill(self._taxBrackets[year])
		    	}  else {
		    		reject([`Failed to locate tax brackets for financial year: ${year}`]);
		    	}
		    }, 1000);
	  	});
	}
}

module.exports = TaxBracketRepository;

"use strict";

class TaxBracketRepository {

	constructor(taxBracketFactory) {
		this._factory = taxBracketFactory;

		//Faked static data
		this._taxBrackets = {
			2012: [
				this._factory.create({
					label: 'A',
					thresholdLower: 0,
					thresholdUpper: 18200,
					baseAmount: 0,
					rate: 0
				}),
				this._factory.create({	
					label: 'B',
					thresholdLower: 18200,
					thresholdUpper: 37000,
					baseAmount: 0,
					rate: 0.19
				}),
				this._factory.create({	
					label: 'C',
					thresholdLower: 37000,
					thresholdUpper: 80000,
					baseAmount: 3572,
					rate: 0.325
				}),
				this._factory.create({		
					label: 'D',
					thresholdLower: 80000,
					thresholdUpper: 180000,
					baseAmount: 17546,
					rate: 0.37
				}),
				this._factory.create({	
					label: 'E',
					thresholdLower: 180000,
					thresholdUpper: null,
					baseAmount: 54547,
					rate: 0.45
				}),
			]
		};
	}

	getTaxBracketsForFinancialYear(year) {
		let self = this;
		//Faking a typical async style requst to a db
		return new Promise(function (fulfill, reject){
			setTimeout(() => {
				//Try locating rates for the specified year
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

"use strict";

class IncomeTaxService {
		
	constructor(taxBracketRepository) {
		this._taxBracketRepository = taxBracketRepository;
	}

	calculateMonthlyIncomeTax(grossAnnualSalary, endOfMonth) {
		let self = this;

		let year = this.getApplicableFinancialYear(endOfMonth);
		
		//Wrap our multiple async requests up in a promise to return to the callee
		return new Promise(function (fulfill, reject) {
			self._taxBracketRepository.getTaxBracketsForFinancialYear(year)
			.then(taxBrackets => {
				//Find applicable tax bracket
				let taxBracket = taxBrackets.find(taxBracket => taxBracket.test(grossAnnualSalary));
				if(taxBracket) {
					//Fulfill with calculated income tax
					fulfill(taxBracket.calculateMonthlyIncomeTax(grossAnnualSalary));
				} else {
					reject(['Failed to locate tax bracket']);
				}
			}).catch(function(e) {
				reject(e);
			});
		});
	}

	getApplicableFinancialYear(endOfMonth) {
		//Check for end of financial year
		let year = endOfMonth.getFullYear();
		return endOfMonth.getMonth() > 6 ? year + 1 : year;
	}
}

module.exports = IncomeTaxService;
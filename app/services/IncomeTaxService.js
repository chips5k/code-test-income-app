"use strict";

class IncomeTaxService {
		
	constructor(taxBracketRepository) {
		this._taxBracketRepository = taxBracketRepository;
	}

	calculateMonthlyIncomeTax(grossAnnualSalary, endOfMonth) {
		let self = this;

		let year = this.getApplicableFinancialYear(endOfMonth);
		
		return new Promise(function (fulfill, reject) {
			self._taxBracketRepository.getTaxBracketsForFinancialYear(year)
			.then(taxTables => {
				let taxBracket = taxTables.find(n => n.test(grossAnnualSalary));
				if(taxBracket) {
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
		let year = endOfMonth.getFullYear();
		return endOfMonth.getMonth() > 6 ? year + 1 : year;
	}
}

module.exports = IncomeTaxService;
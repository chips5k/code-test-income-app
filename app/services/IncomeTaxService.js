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
					fulfill(taxBracket.calc(grossAnnualSalary) / 12);
				} else {
					reject(['Failed to locate tax bracket']);
				}
			});
		});
	}

	getApplicableFinancialYear(endOfMonth) {
		let year = endOfMonth.getFullYear();
		return endOfMonth.getMonth() > 6 ? year + 1 : year;
	}
}

module.exports = IncomeTaxService;
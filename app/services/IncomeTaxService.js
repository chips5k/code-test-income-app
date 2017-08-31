"use strict";

class IncomeTaxService {
		
	constructor(taxBracketRepository) {
		this.taxBracketRepository = taxBracketRepository;
	}

	calculateMonthlyIncomeTax(grossAnnualSalary, financialYearEnding) {
		let self = this;
		return new Promise(function (fulfill, reject) {
			self.taxBracketRepository.getTaxBracketsForFinancialYearEnding(financialYearEnding)
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
}

module.exports = IncomeTaxService;
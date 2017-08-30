class PayslipService {


	generatePayslip(firstName, lastName, grossAnnualSalary, superRate, paymentStartDate) {

		let taxBrackets = [
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
				test: n => n > 180000,
				calc: n => 54547 + 0.45 * (n - 180000)
			}
		];

		
		let taxBracket = taxBrackets.find(n => n.test(grossAnnualSalary));
		let grossIncome = grossAnnualSalary / 12;
		let incomeTax = taxBracket.calc(grossAnnualSalary) / 12;
		let netIncome = grossIncome - incomeTax;
		
		return {
			firstName: firstName,
			lastName: lastName,
			payPeriodStart:  new Date(2012, 3, 1),
			payPeriodEnd: new Date(2012, 3, 31),
			grossIncome: Math.round(grossIncome),
			incomeTax: Math.round(incomeTax),
			netIncome: Math.round(netIncome),
			super: Math.round(grossIncome * superRate)
		};
	}

}

module.exports = PayslipService;
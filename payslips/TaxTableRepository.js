class TaxTableRepository {

	constructor() {
		this._taxTables = [
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
	}

	getTaxTablesForFinancialYearEnding(year) {
		let self = this;
		return new Promise(function (fulfill, reject){
		    setTimeout(() => fulfill(self._taxTables), 1000);
	  	});
	}
}

module.exports = TaxTableRepository;

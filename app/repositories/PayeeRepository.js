"use strict";

class PayeeRepository {

	constructor(payeeFactory) {
		this._factory = payeeFactory;

		//Hardcoded static data
		this._payees = [
			payeeFactory.create({
				id: 1,
				firstName: 'David',
				lastName: 'Rudd',
				annualSalary: 60050,
				superRate: 0.09
			}),

			payeeFactory.create({
				id: 2,
				firstName: 'Ryan',
				lastName: 'Chen',
				annualSalary: 120000,
				superRate: 0.1
			}),

			payeeFactory.create({
				id: 3,
				firstName: 'Vincent',
				lastName: 'Pittard',
				annualSalary: 180000,
				superRate: 0.15
			})
		];
	}

	getPayees() {
		let self = this;
		//Faking a typical node request to a db etc..
		return new Promise(function (fulfill, reject){
			setTimeout(() => {
	    		fulfill(self._payees)
		    }, 1000);
	  	});
	}

	getPayee(id) {
		let self = this;
		//Faking a typical node request to a db etc..
		return new Promise(function (fulfill, reject){
			setTimeout(() => {
				let payee = self._payees.find(n => n.id == id);
				if(payee) {
					fulfill(payee);
				} else {
					reject(['Failed to locate resource']);
				}
	    		
		    }, 1000);
	  	});
	}
}

module.exports = PayeeRepository;

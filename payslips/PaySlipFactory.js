let PaySlip = require('./PaySlip.js');
let CasualPaySlip = require('./CasualPaySlip');
let StandardPaySlip = require('./StandardPaySlip');

class PaySlipFactory {

	createPaySlip(params) {

		if(typeof(params) === 'object' && params.hasOwnProperty('contractType')) {
			if(params.contractType === 'Casual') {
				return new CasualPaySlip(params);
			} else {
				return new StandardPaySlip(params);
			}
		} 
			
		throw new Error('Unable to determine employee type');
	}

}

module.exports = PaySlipFactory;
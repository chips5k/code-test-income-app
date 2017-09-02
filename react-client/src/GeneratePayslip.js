import React, { Component } from 'react';
import Payslip from './Payslip';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
export default class GeneratePayslip extends Component {

	constructor(props) {
		super(props);

		this.state = {
			payslip: null,
			loading: false,
			errors: []
		};
	}

	componentDidMount() {
		let self = this;
        let postBody = false;
        //Quick hacky test to see if we are generating payslip for an existing payee, or a new payee
		if(this.props.match && this.props.match.params.payeeId) {
			//Existng payee - matched against route params
        	let data = this.props.match.params;
        	//No time to properly work out the fetch api, so just building this by hand...
        	postBody = `payeeId=${data.payeeId}&paymentDate=${data.paymentDate}`;
    	} else if(this.props.data) {
    		//New Payee, data provided
    		let data = this.props.data;
    		//No time to properly work out the fetch api, so just building this by hand...
    		postBody = `firstName=${data.firstName}&lastName=${data.lastName}&annualSalary=${data.annualSalary}&superRate=${data.superRate}&paymentDate=${data.paymentDate}`;
    	}

    	//If we have a valid post body
    	if(postBody !== false) {
    		//Create the post request to the server to generate the payslip
    		self.setState({loading: true});	
    		fetch('/api/payslips/generate', {
	        	method: 'POST',
	        	headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
	        	body: postBody
	        }).then(function(response) {
	        	//If all good
	        	if(response.ok) {
	        		//Parse the json and update our component
	        		response.json().then((payslip) => {
	        			self.setState({loading: false, payslip: payslip });
	        		});
	        	} else {
	        		//Bad request, extract errors and update compoent
	        		response.json().then((data) => {
	        			self.setState({ loading: false, errors: data.errors });
	        		});
	        	}
	        });
	    } else {
	    	//Report invalid body
	    	self.setState({errors: ['Invalid Data Provided']});
	    }
	}

    render() {
    	return (
    		<div>
    			{this.state.loading ? <div className="loader"><CircularProgress size={50} /></div> : null}
    			{this.state.errors.length ? 
					<Card color="accent">
						<CardHeader title="One or more errors have occured" />
						<CardContent>
							<ul style={{marginTop: 0}}>
								{this.state.errors.map((n, i) => { return (<li key={i}>{n}</li>); })}
							</ul>
						</CardContent>
					</Card>
					: null
				}
    			{this.state.payslip ? <Payslip payslip={this.state.payslip} /> : null}
    			{this.state.errors.length && !this.state.loading ? <Button raised color="primary" component={Link} onClick={this.props.onClickBack} to="/payees" style={{marginTop: '1rem'}}>Back</Button> : null}
    		</div>
    	);
    }
}
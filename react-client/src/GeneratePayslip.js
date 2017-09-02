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
		if(this.props.match && this.props.match.params.payeeId) {
        	let data = this.props.match.params;
        	console.log(data);
        	postBody = `payeeId=${data.payeeId}&paymentDate=${data.paymentDate}`;
    	} else if(this.props.data) {
    		let data = this.props.data;
    		postBody = `firstName=${data.firstName}&lastName=${data.lastName}&annualSalary=${data.annualSalary}&superRate=${data.superRate}&paymentDate=${data.paymentDate}`;
    	}

    	if(postBody !== false) {
    		self.setState({loading: true});	

	        fetch('/api/payslips/generate', {
	        	method: 'POST',
	        	headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
	        	body: postBody
	        }).then(function(response) {
	        	if(response.ok) {
	        		response.json().then((payslip) => {
	        			self.setState({loading: false, payslip: payslip });
	        		});
	        	} else {
	        		response.json().then((data) => {
	        			self.setState({ loading: false, errors: data.errors });
	        		});
	        	}
	        });
	    } else {
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Payslip from './Payslip';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

export default class GeneratePayslip extends Component {

	constructor(props) {
		super(props);

		this.state = {
			payslip: null,
			loading: false
		};
	}

	componentDidMount() {

		let self = this;
        self.setState({loading: true});

        fetch('/api/payslips/generate', {
        	method: 'POST',
        	headers: {
		      'Content-Type': 'application/x-www-form-urlencoded'
		    },
        	body: `payeeId=${this.props.match.params.payeeId}&date=${this.props.match.params.paymentDate}`
        }).then(function(response) {
        	return response.json();
        }).then(function(payslip) {
            self.setState({loading: false, payslip: payslip });
        }).catch(function(e) {
            console.log('Error', e);
            self.setState({loading: false});
        });
	}

    render() {

        let content = <div className="loader"><CircularProgress size={50} /></div>;
        if(!this.state.loading && this.state.payslip !== null) {
            content = (<Payslip payslip={this.state.payslip} />);
        }
                  
    	return (
            <div>
        		
                <Paper>
                {content}
                </Paper>

            </div> 
    	);
    }
}
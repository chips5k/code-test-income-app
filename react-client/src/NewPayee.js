import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PayeeForm from './PayeeForm';
import Payslip from './Payslip';

export default class NewPayee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasData: false
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <header>
                <h2>Generate Payslip for New Payee</h2>
                <Link to="/">Cancel</Link>
                </header>
                {this.state.hasData ? <Payslip payslip={this.state.payslip} /> : <PayeeForm onSubmit={this.handleFormSubmit} />}
            </div>
        );
    }

    handleFormSubmit(data) {
        let payslip = data;
        this.setState({ hasData: true, payslip: payslip });
    }
}

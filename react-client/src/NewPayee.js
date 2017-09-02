import React, { Component } from 'react';
import PayeeForm from './PayeeForm';
import GeneratePayslip from './GeneratePayslip';

export default class NewPayee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasData: false
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleGeneratePayslipBackClick = this.handleGeneratePayslipBackClick.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.hasData ? <GeneratePayslip data={this.state.data} onClickBack={this.handleGeneratePayslipBackClick}/> : <PayeeForm data={this.state.data} onSubmit={this.handleFormSubmit} />}
            </div>
        );
    }

    handleFormSubmit(data) {
        this.setState({ hasData: true, data: data });
    }

    handleGeneratePayslipBackClick(e) {
        e.preventDefault();
        this.setState({
            hasData: false
        });
    }
}




import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PayeeForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <fieldset>
                    <legend>Payee Details</legend>
                    <div>
                        <label>First Name</label>
                        <input type="text" defaultValue="" ref={(input) => this.firstName = input} name="firstName" placeholder="Enter first name..." />
                    </div>

                    <div>
                        <label>First Name</label>
                        <input type="text" defaultValue="" ref={(input) => this.lastName = input} name="lastName" placeholder="Enter last name..." />
                    </div>

                    <div>
                        <label>Annual Salary</label>
                        <input type="text" defaultValue="" ref={(input) => this.annualSalary = input} name="annualSalary"  placeholder="Enter annual salary..." />
                    </div>

                    <div>
                        <label>Super Rate</label>
                        <input type="text" defaultValue="" ref={(input) => this.superRate = input} name="superRate" placeholder="Enter super rate..." />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Payslip Details</legend>
                    <div>
                        <label>Payment Date</label>
                        <input type="text" defaultValue="" ref={(input) => this.paymentDate = input} name="paymentDate" placeholder="Enter date of payment..." />
                    </div>
                </fieldset>

                <button type="submit">Generate</button>
                <Link to="/">Cancel</Link>
            </form>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            annualSalary: this.annualSalary.value,
            superRate: this.superRate.value,
            paymentDate: this.paymentDate.value
        });
    }

}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import format from 'format-number';

export default class Payslip extends Component {

    render() {
        return (
            <Card>
                <CardHeader title="Payslip" />
                <CardContent>
                    <p style={{marginTop: 0}}>
                        <b>Payee:</b> {this.props.payslip.payee.firstName} {this.props.payslip.payee.lastName} <br/>
                        <b>Annual Salary:</b> {this.formatCurrency(this.props.payslip.payee.annualSalary)} <br/>
                        <b>Super Rate:</b> {this.props.payslip.payee.superRate * 100}% <br/>
                    </p>
                    <Divider/>
                    <p>
                        <b>Payment Period:</b> {this.formatDate(this.props.payslip.dateFrom)} - {this.formatDate(this.props.payslip.dateTo)}<br/>  
                        <b>Gross Income:</b> {this.formatCurrency(this.props.payslip.grossIncome)}<br/>  
                        <b>Income Tax:</b> {this.formatCurrency(this.props.payslip.incomeTax)}<br/>
                        <b>Net Income:</b> {this.formatCurrency(this.props.payslip.netIncome)}<br/>  
                        <b>Super Contribution:</b> {this.formatCurrency(this.props.payslip.superContribution)}<br/>  
                    </p>
                </CardContent>
                <CardActions>
                    <Button color="primary" component={Link} to="/">Return Home</Button>
                </CardActions>
            </Card>
        );  
    }

    formatCurrency(value) {
        return format({prefix: '$', })(value);
    }

    formatDate(value) {
        return moment(value).format('Do MMMM, YYYY');
    } 
}
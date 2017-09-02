import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default function Payslip(props) {
    
    return (
        <div>
            <header>
                <h2>Payslip Detail</h2>
                <Link to="/">Return home</Link>
            </header>


            <div>
                <b>Payee:</b> {props.payslip.payee.firstName} {props.payslip.payee.lastName} <br/>
                <b>Annual Salary:</b> {props.payslip.payee.annualSalary} <br/>
                <b>Super Rate:</b> {props.payslip.payee.superRate} <br/>
                <b>Payment Period:</b> {props.payslip.dateFrom} - {props.payslip.dateTo}<br/>  
            </div>
        </div>
    );  
}
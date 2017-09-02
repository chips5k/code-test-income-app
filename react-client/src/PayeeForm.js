import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {FormGroup} from 'material-ui/Form';


export default class PayeeForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    render() {
        let data = this.props.data ? this.props.data : {
            firstName: null,
            lastName: null,
            annualSalary: null,
            superRate: null,
            paymentDate: null
        };

        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardContent>
                        <Typography type="title" style={{marginBottom: '1rem'}}>Payee Details</Typography>
                        <FormGroup>
                            <TextField label="First Name" type="text" defaultValue={data.firstName} inputRef={(input) => this.firstName = input} name="firstName" placeholder="Enter first name..." />
                        </FormGroup>

                        <FormGroup>
                            <TextField label="Last Name" type="text" defaultValue={data.lastName} inputRef={(input) => this.lastName = input} name="lastName" placeholder="Enter last name..." />
                        </FormGroup>

                        <FormGroup>
                            <TextField label="Annual Salary"  type="text" defaultValue={data.annualSalary} inputRef={(input) => this.annualSalary = input} name="annualSalary"  placeholder="Enter annual salary..." />
                        </FormGroup>

                        <FormGroup>
                            <TextField  label="super Rate" type="text" defaultValue={data.superRate} inputRef={(input) => this.superRate = input} name="superRate" placeholder="Enter super rate..." />
                        </FormGroup>

                        <Typography type="title" style={{marginTop: '1.5rem', marginBottom: '1rem'}}>Payment Details</Typography>
                        <FormGroup>
                            <TextField
                              id="date"
                              label="Payment Date"
                              type="date"
                              defaultValue={data.paymentDate}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputRef={(input) => this.paymentDate = input}
                            />   

                        </FormGroup>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" type="submit">Generate</Button>
                        <Button component={Link} to="/">Cancel</Button>
                    </CardActions>
                </Card>
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
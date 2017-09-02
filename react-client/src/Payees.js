import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Link } from 'react-router-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Payees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            paymentDateDialogOpen: false,
            payees: [],
            selectedPayee: null,
            selectedPaymentDate: null
        };
        
        this.closePaymentDateDialog = this.closePaymentDateDialog.bind(this);
        this.submitPaymentDateDialog = this.submitPaymentDateDialog.bind(this);
        this.handleSelectedPaymentDateChange = this.handleSelectedPaymentDateChange.bind(this);
    }

    componentDidMount() {
        let self = this;

        self.setState({loading: true});

        fetch('/api/payees').then(function(response) {
            return response.json()
        }).then(function(payees) {
            self.setState({loading: false, payees: payees });
        }).catch(function(e) {
            
            self.setState({loading: false});
        });

    }

    selectPayee(payee) {
        this.setState({
            selectedPayee: payee,
            paymentDateDialogOpen: true
        });
    }

    closePaymentDateDialog(e) {
        this.setState({
            paymentDateDialogOpen: false,
            selectedPayee: null,
            selectedPaymentDate: null
        });
    }

    submitPaymentDateDialog(e) {
        let id = this.state.selectedPayee.id;
        let date = this.state.selectedPaymentDate;
        
        this.props.history.push(`/generate-payslip/${id}/${date}`);
    }

    handleSelectedPaymentDateChange(e) {
    	this.setState({
    		selectedPaymentDate: e.target.value
    	});
    }

	render() {
        let content = <div className="loader"><CircularProgress size={50} /></div>;
        if(!this.state.loading) {
            content = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell numeric>Annual Salary</TableCell>
                            <TableCell numeric>Super Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.payees.map((n, i) => {
                            return (
                                <TableRow hover key={i} onClick={this.selectPayee.bind(this, n)}>
                                    <TableCell>{n.firstName}</TableCell>
                                    <TableCell>{n.lastName}</TableCell>
                                    <TableCell numeric>{n.annualSalary}</TableCell>
                                    <TableCell numeric>{n.superRate}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
                  
    	return (
            <div>
        		<typography type="headline">Select a payee to proceed...</typography>
                <div className="spacer"></div>
                <Paper>{content}</Paper>

                <Button raised component={Link} to="/" style={{marginTop: '1.5rem'}}>Cancel</Button>
                <Dialog open={this.state.paymentDateDialogOpen && this.state.selectedPayee !== null}>
                    <DialogTitle>Confirm Payslip Generation</DialogTitle>
                        <DialogContent>
                            <div>
                                <typography type="title">
                                    <b>Payee: </b> 
                                    {this.state.selectedPayee ? this.state.selectedPayee.firstName + ' ' + this.state.selectedPayee.lastName : 'Not Selected' }
                                </typography>
                            </div>
                            <TextField
                                id="date"
                                label="Payment Date"
                                type="date"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleSelectedPaymentDateChange}
                            />    
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={this.submitPaymentDateDialog}>
                                Generate Payslip
                            </Button>
                            <Button onClick={this.closePaymentDateDialog}>
                                Cancel
                            </Button>
                        </DialogActions>
                </Dialog>
            </div> 
    	);
    }
}

export default withRouter(Payees);
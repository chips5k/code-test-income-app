import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';

export default class Home extends Component {
    render() {
        return (
            <Card>
                <CardHeader title="Generate Payslips" />
                <CardContent>
                    <Typography component="p">
                        Select an option below to being generating payslips
                    </Typography>
                   
                </CardContent>
                <CardActions>
                    <Button raised color="primary" component={Link} to="new-payee">New Payee</Button><br/>
                    <Button  raised color="accent" component={Link} to="payees">Existing Payee</Button>
                </CardActions>

            </Card>
        );
    }
}
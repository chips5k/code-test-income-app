import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon  from 'material-ui-icons/Home';

import Home from './Home';
import Payees from './Payees';
import NewPayee from './NewPayee';
import GeneratePayslip from './GeneratePayslip';

import './App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div className="root">
                        <AppBar position="static">
                            <Toolbar disableGutters>
                                <IconButton component={Link} to="/" className="homeButton" color="contrast" aria-label="Menu">
                                    <HomeIcon  />
                                </IconButton>
                                <Typography component={Link} to="/" type="title" color="inherit" className="flex title">
                                    Payroll Sample Application
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>

                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/payees" component={Payees}/>
                        <Route path="/new-payee" component={NewPayee}/>
                        <Route path="/generate-payslip/:payeeId/:paymentDate" component={GeneratePayslip}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

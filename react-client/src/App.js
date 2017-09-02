import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import HomeIcon  from 'material-ui-icons/Home';
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
                      <Button component={Link} color="contrast" to="/payees">Payees</Button>
                      <Button component={Link} color="contrast" to="/new-payee">New Payee</Button>
                    </Toolbar>
                  </AppBar>
                </div>
    			 
                <div className="content">
    				<Route exact path="/" component={Home}/>
    				<Route path="/payees" component={Payees}/>
    				<Route path="/new-payee" component={NewPayee}/>
                </div>
			</div>
		</Router>
    );
  }
}

class Home extends Component {
	render() {
    	return (
            <Card>
             

    		
    			<Link to="new-payee">Create Payslip for new Payee</Link><br/>
    			<Link to="payees">Create Payslip for existing Payee</Link>
    		</Card>
    	);
    }
}

class NewPayee extends Component {

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


class PayeeForm extends Component {

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
class Payees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            payees: []
        };
    }

    componentDidMount() {
        let self = this;

        self.setState({loading: true});

        fetch('/api/payees').then(function(response) {
            return response.json()
        }).then(function(payees) {
            self.setState({loading: false, payees: payees });
        }).catch(function(e) {

            console.log('Error', e);
            self.setState({loading: false});
        });

    }

	render() {
    	return (
    		<div>
                <header>
        			<h2>Select a Payee</h2>
        			<Link to="/">Cancel</Link>
                </header>

                <div>
                    {this.state.loading ? <Spinner/> : null}
                    <ul>
                        {this.state.payees.map(n => { return <PayeeListItem key={n.id} payee={n} /> }) }
                    </ul>

                </div>
    		</div>
    	);
    }
}

function PayeeListItem(props) {
    return(
        <li>
            <b>Name: </b>{props.payee.firstName} {props.payee.lastName}<br/>
            <b>Annual Salary:</b> ${props.payee.annualSalary}<br/>
            <b>Super Rate</b> {props.payee.superRate * 100}%
        </li>
    );
}

function Payslip(props) {

    return (
        <div>
            <header>
                <h2>Payslip Detail</h2>
                <Link to="/">Return home</Link>
            </header>


            <div>
                <b>Payee:</b> {props.payslip.firstName} {props.payslip.lastName}<br/>
                <b>Annual Salary:</b> {props.payslip.annualSalary}<br/>
                <b>Super Rate:</b> {props.payslip.superRate}<br/>
                <b>Payment Date:</b> {props.payslip.paymentDate}<br/>  
            </div>
        </div>
    );  
}

function Spinner() {
    return (
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    );
}

export default App;

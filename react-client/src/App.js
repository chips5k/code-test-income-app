import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './App.css';

class App extends Component {

  
  render() {
    return (
		<Router>
			<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/payees">Payees</Link></li>
				<li><Link to="/new-payee">New Payee</Link></li>
			</ul>

			<hr/>

				<Route exact path="/" component={Home}/>
				<Route path="/payees" component={Payees}/>
				<Route path="/new-payee" component={NewPayee}/>
			</div>
		</Router>
    );
  }
}

class Home extends Component {
	render() {
    	return (
    		<div>
    			<Link to="new-payee">Create Payslip for new Payee</Link><br/>
    			<Link to="payees">Create Payslip for existing Payee</Link>
    		</div>
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
                {this.state.hasData ? <Payslip /> : <PayeeForm onSubmit={this.handleFormSubmit} />}
    			
    		</div>
    	);
    }

    handleFormSubmit(data) {
        this.setState({ hasData: true });
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
                        <input type="text" name="firstName" value="" placeholder="Enter first name..." />
                    </div>

                    <div>
                        <label>First Name</label>
                        <input type="text" name="lastName" value="" placeholder="Enter last name..." />
                    </div>

                    <div>
                        <label>Annual Salary</label>
                        <input type="text" name="annualSalary" value="" placeholder="Enter annual salary..." />
                    </div>

                    <div>
                        <label>Super Rate</label>
                        <input type="text" name="superRate" value="" placeholder="Enter super rate..." />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Payslip Details</legend>
                    <div>
                        <label>Payment Date</label>
                        <input type="text" name="paymentDate" value="" placeholder="Enter date of payment..." />
                    </div>
                </fieldset>

                <button type="submit">Generate</button>
                <Link to="/">Cancel</Link>
            </form>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({data: 'test'});
    }

}
class Payees extends Component {
	render() {
    	return (
    		<div>
                <header>
        			<h2>Select a Payee</h2>
        			<Link to="/">Cancel</Link>
                </header>

                <div>

                    <ul>
                        <li>
                            <a href="">
                                <b>Payee Name: </b>Callem Pittard<br/>
                                <b>Annual Salary:</b> $120000<br/>
                                <b>Super Rate</b> 9%
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <b>Payee Name: </b>Callem Pittard<br/>
                                <b>Annual Salary:</b> $120000<br/>
                                <b>Super Rate</b> 9%
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <b>Payee Name: </b>Callem Pittard<br/>
                                <b>Annual Salary:</b> $120000<br/>
                                <b>Super Rate</b> 9%
                            </a>
                        </li>

                    </ul>

                </div>
    		</div>
    	);
    }
}

class Payslip extends Component {

    render() {
        return (
            <div>
                <header>
                    <h2>Payslip Detail</h2>
                    <Link to="/">Return home</Link>
                </header>

                <div>

                    Payslip details here
                </div>
            </div>
        );  

    }

}

export default App;

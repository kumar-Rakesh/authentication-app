import React, { Component } from 'react';
import FormValidator from './FormValidator/FormValidator';

import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

class Registration extends Component {
    constructor() {
        super();
        this.validator = new FormValidator([{
            field: 'first_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter first name.'
        }, {
            field: 'last_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter last name.'
        }, {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter your email address.'
        }, {
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'Enter valid email address.'
        }, {
            field: 'phone',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter a phone number.'
        }, {
            field: 'phone',
            method: 'matches',
            args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
            validWhen: true,
            message: 'Enter valid phone number.'
        }, {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter password.'
        }, {
            field: 'password_confirmation',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Password confirmation.'
        }, {
            field: 'password_confirmation',
            method: this.passwordMatch, // notice that we are passing a custom function here
            validWhen: true,
            message: 'Password and password confirmation do not match.'
        }]);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }
    passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // dispatch = useDispatch;

    handleFormSubmit = event => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({
            validation
        });
        this.submitted = true;

        // console.log(this.state)
        var request = {
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            // phone: this.state.phone,
            password: this.state.password,
            confirmPassword: this.state.password_confirmation,
        }

        console.log("JSON Object..", request);
        const url = 'https://comp-8967-authentication-app.herokuapp.com/api/auth/register';
        axios.post(url, request)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
        return (
            <div className="container">
                <div className="row">
                    {/* <div className="col-md-4 col-md-offset-4"> */}
                    <div>
                        <form className="registrationForm">
                            <h2>Registration Form</h2>
                            <div className={validation.email.isInvalid && 'has-error'}>
                                <label htmlFor="first_name">First Name</label>
                                <input type="string" className="form-control" name="first_name" placeholder="First Name" onChange={this.handleInputChange} />
                                <span className="help-block">{validation.first_name.message}</span>
                            </div>

                            <div className={validation.email.isInvalid && 'has-error'}>
                                <label htmlFor="last_name">Last Name</label>
                                <input type="string" className="form-control" name="last_name" placeholder="Last Name" onChange={this.handleInputChange} />
                                <span className="help-block">{validation.last_name.message}</span>
                            </div>

                            <div className={validation.email.isInvalid && 'has-error'}>
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange} />
                                <span className="help-block">{validation.email.message}</span>
                            </div>

                            {/* <div className={validation.phone.isInvalid && 'has-error'}>
                                <label htmlFor="phone">Phone number</label>
                                <input type="phone" className="form-control" name="phone" placeholder="Phone Number" onChange={this.handleInputChange} /> 
                                <span className="help-block">{validation.phone.message}</span> 
                            </div> */}

                            <div className={validation.password.isInvalid && 'has-error'}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} />
                                <span className="help-block">{validation.password.message}</span>
                            </div>

                            <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" onChange={this.handleInputChange} />
                                <span className="help-block">{validation.password_confirmation.message}</span>
                            </div>

                            <div className="center">
                                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Register </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Registration;
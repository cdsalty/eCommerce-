import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../../actions/loginAction';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            showAlert: false,
            msg: ''
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.auth.msg === "userNotFound"){
            this.setState({
                showAlert: true,
                msg: "Email is not in our system.Please try again."
            })
        }else if(newProps.auth.msg === "badPassword"){
            this.setState({
                showAlert: true,
                msg: 'Incorrect password. Please try again'
            })
        }else if(newProps.auth.msg === "userLoggedIn"){
            console.log(this.props.auth)
            this.props.history.push('/')
        }
    }

    loginHandler = (e)=>{
        e.preventDefault();
        const userName = document.getElementById('email').value
        const password = document.getElementById('password').value
        this.props.loginAction({
            userName,
            password
        })
    }

    render() {
        return (
            <main>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Login Error"
                    text= {this.state.msg}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <center>
                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row login">
                            <form className="col s12" onSubmit={this.loginHandler}>
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='email' id='email' />
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' id='password' />
                                        <label htmlFor='password'>Enter your password</label>
                                    </div>
                                    <label>
                                        <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                                    </label>
                                </div>
                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                    <Link to="/register">Create account</Link>
                </center>
                <div className="section"></div>
                <div className="section"></div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginAction: loginAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
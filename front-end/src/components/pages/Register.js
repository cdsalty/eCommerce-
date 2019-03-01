import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import authAction from '../../actions/authAction';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            showAlert: false,
        }
    }
    
    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.auth.msg === 'userExists'){
            // let the user know they already have an account
            this.setState({
                showAlert: true,
            })
        }else if(newProps.auth.msg === 'userAdded'){
            this.props.history.push('/')
        }
    }


    registerSubmit = (e)=>{
        e.preventDefault();
        // console.dir(e.target);
        // const userName = e.target[0].value; // same as below
        const userName = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // console.log(userName)
        // console.log(password)
        this.props.authAction({
            userName, 
            password
        })

    }

    render() {
        
        return (
            <main>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Registration Error"
                    text="Email is already registered. Login or chooose a different email."
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                <center>
                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row login">
                            <form className="col s12" onSubmit={this.registerSubmit}>
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

                                </div>
                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Register</button>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                    <Link to="/login">Already have an account?</Link>
                </center>
                <div className="section"></div>
                <div className="section"></div>
            </main>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);


function mapStateToProps(state){
    // state= rootReducer/store
    return {
        // key = this.props.KEY will be accessible to this component
        // value = property of rootReducer
        auth: state.auth, 
    }
}


function mapDispatchToProps(dispatch){
    // dispatch is the thing that sends the action to ALL the reducers
    return bindActionCreators({
        authAction: authAction,
    }, dispatch)
}
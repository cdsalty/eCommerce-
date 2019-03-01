import React, { Component } from 'react';
import loginTab from '../../misc/openWindow';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginNavBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }


    // The process:
    // 1. User clicks and opens the new window via loginTab
    // 2. New window is open to crossOrigin but is github.com
    // 3. Once user authenticates, github sends them to /auth
    // 4. The callback URL either gets the uid or inserts them
    // 5. Callback then takes the uid and tokenizes it with JWT (JSON web tokens)
    // 6. Token is sent back to the github window that loginTab opened and
    // window.opener.postMessage is in the script of that window which
    // sends the data back over to original page
    // 7. It's now available in this promise resolution
    // 8. Put it in localstorage so we can use it next time.

    githubAuth = (event) => {
        loginTab('http://localhost:3000/auth/github')
    }



    render() {
        console.log(this.props.auth)
        let rightNavBar = ''

        if(this.props.auth.userName !== undefined){
            // user is logged in
            rightNavBar = <span> Welcome, {this.props.auth.userName}</span>
        }else{
            // user is not logged in
            rightNavBar = <span><Link to='/login'>Sign in</Link> or <Link to='/register'>Register</Link> | </span>
        }
        console.log(rightNavBar)
        return (
            <div className="login-nav-bar">
                <Link to="/"><div className="left valign-wrapper">WELCOME TO ZAPP GAMES</div></Link>
                <div className="right">
                    {rightNavBar}
                    <Link to="/cart">{this.props.cart.items} - ${this.props.cart.total} </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth, 
        cart: state.cart
    }
}

export default connect(mapStateToProps)(LoginNavBar);



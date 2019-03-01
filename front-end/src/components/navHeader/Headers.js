
import React from 'react';
import LoginNavBar from './LoginNavBar';
import LogoSearchHeader from './LogoSearchHeader';
import MainNav from './MainNav';
import './nav.css'

function Headers(props){
return (
    <div className="header">
        <div className="container-fluid center grey darken-4">
            <div className="row">
                <div className="container">
                    <LoginNavBar />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <LogoSearchHeader />
            </div>        
            <div className="row">
                <MainNav />
            </div>
        </div>
    </div>
    )
}
export default Headers;
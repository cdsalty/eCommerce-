import React from 'react';
import { Link } from 'react-router-dom';

function LogoSearchHeader(props) {
    return (
        <div className="logo-search-header">
            <div className="left">
                <Link to ='/'><img src="../images/logo.png" alt="logo" /></Link>
            </div>
            <div className="right">
                <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate" />
                    <label htmlFor="icon_prefix">Search</label>
                </div>
            </div>
        </div>

    )
}
export default LogoSearchHeader;
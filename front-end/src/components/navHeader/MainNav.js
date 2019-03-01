import React from 'react';

function MainNav(props){
    return(
        <div className="main-nav">
            <nav>
                <div className="nav-wrapper red darken-4">
                    <ul className="left hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li className="active"><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
        </nav>      

        </div>
    )
}
export default MainNav;
import React from 'react';
import { Link } from 'react-router-dom';

function GameCard(props){
    console.log(props)
    const images = props.data.screenshot_url.split(',');
    const rand = Math.floor(Math.random() * images.length);
    const image = images[rand];
    const title = props.data.name;
    const gamePage = `/game/${props.data.id}`
    return(
        <div className="col s3 game-card">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={image} alt="" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
                    <Link to={gamePage}>Game Homepage</Link>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
                    <p>{props.data.summary}</p>
                </div>
            </div>
        </div>      
    )   

}

export default GameCard;
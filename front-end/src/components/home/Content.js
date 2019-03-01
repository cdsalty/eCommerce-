import React, { Component } from 'react';
import GameCard from '../utility/GameCard';
import axios from 'axios';


class Content extends Component{
    constructor(){
        super();
        this.state = {
            games: []
        }
    }

    componentDidMount(){
        const gamesPromise = axios.get(`${window.apiHost}/games/getHome`);
        gamesPromise.then((response)=>{
            const games = response.data;
            this.setState({
                games
            })
        })
    }

    render(){

        const gameCards = this.state.games.map((game, i)=>{
            return <GameCard key={i} data={game}/>
        })

        return(
            <div className="row">
                <div className='col s12'>
                    {gameCards}
                </div>
            </div>
        )
    }
}

export default Content;
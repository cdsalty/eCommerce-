import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './game.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateCart from '../../actions/updateCartAction';

class Game extends Component {
    constructor() {
        super()
        this.state = {
            game: []
        }
    }


    componentDidMount(){
        const gameId = this.props.match.params.id
        console.log(gameId)
        const gamePromise = axios.get(`${window.apiHost}/games/${gameId}`)
        gamePromise.then((results)=>{
            const gameData = results.data[0]
            this.setState({
                game : gameData
            })
        }).catch((error)=>{
            if(error){throw error}
        })
    }

    componentWillReceiveProps(newProps){
        if(newProps.cart.length !== this.props.cart.length){
            this.props.history.push('/?added=item');
        }
    }

    addToCart = (event)=>{
        // token, item
        const token = this.props.auth.token
        console.log(this.props)
        this.props.updateCart(token, this.state.game.id)
    }

    render() {
        if(this.state.game.length === 0){
            return(
                <div>

                </div>
            )
        }else{
            let image = this.state.game.screenshot_url.split(',')[0];
            image = image.replace('t_thumb','t_cover_big')
            return (
                <div className="game-container">
                    <div className="row">
                        <div className="col s12 m4">
                            <img src={image} alt="" className="game-pic" />
                        </div>
                        <div className="col s12 m8">
                            <div className="row">
                                <h3 className="game-title">{this.state.game.name}</h3>
                                <div className="game-desc">
                                    {this.state.game.summary}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s1">
                                    <span>Qty:</span>
                                </div>
                                <div className="col s8">
                                    <input type="text" name="quantity" />
                                </div>
                                <div className="col s2">
                                    <button onClick={this.addToCart}>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);


function mapStateToProps(state){
    return{
        auth: state.auth,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updateCart: updateCart
    }, dispatch)
}
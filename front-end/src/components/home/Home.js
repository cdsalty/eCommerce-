import React, { Component } from 'react';
import Carousel from './Carousel';
import Content from './Content';
import MiniNav from './MiniNav';
import './home.css';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            showAlert: false
        }
    }

    componentDidMount(){
        if(this.props.location.search === "?added=item"){
            this.setState({
                showAlert: true
            })
        }        
    }

    render(){

        return(
            <div className="col s12 home">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Added"
                    text="We have updated your cart! Look below for similar items."
                    onConfirm={() => this.setState({ showAlert: false })}
                />               
                <Carousel />
                <MiniNav />
                <Content />
            </div>
        )
    }
}

export default Home;
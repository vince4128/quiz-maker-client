import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

    renderLinks(){
        if(this.props.auth.authenticated) {
            return(
                <span className="m-header__link--right">                     
                    <li><Link to={"/signout"}>Sign out</Link></li>
                </span>
            )
        }else{
            return(
                <span className="m-header__link--right">
                    <li><Link to={"/signin"}>Sign in</Link></li>
                    <li><Link to={"/signup"}>Sign up</Link></li>
                </span>
            )
        }
    }

    render(){
        return(
            <header className="o-header header-container">                
                <ul>
                    <li><h3 className="App-title">Quiz Maker</h3></li>
                    {this.renderLinks()}
                </ul>    
            </header>                          
        )
    }

}

export default withRouter(Header);
import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

    renderLinks(){
        if(this.props.auth.authenticated) {
            return(
                <span>
                    <li><Link to={"/category"}>Categories</Link></li>
                    { this.props.location.pathname === "/" ? <li><Link to={"/quiz/new"}>New Quiz</Link></li> : "" }
                    { this.props.location.pathname === "/category" ? <li><Link to={"/category/new"}>New Category</Link></li> : "" }                        
                    <li><Link to={"/signout"}>Sign out</Link></li>
                </span>
            )
        }else{
            return(
                <div>
                    <li><Link to={"/signin"}>Sign in</Link></li>
                    <li><Link to={"/signup"}>Sign up</Link></li>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <header className="App-header">
                    <h1 className="App-title">Quiz Maker</h1>
                </header>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    {this.renderLinks()}
                </ul>              
            </div>
        )
    }

}

export default withRouter(Header);
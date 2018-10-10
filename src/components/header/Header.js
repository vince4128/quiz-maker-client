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
            <header className="o-header">                
                <ul>
                    <li><h3 className="App-title">Quiz Maker</h3></li>
                    <li><Link to={"/"}>Home</Link></li>
                    {this.renderLinks()}
                </ul>    
            </header>                          
        )
    }

}

export default withRouter(Header);
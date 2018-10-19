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

    toggleClassBody(){
        document.body.classList.toggle('menu-open');
    }

    render(){
        return(
            <header className="o-header header-container">                
                <ul>
                    <li onClick={()=>{this.toggleClassBody()}}>
                        <a className="o-header__trigger" href="#">
                            <i>
                                <svg className="test" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                    <path d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                    <path d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li><h3 className="App-title">Quiz Maker</h3></li>
                    {this.renderLinks()}
                </ul>    
            </header>                          
        )
    }

}

export default withRouter(Header);
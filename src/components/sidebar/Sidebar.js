import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {

    renderLinks(){
        if(this.props.auth.authenticated) {
            return(
                <span>
                    { this.props.location.pathname === "/" ? <li><Link to={"/quiz/new"}> + Add Quiz</Link></li> : "" }
                    <li><Link to={"/category"}>Categories</Link></li>                    
                    { this.props.location.pathname === "/category" ? <li><Link to={"/category/new"}>New Category</Link></li> : "" }                        
                </span>
            )
        }else{
            return(
                <div>
                </div>
            )
        }
    }

    render(){
        return(
            <section className="sidebar-container o-sidebar">            
                <ul>
                    {/*<li><h3 className="App-title">Add Route</h3></li>*/}
                    <li><Link to={"/"}>Home</Link></li>
                    {this.renderLinks()}
                </ul>    
            </section>                           
        )
    }

}

export default withRouter(Sidebar);
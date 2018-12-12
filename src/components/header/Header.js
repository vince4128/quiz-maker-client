import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { fetchUser, fetchUsers } from '../../actions';
import { connect } from 'react-redux';

class Header extends Component {

    componentDidMount(){
        this.props.fetchUser(this.props.auth._id, this.props.auth.authenticated);
    }

    renderLinks(){
        if(this.props.auth.authenticated) {
            return(
                <span className="m-header__link--right">
                    <li><span className="a-header__pseudo">{this.props.user.pseudo}</span></li>
                    <li><Link to={"/signout"}>Déconnexion</Link></li>
                </span>
            )
        }else{
            return(
                <span className="m-header__link--right">
                    <li><Link to={"/signin"}>Connexion</Link></li>
                    <li><Link to={"/signup"}>Inscription</Link></li>
                </span>
            )
        }
    }

    toggleClassBody(){
        document.body.classList.toggle('menu-open');
    }

    render(){

        const previewMode = this.props.location.pathname.includes('preview')

        return(
            <header className="o-header header-container">                
                <ul>
                    { previewMode ? 
                        <li>
                            <Link to="/" className="o-header__back">
                                <i>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path fill="#fff" d="M0.646 10.146l6-6c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-5.146 5.146h16.293c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-16.293l5.146 5.146c0.195 0.195 0.195 0.512 0 0.707-0.098 0.098-0.226 0.146-0.354 0.146s-0.256-0.049-0.354-0.146l-6-6c-0.195-0.195-0.195-0.512 0-0.707z"></path>
                                    </svg>
                                </i>
                            </Link>
                        </li>
                    : <li onClick={()=>{this.toggleClassBody()}}>
                        <a className="o-header__trigger" href="#">
                            <i>
                                <svg className="test" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                    <path d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                    <path d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                </svg>
                            </i>
                            <i>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path fill="#fff" d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"></path>
                                </svg>
                            </i>
                        </a>
                    </li>}
                    <li><h3 id={"app-title"} className={previewMode ? "app-title--preview" : ""}>Quiz Maker</h3></li>
                    {this.renderLinks()}
                </ul>    
            </header>                          
        )
    }

}

function mapStateToProps(state){
    return { user:state.auth };
}

//export default withRouter(Header);
export default withRouter(connect(mapStateToProps, { fetchUser })(Header));
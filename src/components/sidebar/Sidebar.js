import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {

    renderLinks(){
        if(this.props.auth.authenticated) {
            return(
                <span>
                    { this.props.location.pathname === "/" ? <li><Link to={"/quiz/new"} className="o-sidebar__nav-link">
                    <i>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M16.218 3.782c-1.794-1.794-4.18-2.782-6.718-2.782s-4.923 0.988-6.718 2.782-2.782 4.18-2.782 6.717 0.988 4.923 2.782 6.718 4.18 2.782 6.718 2.782 4.923-0.988 6.718-2.782 2.782-4.18 2.782-6.718-0.988-4.923-2.782-6.717zM9.5 19c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5z"></path>
                        <path d="M15.5 10h-5.5v-5.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v5.5h-5.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h5.5v5.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-5.5h5.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5z"></path>
                    </svg>
                    </i>
                    <em>+ Add Quiz</em></Link></li> : "" }
                    <li><Link to={"/category"} className="o-sidebar__nav-link">
                    <i>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M19.557 10.383l-2.698-6.168c-0.298-0.682-1.115-1.216-1.859-1.216h-10c-0.744 0-1.561 0.534-1.859 1.216l-2.698 6.168c-0.248 0.568-0.443 1.497-0.443 2.117v4c0 0.827 0.673 1.5 1.5 1.5h17c0.827 0 1.5-0.673 1.5-1.5v-4c0-0.619-0.194-1.549-0.443-2.117zM4.057 4.617c0.141-0.323 0.591-0.617 0.943-0.617h10c0.352 0 0.802 0.294 0.943 0.617l2.698 6.168c0.030 0.069 0.060 0.148 0.089 0.233-0.075-0.012-0.152-0.018-0.23-0.018h-6c-0.276 0-0.5 0.224-0.5 0.5v0.5c0 1.103-0.897 2-2 2s-2-0.897-2-2v-0.5c0-0.276-0.224-0.5-0.5-0.5h-6c-0.078 0-0.155 0.006-0.23 0.018 0.029-0.085 0.058-0.164 0.089-0.233l2.698-6.168zM19 16.5c0 0.276-0.224 0.5-0.5 0.5h-17c-0.276 0-0.5-0.224-0.5-0.5v-4c0-0.276 0.224-0.5 0.5-0.5h5.5c0 1.654 1.346 3 3 3s3-1.346 3-3h5.5c0.276 0 0.5 0.224 0.5 0.5v4z"></path>
                    </svg>
                    </i>
                    <em>Categories</em></Link></li>                    
                    { this.props.location.pathname === "/category" ? <li><Link to={"/category/new"} className="o-sidebar__nav-link"><i>icon</i><em>New Category</em></Link></li> : "" }
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
              <section className="o-sidebar">
                  <a className="o-sidebar__trigger" href="#0">
                    <i>
                        <svg className="test" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                            <path d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                            <path d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                        </svg>
                    </i>
                  </a>

                  <nav className="o-sidebar__nav">
                    <ul>
                        <li>
                            <Link className="o-sidebar__nav-link" to={"/"}>
                                <i>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M19.871 12.165l-8.829-9.758c-0.274-0.303-0.644-0.47-1.042-0.47-0 0 0 0 0 0-0.397 0-0.767 0.167-1.042 0.47l-8.829 9.758c-0.185 0.205-0.169 0.521 0.035 0.706 0.096 0.087 0.216 0.129 0.335 0.129 0.136 0 0.272-0.055 0.371-0.165l2.129-2.353v8.018c0 0.827 0.673 1.5 1.5 1.5h11c0.827 0 1.5-0.673 1.5-1.5v-8.018l2.129 2.353c0.185 0.205 0.501 0.221 0.706 0.035s0.221-0.501 0.035-0.706zM12 19h-4v-4.5c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5v4.5zM16 18.5c0 0.276-0.224 0.5-0.5 0.5h-2.5v-4.5c0-0.827-0.673-1.5-1.5-1.5h-3c-0.827 0-1.5 0.673-1.5 1.5v4.5h-2.5c-0.276 0-0.5-0.224-0.5-0.5v-9.123l5.7-6.3c0.082-0.091 0.189-0.141 0.3-0.141s0.218 0.050 0.3 0.141l5.7 6.3v9.123z"></path>
                                    </svg>
                                </i>
                                <em>Home</em>
                            </Link>
                        </li>
                        {this.renderLinks()}
                    </ul>
                  </nav>
              </section>                  
        )
    }

}

export default withRouter(Sidebar);

{/*<section className="sidebar-container o-sidebar">            
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    {this.renderLinks()}
                </ul>    
        </section>      */} 
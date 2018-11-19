import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../actions/index.js';

class CategoryIndex extends Component {

    componentDidMount(){
        this.props.fetchCategories();
    }

    handleDelete(id){        
        this.props.deleteCategory(id, this.props.connected.authenticated);        
    }

    renderCategories(){

        const data = Object.assign({}, this.props.categories);
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return(
                    <li key={renderData._id}>
                        <section className="m-card m-card--cat">
                            <Link to={`/category/${renderData._id}`}><h2>{renderData.title}</h2></Link>                        
                            <p>{renderData.shortDescription}</p>
                            <p className="introduction">{renderData.description}</p>                            
                            <hr/>
                            {
                                this.props.connected ?
                                (
                                    <div className="m-button-group">
                                        <a id="btn-delete" className="m-button m-button-group--secondary" onClick={()=>{this.handleDelete(renderData._id)}}>
                                        Delete
                                        <i>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
                                            <path d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path>
                                            <path d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            </svg>
                                        </i>
                                        <i>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
                                            <path d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path>
                                            <path d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            </svg>
                                        </i>
                                        </a>  
                                        <Link to={`/category/${renderData._id}/edit`} className="m-button">
                                        Edit
                                        <i>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
                                            <path d="M19.104 0.896c-0.562-0.562-1.309-0.871-2.104-0.871s-1.542 0.309-2.104 0.871l-12.75 12.75c-0.052 0.052-0.091 0.114-0.116 0.183l-2 5.5c-0.066 0.183-0.021 0.387 0.116 0.524 0.095 0.095 0.223 0.146 0.354 0.146 0.057 0 0.115-0.010 0.171-0.030l5.5-2c0.069-0.025 0.131-0.065 0.183-0.116l12.75-12.75c0.562-0.562 0.871-1.309 0.871-2.104s-0.309-1.542-0.871-2.104zM5.725 17.068l-4.389 1.596 1.596-4.389 11.068-11.068 2.793 2.793-11.068 11.068zM18.396 4.396l-0.896 0.896-2.793-2.793 0.896-0.896c0.373-0.373 0.869-0.578 1.396-0.578s1.023 0.205 1.396 0.578c0.373 0.373 0.578 0.869 0.578 1.396s-0.205 1.023-0.578 1.396z"></path>
                                            </svg>
                                        </i>
                                        </Link>
                                    </div>
                                )
                                : ""                      
                            }
                        </section>                    
                    </li>
                )
            })

    }

    render(){
        return(
            <div className="o-content">
                <ul className="o-card-list">
                    {this.renderCategories()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { categories:state.categories};
}

export default withRouter(connect(mapStateToProps, { fetchCategories, deleteCategory })(CategoryIndex));
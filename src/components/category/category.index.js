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
                        <Link to={`/category/${renderData._id}`}>{renderData._id}</Link>
                        <h2>{renderData.title}</h2>
                        <p>{renderData.description}</p>
                        <p>{renderData.shortDescription}</p>
                        {
                            this.props.connected ?
                            (
                                <div>
                                    <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                                    <Link to={`/category/${renderData._id}/edit`}>Edit</Link>
                                </div>
                            )
                            : ""                      
                        }                        
                    </li>
                )
            })

    }

    render(){
        return(
            <div className="o-content">
                <h2>Category Index</h2>
                <ul>
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
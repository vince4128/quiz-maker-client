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
                return( <li key={renderData._id}>
                        <section className="m-card m-card--cat">
                            <Link to={`/category/${renderData._id}/quiz`}><h2>{renderData.title}</h2></Link>                        
                            <p>{renderData.shortDescription}</p>
                            <p className="introduction">{renderData.description}</p> 
                            <hr/>
                            {
                                /*this.props.connected ? (<div className="m-button-group"><a id="btn-delete" className="m-button m-button-group--secondary" onClick={()=>{this.handleDelete(renderData._id)}}>
                            Delete</a><Link to={`/category/${renderData._id}/edit`} className="m-button">Edit</Link></div>) : ""*/
                            this.props.connected ? (<div className="btns"><Link to={`/category/${renderData._id}/edit`} className="btn btn--primary">Edit</Link><a href="" id="btn-delete" className="btn btn--error" onClick={()=>{this.handleDelete(renderData._id)}}>
                            Delete</a></div>) : ""}
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
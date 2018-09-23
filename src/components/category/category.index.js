import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchCategory } from '../../actions/index.js';

class CategoryIndex extends Component {

    componentDidMount(){
        this.props.fetchCategories();
    }

    renderCategories(){

        const data = Object.assign({}, this.props.categories);
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return(
                    <li key={renderData._id}>
                        <Link to={`/category/${renderData._id}`}>{renderData._id}</Link>
                    </li>
                )
            })

    }

    render(){
        return(
            <div>
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

export default withRouter(connect(mapStateToProps, { fetchCategories })(CategoryIndex));
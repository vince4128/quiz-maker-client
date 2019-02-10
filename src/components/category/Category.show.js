import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategory } from '../../actions/index.js';

class CategoryShow extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedCategory: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedCategory:id});
        this.props.fetchCategory(id);
    }

    renderCategory(){    
        const data = Object.assign({}, this.props.categories);
        let Category = {};
        data[this.state.selectedCategory] ? Category = data[this.state.selectedCategory] : Category = {err:'sous objet inexistant'};

            return (
                <div>
                    <p>Id : {Category._id}</p>
                    <p>Title : {Category.title}</p>
                    <p>Description : {Category.description}</p>
                    <p>shortDescription : {Category.shortDescription}</p>
                    <Link to={'/category'}>Back</Link>
                    {
                        this.props.connected ?
                        (
                            <Link to={`/category/${Category._id}/edit`}>Edit</Link>
                        )
                        : ""                      
                    }
                </div>
            );            
            
    }

    render(){
        return(
            <div className="o-content">
                <h2>Category Show</h2>
                {this.renderCategory()}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { categories:state.categories };
}

//export default CategoryShow;
export default withRouter(connect(mapStateToProps, { fetchCategory })(CategoryShow));
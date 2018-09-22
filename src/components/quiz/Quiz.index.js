import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../../actions';

class QuizIndex extends Component {

    componentDidMount(){
        this.props.fetchQuizzes();
    }

    renderQuizzes(){
        const data = Object.assign({}, this.props.quiz)
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return (
                    <li key={renderData._id}>
                        <Link to={`/${renderData._id}`}>{renderData._id}</Link>
                    </li>
                )
            })
    }

    render(){
        return(
            <div>
                <h2>Quiz index</h2>
                <ul>
                    {this.renderQuizzes()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, { fetchQuizzes })(QuizIndex));
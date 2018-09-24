import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes, deleteQuiz } from '../../actions';

class QuizIndex extends Component {

    componentDidMount(){
        this.props.fetchQuizzes();
    }

    handleDelete(id){
        this.props.deleteQuiz(id, this.props.connected.authenticated);        
    }

    renderQuizzes(){
        const data = Object.assign({}, this.props.quiz)
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return (
                    <li key={renderData._id}>
                        <Link to={`/quiz/${renderData._id}`}>{renderData._id}</Link>
                        <h3>{renderData.title}</h3>
                        <p>{renderData.description}</p>
                        <p>{renderData.introduction}</p>
                        <p>{renderData.date}</p>
                        <p>{renderData.question.length}</p>
                        {
                            this.props.connected.authenticated ? 
                            (
                            <div>
                                <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                                <Link to={`/quiz/${renderData._id}/edit`}>Edit</Link>
                            </div>
                            ) 
                            : ""}
                        <hr/>
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

export default withRouter(connect(mapStateToProps, { fetchQuizzes, deleteQuiz })(QuizIndex));
import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions';
import QuestionShow from '../question/Question.index';

class QuizShow extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz:null,            
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedQuiz:id});
        this.props.fetchQuiz(id);
    }

    renderQuiz(){
        const data = Object.assign({}, this.props.quiz);
        let Quiz = {};
        data[this.state.selectedQuiz] ? Quiz = data[this.state.selectedQuiz] : Quiz = {err:'objet inexistant'};

        return(
            <div>
                <p>Id : {Quiz._id}</p>
                <h3>{Quiz.title}</h3>
                <p>{Quiz.description}</p>
                <p>{Quiz.introduction}</p>
                <QuestionShow questions={Quiz.question}/>
                <p>{Quiz.date}</p>
                <p>{Quiz.author}</p>
            </div>
        )
    }

    render(){
        return(
            <div>
                <h1>Quiz Show</h1>
                {this.renderQuiz()}
            </div>
        )
    }

}

function mapStateToProps(state){
    return { quiz:state.quiz };
}

export default withRouter(connect(mapStateToProps, {fetchQuiz})(QuizShow));
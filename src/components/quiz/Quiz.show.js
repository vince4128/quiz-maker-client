import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions';
import QuestionIndex from '../question/Question.index';
import SERVER from '../../actions/server';

const server = SERVER;

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
                <p>{Quiz.date}</p>
                <p>{Quiz.author ? Quiz.author.pseudo : ""}</p>
                <div>
                    {Quiz.image ? <img width="250" height="auto" src={`${server}/${Quiz.image}`}/> : ""}
                </div>
                <QuestionIndex questions={Quiz.question} quizId={Quiz._id}/>
                <Link to={"/"}>Back</Link>
            </div>
        )
    }

    render(){
        return(
            <div className="o-content">
                <h2>Quiz Show</h2>
                {this.renderQuiz()}
            </div>
        )
    }

}

function mapStateToProps(state){
    return { quiz:state.quiz };
}

export default withRouter(connect(mapStateToProps, {fetchQuiz})(QuizShow));
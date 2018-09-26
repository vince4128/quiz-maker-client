import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz, editQuestion, deleteQuestion, createQuestion } from '../../actions';
import QuestionIndex from './Question.index';
import requireAuth from '../requireAuth';

class QuestionsEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz:null,
            selectedQuestion:null
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.parentMethod = this.parentMethod.bind(this);

    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedQuiz:id});
        this.props.fetchQuiz(id);
    }

    handleDelete(qid){
        alert('delete in parent');
        this.props.deleteQuestion(this.state.selectedQuiz, qid, this.props.auth, ()=>{

        });     
    }

    parentMethod(){
        alert('parent method');
    }

    handleEdit(values){        
        this.props.editQuestion(this.state.selectedQuiz, this.state.selectedQuestion, values, this.props.connected.auth, () => {
            /*this.props.history.push(`/quiz/${this.state.selectedQuiz}/question/new`);*/
        });
    }

    render(){

        const data = Object.assign({}, this.props.quiz);
        let quiz = {};
        data[this.state.selectedQuiz] ? quiz = data[this.state.selectedQuiz] : quiz = {err:'objet inexistant'};

        return (
            <div>Questions.edit
                <h1>Questions edit</h1>
                <br/>{/*JSON.stringify(this.state)*/}
                <br/>{/*JSON.stringify(this.props)*/}
                <h2>Le quiz</h2>
                <p>{quiz.title ? quiz.title : ""}</p>
                <h2>Les questions</h2>
                { quiz.question ? 
                <QuestionIndex 
                questions={quiz.question} 
                edit={true} 
                quizId={quiz._id} 
                connected={this.props.auth}
                deleteMethod={(qid)=>{this.handleDelete(qid)}}
                parentMethod={()=>this.parentMethod()}/>                 
                : "" }
            </div>
        )

        { /*Quiz.question ? <QuestionIndex questions={Quiz.question} edit={true} quizId={Quiz._id} connected={this.props.auth}/> : ""*/ }

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(requireAuth(connect(mapStateToProps,{fetchQuiz,editQuestion,deleteQuestion,createQuestion})(QuestionsEdit)));
import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import RenderSelectField from '../field/RenderSelectField';
import QuizEdit from './Quiz.edit';
import QuestionIndex from '../question/Question.index';
import QuestionCreate from '../question/Question.create';
import ArrayForm from '../question/array.form';
import Tabs from '../tabs/Tabs';

class QuizCreateQuestion extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz:null,
            default:""        
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        const { part } = this.props.match.params;
        this.setState({selectedQuiz:id, default:part});
        this.props.fetchQuiz(id);
    }

    renderQuiz(){

        if(this.props.quiz[`${this.state.selectedQuiz}`]){

            const quiz = this.props.quiz[`${this.state.selectedQuiz}`];

            return Object.keys(quiz)
                .map((q) => {
                    if(typeof quiz[q] === "string"){return <li key={q}>{q} : {quiz[q]}</li>}
                    //return typeof q;
                })

        }else{
            return "loading";
        }

        
    }

    render(){

        const data = Object.assign({}, this.props.quiz);
        let Quiz = {};
        data[this.state.selectedQuiz] ? Quiz = data[this.state.selectedQuiz] : Quiz = {err:'objet inexistant'};

        const hasQuiz = 
            <div className="o-content">
            <h1>Édition du Quiz</h1>            
                <Tabs part={this.state.default}>
                    <div label="Paramètres généraux" partName="general">
                        <QuizEdit connected={this.props.auth}/>
                    </div>
                    <div label="Ajout / Édition de questions" partName="question">
                        { Quiz.question ? <QuestionIndex questions={Quiz.question} edit={true} quizId={Quiz._id} connected={this.props.auth}/> : "" }
                        <QuestionCreate quizId={Quiz._id} connected={this.props.auth}/>    
                    </div>                                                    
                </Tabs>
            </div>

        const noQuiz = <p>Loading</p>;

        return this.props.quiz[`${this.state.selectedQuiz}`] ? hasQuiz : noQuiz;

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(requireAuth(connect(mapStateToProps,{ fetchQuiz })(QuizCreateQuestion)));
import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import RenderSelectField from '../field/RenderSelectField';
import QuestionIndex from '../question/Question.index';
import QuestionCreate from '../question/Question.create';

class QuizCreateQuestion extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz:null          
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedQuiz:id});
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
            <diV>
            <h2>Quiz Create Question</h2>
            <h3>Le quiz</h3>
            <ul>{this.renderQuiz()}</ul>
            <hr/>
            { Quiz.question ? <QuestionIndex questions={Quiz.question}/> : "" }            
            <p>Ajout de question</p>            
            {
                /*Ajouter un bouton enregistrer qui : */
                /*Appelle une action (à créer) qui prend en parametre l'id du quiz et push la question dedans*/
                /*Appeler l'action editQuiz avec le quiz présent dans le reducer*/
                /*Ou utiliser action existante editQuiz...*/
            }
            <QuestionCreate quizId={Quiz._id} connected={this.props.auth}/>
        </diV>

        const noQuiz = <p>Loading</p>;

        return this.props.quiz[`${this.state.selectedQuiz}`] ? hasQuiz : noQuiz;

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(requireAuth(connect(mapStateToProps,{ fetchQuiz })(QuizCreateQuestion)));
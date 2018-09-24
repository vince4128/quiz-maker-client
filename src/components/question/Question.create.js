import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editQuiz, fetchQuiz } from '../../actions';
import RenderField from '../field/RenderField';
import requireAuth from '../requireAuth';
import QuestionShow from './Question.show';

class QuestionCreate extends Component {

    onSubmit(values){
        alert(values);
    }

    render(){

        const { handleSubmit } = this.props;

        return (
            <div>
                <QuestionShow/>
                <hr/>
                <h1>Question Create</h1>
                <Link to={"/"}>Back</Link>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    
                    <Field
                        label="Enonce"
                        name="enonce"
                        placeholder="enonce"
                        component={RenderField}
                    />

                    <Field
                        label="FeedBack ok"
                        name="feedback.good"
                        placeholder="Feecback ok"  
                        component={RenderField}                   
                    />

                </form>

            </div>            
        )
    }

}

function validate (){

}

export default reduxForm({
    validate:validate,
    form:'questionCreate'
})(
    withRouter(requireAuth(connect(null, { editQuiz, fetchQuiz })(QuestionCreate)))
);
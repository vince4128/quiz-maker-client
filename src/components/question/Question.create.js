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

        {/*this.props.editQuiz(this.props.quizId, values, this.props.connected.authenticated ,() => {
            this.props.history.push('/');
        });*/}
    }

    render(){

        const { handleSubmit } = this.props;

        return (
            <div>
                <QuestionShow/>
                <h4>Question Create</h4>
                {/*<Link to={"/"}>Back</Link>*/}
                {JSON.stringify(this.props.quizId)}

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

                    <Field
                        label="FeedBack ko"
                        name="feedback.bad"
                        placeholder="Feecback ko"  
                        component={RenderField}                   
                    />

                    <button type="submit" className="btn btn-primary">Submit</button>

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
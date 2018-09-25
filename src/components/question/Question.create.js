import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createQuestion, fetchQuiz } from '../../actions';
import RenderField from '../field/RenderField';
import requireAuth from '../requireAuth';
import QuestionShow from './Question.show';
import RenderSelectField from '../field/RenderSelectField';
import validate from './validate'

class QuestionCreate extends Component {

    constructor(props){
        super(props);
    }

    onSubmit(values){

        this.props.createQuestion(this.props.quizId, values, this.props.connected, () => {
            //this.props.history.push(`/quiz/${this.props.quizId}`);
        });

    }

    renderProposals = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
          <li>
            <button type="button" onClick={() => fields.push({})}>
              Ajouter une proposition
            </button>
            {submitFailed && error && <span>{error}</span>}
          </li>
          {fields.map((proposal, index) => (
            <li key={index}>
              <button
                type="button"
                title="Effacer la propostion"
                onClick={() => fields.remove(index)}
              >
              Supprimer la question
              </button>
              <h4>Proposal #{index + 1}</h4>
              <Field
                name={`${proposal}.text`}
                type="text"
                component={RenderField}
                label="Proposition"
              />
              <div>
              <label>Value</label>
                  <div>
                  <label>
                      <Field
                      name={`${proposal}.value`}
                      component="input"
                      type="radio"
                      value="true"
                      />{' '}
                      Vrai
                  </label>
                  <label>
                      <Field
                      name={`${proposal}.value`}
                      component="input"
                      type="radio"
                      value="false"
                      />{' '}
                      False
                  </label>
                  </div>
              </div>        
              {/*<FieldArray name={`${proposal}.hobbies`} component={renderHobbies} />*/}
            </li>
          ))}
        </ul>
      )

    test(){
        return "test!";
    }

    render(){

        const test = () => {
            return "test";
        }

        const { handleSubmit } = this.props;
        /*const { handleSubmit, reset } = this.props;*/      

        return (
            
            <div>
                <QuestionShow/>
                <h4>Question Create</h4>
                {/*<Link to={"/"}>Back</Link>*/}
                {JSON.stringify(this.props.quizId)}
                {this.test}

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    
                    {/*<Field
                        label="Enonce"
                        name="statement"
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

                    <Field
                    label="Type"
                    name="type"
                    component={RenderSelectField}>
                        <option value={"type1"}>Type 1</option>
                        <option value={"type2"}>Type 2</option>
                    </Field>

                    <button type="submit" className="btn btn-primary">Submit</button>*/}

                    <Field
                        name="statement"
                        type="text"
                        component={RenderField}
                        label="enonce"
                    />
                    <FieldArray name="proposal" component={this.renderProposals} />
                    <Field
                        label="FeedBack ok"
                        name="feedback.good"
                        placeholder="Feedback ok"  
                        component={RenderField}                   
                        />
                        <Field
                        label="FeedBack ko"
                        name="feedback.bad"
                        placeholder="Feecback ko"  
                        component={RenderField}                   
                        />
                    <div>
                        <button type="submit" /*disabled={submitting}*/>
                        Ajouter la question
                        </button>
                        <button type="button" /*disabled={pristine || submitting}*/ /*onClick={reset}*/>
                        Réinitialiser les champs
                        </button>
                    </div>

                </form>

            </div>            
        )
    }

}


export default reduxForm({
    validate:validate,
    form:'questionCreate'
})(
    withRouter(requireAuth(connect(null, { createQuestion, fetchQuiz })(QuestionCreate)))
);
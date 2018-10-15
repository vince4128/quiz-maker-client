import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createQuestion, fetchQuiz } from '../../actions';
import axios from 'axios';
import DropZoneField from '../field/DropzoneField';
import RenderField from '../field/RenderField';
import RenderRadio from '../field/RenderRadio';
import requireAuth from '../requireAuth';
import QuestionShow from './Question.show';
import RenderSelectField from '../field/RenderSelectField';
import validate from './validate'

class QuestionCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageFile: []
        }
    }

    handleOnDrop = (newImageFile, rejectedFile) => {
        this.setState({imageFile: newImageFile});        
    };

    checkError = () => {
        return false;
    }

    getRandomString(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    onSubmit(values){
        //upload image
        if(this.state.imageFile.length>0){
            if(this.checkError()){
                alert('error with file !');
            }else{
                const filename = this.getRandomString() + this.state.imageFile[0].name;            
                values.image = filename;
                const data = new FormData();
                data.append('filename', filename); 
                data.append('file', this.state.imageFile[0]);             
                alert('la requete va etre passee !');
                axios.post('http://localhost:3000/upload', data, {
                    headers: {authorization: this.props.connected}
                })
                    .then((r)=>{
                        //this.setState({ imageURL: `http://localhost:3000/${r.body.file}`, uploadStatus: true });
                        //lancer action
                        //alert('callback');
                        //console.log('callback post image', r.data);
                    }).catch((err)=>{
                        console.log(err);
                    })
            }
        }
        //check type of question
        const trueValue = values.proposal.filter((value) => {
            console.log(value);
            console.log(value.value);
            return value.value === "true";
        });
        if(trueValue.length > 1){
            values.type = "multi"
        }else{
            values.type = "simple"
        }
        //
        this.props.createQuestion(this.props.quizId, values, this.props.connected, () => {
            this.props.fetchQuiz(this.props.quizId);
        });

        this.props.reset();
    }

    renderProposals = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
          
          {fields.map((proposal, index) => (
            <li key={index}>              
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
                      component={RenderRadio}
                      type="radio"
                      value="true"
                      />{' '}
                      Vrai
                  </label>
                  <label>
                      <Field
                      name={`${proposal}.value`}
                      component={RenderRadio}
                      type="radio"
                      value="false"
                      />{' '}
                      False
                  </label>
                  </div>
              </div>        
              {/*<FieldArray name={`${proposal}.hobbies`} component={renderHobbies} />*/}
              <button
                type="m-button m-button--secondary"
                title="Effacer la propostion"
                onClick={() => fields.remove(index)}
              >
                Supprimer la question
              </button>
            </li>
          ))}
          <li>
            <button type="m-button m-button--primary" onClick={() => fields.push({})}>
              Ajouter une proposition
            </button>
            {submitFailed && error && <span>{error}</span>}
          </li>
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
            
            <div className="o-content">
                <QuestionShow/>
                <h4>Question Create</h4>
                {/*<Link to={"/"}>Back</Link>*/}
                {JSON.stringify(this.props.quizId)}
                {this.test}

                <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <fieldset>

                        <Field
                            name="statement"
                            type="text"
                            component={RenderField}
                            label="enoncé de la question"
                        />

                    </fieldset>

                    <fieldset>

                        <label for="uploadInput">Image</label>
                        <Field
                            name="uploadInput"
                            component={DropZoneField}
                            type="file"
                            imageFile={this.state.imageFile}
                            handleOnDrop={this.handleOnDrop}                    
                            />

                    </fieldset>

                    <fieldset>

                        <FieldArray name="proposal" component={this.renderProposals} />

                    </fieldset>

                    <fieldset>
                    
                        <Field
                            label="FeedBack ok"
                            name="feedback.good"
                            placeholder="Feedback ok"  
                            component={RenderField}                   
                            />
                            
                        <Field
                            label="FeedBack ko"
                            name="feedback.bad"
                            placeholder="Feedback ko"  
                            component={RenderField}                   
                            />

                    </fieldset>

                    <div>
                        <button type="submit" className="btn btn-primary"/*disabled={submitting}*/>
                        Ajouter la question
                        </button>
                        <button type="button" className="m-form__cancel"/*disabled={pristine || submitting}*/ onClick={this.props.reset}>
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
    form:'questionCreate',
    enableReinitialize: true
})(
    withRouter(requireAuth(connect(null, { createQuestion, fetchQuiz })(QuestionCreate)))
);
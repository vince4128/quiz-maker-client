import React, {Component} from 'react';
import { Field, FieldArray, initialize, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editQuestion, fetchQuestion } from '../../actions';
import axios from 'axios';
import DropZoneField from '../field/DropzoneField';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import QuestionShow from '../question/Question.show';

class QuestionEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageFile:[],
            selectedQuiz: null,
            selectedQuestion: null,
            load:false
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

    componentDidMount(){
        const { id } = this.props.match.params;
        const { qid } = this.props.match.params;
        this.setState({selectedQuiz:id});      
        this.setState({selectedQuestion:qid});
        this.props.dispatch(fetchQuestion(id,qid)).then((r)=>{
            this.props.dispatch(initialize('editQuestion', r.payload.data));
            this.setState({load:true})
        })      
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){
        //upload image
        if(this.checkError()){
            alert('error with file !');
        }else{
            const filename = this.getRandomString() + this.state.imageFile[0].name;            
            values.image = filename;
            //values.image = this.state.imageFile[0].name;
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
        this.props.editQuestion(this.state.selectedQuiz, this.state.selectedQuestion, values, this.props.connected, () => {
            this.props.history.push(`/quiz/${this.state.selectedQuiz}/question/new`);
        });
    }

    renderProposals = ({ fields, meta: { error, submitFailed } }) => (
        <ul>
          <li>
            <button type="button" onClick={() => fields.push({})}>
              Éditer une proposition
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

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>
                {/*<QuestionShow/>
                <h4>Question Edit</h4>
                <p>id question : {this.props.question._id}</p>
                <p>id quiz : {this.props.quizId}</p>*/}

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>                

                    <Field
                        name="statement"
                        type="text"
                        component={RenderField}
                        label="enonce"
                    />
                    
                    <Field
                        label="Image"
                        name="image"                    
                        component={DropZoneField}
                        type="file"
                        imageFile={this.state.imageFile}
                        handleOnDrop={this.handleOnDrop}                    
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
                        <button type="submit" /*onClick={this.props.toggleEdit()}/*onClick={this.props.toggleEdit()}*/ /*disabled={submitting}*/>
                        Éditer la question
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

function validate(values){

    const errors = {};

    // validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title !";
    }

    if(!values.description){
        errors.description = "Enter a description !";
    }

    if(!values.shortDescription){
        errors.shortDescription = "Enter a shortdescription !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

export default reduxForm({
    validate:validate,
    form:'editQuestion'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editQuestion, fetchQuestion })(QuestionEdit)))
);
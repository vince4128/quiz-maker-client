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
import RenderRadio from '../field/RenderRadio';
import RichTextHtml from '../field/RichTextHtml';
import QuestionShow from '../question/Question.show';
import validate from './validate';
import SERVER from '../../actions/server';

const server = SERVER;

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
            console.log("init", r.payload.data.proposal);
            r.payload.data.proposal.map((p) => {
                if(p.value === true){
                    p.value = "true";
                }else if(p.value === false){
                    p.value = "false";
                }
            })
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
        if(this.state.imageFile.length>0){
            if(this.checkError()){
                alert('error with file !');
            }else{
                const filename = this.getRandomString() + this.state.imageFile[0].name;
                values.image = filename;
                //values.image = this.state.imageFile[0].name;
                const data = new FormData();
                data.append('filename', filename);            
                data.append('file', this.state.imageFile[0]);           
                axios.post(`${server}/upload`, data, {
                    headers: {authorization: this.props.connected.authenticated}
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
            return value.value === "true";
        });
        console.log("edit trueValue ", trueValue);
        if(trueValue.length > 1){            
            values.type = "multi"
        }else{
            values.type = "simple"
        }
        this.props.editQuestion(this.state.selectedQuiz, this.state.selectedQuestion, values, this.props.connected, () => {
            //this.props.history.push(`/quiz/${this.state.selectedQuiz}/question/new`);
            this.props.history.push(`/quiz/${this.state.selectedQuiz}/edit/question`);
        });
    }

    renderProposals = ({ fields, meta: { error, submitFailed } }) => (
        <ul>          
          {fields.map((proposal, index) => (
            <li key={index}>

                <fieldset>

                    <h4>Proposition #{index + 1}</h4>
                    <Field
                        name={`${proposal}.text`}
                        type="text"
                        component={RichTextHtml}
                        label="Énoncé de la proposition"
                    />
                    <div>
                    <label>Valeur</label>
                        <div>
                        <label className="toggle-2">
                            <Field
                            name={`${proposal}.value`}
                            className="toggle-2__input toggle-2--true"
                            component={RenderRadio}
                            type="radio"
                            value="true"
                            />{' '}
                            <span className="toggle-2__button">Vrai</span>
                        </label>
                        <label className="toggle-2">
                            <Field
                            name={`${proposal}.value`}
                            className="toggle-2__input toggle-2--false"
                            component={RenderRadio}
                            type="radio"
                            value="false"
                            />{' '}
                            <span className="toggle-2__button">Faux</span>
                        </label>
                        </div>
                    </div>
                    {/*<button
                        type="button"
                        title="Effacer la propostion"
                        className="m-button m-button--secondary"
                        onClick={() => fields.remove(index)}
                    >
                        Supprimer la proposition
                    </button>*/}
                    <button
                        type="button"
                        title="Effacer la propostion"
                        className="btn btn--error"
                        onClick={() => fields.remove(index)}
                    >
                        Supprimer la proposition
                    </button>        
                    {/*<FieldArray name={`${proposal}.hobbies`} component={renderHobbies} />*/}

                </fieldset>

            </li>
          ))}
          <li>
            <fieldset>
                {/*<button type="button" className="m-button m-button--primary" onClick={() => fields.push({})}>
                Ajouter une proposition
                </button>*/}
                <button type="button" className="btn btn--primary" onClick={() => fields.push({})}>
                Ajouter une proposition
                </button>
                <div>
                    {submitFailed && error && <div className="m-form__error">{error}</div>}
                </div>
            </fieldset>
          </li>
        </ul>
      )

    render(){

        const { handleSubmit } = this.props;

        return(

            <div className="o-content">
                {/*<QuestionShow/>
                <h4>Question Edit</h4>
                <p>id question : {this.props.question._id}</p>
                <p>id quiz : {this.props.quizId}</p>*/}
                <h2>Édition de la question</h2>

                <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>                

                    <fieldset>

                        <Field
                            name="statement"
                            type="text"
                            component={RichTextHtml}
                            label="Énoncé"
                        />
                    
                    </fieldset>
                    
                    <fieldset className="m-fieldset-img">

                        <label htmlFor="image">Image</label>
                        <Field
                            label="Image"
                            name="image"                    
                            component={DropZoneField}
                            type="file"
                            imageFile={this.state.imageFile}
                            handleOnDrop={this.handleOnDrop}                    
                            />
                    
                    </fieldset>

                    <FieldArray name="proposal" component={this.renderProposals} />

                    <fieldset>

                        <Field
                            label="FeedBack ok"
                            name="feedback.good"
                            placeholder="Feedback ok"  
                            component={RichTextHtml}                   
                            />

                        <Field
                            label="FeedBack ko"
                            name="feedback.bad"
                            placeholder="Feecback ko"  
                            component={RichTextHtml}                   
                            />

                    </fieldset>

                    <div className="btns">
                        <button type="submit" className="btn btn--primary btn--md"/*onClick={this.props.toggleEdit()}/*onClick={this.props.toggleEdit()}*/ /*disabled={submitting}*/>
                        Enregistrer la question
                        </button>
                        <Link to={`/quiz/${this.props.match.params.id}/edit/question`} className="btn btn--error btn--md" /*disabled={pristine || submitting}*/ /*onClick={reset}*/>
                        Annuler
                        </Link>
                    </div>

                </form>

            </div>    
        )

    }
    
}

/*function validate(values){

    const errors = {};

    // validate the inputs from 'values'
    if(!values.statement){
        errors.statement = "Enter a énoncé !";
    }

    if(!values.description){
        errors.description = "Enter a description !";
    }

    if(!values.feedback){
        errors.feedback = "Enter a feedback !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}*/

export default reduxForm({
    validate:validate,
    form:'editQuestion'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editQuestion, fetchQuestion })(QuestionEdit)))
);
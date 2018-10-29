import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createQuiz, fetchCategories, fetchImages} from '../../actions';
import axios from 'axios';
import DropZoneField from '../field/DropzoneField';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import RenderArea from '../field/RenderArea';
import RichTextHtml from '../field/RichTextHtml';
import RenderSelectField from '../field/RenderSelectField';

class QuizCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageFile: []            
        }
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(content) {
        this.setState({ content });
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
        this.props.fetchCategories();
        this.props.fetchImages();
    }

    renderCategories(){
        //avoid mutate
        const data = Object.assign({}, this.props.categories);
        //options to return
        return Object.keys(data).map(            
            (cat)=>{
                return(
                    <option key={data[cat]._id} value={data[cat]._id}>{data[cat].title}</option>
                )
            }
        );    
    }

    renderImages(){
        //avoid mutate
        const data = Object.assign({}, this.props.images);
        //options to return
        return Object.keys(data).map(            
            (img)=>{
                return(
                    <option key={data[img]._id} value={data[img]._id}>{data[img].title}</option>
                )
            }
        );    
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
                alert('la requete va etre passee !');
                axios.post('http://localhost:3000/upload', data, {
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
        
        values.author = this.props.connected._id;      
        this.props.createQuiz(values, this.props.connected.authenticated, (newlyCreatedObjId) => {
            //this.props.history.push(`/quiz/${newlyCreatedObjId}/question/new`);
            this.props.history.push(`/quiz/${newlyCreatedObjId}/edit`);
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div className="o-content">

            <h1>Create Quiz</h1>

            <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <fieldset>
                    
                    <Field
                        placeholder="Titre du nouveau quiz"
                        label="Title"
                        name="title"
                        component={RenderField}                        
                    />

                    <Field
                        placeholder="Description du nouveau quiz"
                        label="Description"
                        name="description"
                        component={RichTextHtml}
                    />

                    <Field
                        placeholder="Introduction du nouveau quiz"
                        label="Introduction"
                        name="introduction"
                        component={RichTextHtml}
                    />

                </fieldset>

                <fieldset>

                    <Field
                        placeholder="Feedback général en cas de réussite"
                        label="Feedback bad"
                        name="feedback.bad"
                        component={RichTextHtml}
                    />

                    <Field
                        placeholder="Feedback général en cas d'échec"
                        label="Feedback good"
                        name="feedback.good"
                        component={RichTextHtml}
                    />

                </fieldset>

                <fieldset>

                    <Field
                        label="Category"
                        name="category"
                        component={RenderSelectField}>
                        {this.renderCategories()}
                    </Field>

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

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="m-form__cancel">Cancel</Link>

            </form>

        </div>
        )

    }
    
}

function validate(values){

    const errors = {feedback:{good:"",bad:""}};

    // validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title !";
    }

    if(!values.description){
        errors.description = "Enter a description !";
    }

    if(!values.category){
        errors.category = "Choose a category !";
    }

    if(!values.introduction){
        errors.introduction = "Enter an introduction !";
    }

    if(!values.feedback){
        errors.feedback.bad = "Enter a bad feedback !";
        errors.feedback.good = "Enter a good feedback !";
    }

    /*if(!values.image){
        errors.image = "Choose a image !";
    }*/

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

function mapStateToProps(state){
    return {auth:state.auth, categories:state.categories, images:state.images}
}

export default reduxForm({
    validate:validate,
    form:'CreateQuizForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { createQuiz, fetchCategories, fetchImages })(QuizCreate)))
);
import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editQuiz, fetchQuiz, fetchCategories, fetchImages } from '../../actions';
import axios from 'axios';
import DropZoneField from '../field/DropzoneField';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import RenderArea from '../field/RenderArea';
import RenderSelectField from '../field/RenderSelectField';
import RichTextHtml from '../field/RichTextHtml';

class QuizEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageFile:[],
            selectedQuiz: null,
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
        this.setState({selectedQuiz:id});
        this.props.fetchQuiz(id);
        this.props.fetchCategories();
        this.props.fetchImages();
        this.props.dispatch(fetchQuiz(id)).then((r)=>{
            console.log('r',r.payload.data);
            this.props.dispatch(initialize('EditQuizForm', r.payload.data));
            this.setState({load:true})
         })                               
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
                    headers: {authorization: this.props.auth}
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
        this.props.editQuiz(this.state.selectedQuiz, values, this.props.auth ,() => {
            this.props.history.push('/');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div className="o-content">

            <h1>Edit Quiz</h1>

            <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))} >

                <fieldset>
                
                    <Field
                        label="Title"
                        name="title"
                        placeholder="Type your title"          
                        component={RenderField}                    
                    />

                    <Field
                        label="Description"
                        name="description"
                        placeholder="Type your Description"                                        
                        component={RichTextHtml}
                    />

                    <Field
                        placeholder="Introduction"
                        label="Introduction"
                        name="introduction"
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

                <fieldset className="m-fieldset-img">

                    <label for="image">Image</label>
                    <Field
                        label="Image"
                        name="image"                    
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

const initialValues = (state) => {

    //const id = ownProps.match.params;

    return(
        {
        title: 'title', 
        description: 'description'
        }
    )
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

    if(!values.introduction){
        errors.introduction = "Enter a introduction !";
    }

    if(!values.category){
        errors.category = "Choose a category !";
    }

    {/*if(!values.image){
        errors.image = "Choose a image !";
    }*/}

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

function mapStateToProps(state){
    return { quiz:state.quiz, categories:state.categories, images:state.images };
}

export default reduxForm({
    validate:validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
    form:'EditQuizForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { editQuiz, fetchQuiz, fetchCategories, fetchImages })(QuizEdit)))
);
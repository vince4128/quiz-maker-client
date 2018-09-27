import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editQuiz, fetchQuiz, fetchCategories, fetchImages } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';
import RenderSelectField from '../field/RenderSelectField';

class QuizEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz: null,
            load:false
        }
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
        this.props.editQuiz(this.state.selectedQuiz, values, this.props.connected.authenticated ,() => {
            this.props.history.push('/');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Edit Quiz</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                
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
                    component={RenderField}
                />

                {/*<Field
                    label="Image"
                    name="image"
                    component={RenderSelectField}>
                    {this.renderImages()}
                </Field>*/}

                <Field
                    label="Category"
                    name="category"
                    component={RenderSelectField}>
                    {this.renderCategories()}
                </Field>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

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
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCategory } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';

class CategoryEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedCategory: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedCategory:id});        
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){        
        this.props.editCategory(this.state.selectedCategory, values, this.props.connected.authenticated, () => {
            this.props.history.push('/category');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Edit Category</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
            <Field
                    label="Title"
                    name="title"
                    placeholder="Type your title"
                    defaultValue ="blablalba"            
                    component={RenderField}                    
                />

                <Field
                    label="Description"
                    name="description"
                    placeholder="placeholder"
                    placeholder="Type your title"                                        
                    component={RenderField}
                />

                <Field
                    label="Short Description"
                    name="shortDescription"
                    placeholder="placeholder"
                    placeholder="Type your title"                                        
                    component={RenderField}
                />

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/category" className="btn btn-danger">Cancel</Link>

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
    form:'editCategroyForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editCategory })(CategoryEdit)))
);
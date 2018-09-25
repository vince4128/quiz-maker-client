import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCategory } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';

class CategoryCreate extends Component {

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){        
        this.props.createCategory(values, this.props.connected.authenticated, () => {
            this.props.history.push('/category');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Create Category</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    component={RenderField}
                />

                <Field
                    label="Description"
                    name="description"
                    component={RenderField}
                />

                <Field
                    label="Short Description"
                    name="shortDescription"
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
    form:'createCategoryForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { createCategory })(CategoryCreate)))
);

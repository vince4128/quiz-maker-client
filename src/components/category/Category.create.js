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

            <div className="o-content">

            <h2>Nouvelle Catégorie</h2>

            <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <fieldset>

                    <Field
                        label="Nom de la catégorie"
                        placeholder="Nom de la catégorie"
                        name="title"
                        component={RenderField}
                    />

                    <Field
                        label="Description"
                        placeholder="Description de la catégorie"
                        name="description"
                        component={RenderField}
                    />

                </fieldset>

                {/*<button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/category" className="m-form__cancel">Cancel</Link>*/}
                <div className="btns">
                    <button type="submit" className="btn btn--primary btn--md">Valider</button>
                    <Link to="/category" className="btn btn--error btn--md">Annuler</Link>
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
        errors.title = "Saisissez un nom de catégorie !";
    }

    if(!values.description){
        errors.description = "Saisissez une description !";
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

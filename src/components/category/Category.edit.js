import React, {Component} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCategory, fetchCategory } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../field/RenderField';

class CategoryEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedCategory: null,
            load:false
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedCategory:id});
        this.props.dispatch(fetchCategory(id)).then((r)=>{
            console.log('r',r.payload.data);
            this.props.dispatch(initialize('editCategroyForm', r.payload.data));
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
        this.props.editCategory(this.state.selectedCategory, values, this.props.connected.authenticated, () => {
            this.props.history.push('/category');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div className="o-content">

            <h2>Édition de Catégorie</h2>

            <form class="m-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

            <fieldset>

                <Field
                    label="Titre"
                    name="title"
                    placeholder="Saisissez le nouveau titre"
                    defaultValue ="blablalba"            
                    component={RenderField}                    
                />

                <Field
                    label="Description"
                    name="description"
                    placeholder="Saisissez la nouvelle description"                                     
                    component={RenderField}
                />

            </fieldset>

                {/*<button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/category" className="m-form__cancel">Cancel</Link>*/}
                <div className="btns">
                    <button type="submit" className="btn btn--primary btn--md">Valider</button>
                    <Link to="/category" className="btn btn--error btn--md">Anhuler</Link>
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

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

export default reduxForm({
    validate:validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
    form:'editCategroyForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editCategory })(CategoryEdit)))
);
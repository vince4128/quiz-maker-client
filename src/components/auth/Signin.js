import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux'; //for multiple higher order component syntax
import { connect } from 'react-redux';
import { signinAction } from '../../actions';

class Signin extends Component {
    
    onSubmit = formProps => {
        this.props.signinAction(formProps, ()=>{
           this.props.history.push('/');
        });
    };

    render() {
        const { handleSubmit } = this.props;

        return(
            <div class="o-content">                
                <form className="m-form m-form--signin" onSubmit={handleSubmit(this.onSubmit)}>
                    <h2>Connexion</h2>
                    <fieldset>
                        <label>Email</label>
                        <Field
                            name="email"
                            type="email"
                            component="input"
                            autoComplete="none"
                        />
                        <label>Mot de passe</label>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            autoComplete="none"
                        />
                        { this.props.errorMessage ? <div className="m-form__error">
                            {this.props.errorMessage}
                        </div> : ""}
                        {/*<button className="m-button m-button--primary">Sign In !</button>*/}
                        <button className="btn btn--primary">Se connecter !</button>
                    </fieldset>                                        
                </form>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { signinAction }),
    reduxForm({form: 'signin'})
)(Signin);
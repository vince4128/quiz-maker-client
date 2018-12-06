import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signupAction } from '../../actions';

class Signup extends Component {
    
    onSubmit = formProps => {
        this.props.signupAction(formProps, ()=>{
           this.props.history.push('/');
        });
    };

    render() {
        const { handleSubmit } = this.props;

        return(
            <div className="o-content">
                <h2>Sign up</h2>
                <form className="m-form" onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                        <label>Email</label>
                        <Field
                            name="email"
                            type="text"
                            component="input"
                            autoComplete="none"
                        />
                        <label>Pseudo</label>
                        <Field
                            name="pseudo"
                            type="text"
                            component="input"
                            autoComplete="none"
                        />
                        <label>Password</label>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            autoComplete="none"
                        />
                        <button className="btn btn--primary">Sign up !</button>
                    </fieldset>
                    { this.props.errorMessage ? <div className="m-form__error">
                            {this.props.errorMessage}
                        </div> : ""}         
                </form>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { signupAction }),
    reduxForm({form: 'signup'})
)(Signup);
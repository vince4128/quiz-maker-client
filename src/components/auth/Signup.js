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
                    </fieldset>
                    <fieldset>
                        <label>Pseudo</label>
                        <Field
                            name="pseudo"
                            type="text"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            autoComplete="none"
                        />
                    </fieldset>
                    <div>
                        {this.props.errorMessage}
                    </div>
                    <button className="m-button m-button--primary">Sign up !</button>
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
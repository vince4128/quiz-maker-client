import React from 'react';

const RenderRadio = (field) => { // param field contain some event handlers to wire up to the .jsx that we're returning
        const { meta: {touched, error} } = field; // destructuring to access properties on nested objects for refactor
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="radio"
                    {...field.input}
                />
                {touched ? error : ''}
            </div>
        );
    }

export default RenderRadio;
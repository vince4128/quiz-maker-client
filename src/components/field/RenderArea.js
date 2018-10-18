import React from 'react';

const RenderArea = (field) => { // param field contain some event handlers to wire up to the .jsx that we're returning
        const { meta: {touched, error} } = field; // destructuring to access properties on nested objects for refactor
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <textarea
                    className="form-control"
                    type="textarea"
                    rows="2" 
                    placeholder={field.placeholder}
                    {...field.input}
                />
                {touched && error ? <div className="m-form__error">{error}</div> : ''}              
            </div>
        );
    }

export default RenderArea;
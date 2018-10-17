import React from 'react';

const RenderRadio = (field) => { // param field contain some event handlers to wire up to the .jsx that we're returning
        const { meta: {touched, error} } = field; // destructuring to access properties on nested objects for refactor
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(
                <input
                    className={field.className}
                    id={field.id}
                    type="checkbox"
                    {...field.input}
                />
        );
    }

export default RenderRadio;
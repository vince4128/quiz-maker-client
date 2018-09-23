import React from 'react';

const RenderSelectField = (field) => {        
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

    return(           
        <div className={className}>
            <label>{field.label}</label>
            <select
                className="form-control"
                type="select"
                {...field.input}>                    
                {field.children}
            </select>
            {touched ? error : ''}
        </div>
    )
}

export default RenderSelectField;
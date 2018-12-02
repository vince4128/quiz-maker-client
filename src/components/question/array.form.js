import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderProposals = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Ajouter une proposition
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((proposal, index) => (
      <li key={index}>
        <button
          type="button"
          title="Effacer la propostion"
          onClick={() => fields.remove(index)}
        >
        Supprimer la question
        </button>
        <h4>Proposal #{index + 1}</h4>
        <Field
          name={`${proposal}.statement`}
          type="text"
          component={renderField}
          label="Proposition"
        />
        <div>
        <label>Value</label>
            <div>
            <label>
                <Field
                name={`${proposal}.value`}
                component="input"
                type="radio"
                value="true"
                />{' '}
                Vrai
            </label>
            <label>
                <Field
                name="sex"
                component="input"
                type="radio"
                value="false"
                />{' '}
                False
            </label>
            </div>
        </div>        
        {/*<FieldArray name={`${proposal}.hobbies`} component={renderHobbies} />*/}
      </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="statement"
        type="text"
        component={renderField}
        label="enonce"
      />
      <FieldArray name="proposal" component={renderProposals} />
      <Field
        label="FeedBack ok"
        name="feedback.good"
        placeholder="Feecback ok"  
        component={renderField}                   
        />
        <Field
        label="FeedBack ko"
        name="feedback.bad"
        placeholder="Feecback ko"  
        component={renderField}                   
        />
      <div className="btns">
        <button type="submit" /*disabled={submitting}*/>
          Submit
        </button>
        <button type="button" /*disabled={pristine || submitting}*/ onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate
})(FieldArraysForm)
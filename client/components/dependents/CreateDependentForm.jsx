import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateDependentForm extends React.Component {
  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map(function(error, index) {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { handleSubmit, dependents } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Add a new dependent</label>
            <div>
              <Field name="name" component="input" type="text" placeholder="name"/>
            </div>
          </div>
          <div>
            <label>Human or Pet?</label>
            <Field ref="Human" name="human" component="select">
              <option value="">[Select]</option>
              <option value="true">Human</option>
              <option value="false">Pet</option>
            </Field>
          </div>
          <div className='message-container' data-dependent-id='create-dependent-error'>
            { dependents.errors ? renderErrors(dependents.errors) : null }
          </div>
          <div> 
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateDependentForm'
})(CreateDependentForm)

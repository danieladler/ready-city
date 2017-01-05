import React from 'react'
import { Field, reduxForm } from 'redux-form'

class createDependentForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
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
              <option value="true">Human</option>
              <option value="false">Pet</option>
            </Field>
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
  form: 'createDependentForm'
})(createDependentForm)

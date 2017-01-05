import React from 'react'
import { Field, reduxForm } from 'redux-form'

class AddDependentForm extends React.Component {
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'addDependentForm'
})(AddDependentForm)

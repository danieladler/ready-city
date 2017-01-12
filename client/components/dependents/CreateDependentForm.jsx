import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateDependentForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const human = this.refs.Human.value;
    const params = {
      authenticity_token,
      name,
      human
    }
    this.props.createDependent(params);
  }

  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="form form-create-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label>Add a new dependent</label>
            <div>
              <Field ref="Name" name="name" component="input" type="text" placeholder="name"/>
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

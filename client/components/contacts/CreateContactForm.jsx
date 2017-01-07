import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateContactForm extends React.Component {
  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map(function(error, index) {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { handleSubmit, contacts } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label>Add a new contact</label>
            <div>
              <label>Name</label>
              <Field name="name" component="input" type="text" placeholder="name" />
            </div>
            <div>
              <label>e-mail</label>
              <Field name="email" component="input" type="text" placeholder="e-mail"/>
            </div>
            <div>
              <label>Phone number</label>
              <Field name="phone" component="input" type="text" placeholder="phone"/>
            </div>
          </div>
          <div>
            <label>In your local area or out of area?</label>
            <Field ref="OutOfArea" name="out_of_area" component="select">
              <option value="">[Select]</option>
              <option value="true">Local</option>
              <option value="false">Out of area</option>
            </Field>
          </div>
          <div className='message-container' data-contact-id='create-contact-error'>
            { contacts.errors ? renderErrors(contacts.errors) : null }
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
  form: 'CreateContactForm'
})(CreateContactForm)

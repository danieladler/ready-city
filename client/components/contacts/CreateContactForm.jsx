import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateContactForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const email = this.refs.Email.value;
    const phone = this.refs.Phone.value;
    const out_of_area = this.refs.OutOfArea.value;
    const params = {
      authenticity_token,
      name,
      email,
      phone,
      out_of_area
    }
    this.props.createContact(params);
  }

  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { contacts } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div>
        <form onSubmit={this.handleFormSubmit} >
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label>Add a new contact</label>
            <div>
              <label>Name</label>
              <Field ref="Name" name="name" component="input" type="text" placeholder="name" />
            </div>
            <div>
              <label>e-mail</label>
              <Field ref="Email" name="email" component="input" type="text" placeholder="e-mail"/>
            </div>
            <div>
              <label>Phone number</label>
              <Field ref="Phone" name="phone" component="input" type="text" placeholder="phone"/>
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

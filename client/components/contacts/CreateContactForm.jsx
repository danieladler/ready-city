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
    const userId = this.props.params.userId;
    const params = {
      authenticity_token,
      name,
      email,
      phone,
      out_of_area
    }
    this.props.createContact(params, userId);
  }

  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
      });
      return(mapped);
    }

    const { contacts } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div className="wrapper-create-form">
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-create-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <h3 className="title title-form">Add a new contact</h3>
            <div className="form-group">
              <label className="label-assessment-form">Name</label>
              <Field ref="Name" name="name" component="input" type="text" className="input-assessment-form"/>
            </div>
            <div className="form-group">
              <label className="label-assessment-form">e-mail</label>
              <Field ref="Email" name="email" component="input" type="text" className="input-assessment-form"/>
            </div>
            <div className="form-group">
              <label className="label-assessment-form">Phone number</label>
              <Field ref="Phone" name="phone" component="input" type="text" className="input-assessment-form"/>
            </div>
            <div className="form-group">
              <label className="label-assessment-form">In your local area or out of area?</label>
              <Field ref="OutOfArea" name="out_of_area" component="select">
                <option value="">[Select]</option>
                <option value="true">Local</option>
                <option value="false">Out of area</option>
              </Field>
            </div>
          <div className='alert-container' data-contact-id='create-contact-error'>
            { contacts.errors ? renderErrors(contacts.errors) : null }
          </div>
          <div>
            <button type="submit" className="button button-form button-submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateContactForm'
})(CreateContactForm)

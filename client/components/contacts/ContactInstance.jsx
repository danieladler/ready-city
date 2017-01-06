import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/ContactAssessmentActionCreators.jsx';

class ContactForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.refs.Name.value;
    const email = this.refs.Email.value;
    const phone = this.refs.Phone.value;
    const out_of_area = this.refs.OutOfArea.value;
    const {contact, index} = this.props;
    const id = contact.id;
    const params = {
      name,
      email,
      phone,
      out_of_area
    }
    console.log(id, params, index);
    // this.props.updateContact(id, params, index);
  }

  render() {
    const renderField = ({ input, label, type }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type}/>
        </div>
      </div>
    )

    const renderErrors = (errors) => {
      const mapped = errors.map(function(error, index) {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      console.log("Contact success messages to be implemented in a future branch");
    }

    const { contact, handleSubmit } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <Field ref="Name" name="name" type="text" component={renderField} label="Name"/>
            {contact.name}
          </div>
          <div>
            <Field ref="Email" name="email" type="text" component={renderField} label="Email"/>
            {contact.email}
          </div>
          <div>
            <Field ref="Phone" name="phone" type="text" component={renderField} label="Phone"/>
            {contact.phone}
          </div>
          <div>
            <label>In your local area or out of area?</label>
            <Field ref="OutOfArea" name="out_of_area" component="select">
              <option value="false">Local</option>
              <option value="true">Out of area</option>
            </Field>
          </div>
          <div className='message-container' data-contact-id={contact.id}>
            { contact.errors ? renderErrors(contact.errors) : null }
            { contact.success ? renderSuccess(contact.success, contact.id) : null }
          </div>
          <button action="submit">Save changes</button>
        </form>
        <br/>
        <br/>
    </div>
    )
  }
}

const ContactReduxForm = reduxForm()(ContactForm);

const ConnectedContactInstance = connect((state, props) => {
  return {
    initialValues: props.contact,
    index: props.index,
    form: `contact-${props.index}`,
    enableReinitialize: true
  };
})(ContactReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const ContactInstance = connect(null, mapDispatchToProps)(ConnectedContactInstance);

export default ContactInstance;

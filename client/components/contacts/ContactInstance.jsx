import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/ContactAssessmentActionCreators.jsx';

class ContactForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDestroyContact = this.handleDestroyContact.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const email = this.refs.Email.value;
    const phone = this.refs.Phone.value;
    const out_of_area = this.refs.OutOfArea.value;
    const {contact, index} = this.props;
    const id = contact.id;
    const userId = contact.user_id;
    const params = {
      authenticity_token,
      name,
      email,
      phone,
      out_of_area
    }
    this.props.updateContact(id, params, index, userId);
  }

  handleDestroyContact(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const {contact, index} = this.props;
    const id = contact.id
    const userId = contact.userId;
    this.props.destroyContact(authenticity_token, id, index, userId);
  }

  render() {
    const renderField = ({ input, label, type }) => (
      <div className="form-group">
        <label className="label-assessment-form">{label}</label>
        <input className="input-assessment-form" {...input} placeholder={label} type={type}/>
      </div>
    )

    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      console.log("Contact success messages to be implemented in a future branch");
    }

    const { contact } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-update-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <Field ref="Name" name="name" type="text"   component={renderField} label="Name"/>
          <Field ref="Email" name="email" type="text" component={renderField} label="Email"/>
          <Field ref="Phone" name="phone" type="text" component={renderField} label="Phone"/>
          <div className="form-group">
            <label className="label-assessment-form">In your local area or out of area?</label>
            <Field ref="OutOfArea" name="out_of_area" component="select">
              <option value="false">Local</option>
              <option value="true">Out of area</option>
            </Field>
          </div>
          <div className='alert-container' data-contact-id={contact.id}>
            { contact.errors ? renderErrors(contact.errors) : null }
            { contact.success ? renderSuccess(contact.success, contact.id) : null }
          </div>
          <button action="submit" className="button button-form button-submit">Save changes</button>
        </form>
        <button onClick={this.handleDestroyContact} className="button button-form button-delete"> Delete </button>
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

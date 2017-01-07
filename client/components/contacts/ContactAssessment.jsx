import React, { PropTypes } from 'react';
import ContactInstance from './ContactInstance.jsx';
import CreateContactForm from './CreateContactForm.jsx';

class ContactAssessment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    this.props.createContact(params);
  }

  render() {
    var contacts = this.props.contacts.all.map(function(contact, index) {
      return (
        <div key={index}>
          <ContactInstance
            index={index}
            contact={contact} />
        </div>
      )
    })

    return (
      <div id="contact-assessment-wrapper">
        <h2> Contacts: </h2>
        { contacts }
        <CreateContactForm {...this.props} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default ContactAssessment;

import React, { PropTypes } from 'react';
import ContactInstance from './ContactInstance.jsx';
import CreateContactForm from './CreateContactForm.jsx';

class ContactAssessment extends React.Component {
  render() {
    var contacts = this.props.contacts.all.map((contact, index) => {
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
        <CreateContactForm {...this.props} />
      </div>
    )
  }
}

export default ContactAssessment;

import React, { PropTypes } from 'react';
import ContactInstance from './ContactInstance.jsx';
import CreateContactForm from './CreateContactForm.jsx';

class ContactAssessment extends React.Component {
  render() {
    var contacts = this.props.contacts.all.map((contact, index) => {
      return (
        <div key={index} className="wrapper-instance">
          <ContactInstance
            index={index}
            contact={contact} />
        </div>
      )
    })

    return (
      <div className="wrapper-assessment">
        <h2 className="title title-assessment"> Contacts: </h2>
        { contacts }
        <CreateContactForm {...this.props} />
      </div>
    )
  }
}

export default ContactAssessment;

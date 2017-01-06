import React, { PropTypes } from 'react';

class ContactInstance extends React.Component {
    render() {
      return(
        <div>
          <h2> ContactInstance visible </h2>
          <h2> { this.props.contact.name } </h2>
        </div>
      )
    }
}

export default ContactInstance;

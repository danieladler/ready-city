var ContactAssessment = React.createClass({
  render: function() {
    var _this = this
    contacts = this.props.contacts.map(function(contact) {
      return (
        <ContactInstance
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          out_of_area={contact.out_of_area}
          destroyInstance={_this.props.destroyInstance}
          handleFormSubmit={_this.props.handleFormSubmit}
        />
      );
    });
    return (
      <div>
        <h2> Contacts: </h2>
        <div>
          { contacts }
        </div>
        <h3> Add a Contact </h3>
        <ContactForm handleFormSubmit={this.props.handleFormSubmit}/>
      </div>
    );
  }
});

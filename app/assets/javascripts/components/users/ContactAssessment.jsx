var ContactAssessment = React.createClass({
  render: function() {
    var _this = this
    contacts = this.props.contacts.map(function(contact) {
      return (
        <ContactInstance
          key={contact.id}
          name={contact.name}
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
        <h4> [ contact form ] </h4>
      </div>
    );
  }
});

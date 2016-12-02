var ZoneInstance = React.createClass({
  getInitialState() {
     return {
       dependent_id: this.props.dependent_id,
       name: this.props.name,
       address: this.props.address,
       city: this.props.city,
       state: this.props.state,
       zip: this.props.zip,
       zone_type: this.props.zone_type,
       zone_primary: this.props.zone_primary
     }
  },
  destroyInstance(event) {
    event.preventDefault();
    this.props.destroyInstance('zones', this.props.id);
  },
  handleFormEntry: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    var controllerAction = 'update/' + this.state.id;
    // args must be in this order: route, modelName, model, controllerAction, httpRequest
    this.props.handleFormSubmit('zones', 'zone', this.state, controllerAction, 'PATCH');
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        Name: {this.props.name}
        <button> Update </button>
        <button onClick={this.destroyInstance}>Delete</button>
      </form>
    );
  }
});

var ZoneForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      zone_type: '',
      zone_primary: ''
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit('zones', 'zone', this.state, 'create', 'POST');
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
      
        <button>Submit</button>
      </form>
    );
  }
});

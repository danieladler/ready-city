var ContactForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      email: '',
      phone: '',
      out_of_area: ''
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },
  handleOptionChange: function (changeEvent) {
    this.setState({
      out_of_area: changeEvent.target.value
    });
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit('contacts', 'contact', this.state, 'create', 'POST');
    this.refs.name.value = ''
    this.refs.email.value = ''
    this.refs.phone.value = ''
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Name
            <input ref='name' name='name' placeholder='Name' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            email
            <input ref='email' name='email' placeholder='email@email.com' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            phone
            <input ref='phone' name='phone' placeholder='000-000-0000' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            In your local area or out of area?
            <input ref='out_of_area' name='out_of_area' type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.out_of_area === 'false'}/>
            Local Area
            <input ref='out_of_area' name='out_of_area' type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.out_of_area === 'true'}/>
            Out-of-area
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
});

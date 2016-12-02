var ZoneForm = React.createClass({
  getInitialState: function() {
    return {
      dependent_id: '',
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
  handleZoneTypeSelectChange: function(event) {
    this.setState({
      zone_type: event.target.value
    })
  },
  handleZoneDependentSelectChange: function(event) {
    console.log(event.target.value);
    // this.setState({
    //   dependent_id: event.target.value
    // })
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit('zones', 'zone', this.state, 'create', 'POST');
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div> {this.test} </div>
        <div className="form-group">
          <label>
            Name
            <input ref='name' name='name' placeholder='Name' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            What type of Zone is this?
            <select onChange={this.handleZoneTypeSelectChange}>
              <option value=""          name="zone_type">[select]</option>
              <option value="zone_home" name="zone_type">Home</option>
              <option value="zone_work" name="zone_type">Work</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Who spends time here?
            <select onChange={this.handleZoneDependentSelectChange}>
              <option value="" name="zone_type">[select]</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Address
            <input ref='address' name='address' placeholder='Address' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            City
            <input ref='city' name='city' placeholder='City' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            State
            <input ref='state' name='state' placeholder='State' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Zip
            <input ref='zip' name='zip' placeholder='Zip' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
});

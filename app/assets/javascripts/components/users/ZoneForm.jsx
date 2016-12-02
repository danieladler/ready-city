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
  componentDidMount: function() {
    this.loadDependentsIntoSelect();
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
    var idAsNumber = Number(event.target.value);
    this.setState({
      dependent_id: idAsNumber
    })
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit('zones', 'zone', this.state, 'create', 'POST');
  },
  loadDependentsIntoSelect: function() {
    $('.select-zone-dependent').append(this.props.dependentsForZoneAsmt);
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
            <select onChange={this.handleZoneDependentSelectChange} className="select-zone-dependent">
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

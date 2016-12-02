var ZoneInstance = React.createClass({
  getInitialState() {
     return {
       id: this.props.id,
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
  componentDidMount: function() {
    this.loadDependentsIntoSelect();
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
    var controllerAction = 'update/' + this.state.id;
    // // args must be in this order: route, modelName, model, controllerAction, httpRequest
    this.props.handleFormSubmit('zones', 'zone', this.state, controllerAction, 'PATCH');
  },
  loadDependentsIntoSelect: function() {
    var optionsAsString = "",
        arr = this.props.dependentsForZoneAsmt;
    for (var i=0; i< arr.length; i++) {
      optionsAsString +=" <option value='" + (arr[i].id) + "'>" + (arr[i].name) + "</option>";
    }
    $('.select-zone-dependent').append(optionsAsString);
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Name
            <input ref='name' name='name' defaultValue={this.props.name} onChange={this.handleFormEntry}/>
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
            <input ref='address' name='address' defaultValue={this.props.address} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            City
            <input ref='city' name='city' defaultValue={this.props.city} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            State
            <input ref='state' name='state' defaultValue={this.props.state} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Zip
            <input ref='zip' name='zip' defaultValue={this.props.zip} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <button> Update </button>
        <button onClick={this.destroyInstance}>Delete</button>
      </form>
    );
  }
});

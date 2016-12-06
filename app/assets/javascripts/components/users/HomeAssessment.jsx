var HomeAssessment = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.home.id,
      address: this.props.home.address,
      city: this.props.home.city,
      state: this.props.home.state,
      zip: this.props.home.zip,
      is_house: this.props.home.is_house,
      floor_count: this.props.home.floor_count,
      year_built: this.props.home.year_built
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },
  handleOptionChange: function(event) {
    this.setState({
      is_house: event.target.value
    });
  },
  handleSelectChange: function(event) {
    var countAsNumber = Number(event.target.value);
    this.setState({
      floor_count: countAsNumber
    })
  },
  handleFormSubmit: function(event) {
    event.preventDefault();
    var controllerAction = 'update/' + this.state.id;
    // args must be in this order: route, modelName, model, controllerAction, httpRequest
    this.props.handleFormSubmit('homes', 'home', this.state, controllerAction, 'PATCH');
    console.log("submitted");
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2> My Home: </h2>
        <div className="form-group">
          <label>
            Address
            <input ref='address' name='address' defaultValue={this.state.address} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            City
            <input ref='city' name='city' defaultValue={this.state.city} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            State
            <input ref='state' name='state' defaultValue={this.state.state} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Zip
            <input ref='zip' name='zip' defaultValue={this.state.zip} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            House or Apartment?
            <input type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.is_house === true}/>
            House
            <input type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.is_house === false}/>
            Apartment
          </label>
        </div>
        <div className="form-group">
          <label>
            Number of floors:
            <select onChange={this.handleSelectChange} value={this.state.floor_count}>
              <option value="1" name="floor_count">1</option>
              <option value="2" name="floor_count">2</option>
              <option value="3" name="floor_count">3</option>
              <option value="4" name="floor_count">4</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Year Built
            <input ref='year_built' name='year_built' defaultValue={this.state.year_built} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <button> Update </button>
      </form>
    );
  }
});

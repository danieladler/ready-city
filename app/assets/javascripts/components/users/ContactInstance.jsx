var ContactInstance = React.createClass({
  getInitialState() {
     return {
       id: this.props.id,
       name: this.props.name,
       email: this.props.email,
       phone: this.props.phone,
       out_of_area: this.props.out_of_area
     }
  },
  destroyInstance(event) {
    event.preventDefault();
    this.props.destroyInstance('contacts', this.props.id);
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
    this.props.handleFormSubmit('contacts', 'contact', this.state, controllerAction, 'PATCH');
  },
  handleOptionChange: function(changeEvent) {
      this.setState({
        out_of_area: changeEvent.target.value
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Name
            <input name='name' defaultValue={this.props.name} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone
            <input name='phone' defaultValue={this.props.phone} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            email
            <input name='email' defaultValue={this.props.email} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            In your local area or out of area?
            <input ref='out_of_area' type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.out_of_area === false}/>
            Local
            <input ref='out_of_area' type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.out_of_area === true}/>
            Out-of-area
          </label>
        </div>
        <button> Update </button>
        <button onClick={this.destroyInstance}>Delete</button>
      </form>
    );
  }
});

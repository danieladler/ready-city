var DependentInstance = React.createClass({
  getInitialState() {
     return {
       dependent: this.props.dependent,
       name: this.props.dependent.name,
       human: this.props.dependent.human
     }
  },
  destroyInstance(event) {
    event.preventDefault();
    this.props.destroyInstance(this.state.dependent);
  },
  handleFormEntry: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleUpdateForm(this.state);
  },
  handleOptionChange: function(changeEvent) {
    this.setState({
      human: changeEvent.target.value
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Name
            <input defaultValue={this.props.dependent.name} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Human or Pet?
            <input ref='human' type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.human === true}/>
            Human
            <input ref='human' type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.human === false}/>
            Pet
          </label>
        </div>
        <button> Update </button>
        <button onClick={this.destroyInstance}>Delete</button>
      </form>
    );
  }
});

var DependentInstance = React.createClass({
  getInitialState() {
     return {
       dependent: this.props.dependent,
       name: this.props.dependent.name
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
    this.props.handleUpdateForm(this.state.name);
  },
  render: function() {
    return (
      <div>
        <ul>
          <li>Name:  {this.props.dependent.name}</li>
          <li>Human: {String(this.props.dependent.human)}</li>
          <li><a href="" onClick={this.destroyInstance}>Delete</a></li>
        </ul>

      <form onSubmit={this.handleFormSubmit}>
        <label>
          Name
          <input defaultValue={this.props.dependent.name} onChange={this.handleFormEntry}/>
        </label>
        <button> Update </button>
      </form>
      </div>
    );
  }
});

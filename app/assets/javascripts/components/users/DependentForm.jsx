var DependentForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      human: ''
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  handleOptionChange: function (changeEvent) {
    this.setState({
      human: changeEvent.target.value
    });
  },
  handleFormSubmit: function (formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit(this.state);
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Name
            <input ref='name' placeholder='Name' onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Human or Pet?
            <input ref='human' type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.human === 'true'}/>
            Human
            <input ref='human' type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.human === 'false'}/>
            Pet
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
});

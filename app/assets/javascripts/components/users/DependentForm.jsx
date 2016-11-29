var DependentForm = React.createClass({
  getInitialState: function() {
    return {
      dependentName: '',
      dependentHuman: ''
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      dependentName: event.target.value
    });
  },
  handleOptionChange: function (changeEvent) {
    this.setState({
      dependentHuman: changeEvent.target.value
    });
  },
  handleFormSubmit: function (formSubmitEvent) {
    formSubmitEvent.preventDefault();
    console.log(this.state);;
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
            <input ref='human' type="radio" value="true" onChange={this.handleOptionChange} checked={this.state.dependentHuman === 'true'}/>
            Human
            <input ref='human' type="radio" value="false" onChange={this.handleOptionChange} checked={this.state.dependentHuman === 'false'}/>
            Pet
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
});

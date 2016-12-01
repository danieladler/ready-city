var UserProfileForm = React.createClass({
  getInitialState: function() {
    return {
      username: this.props.user.username,
      email: this.props.user.email,
      days_to_cover: this.props.user.days_to_cover
    }
  },
  handleFormEntry: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },
  handleFormSubmit: function(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.props.handleFormSubmit(this.state);
  },
  render: function() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Username
            <input name="username" onChange={this.handleFormEntry} defaultValue={this.props.user.username}/>
          </label>
        </div>
        <button>Update</button>
      </form>
    );
  }
});

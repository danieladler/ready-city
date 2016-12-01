var UserProfileForm = React.createClass({
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
        <div className="form-group">
          <label>
            e-mail
            <input name="email" onChange={this.handleFormEntry} defaultValue={this.props.user.email}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Days to cover
            <input name="days_to_cover" onChange={this.handleFormEntry} defaultValue={this.props.user.days_to_cover}/>
          </label>
        </div>
        <button>Update</button>
      </form>
    );
  }
});

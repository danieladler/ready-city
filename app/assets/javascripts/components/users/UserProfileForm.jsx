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
            <input name="username" defaultValue={this.props.user.username} onChange={this.handleFormEntry} />
          </label>
        </div>
        <div className="form-group">
          <label>
            e-mail
            <input name="email" defaultValue={this.props.user.email} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Days to cover
            <input name="days_to_cover" defaultValue={this.props.user.days_to_cover} onChange={this.handleFormEntry}/>
          </label>
        </div>
        <button>Update</button>
      </form>
    );
  }
});

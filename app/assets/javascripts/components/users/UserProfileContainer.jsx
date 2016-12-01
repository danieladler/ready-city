var UserProfileContainer = React.createClass({
  getInitialState: function() {
    return {
      user: []
    }
  },
  componentDidMount: function() {
    $.get('/user', (response) => { this.setState({ user: response }) });
  },
  handleFormSubmit: function(updatedState) {
    var rootComponent = this;
    console.log(updatedState);
  },
  render: function() {
    return(
      <UserProfileForm user={this.state.user} handleFormSubmit={this.handleFormSubmit}/>
    );
  }
});

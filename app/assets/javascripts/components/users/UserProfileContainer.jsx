var UserProfileContainer = React.createClass({
  getInitialState: function() {
    return {
      user: []
    }
  },
  componentDidMount: function() {
    $.get('/user', (response) => { this.setState({ user: response }) });
  },
  handleFormSubmit: function(user) {
    var rootComponent = this;
    $.ajax({
      url: '/users/' + this.state.user.id + '/update',
      type: 'PATCH',
      data: {user: user},
      success: function(data){
        rootComponent.componentDidMount();
      }
    });
  },
  render: function() {
    return(
      <div>
        <h2> Profile </h2>
        <UserProfileForm user={this.state.user} handleFormSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
});

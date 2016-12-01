var UserProfileContainer = React.createClass({
  getInitialState: function() {
    return {
      user: []
    }
  },
  componentDidMount: function() {
    $.get('/user', (response) => { this.setState({ user: response }) });
  },
  render: function() {
    return(
      <div>
        <h1> Profile Container </h1>
      </div>
    );
  }
});

var HomeAssessment = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    return (
      <div>
        <h2> My home: </h2>
        <h3> Address: {this.props.home.address} </h3>
      </div>
    );
  }
});

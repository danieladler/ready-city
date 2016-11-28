var HomeAssessment = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    return (
      <div>
        <h1> HomeAssessment Visible! </h1>
        <h2> Data: {this.props.home.address} </h2>
      </div>
    );
  }
});

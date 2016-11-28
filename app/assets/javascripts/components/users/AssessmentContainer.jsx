var AssessmentContainer = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    return (
      <div>
        <h1> AssessmentContainer visible! </h1>
        <HomeAssessment home={this.props.home}/>
      </div>
    );
  }
});

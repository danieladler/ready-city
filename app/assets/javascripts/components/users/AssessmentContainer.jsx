var AssessmentContainer = React.createClass({
  getInitialState: function() {
    return {
      dependents: []
    }
  },
  componentDidMount: function() {
    $.get('/dependents', (response) => { this.setState({ dependents: response }) });
  },
  render: function() {
    return (
      <div>
        <h1> AssessmentContainer visible! </h1>
        <DependentAssessment dependents = {this.state.dependents}/>
      </div>
    );
  }
});

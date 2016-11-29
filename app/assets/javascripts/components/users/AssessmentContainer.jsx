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
        <DependentAssessment dependents={this.state.dependents} />
      </div>
    );
  }
});

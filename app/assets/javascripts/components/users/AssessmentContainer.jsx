var AssessmentContainer = React.createClass({
  getInitialState: function() {
    return {
      dependents: []
    }
  },
  componentDidMount: function() {
    $.get('/dependents', (response) => { this.setState({ dependents: response }) });
  },
  handleFormSubmit: function(dependent) {
    var rootComponent = this;
    $.ajax({
      url: '/dependents/create',
      type: 'POST',
      data: {dependent: dependent},
      success: function(data){
        rootComponent.componentDidMount();
      }
    });
  },
  render: function() {
    return (
      <div>
        <DependentAssessment dependents={this.state.dependents} handleFormSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
});

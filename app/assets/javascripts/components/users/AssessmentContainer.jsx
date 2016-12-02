var AssessmentContainer = React.createClass({
  getInitialState: function() {
    return {
      dependents: [],
      contacts: []
    }
  },
  componentDidMount: function() {
    $.get('/dependents', (response) => { this.setState({ dependents: response }) });
    $.get('/contacts', (response) => { this.setState({ contacts: response }) });
  },
  handleFormSubmit: function(dependent, controllerAction, httpRequest) {
    var rootComponent = this;
    $.ajax({
      url: '/dependents/' + controllerAction,
      type: httpRequest,
      data: {dependent: dependent},
      success: function(data){
        rootComponent.componentDidMount();
      }
    });
  },
  destroyInstance: function(dependent) {
    var rootComponent = this;
    $.ajax({
      url: '/dependents/destroy/' + dependent.id,
      type: 'DELETE',
      success: function(response) {
        rootComponent.componentDidMount();
      }
    })
  },
  render: function() {
    return (
      <div>
        <DependentAssessment
          dependents={this.state.dependents}
          handleFormSubmit={this.handleFormSubmit}
          handleFormSubmit={this.handleFormSubmit}
          destroyInstance={this.destroyInstance}
        />
        <ContactAssessment
          contacts={this.state.contacts}
        />
      </div>
    );
  }
});

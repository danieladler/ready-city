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
  handleFormSubmit: function(route, modelName, model, controllerAction, httpRequest) {
    var rootComponent = this;
    var dataValues = {};
    dataValues[modelName] = model;
    $.ajax({
      url: '/' + route + '/' + controllerAction,
      type: httpRequest,
      data: dataValues,
      success: function(data){
        rootComponent.componentDidMount();
      }
    });
  },
  destroyInstance: function(route, id) {
    var rootComponent = this;
    $.ajax({
      url: '/' + route + '/destroy/' + id,
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
          destroyInstance={this.destroyInstance}
        />
        <ContactAssessment
          contacts={this.state.contacts}
          handleFormSubmit={this.handleFormSubmit}
          destroyInstance={this.destroyInstance}
        />
      </div>
    );
  }
});

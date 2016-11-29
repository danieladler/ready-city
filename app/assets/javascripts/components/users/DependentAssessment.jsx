var DependentAssessment = React.createClass({
  render: function() {
    dependents = this.props.dependents.map(function(dependent) {
      return (
        <DependentInstance dependent={dependent} key={dependent.id} name={dependent.name} human={dependent.human} />
      );
    });
    return (
      <div>
        <h3> Dependents: </h3>
        <div>
          { dependents }
        </div>
        <h3> Add a Dependent </h3>
        <DependentForm handleFormSubmit={this.props.handleFormSubmit}/>
      </div>
    );
  }
});

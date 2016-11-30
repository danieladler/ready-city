var DependentAssessment = React.createClass({
  render: function() {
    var _this = this
    dependents = this.props.dependents.map(function(dependent) {
      return (
        <DependentInstance
          dependent={dependent}
          key={dependent.id}
          name={dependent.name}
          human={dependent.human}
          destroyInstance={_this.props.destroyInstance}
        />
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

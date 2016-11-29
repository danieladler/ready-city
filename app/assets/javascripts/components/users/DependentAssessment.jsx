var DependentAssessment = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    dependents = this.props.dependents.map( function(dependent) {
      return (
        <div>
          <DependentInstance dependent={dependent} key={dependent.id} name={dependent.name} human={dependent.human}/>
        </div>
       );
     });
    return (
      <div>
        <h3> Dependents: </h3>
        <div>
          { dependents }
        </div>
        <h3> Add a Dependent </h3>
        <DependentForm />
      </div>
    );
  }
});

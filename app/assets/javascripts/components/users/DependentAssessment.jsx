var DependentAssessment = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    dependents = this.props.dependents.map( function(dependent) {
      return (
        <DependentInstance dependent={dependent} key={dependent.id} name={dependent.name} human={dependent.human}/>
       );
     });
    return (
      <div>
        <h2> Dependents: </h2>
        <div>
          { dependents }
        </div>
      </div>
    );
  }
});

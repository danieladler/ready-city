var DependentAssessment = React.createClass({
  // getInitialState: function() {
  //   return {}
  // },
  render: function() {
    dependents = this.props.dependents.map( function(dependent) {
      return (
         <li key={dependent.id}>
           {dependent.name}
         </li>
       );
     });
    return (
      <div>
        <h2> Dependents: </h2>
        <ul>
          { dependents }
        </ul>
      </div>
    );
  }
});

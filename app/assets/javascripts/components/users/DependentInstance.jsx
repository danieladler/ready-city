var DependentInstance = React.createClass({
  getInitialState() {
     return {
       dependent: this.props.dependent
     }
  },
  render: function() {
    return (
      <ul>
        <li>Name:  {this.props.dependent.name}</li>
        <li>Human: {String(this.props.dependent.human)}</li>
      </ul>
    );
  }
});

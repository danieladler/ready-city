var DependentInstance = React.createClass({
  getInitialState() {
     return {
       dependent: this.props.dependent
     }
  },
  destroyInstance(event) {
    event.preventDefault();
    this.props.destroyInstance(this.state.dependent);
  },
  render: function() {
    return (
      <ul>
        <li>Name:  {this.props.dependent.name}</li>
        <li>Human: {String(this.props.dependent.human)}</li>
        <li><a href="" onClick={this.destroyInstance}>Delete</a></li>
      </ul>
    );
  }
});

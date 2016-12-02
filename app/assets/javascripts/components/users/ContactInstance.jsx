var ContactInstance = React.createClass({
  getInitialState() {
     return {
       id: this.props.key,
       name: this.props.name
     }
  },
  render: function() {
    return (
      <div>
        <h3> Name: {this.props.name} </h3>
      </div>
    );
  }
});

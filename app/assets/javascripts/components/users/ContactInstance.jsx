var ContactInstance = React.createClass({
  getInitialState() {
     return {
       name: this.props.name
     }
  },
  destroyInstance(event) {
    event.preventDefault();
    this.props.destroyInstance('contacts', this.props.id);
  },
  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3> Contact: {this.props.name} </h3>
          <button> Update </button>
          <button onClick={this.destroyInstance}>Delete</button>
      </form>
    );
  }
});

import React, { PropTypes } from 'react';

class HomeAssessment extends React.Component {
  handleTestSubmit() {
    const testString = "testing";
    this.props.loadHome(testString);
  }
  render() {
    return (
      <div>
        <h1> Home Assessment visible! </h1>
        <button onClick={this.handleTestSubmit.bind(this)}> Test ActionCreator </button>
      </div>
    )
  }
}

export default HomeAssessment;

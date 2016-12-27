import React, { PropTypes } from 'react';

class HomeAssessment extends React.Component {
  handleTestSubmit() {
    this.props.loadHome();
  }
  render() {
    const { home } = this.props
    return (
      <div>
        <h1> Home Assessment visible! </h1>
        <button onClick={this.handleTestSubmit.bind(this)}> Load Home </button>
        <h2> TestAddress: </h2>
      </div>
    )
  }
}

export default HomeAssessment;

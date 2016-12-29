import React, { PropTypes } from 'react';

class HomeAssessment extends React.Component {
  render() {
    const home = this.props.homes.home;
    return (
      <div>
        <h1> Home Assessment visible! </h1>
        <h4> { home.city } </h4>
    </div>
    )
  }
}

export default HomeAssessment;

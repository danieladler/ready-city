import React, { PropTypes } from 'react';
import HomeInstance from './HomeInstance.jsx';

class HomeAssessment extends React.Component {
  render() {
    const homes = this.props.homes.all.map((home, index) => {
      return (
        <div key={index} className="wrapper-assessment-instance">
          <HomeInstance
            index={index}
            home={home} />
        </div>
      )
    })

    return (
      <div className="wrapper-assessment">
        <h2 className="title title-assessment"> Home </h2>
        { homes }
      </div>
    )
  }
}

export default HomeAssessment;

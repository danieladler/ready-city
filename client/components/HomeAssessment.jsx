import React, { PropTypes } from 'react';
import HomeInstance from './HomeInstance.jsx';

class HomeAssessment extends React.Component {
  render() {
    var _this = this,
        homes = this.props.homes.all.map(function(home, index) {
          return (
            <div key={index}>
              <HomeInstance
                index={index}
                home={home} />
            </div>
          )
        })
    return (
      <div>
        <h2> Here are all the homes: </h2>
        { homes }
      </div>
    )
  }
}

export default HomeAssessment;

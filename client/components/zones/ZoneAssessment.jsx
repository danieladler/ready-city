import React, { PropTypes } from 'react';
import ZoneInstance from './ZoneInstance.jsx';

class ZoneAssessment extends React.Component {
  render() {
    var zones = this.props.zones.all.map(function(zone, index) {
      return (
        <div key={index}>
          <ZoneInstance
            index={index}
            zone={zone} />
        </div>
      )
    }
  )
  return (
    <div id="zone-assessment-wrapper">
      <h2> Zones: </h2>
      { zones }
    </div>
  )}
}

export default ZoneAssessment;

import React, { PropTypes } from 'react';
import ZoneInstance from './ZoneInstance.jsx';
import CreateZoneForm from './CreateZoneForm.jsx';

class ZoneAssessment extends React.Component {
  render() {
    var zones = this.props.zones.all.map((zone, index) => {
      return (
        <div key={index} className="wrapper-assessment-instance">
          <ZoneInstance
            index={index}
            zone={zone} />
        </div>
      )
    })

    return (
      <div className="wrapper-assessment">
        <h2 className="title title-assessment"> Zones </h2>
        { zones }
        <CreateZoneForm {...this.props} />
      </div>
    )
  }
}

export default ZoneAssessment;

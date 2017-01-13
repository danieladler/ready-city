import React, { PropTypes } from 'react';
import ZoneInstance from './ZoneInstance.jsx';
import CreateZoneForm from './CreateZoneForm.jsx';

class ZoneAssessment extends React.Component {
  render() {
    var zones = this.props.zones.all.map((zone, index) => {
      return (
        <div key={index} className="wrapper-instance">
          <ZoneInstance
            index={index}
            zone={zone} />
        </div>
      )
    })

    return (
      <div className="wrapper-assessment">
        <h2> Zones: </h2>
        { zones }
        <CreateZoneForm {...this.props} />
      </div>
    )
  }
}

export default ZoneAssessment;

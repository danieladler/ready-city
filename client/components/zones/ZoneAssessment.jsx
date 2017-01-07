import React, { PropTypes } from 'react';
import ZoneInstance from './ZoneInstance.jsx';
import CreateZoneForm from './CreateZoneForm.jsx';

class ZoneAssessment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    console.log(params);
    debugger
    // this.props.createContact(params);
  }

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
      <CreateZoneForm {...this.props} onSubmit={this.handleSubmit} />
    </div>
  )}
}

export default ZoneAssessment;

import React, { PropTypes } from 'react';

class ZoneInstance extends React.Component {
  render() {
    return(
      <div>
        <h1> ZoneInstance visible </h1>
        <h2> { this.props.zone.name } </h2>
      </div>
    )
  }
}

export default ZoneInstance;

import React, { PropTypes } from 'react';
import DependentInstance from './DependentInstance.jsx';

class DependentAssessment extends React.Component {
  render() {
    return (
      <div>
        <h1> DependentAssessment visible </h1>
        <DependentInstance />
      </div>
    )
  }
}

export default DependentAssessment;

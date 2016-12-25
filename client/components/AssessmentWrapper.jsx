import React  from 'react';
import HomeAssessment from './HomeAssessment.jsx';

class AssessmentWrapper extends React.Component {
  render() {
    return (
      <div>
        <HomeAssessment {...this.props} />
      </div>
    );
  }
}

export default AssessmentWrapper;

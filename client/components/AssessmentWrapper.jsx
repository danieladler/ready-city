import React from 'react';
import { connect } from 'react-redux';
import HomeAssessment from './HomeAssessment.jsx';
import DependentAssessment from './DependentAssessment.jsx';

class AssessmentWrapper extends React.Component {
  componentDidMount() {
    this.props.loadHomes();
    this.props.loadDependents();
  }

  render() {
    return (
      <div>
        <HomeAssessment {...this.props} />
        <DependentAssessment {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents
});

export default connect(mapStateToProps, null)(AssessmentWrapper);

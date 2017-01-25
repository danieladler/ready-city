import React from 'react';
import { connect } from 'react-redux';
import HomeAssessment from './homes/HomeAssessment.jsx';
import DependentAssessment from './dependents/DependentAssessment.jsx';
import ContactAssessment from './contacts/ContactAssessment.jsx';
import ZoneAssessment from './zones/ZoneAssessment.jsx';

class AssessmentWrapper extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title title-page"> My Profile </h1>
        <HomeAssessment {...this.props} />
        <DependentAssessment {...this.props} />
        <ContactAssessment {...this.props} />
        <ZoneAssessment {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents,
  contacts: state.contacts,
  zones: state.zones
});

export default connect(mapStateToProps, null)(AssessmentWrapper);

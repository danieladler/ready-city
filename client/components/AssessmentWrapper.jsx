import React from 'react';
import { connect } from 'react-redux';
import HomeAssessment from './homes/HomeAssessment.jsx';
import DependentAssessment from './dependents/DependentAssessment.jsx';
import ContactAssessment from './contacts/ContactAssessment.jsx';
import ZoneAssessment from './zones/ZoneAssessment.jsx';

class AssessmentWrapper extends React.Component {
  componentDidMount() {
    this.props.loadHomes();
    this.props.loadDependents();
    this.props.loadContacts();
  }

  render() {
    return (
      <div>
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
  contacts: state.contacts
});

export default connect(mapStateToProps, null)(AssessmentWrapper);

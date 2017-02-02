import React from 'react';
import { connect } from 'react-redux';
import UserprepLeftNav from './userpreps/UserprepLeftNav.jsx';
import UserprepList from './userpreps/UserprepList.jsx'

class UserprepWrapper extends React.Component {
  render() {
    return (
      <div className="wrapper wrapper-userpreps">
        <UserprepLeftNav {...this.props} />
        <UserprepList {...this.props} />
      </div>
    );
  }
}

const getVisibleUserpreps = (userpreps, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return userpreps
    case 'SHOW_PRIORITY_1':
      return userpreps.all.filter(u => u.priority === 1)
    case 'SHOW_PRIORITY_2':
      return userpreps.all.filter(u => u.priority === 2)
    case 'SHOW_PRIORITY_3':
      return userpreps.all.filter(u => u.priority === 3)
    case 'SHOW_HOME_USERPREPS':
      return userpreps.all.filter(u => u.prep_maintype === 'home');
    case 'SHOW_HOME_INTERIOR_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'home_interior');
    case 'SHOW_HOME_STRUCTURE_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'home_structure');
    case 'SHOW_GEAR_USERPREPS':
      return userpreps.all.filter(u => u.prep_maintype === 'gear');
    case 'SHOW_GEAR_HUMAN_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'gear_human');
    case 'SHOW_GEAR_PET_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'gear_pet');
    case 'SHOW_PLAN_USERPREPS':
      return userpreps.all.filter(u => u.prep_maintype === 'plan');
    case 'SHOW_PLAN_CHECK_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'plan_check');
    case 'SHOW_PLAN_CONTACT_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'plan_contact');
    case 'SHOW_PLAN_DEPENDENT_HUMAN_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'plan_dependent_human');
    case 'SHOW_PLAN_DEPENDENT_PET_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'plan_dependent_pet');
    case 'SHOW_PLAN_ZONE_USERPREPS':
      return userpreps.all.filter(u => u.prep_subtype === 'plan_zone');
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents,
  contacts: state.contacts,
  zones: state.zones,
  userpreps: getVisibleUserpreps(state.userpreps, state.visibilityFilter)
});

export default connect(mapStateToProps, null)(UserprepWrapper);

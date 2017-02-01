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
    case 'SHOW_HOME_USERPREPS':
      return userpreps.all.filter(u => u.prep_maintype === 'home');
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

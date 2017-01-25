import React from 'react';
import { connect } from 'react-redux';
import UserprepList from './userpreps/UserprepList.jsx'

class UserprepWrapper extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title title-page"> My Preparations </h1>
        <UserprepList {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents,
  contacts: state.contacts,
  zones: state.zones,
  userpreps: state.userpreps
});

export default connect(mapStateToProps, null)(UserprepWrapper);

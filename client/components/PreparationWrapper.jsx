import React from 'react';
import { connect } from 'react-redux';
import UserPrepList from './preparations/UserPrepList.jsx'

class PreparationWrapper extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title title-page"> My Preparations </h1>
        <UserPrepList {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents,
  contacts: state.contacts,
  zones: state.zones,
  preparations: state.preparations
});

export default connect(mapStateToProps, null)(PreparationWrapper);

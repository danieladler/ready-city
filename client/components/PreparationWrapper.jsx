import React from 'react';
import { connect } from 'react-redux';
import UserPrepList from './preparations/UserPrepList.jsx'

class PreparationWrapper extends React.Component {

  componentDidMount() {
    const {userId} = this.props.params;
    this.props.loadUserPreps(userId);
  }

  render() {
    return (
      <div>
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

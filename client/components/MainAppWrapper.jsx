import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class MainAppWrapper extends React.Component {
  componentDidMount() {
    // load assessment data for 'Profile' view
    this.props.loadHomes();
    this.props.loadDependents();
    this.props.loadContacts();
    this.props.loadZones();
    // load userpreps for 'Prepare' view
    const {userId} = this.props.params;
    this.props.loadUserpreps(userId);
  }

  render(){
    const {userId} = this.props.params;
    return (
      <div>
        <a href="/">Home</a>
        <Link to={`/users/${userId}`} activeClassName="active">Profile</Link>
        <Link to={`/userpreps/${userId}`} activeClassName="active">Prepare</Link>
        {this.props.children}
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

export default connect(mapStateToProps, null)(MainAppWrapper);

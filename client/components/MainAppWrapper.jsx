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
        <div className="nav-secondary">
          <Link to={`/users/${userId}`} className="nav-secondary-link nav-list-item" activeClassName="active">Profile</Link>
          <Link to={`/userpreps/${userId}`} className="nav-secondary-link nav-list-item" activeClassName="active">Prepare</Link>
          <a href="#" className="nav-secondary-link nav-list-item"> Practice - TBD! </a>
          <a href="#" className="nav-secondary-link nav-list-item"> Recover - TBD! </a>
        </div>
        <div className="wrapper wrapper-prepare">
          {this.props.children}
        </div>
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

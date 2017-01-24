import React from 'react';
import { Link } from 'react-router';

class MainAppWrapper extends React.Component {
  // componentDidMount() {
  //   this.props.loadHomes();
  //   this.props.loadDependents();
  //   this.props.loadContacts();
  //   this.props.loadZones();
  //
  componentDidMount() {
    const {userId} = this.props.params;
    this.props.loadUserPreps(userId);
  }

  render(){
    const {userId} = this.props.params;
    return (
      <div>
        I am the main app.
        <a href="/">Home</a>
        <Link to={`/users/${userId}`} activeClassName="active">Profile</Link>
        <Link to={`/preparations/${userId}`} activeClassName="active">Prepare</Link>
        {this.props.children}
      </div>
    );
  }
}

export default MainAppWrapper;

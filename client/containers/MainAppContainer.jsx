import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class MainAppContainer extends React.Component {
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

export default MainAppContainer;

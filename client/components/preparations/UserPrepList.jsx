import React, { PropTypes } from 'react';

class UserPrepList extends React.Component {
  render() {
    const homePreps = this.props.preparations.all.home_user_preps;
    console.log("!!!");
    console.log(homePreps);

    return (
      <div>
        <h1> UserPrep List </h1>
      </div>
    )
  }
}

export default UserPrepList;

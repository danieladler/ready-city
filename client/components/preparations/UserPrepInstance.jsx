import React, { PropTypes } from 'react';

class UserPrepInstance extends React.Component {
  render() {
    const { userprep } = this.props;
    return (
      <div>
        <p> {userprep.keyword} </p>
      </div>
    )
  }
}

export default UserPrepInstance;

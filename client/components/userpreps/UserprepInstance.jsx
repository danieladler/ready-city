import React, { PropTypes } from 'react';

class UserprepInstance extends React.Component {
  render() {
    const { userprep } = this.props;
    return (
      <div>
        <p> {userprep.keyword} </p>
      </div>
    )
  }
}

export default UserprepInstance;

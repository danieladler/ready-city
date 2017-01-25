import React, { PropTypes } from 'react';
import UserPrepInstance from './UserPrepInstance.jsx';

class UserPrepList extends React.Component {
  render() {
    const userPreps = this.props.preparations.all.map((userprep, index) => {
      return (
        <div key={index} className="wrapper-instance">
          <UserPrepInstance
            index={index}
            userprep={userprep} />
        </div>
      )
    })

    return (
      <div>
        {userPreps}
      </div>
    )
  }
}

export default UserPrepList;

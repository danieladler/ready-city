import React, { PropTypes } from 'react';
import UserprepInstance from './UserprepInstance.jsx';

class UserprepList extends React.Component {
  render() {
    const userpreps = this.props.userpreps.all.map((userprep, index) => {
      return (
        <div key={index} className="wrapper-instance">
          <UserprepInstance
            index={index}
            userprep={userprep} />
        </div>
      )
    })

    return (
      <div className="userprep-main">
        {userpreps}
      </div>
    )
  }
}

export default UserprepList;

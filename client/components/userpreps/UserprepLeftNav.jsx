import React, { PropTypes } from 'react';

class UserprepLeftNav extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.filterUserpreps = this.filterUserpreps.bind(this);
  }

  filterUserpreps(event) {
    event.preventDefault();
    console.log('yep');
  }

  render() {
    return (
      <nav className="nav-left-userpreps">
        <h2 className="title-userprep-breadcrumbs"> Priority: </h2>
        <div className="breadcrumbs">
          <a href="javascript:void(0)">1</a>
          <a href="javascript:void(0)">2</a>
          <a href="javascript:void(0)">3</a>
        </div>
        <ul className="list-userprep-maintypes">
          <li className="item-userprep item-userprep-maintype">
            <a href="javascript:void(0)" onClick={this.filterUserpreps}>Home</a>
          </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">Structure</li>
              <li className="item-userprep item-userprep-subtype">Interior</li>
            </ul>
          <li className="item-userprep item-userprep-maintype">Gear</li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">Human</li>
              <li className="item-userprep item-userprep-subtype">Pet</li>
            </ul>
          <li className="item-userprep item-userprep-maintype">Plan</li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">TBD</li>
              <li className="item-userprep item-userprep-subtype">TBD</li>
            </ul>
        </ul>
      </nav>
    )
  }
}

export default UserprepLeftNav;

import React, { PropTypes } from 'react';
import FilterLink from './FilterLink.jsx';

class UserprepLeftNav extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.filterUserpreps = this.filterUserpreps.bind(this);
  }

  // TODO: DELETE THIS AND THE UNNECESSARY <LI>S BELOW, REPLACING W/ FilterLink
  filterUserpreps(event) {
    event.preventDefault();
    console.log(this.filter);
    // console.log('yep');
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
            <FilterLink filter="SHOW_ALL" name="All"/>
          </li>
          <li className="item-userprep item-userprep-maintype">
            <FilterLink filter="SHOW_HOME_USERPREPS" name="Home"/>
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

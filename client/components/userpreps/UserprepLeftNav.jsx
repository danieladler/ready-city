import React, { PropTypes } from 'react';
import FilterLink from './FilterLink.jsx';

class UserprepLeftNav extends React.Component {
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
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_HOME_STRUCTURE_USERPREPS" name="Structure"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_HOME_INTERIOR_USERPREPS" name="Interior"/>
              </li>
            </ul>
            <li className="item-userprep item-userprep-maintype">
              <FilterLink filter="SHOW_GEAR_USERPREPS" name="Gear"/>
            </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_GEAR_HUMAN_USERPREPS" name="Human Gear"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_GEAR_PET_USERPREPS" name="Pet Gear"/>
              </li>
            </ul>
            <li className="item-userprep item-userprep-maintype">
              <FilterLink filter="SHOW_PLAN_USERPREPS" name="Plan"/>
            </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_CHECK_USERPREPS" name="Learn & Practice"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_CONTACT_USERPREPS" name="Contacts"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_DEPENDENT_HUMAN_USERPREPS" name="Dependents"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_DEPENDENT_PET_USERPREPS" name="Pet Considerations"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_ZONE_USERPREPS" name="Zones"/>
              </li>
            </ul>
        </ul>
      </nav>
    )
  }
}

export default UserprepLeftNav;

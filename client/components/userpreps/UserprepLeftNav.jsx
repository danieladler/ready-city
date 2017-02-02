import React, { PropTypes } from 'react';
import FilterLink from './FilterLink.jsx';

class UserprepLeftNav extends React.Component {
  render() {
    return (
      <nav className="nav-left-userpreps">
        <h2 className="title-userprep-breadcrumbs"> Priority: </h2>
        <div className="breadcrumbs">
          <FilterLink filter="SHOW_PRIORITY_1" linkName="/priority-1" name="1"/>
          <FilterLink filter="SHOW_PRIORITY_2" linkName="/priority-2" name="2"/>
          <FilterLink filter="SHOW_PRIORITY_3" linkName="/priority-3" name="3"/>
        </div>
        <ul className="list-userprep-maintypes">
          <li className="item-userprep item-userprep-maintype">
            <FilterLink filter="SHOW_ALL" linkName="/all" name="All"/>
          </li>
          <li className="item-userprep item-userprep-maintype">
            <FilterLink filter="SHOW_HOME_USERPREPS" linkName="/home-all" name="Home"/>
          </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_HOME_STRUCTURE_USERPREPS" linkName="/home-structure" name="Structure"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_HOME_INTERIOR_USERPREPS" linkName="/home-interior" name="Interior"/>
              </li>
            </ul>
            <li className="item-userprep item-userprep-maintype">
              <FilterLink filter="SHOW_GEAR_USERPREPS" linkName="/gear-all" name="Gear"/>
            </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_GEAR_HUMAN_USERPREPS" linkName="/gear-human"name="Human Gear"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_GEAR_PET_USERPREPS" linkName="/gear-pet"name="Pet Gear"/>
              </li>
            </ul>
            <li className="item-userprep item-userprep-maintype">
              <FilterLink filter="SHOW_PLAN_USERPREPS" linkName="/plan-all" name="Plan"/>
            </li>
            <ul className="list-userprep-subtypes">
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_CHECK_USERPREPS" linkName="/plan-practice" name="Learn & Practice"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_CONTACT_USERPREPS" linkName="/plan-contacts" name="Contacts"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_DEPENDENT_HUMAN_USERPREPS" linkName="/plan-dependents" name="Dependents"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_DEPENDENT_PET_USERPREPS" linkName="/plan-pets" name="Pet Considerations"/>
              </li>
              <li className="item-userprep item-userprep-subtype">
                <FilterLink filter="SHOW_PLAN_ZONE_USERPREPS" linkName="/plan-zones" name="Zones"/>
              </li>
            </ul>
        </ul>
      </nav>
    )
  }
}

export default UserprepLeftNav;

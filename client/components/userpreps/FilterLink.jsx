import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserprepActions from '../../actions/UserprepActionCreators.jsx';

import Link from './Link.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...UserprepActions
  }, dispatch)
);

const FilterLink = connect(
  null,
  mapDispatchToProps
)(Link);

export default FilterLink;

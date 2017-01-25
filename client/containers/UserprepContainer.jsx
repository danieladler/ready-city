import { connect } from 'react-redux';
import UserprepWrapper from '../components/UserprepWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as UserprepActions from '../actions/UserprepActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...UserprepActions
  }, dispatch)
);

const UserprepContainer = connect(null, mapDispatchToProps)(UserprepWrapper);

export default UserprepContainer;

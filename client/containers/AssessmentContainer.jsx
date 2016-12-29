import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/HomeAssessmentActionCreators.jsx';

// map all dispatch-able actions throughout the Assessment component tree
const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const AssessmentContainer = connect(null, mapDispatchToProps)(AssessmentWrapper);

export default AssessmentContainer;

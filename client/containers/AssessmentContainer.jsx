import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/HomeAssessmentActionCreators.jsx';

// selectively map parts of Redux global state to component's props
const mapStateToProps = (state) => ({ home: state.home });

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const AssessmentContainer = connect(mapStateToProps, mapDispatchToProps)(AssessmentWrapper);

export default AssessmentContainer;

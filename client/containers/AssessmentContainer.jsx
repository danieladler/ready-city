import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';
import { bindActionCreators } from 'redux'
// import * as actions from '../actions/HomeAssessmentActionCreators.jsx';
import * as HomeActions from '../actions/HomeAssessmentActionCreators.jsx';
import * as DependentActions from '../actions/DependentAssessmentActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({...HomeActions, ...DependentActions}, dispatch)
);

const AssessmentContainer = connect(null, mapDispatchToProps)(AssessmentWrapper);

export default AssessmentContainer;

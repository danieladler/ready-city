import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';
import { bindActionCreators } from 'redux'
// import * as actions from '../actions/HomeAssessmentActionCreators.jsx';
import * as HomeActions from '../actions/HomeAssessmentActionCreators.jsx';
import * as DependentActions from '../actions/DependentAssessmentActionCreators.jsx';
import * as ContactActions from '../actions/ContactAssessmentActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({...HomeActions, ...DependentActions, ...ContactActions  }, dispatch)
);

const AssessmentContainer = connect(null, mapDispatchToProps)(AssessmentWrapper);

export default AssessmentContainer;

import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as HomeActions from '../actions/HomeAssessmentActionCreators.jsx';
import * as DependentActions from '../actions/DependentAssessmentActionCreators.jsx';
import * as ContactActions from '../actions/ContactAssessmentActionCreators.jsx';
import * as ZoneActions from '../actions/ZoneAssessmentActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...HomeActions,
    ...DependentActions,
    ...ContactActions,
    ...ZoneActions
  }, dispatch)
);

const AssessmentContainer = connect(null, mapDispatchToProps)(AssessmentWrapper);

export default AssessmentContainer;

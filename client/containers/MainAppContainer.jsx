import { connect } from 'react-redux';
import MainAppWrapper from '../components/MainAppWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as UserprepActions from '../actions/UserprepActionCreators.jsx';
import * as HomeActions from '../actions/HomeAssessmentActionCreators.jsx';
import * as DependentActions from '../actions/DependentAssessmentActionCreators.jsx';
import * as ContactActions from '../actions/ContactAssessmentActionCreators.jsx';
import * as ZoneActions from '../actions/ZoneAssessmentActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...HomeActions,
    ...DependentActions,
    ...ContactActions,
    ...ZoneActions,
    ...UserprepActions
  }, dispatch)
);

const MainAppContainer = connect(null, mapDispatchToProps)(MainAppWrapper);

export default MainAppContainer;

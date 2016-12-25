import { connect } from 'react-redux';
import AssessmentWrapper from '../components/AssessmentWrapper.jsx';

// selectively map parts of Redux global state to component's props
const mapStateToProps = (state) => ({ home: state.home });

const AssessmentContainer = connect(mapStateToProps)(AssessmentWrapper);

export default AssessmentContainer;

// NB: uncomment these if we decide to map all dispatch-able actions to
//     all components' props (as opposed to importing each action excplictly
//     in each component where it's used)

// import { bindActionCreators } from 'redux'
// import * as actions from '../actions/HomeAssessmentActionCreators';

// const mapDispatchToProps = (dispatch) => (
//   bindActionCreators(actions, dispatch)
// );

// const AssessmentContainer = connect(mapStateToProps, mapDispatchToProps)(AssessmentWrapper);

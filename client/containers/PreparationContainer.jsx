import { connect } from 'react-redux';
import PreparationWrapper from '../components/PreparationWrapper.jsx';

// NB: later, may add mapDispatchToPrps as second argument, as in AssessmentContainer
const AssessmentContainer = connect(null, null)(PreparationWrapper);

export default AssessmentContainer;

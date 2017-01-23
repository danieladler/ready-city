import { connect } from 'react-redux';
import PreparationWrapper from '../components/PreparationWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as PreparationActions from '../actions/PreparationActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...PreparationActions
  }, dispatch)
);

const PreparationContainer = connect(null, mapDispatchToProps)(PreparationWrapper);

export default PreparationContainer;

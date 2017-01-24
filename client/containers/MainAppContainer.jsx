import { connect } from 'react-redux';
import MainAppWrapper from '../components/MainAppWrapper.jsx';
import { bindActionCreators } from 'redux'
import * as PreparationActions from '../actions/PreparationActionCreators.jsx';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...PreparationActions
  }, dispatch)
);

const MainAppContainer = connect(null, mapDispatchToProps)(MainAppWrapper);

export default MainAppContainer;

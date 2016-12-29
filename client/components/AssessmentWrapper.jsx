import React from 'react';
import { connect } from 'react-redux';
import HomeAssessment from './HomeAssessment.jsx';

class AssessmentWrapper extends React.Component {
  componentDidMount() {
    this.props.loadHome();
  }

  render() {
    return (
      <div>
        <HomeAssessment {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ homes: state.homes });

export default connect(mapStateToProps, null)(AssessmentWrapper);

import React  from 'react';
import { connect } from 'react-redux';
import HomeAssessment from './HomeAssessment.jsx';

class AssessmentWrapper extends React.Component {
  componentDidMount() {
    this.props.loadHome();
  }

  renderHomeAssessment() {
    const home = this.props.homes.home;
    return (
      <div key={home.id}>
        <h4> Address: {home.address} </h4>
      </div>
    )
  };

  render() {
    return (
      <div>
        { this.renderHomeAssessment() }
        <HomeAssessment {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ homes: state.homes });

// export default AssessmentWrapper;
export default connect(mapStateToProps, null)(AssessmentWrapper);

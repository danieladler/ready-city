import React from 'react';
import { connect } from 'react-redux';

class PreparationWrapper extends React.Component {
  // componentDidMount() {
  //   this.props.loadUserPreps();
  // }

  render() {
    return (
      <div>
        I am preparations
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homes: state.homes,
  dependents: state.dependents,
  contacts: state.contacts,
  zones: state.zones
});

export default connect(mapStateToProps, null)(PreparationWrapper);

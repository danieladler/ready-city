import React, { PropTypes } from 'react';

class Link extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.triggerFilter = this.triggerFilter.bind(this);
  }

  triggerFilter(event) {
    event.preventDefault();
    const { filter } = this.props
    this.props.setVisibilityFilter(filter)
  }

  render() {
    const { name, linkName } = this.props
    return(
      <a href={linkName} onClick={this.triggerFilter}> {name} </a>
    )
  }
}

export default Link;

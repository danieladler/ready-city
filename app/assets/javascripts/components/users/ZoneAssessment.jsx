var ZoneAssessment = React.createClass({
  getInitialState: function() {
    return({
      dependentsForZoneAsmt: []
    })
  },
  componentDidMount: function() {
    this.loadDependentsIntoSelect();
  },
  loadDependentsIntoSelect: function() {
    var optionsAsString = "",
        arr = this.props.dependentsForZoneAsmt;
    for (var i=0; i< arr.length; i++) {
      optionsAsString +=" <option value='" + (arr[i].id) + "'>" + (arr[i].name) + "</option>";
    }
    this.setState({dependentsForZoneAsmt: optionsAsString});
  },
  render: function() {
    var _this = this
    zones = this.props.zones.map(function(zone) {
      return (
        <ZoneInstance
          key={zone.id}
          id={zone.id}
          dependent_id={zone.dependent_name}
          dependent_id={zone.dependent_id}
          name={zone.name}
          address={zone.address}
          city={zone.city}
          state={zone.state}
          zip={zone.zip}
          zone_type={zone.zone_type}
          zone_primary={zone.zone_primary}
          dependentsForZoneAsmt={_this.state.dependentsForZoneAsmt}
          destroyInstance={_this.props.destroyInstance}
          handleFormSubmit={_this.props.handleFormSubmit}
        />
      );
    });
    return (
      <div>
        <h2> Zones: </h2>
        <div>
          { zones }
        </div>
        <h3> Add a Zone </h3>
        <ZoneForm
          handleFormSubmit={this.props.handleFormSubmit}
          dependentsForZoneAsmt={this.state.dependentsForZoneAsmt}
        />
      </div>
    );
  }
});

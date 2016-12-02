var ZoneAssessment = React.createClass({
  render: function() {
    var _this = this
    zones = this.props.zones.map(function(zone) {
      return (
        <ZoneInstance
          key={zone.id}
          id={zone.id}
          name={zone.name}
          address={zone.address}
          city={zone.city}
          state={zone.state}
          zip={zone.zip}
          zone_type={zone.zone_type}
          zone_primary={zone.zone_primary}
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
        <ZoneForm handleFormSubmit={this.props.handleFormSubmit}/>
      </div>
    );
  }
});

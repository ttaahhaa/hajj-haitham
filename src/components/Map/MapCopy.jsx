import GoogleMapReact from 'google-map-react';
import React, { useState, useRef } from 'react';
import { useMediaQuery, Tooltip } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MarkerClusterer from '@google/markerclusterer'

import './style.css'
import mapStyles from '../../mapStyles';
import VehicleDetails from './VehicleDetails';
import CONFIG from '../../config.json'
import busLogo from './busIcon.png'
import placeIcon from './placeIcon.png'
// setCoordinates, coordinates, vehicles, selected, zoomIn, places
class MapCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        childClicked: null,
        shown: false,
        vehiclesData: []
    }
}


setGoogleMapRef(map, maps) {
  this.googleMapRef = map
  this.googleRef = maps
  let locations = [
    { lat: 21.39386499, lng: 39.85381991 },
    { lat: 22.39471494, lng: 37.8512352 },
    { lat: 21.3952752, lng: 39.85080014 },
    { lat: 21.39526919, lng: 39.85080846 }
  ]
  this.props.vehicles.map((vehicle) => {
    this.setState({
      vehiclesData: this.state.vehiclesData.push({ lng: Number(vehicle.longitude), lat: Number(vehicle.latitude) })
    })
  }
  )
  debugger
  
  let markers = this.state.vehiclesData && this.state.vehiclesData.map((location) => {
    return new this.googleRef.Marker({ position: location})
  })
  let markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    gridSize: 10,
    minimumClusterSize: 4
  })
}

// roadmap 
// satellite
// hybrid
// terrain
render(){
  return (
    <div className={"mapContainer"} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: CONFIG.GOOGLE_MAP_KEY }}
        defaultCenter={{ lng: 39.91260046085789, lat: 21.388545789322087 }}
        center={this.props.selected?{ lng: Number(this.props.zoomIn.lng), lat: Number(this.props.zoomIn.lat)}: this.props.coordinates}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.setGoogleMapRef(map, maps)}
        margin={[50, 50, 50, 50]}
        zoom={this.props.selected?20:13}
        onChange={(e) => {
          this.props.setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        }}
        onChildClick={(child) => {this.setState({childClicked: child, shown: !this.state.shown})}}
      >
      
        {/* ------------------------------ */}
        {this.props.places !== "undefined" && this.props.places?.map((place, i) => (
          <div
          className={"markerContainer"}
            lat={Number(place.longitude)}
            lng={Number(place.latitude)}
            key={i+644354146846}
          >
            {!true
              ? <LocationOnOutlinedIcon fontSize="large" />
              : (
                <Tooltip title={place.name}>
                  <img src={placeIcon} alt={place.name} className={'placeIcons'}/>
                </Tooltip>
              )
            }
          </div>
        ))}
        {/* ------------------------------ */}
      </GoogleMapReact>
    </div>
  );}
};

export default MapCopy;

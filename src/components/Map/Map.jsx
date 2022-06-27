import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { useMediaQuery, Tooltip } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import './style.css'
import mapStyles from '../../mapStyles';
import VehicleDetails from './VehicleDetails';
import CONFIG from '../../config.json'
import busLogo from './busIcon.png'
import placeIcon from './placeIcon.png'

const Map = ({ setCoordinates, coordinates, vehicles, selected, zoomIn, places }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [childClicked, setChildClicked] = useState(null)
  const [shown, isShown] = useState(false)

// roadmap 
// satellite
// hybrid
// terrain
  return (
    <div className={"mapContainer"} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: CONFIG.GOOGLE_MAP_KEY }}
        defaultCenter={{ lng: 39.91260046085789, lat: 21.388545789322087 }}
        center={selected?{ lng: Number(zoomIn.lng), lat: Number(zoomIn.lat)}: coordinates}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        zoom={selected?20:13}
        options={{  zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        }}
        onChildClick={(child) => {setChildClicked(child); isShown(!shown)}}
      >
        {/* ---------------------------- */}
        {vehicles !== "undefined" && vehicles?.map((vehicle, i) => (
          <div
            className={"markerContainer"}
            lat={Number(vehicle.latitude)}
            lng={Number(vehicle.longitude)}
            key={vehicle.vehicleNumber}
            
          >

            {!isDesktop
              ? <LocationOnOutlinedIcon fontSize="large" />
              : (
                <div className={"busAndDetails"} >
                    <Tooltip title={vehicle.plateNumber + " :رقم المركبة"} >
                        <img src={busLogo} alt="Logo" className={'busIcons'}/>
                    </Tooltip>

                    {childClicked&&childClicked==vehicle.vehicleNumber&&shown?<VehicleDetails
                    key2={vehicle.vehicleNumber}
                    className={"vehicleDetailsContainer"}
                    style={{position: 'relative', zIndex: 1000}}
                      />:""}

                </div>

              )
            }
          </div>
        ))}

        {/* ------------------------------ */}
        {places !== "undefined" && places?.map((place, i) => (
          <div
          className={"markerContainer"}
            lat={Number(place.longitude)}
            lng={Number(place.latitude)}
            key={place.name}
          >
            {!isDesktop
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
  );
};

export default Map;

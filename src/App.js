import { Suspense, useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Map from './components/Map/Map.jsx';
import { CssBaseline, Grid } from '@material-ui/core';
import { getVehiclesData, getAllPlaces } from './API';
import CONFIG from './config.json'

const App = ({ setIsAuth, isAuth }) => {
  const [vehicles, setVehicles] = useState([]);
  const [coordinates, setCoordinates] = useState({ lng: 39.91260046085789, lat: 21.388545789322087 })
  const [isLoading, setIsLoading] = useState(false);
  const [searched, isSearched] = useState(false)
  const [selected, isSelected] = useState(false)
  const [zoomIn, setZoomIn] = useState({ lat: null, lng: null })
  const [places, setPlaces] = useState([])

  const style = {
    margin: "10px",
    height: "90vh",
    width: "99%"

  }


  useEffect(() => {
    setIsLoading(true)
    getVehiclesData()
      .then((data) => {
        if (!searched || !selected) {
          setVehicles(data)
        }
        setIsLoading(false)
      })
  }, [coordinates, searched, selected]);


  useEffect(() => {
    setIsLoading(true)
    const interval = setInterval(() => {
      if (!selected) {
        getVehiclesData()
          .then((data) => {
            setVehicles(data)
            setIsLoading(false)
          }
          )
      }
    }, (Number(CONFIG.TIME_IN_SECONDS) * 1000));
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    getAllPlaces()
      .then((data) => {
        setPlaces(data)
      })
  }, [])

  return (
    <Suspense 
      fallback={null}>
      <CssBaseline />
      <Header 
        setCoordinates={setCoordinates}
        setVehicles={setVehicles}
        isSearched={isSearched}
        isSelected={isSelected}
        setZoomIn={setZoomIn}
        setIsAuth={setIsAuth}
        isAuth={isAuth} />
      <Grid 
        container 
        spacing={3} 
        style={style}>
        <Grid item xs={12} md={12} >
          <Map 
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            vehicles={vehicles}
            selected={selected}
            zoomIn={zoomIn}
            places={places}
            
          />
        </Grid>
      </Grid>
    </Suspense>
  );
}

export default App;
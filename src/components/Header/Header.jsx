import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Select, MenuItem, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles.js';
import { getVehiclesData } from '../../API/index';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import './style.css'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ setCoordinates, setVehicles, isSearched, isSelected, setZoomIn, setIsAuth, isAuth }) => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation(["header"])
  const classes = useStyles(); // hok
  const [vehicles, setHeaderVehicles] = useState([])
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  useEffect(() => {
    getVehiclesData()
      .then((data) => {
        setHeaderVehicles(data)
      })
  }, []);

  const onChangeHandler = (text) => {
    debugger
    let matches = []
    if (text.length > 0) {
      matches = vehicles.filter(vehicle => {
        const regex = new RegExp(`${text}`, "gi")
        return vehicle.plateNumber.match(regex)
      })
    }
    isSelected(false)
    setText(text)
    setSuggestions(matches)
    if (text == "") {
      isSearched(false)
      setVehicles([vehicles])
    } else {
      isSearched(true)
      setVehicles(matches)
    }
  }
  const onSuggestHandler = (text, lng, lat, suggestion) => {
    setText(text)

    setVehicles([suggestion])
    if (text == "") {
      isSearched(false)
    } else {
      debugger
      setCoordinates({ lng: lng, lat: lat })
      setZoomIn({ lng: lng, lat: lat })
      isSearched(true)
      isSelected(true)

    }

  }
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  const logoutHandler = () => {
    localStorage.removeItem("jwt")
    setIsAuth(false)
    navigate("/")
    window.location.reload();
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {localStorage.getItem("jwt") && (<Box display="flex">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder={t("search")}
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              style={{ direction: "rtl" }}
              onChange={e => onChangeHandler(e.target.value)}
              value={text}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([])
                }, 200)
              }}
            />

            <div className={"suggestionsContainer"}>
              {suggestions && suggestions.map((suggestion, i) =>
                <div
                  key={i}
                  className={"suggestions"}
                  onClick={() => onSuggestHandler(suggestion.plateNumber, suggestion.longitude, suggestion.latitude, suggestion)}>{suggestion.plateNumber}</div>
              )}
            </div>
          </div>
        </Box>)}
        <Typography variant="h5" className={classes.title}>
          {t("Tracking Hajj vehicles and companies")}
        </Typography>
        <div >
          <Select id="language" value={localStorage.getItem("i18nextLng")} onChange={handleLanguageChange} className={"languageSelector"}>
            <MenuItem className={"languageSelector"} value="en">{t("english")}</MenuItem>
            <MenuItem className={"languageSelector"} value="ar">{t("arabic")}</MenuItem>
          </Select>
          {isAuth && (
            <Button variant="outlined" color="error" onClick={logoutHandler}>
              <LogoutIcon />
            </Button>
          )}

        </div>
      </Toolbar>

    </AppBar>
  );
}

export default Header;
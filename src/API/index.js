import axios from 'axios';
import CONFIG from '../config.json'


export const getVehiclesData = async (sw, ne) => {
  const URL = `${CONFIG.HOST}/api/Monitorings/GetAllVehiclesSummary`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const response = await axios.get(URL, options)
    
    if(response.data.success)
    return response.data.value;
  } catch (error) {
    console.error("error = ", error)
  }
}


export const  getCommonDataOfAVehicle = async(ID) => {

  const URL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${ID}`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  // return new Promise((Resolve, Reject)=>{

    try {
      const response = await axios.get(URL, options)
      if(response.data.success)
      return response.data.value;
    } catch (error) {
      console.error("error = ", error)
    }
    return (false)
}


export const getVehicleData = async(ID) => {

  const URL = `${CONFIG.HOST}/api/Vehicles/GetDetailsById?id=${ID}`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const response = await axios.get(URL, options)
    if(response.data.success)
    return response.data.value;
  } catch (error) {
    console.error("error = ", error)
  }
  return (false)
}


export const getDriverData = async(ID) => {
  const URL = `${CONFIG.HOST}/api/Drivers/GetDetailsById?id=${ID}`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const response = await axios.get(URL, options)

    if(response.data.success)
    return response.data.value;
  } catch (error) {
    console.error("error = ", error)
  }
  return (false)
}


export const getCompanyData = async(ID) => {
  const URL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${ID}`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const vehicleResponse = await axios.get(URL, options)
    try{
      const URL = `${CONFIG.HOST}/api/Companies/GetDetailsById?id=${vehicleResponse.data.value.companyNumber}`
      const options = {
        method: 'GET',
        url: URL,
        headers: {
          'Content-type': 'application/json',
          'Authorization': localStorage.getItem('jwt')
      }
      }
      const companyResponse = await axios.get(URL, options)
      if(companyResponse.data.success)
      return companyResponse.data.value;
    }catch(error){
      console.error("error = ", error)
    }
   
  } catch (error) {
    console.error("error = ", error)
  }
  return (false)
}

export const getAllPlaces = async() => {
  const URL = `${CONFIG.HOST}/api/Regions/GetAll`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const response = await axios.get(URL, options)

    if(response.data.success)
    return response.data.value;
  } catch (error) {
    console.error("error = ", error)
  }
  return (false)
}

export const getMonitoringData = async(ID) => {
  const URL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${ID}`
  const options = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
  }
  }
  try {
    const response = await axios.get(URL, options)

    if(response.data.success)
    return response.data.value;
  } catch (error) {
    console.error("error = ", error)
  }
  return (false)
}

import Polyline from '@mapbox/polyline';

export function fetchLocation() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_LOCATION' })
    navigator.geolocation.getCurrentPosition(pos => {
      dispatch({ type: 'FETCHED_LOCATION', payload: pos.coords })
      dispatch({ type: 'SEARCH_LOCATION', payload: pos.coords })
    })
  }
}

export function sendData(lat, lon) {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
   },
    body: JSON.stringify({
      location: {
        lon: Number((lon).toFixed(4)),
        lat: Number((lat).toFixed(4))
      }
    })
  }
  return (dispatch)=>{
     fetch('http://192.168.3.40:3000/api/v1/locations', data)
    .then(res => res.json())
    .then(json => dispatch({type: 'SAVED_LOCATION'}))
    .catch(error => console.log("Error at sendData", error))
  }
}

export function getData(coord) {
  return (dispatch) => {
    const lat = coord.latitude.toString().replace(/\./, '_')
    const lng = coord.longitude.toString().replace(/\./, '_')
    fetch(`http://localhost:3000/api/v1/locations/${lat}&${lng}`)
      .then(res => res.json())
      .then(coords => {
        if (coords.empty) {
          dispatch({ type: 'FETCHED_COORDS', payload: coords.empty })
        } else {
          dispatch({ type: 'FETCHED_COORDS', payload: coords.locations })
        }
      })
      .catch(error => console.log("Error at getData", error))
  }
}

export function getDirections(start, dest) {
  return (dispatch) => {
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ start }&destination=${ dest }&key=AIzaSyB9P_36mvqqGLLHK1F5Fh6k4oLZKw-yH3k`)
      .then(res => res.json())
      .then(json => {
        let points = Polyline.decode(json.routes[0].overview_polyline.points)
        let coords = points.map((point, idx) => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        })
        dispatch({ type: 'PATH', payload: coords })
      })
      .catch(error => console.log("Error at getDirections", error))
  }
}

export function setRoute(coord) {
  return {
    type: 'SET_ROUTE',
    payload: [coord]
  }
}

export function regionChange(region) {
  return {
    type: 'CHANGING',
    payload: region
  }
}

export function searchLocation(region) {
  return {
    type: 'SEARCH_LOCATION',
    payload: region
  }
}

export function clearCoords() {
  return {
    type: 'CLEAR_COORDS',
    payload: []
  }
}

export function clearPoint() {
  return {
    type: 'CLEAR_POINT',
    payload: {}
  }
}

export function dispatchLongPress(coord) {
  return {
    type: 'LONG_PRESS',
    payload: {
      latitude: coord.latitude,
      longitude: coord.longitude
    }
  }
}

export function dispatchSearchMarker(coord) {
  return {
    type: 'SEARCH_MARKER',
    payload: coord
  }
}

export function fetchLocation() {
  return function(dispatch) {
    dispatch({ type: 'FETCHING_LOCATION' })
    navigator.geolocation.getCurrentPosition(pos => {
      dispatch({ type: "FETCHED_LOCATION", payload: pos.coords })
    })
  }
}

export function regionChange(region) {
  return {
    type: 'CHANGING',
    payload: region
  }
}

export function regionComplete(region) {
  return {
    type: 'COMPLETE',
    payload: region
  }
}

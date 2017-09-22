// const dims = Dimensions.get('window')
// const ASPECT_RATIO = dims.width / dims.height
// const LATITUDE = 40.764326
// const LONGITUDE = -73.925683
// const LATITUDE_DELTA = 0.0922
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default function loadReducer(state = {
  region: {
    latitude: 40.764326,
    longitude: -73.925683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }, current: {
    latitude: 40.764326,
    longitude: -73.925683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  isLoading: false
}, action) {
  switch (action.type) {
    case 'FETCHING_LOCATION':
      return { ...state, isLoading: true }
    case 'FETCHED_LOCATION':
      return { ...state, region: {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta
      }, isLoading: false}
    case 'CHANGING':
      return { ...state, region: {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta
      }, isLoading: false}
    case 'COMPLETE':
      return { ...state, current: {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta
      }, isLoading: false}
    default:
      return state
  }
}

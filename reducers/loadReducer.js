import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'

const dims = Dimensions.get('window')
const ASPECT_RATIO = dims.width / dims.height
// const LATITUDE = 40.764326
// const LONGITUDE = -73.925683
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
// const LONGITUDE_DELTA = 0.0421

export default function loadReducer(state = {
  region: {
    latitude: 40.764326,
    longitude: -73.925683,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  },
  current: {
    latitude: 40.764326,
    longitude: -73.925683,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  },
  coords: [],
  isLoading: false
}, action) {
  switch (action.type) {
    case 'FETCHING_LOCATION':
      return { ...state, isLoading: true }
    case 'FETCHED_LOCATION':
      return { ...state,
        region: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        isLoading: false
      }
    case 'CHANGING':
      return { ...state,
        region: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        isLoading: false
      }
    case 'COMPLETE':
      return { ...state,
        current: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        isLoading: false
      }
    case 'FETCH_PARKING':
      console.log("HITTING ACTION", action.payload);
      return { ...state,
        coords: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

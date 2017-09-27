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
  userLoc: {},
  coords: [],
  route: [],
  marker: null,
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
        userLoc: {
          lat: action.payload.latitude,
          lng: action.payload.longitude
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
    case 'FETCHED_COORDS':
      return { ...state,
        coords: action.payload
      }
    case 'SET_ROUTE':
      return { ...state,
        coords: action.payload
      }
    case 'CLEAR':
      return { ...state,
        coords: action.payload
      }
    case 'PATH':
      return { ...state,
        route: action.payload
      }
    case 'SAVED_LOCATION':
    default:
      return state
  }
}

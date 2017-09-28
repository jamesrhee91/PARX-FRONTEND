import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'

const dims = Dimensions.get('window')
const ASPECT_RATIO = dims.width / dims.height
// const LATITUDE = 40.764326
// const LONGITUDE = -73.925683
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
// const LONGITUDE_DELTA = 0.0421
const DEFAULT_STATE = {
  latitude: 40.764326,
  longitude: -73.925683,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}
export default function loadReducer(state = {
  region: DEFAULT_STATE,
  search: DEFAULT_STATE,
  userLoc: {},
  searchMarker: {},
  coords: [],
  route: [],
  longPress: [],
  marker: null,
  isLoading: false
}, action) {
  switch (action.type) {
    case 'FETCHING_LOCATION':
      return { ...state, isLoading: true }
    case 'FETCHED_LOCATION':
      return { ...state,
        region: {
          ...state.region,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        },
        userLoc: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        },
        isLoading: false
      }
    case 'CHANGING':
      return { ...state,
        region: {
          ...state.region,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        },
        isLoading: false
      }
    case 'SEARCH_LOCATION':
      return { ...state,
        search: {
          ...state.search,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
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
    case 'CLEAR_COORDS':
      return { ...state,
        coords: action.payload,
        route: action.payload
      }
    case 'CLEAR_POINT':
      return { ...state,
        longPress: action.payload
      }
    case 'PATH':
      return { ...state,
        route: action.payload
      }
    case 'LONG_PRESS':
      return { ...state,
        longPress: action.payload
      }
    case 'SEARCH_MARKER':
      return { ...state,
        searchMarker: action.payload
      }
    case 'SAVED_LOCATION':
    default:
      return state
  }
}

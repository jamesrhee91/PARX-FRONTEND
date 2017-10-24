import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import MapContainer from './components/MapContainer'
import App from './components/App'
import loadReducer from './reducers/loadReducer'

console.disableYellowBox = true

const rootReducer = combineReducers({loader: loadReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default class Parx extends Component {
  render() {
    return (
      <Provider store={ store } >
        <App />
        {/* <MapContainer /> */}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Parx', () => Parx)

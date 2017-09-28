import React, { Component } from 'react'
import MapContainer from './components/MapContainer'
import Directions from './components/Directions'
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loadReducer from './reducers/loadReducer'

const rootReducer = combineReducers({loader: loadReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default class Parx extends Component {
  render() {
    return (
      <Provider store={ store } >
        <MapContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Parx', () => Parx)

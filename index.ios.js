import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from './components/App'
import MapContainer from './components/MapContainer'
import loadReducer from './reducers/loadReducer'

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

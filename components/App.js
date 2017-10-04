import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import MapContainer from './MapContainer'
import Search from './Search'
import SavedLocations from './SavedLocations'

const App = StackNavigator({
  Recent: { screen: SavedLocations },
  Search: { screen: Search, navigationOptions: { header: null }}
})

export default App

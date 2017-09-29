import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import MapContainer from './MapContainer'
import Search from './Search'

const App = StackNavigator({
  Map: { screen: MapContainer, navigationOptions: { header: null }},
  Search: { screen: Search, navigationOptions: { header: null }}
})

export default App

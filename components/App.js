import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import MapContainer from './MapContainer'
import Search from './Search'
import LocationsList from './LocationsList'

const App = StackNavigator({
  Map: { screen: MapContainer, navigationOptions: { header: null }},
  Search: { screen: Search, navigationOptions: { header: null }},
  Recent: { screen: LocationsList, navigationOptions: {
    title: <Text style={{ fontFamily: 'Exo-Bold' }}>Saved Locations</Text>
  }}
})

export default App

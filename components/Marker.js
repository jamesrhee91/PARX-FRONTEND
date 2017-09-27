import React from 'react'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Marker = ({ animate, coord, routeCoords }) => {

  const handleMarkerPress = (coord) => {
    animate({latitude: coord.lat, longitude: coord.lng}, 300)
  }

  const handleCalloutPress = (e) => {
    routeCoords(null, coord)
  }

  return (
    <MapView.Marker
      coordinate={ {latitude: coord.lat, longitude: coord.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421} }
      onPress={ () => handleMarkerPress(coord) }
      >
      <MapView.Callout onPress={ () => handleCalloutPress(coord) } >
        <Text>Click to route here!</Text>
      </MapView.Callout>
    </MapView.Marker>
  )
}


export default Marker

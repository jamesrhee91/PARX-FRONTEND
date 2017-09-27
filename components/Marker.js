import React from 'react'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Marker = () => {
  return (
    <MapView.Marker>
      
    </MapView.Marker>
  )
}


export default Marker

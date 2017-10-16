import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'

class Marker extends Component {

  handleMarkerPress = () => {
    this.props.animate({latitude: this.props.coord.lat, longitude: this.props.coord.lng}, 300)
  }

  handleCalloutPress = () => {
    if (this.props.mode) {
      Alert.alert(
        'Are you leaving a public parking space?',
        null,
        [
          {text: 'Yes', onPress: () => {
            this.props.saveLocation()
            this.props.routeCoords(this.props.coord)
          }},
          {text: 'No', onPress: () => {
            this.props.routeCoords(this.props.coord)
          }}
        ]
      )
    } else {
      this.props.routeCoords(this.props.coord)
    }
  }

  render() {
    return (
      <MapView.Marker
        pinColor={this.props.color}
        coordinate={ {latitude: this.props.coord.lat, longitude: this.props.coord.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421} }
        onPress={this.handleMarkerPress}
        >
          <MapView.Callout style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onPress={this.handleCalloutPress} >
            <Icon name="ios-redo" size={29} />
            <Text>Route me here</Text>
          </MapView.Callout>
      </MapView.Marker>
    )
  }
}

export default Marker

import React, { Component } from 'react';
import Silver from '../mapStyles/Silver.json'
import Dark from '../mapStyles/Dark.json'
import Night from '../mapStyles/Night.json'
import Retro from '../mapStyles/Retro.json'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const dims = Dimensions.get('window')
const ASPECT_RATIO = dims.width / dims.height
const LATITUDE = 40.764326
const LONGITUDE = -73.925683
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      this.setState({
        region: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      })
    })
  }

  onRegionChange = (region) => {
    this.setState({ region })
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
  }

  render() {
    // console.log("REGION", this.state.region);
            // showsTraffic={ true }
    return (
      <View>
        <View style={{backgroundColor: 'coral', height: 70, justifyContent: 'center', alignItems: 'center'}}>
          <Text>longitude: {this.state.region.longitude}</Text>
          <Text>latitude: {this.state.region.latitude}</Text>
        </View>
        <MapView
          style={ styles.map }
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={ true }
          showsMyLocationButton={ true }
          customMapStyle={ Retro }

          region={ this.state.region }
          onRegionChangeComplete={ this.onRegionChangeComplete }
          >
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  }
})

AppRegistry.registerComponent('MapContainer', () => MapContainer);

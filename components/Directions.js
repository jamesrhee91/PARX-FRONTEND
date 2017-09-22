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
import Polyline from '@mapbox/polyline';

export default class Directions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 40.764326,
        longitude: -73.925683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      coords: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      this.setState({
        region: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      })
    })
    // this.getDirections("40.7050858, -74.0142077", "40.764326, -73.925683")
  }

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

  render() {
    console.log("REGION", this.state.region);
    return (
      <View>
        <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={ true }
          showsMyLocationButton={ true }
          showsTraffic={ true }
          customMapStyle={ Retro }
          region={ this.state.region }
          onRegionChange={ region => this.setState({region}) }
          onRegionChangeComplete={ region => this.setState({region}) }
          >

        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

AppRegistry.registerComponent('Directions', () => Directions);

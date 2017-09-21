import React, { Component } from 'react';
import Silver from '../mapStyles/Silver.json'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    navigator.geolocation.getCurrentPosition(pos => {
      this.getDirections(`${pos.coords.latitude}, ${pos.coords.longitude}`, "40.764070, -73.926005")
    })
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
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude: 40.764070,
          longitude: -73.926005,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>

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

AppRegistry.registerComponent('Map', () => Map);

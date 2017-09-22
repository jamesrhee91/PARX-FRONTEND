import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import TestMap from './components/TestMap'
import Directions from './components/Directions'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

export default class Parx extends Component {
  render() {
    return (
      <View>
        <MapContainer />
      </View>
    );
  }
}

AppRegistry.registerComponent('Parx', () => Parx);

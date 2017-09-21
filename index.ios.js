/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Map from './components/Map'
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
      <View >
        <Map style={styles.container} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

AppRegistry.registerComponent('Parx', () => Parx);

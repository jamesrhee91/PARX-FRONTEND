import React, { Component } from 'react'
import Silver from '../mapStyles/Silver.json'
import Dark from '../mapStyles/Dark.json'
import Night from '../mapStyles/Night.json'
import Retro from '../mapStyles/Retro.json'
import * as locationActions from '../actions/location'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const dims = Dimensions.get('window')
const ASPECT_RATIO = dims.width / dims.height
const LATITUDE = 40.764326
const LONGITUDE = -73.925683
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapContainer extends Component {

  componentWillMount() {
    this.props.fetchLocation()
  }

  onRegionChange = (region) => {
    this.props.regionChange(region)
  }

  onRegionChangeComplete = (region) => {
    this.props.regionComplete(region)
  }

  render() {
    if (this.props.isLoading){
      console.log("MAP");
      return (
        <View><Text>LOADING!!</Text></View>
      )
    } else {
      console.log("LOADING PAGE");
      return(
        <View>
          <View style={{backgroundColor: 'coral', height: '15%', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Changing latitude: {this.props.region.latitude}</Text>
            <Text>Changing longitude: {this.props.region.longitude}</Text>
            <Text>Final latitude: {this.props.current.latitude}</Text>
            <Text>Final longitude: {this.props.current.longitude}</Text>
          </View>
          <MapView
            style={ styles.map }
            provider={ PROVIDER_GOOGLE }
            showsUserLocation={ true }
            showsMyLocationButton={ true }
            showsTraffic={ true }
            customMapStyle={ Retro }
            initialRegion={ this.props.region }
            onRegionChange={ this.onRegionChange }
            onRegionChangeComplete={ this.onRegionChangeComplete }
            >
          </MapView>
        </View>
      )
    }
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
    height: '85%'
  }
})

AppRegistry.registerComponent('MapContainer', () => MapContainer)


function mapStateToProps(state) {
  return {
    region: state.loader.region,
    current: state.loader.current,
    isLoading: state.loader.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

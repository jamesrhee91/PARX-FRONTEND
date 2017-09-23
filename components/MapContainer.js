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
import { Button, Icon } from 'native-base'
import LeavingButton from './LeavingButton'
import FindButton from './FindButton'
import Marker from './Marker'

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

  saveLocation = () => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
     },
      body: JSON.stringify({
        location: {
          lon: Number((this.props.current.longitude).toFixed(4)),
          lat: Number((this.props.current.latitude).toFixed(4))
        }
      })
    }
    fetch('http://localhost:3000/api/v1/locations', data)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  findParking = () => {
    const temp = '40_705&-74_014'
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      }
    }
    fetch(`http://localhost:3000/api/v1/locations/${temp}`, headers)
      .then(res => res.json())
      .then(locations => {
        console.log(locations)
        if (locations.error) {
          console.log("ERROR WHEN FETCHING PARKING")
        } else {
          console.log("FETCHING", locations);
          this.props.fetchParking(locations)
        }
    })
  }

  render() {
    if (this.props.isLoading){
      return (
        <View><Text>LOADING!!</Text></View>
      )
    } else {
      const markers = this.props.coords.map(coord => {
        return (
          <MapView.Marker coordinate={ {latitude: coord.lat, longitude: coord.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421} } />
        )
      })
      console.log("COORDS:", markers);
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
            <LeavingButton saveLocation={ this.saveLocation } />
            <FindButton findParking={ this.findParking } />
            { markers }
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
    coords: state.loader.coords,
    isLoading: state.loader.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

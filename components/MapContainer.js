import React, { Component } from 'react'
import Silver from '../mapStyles/Silver.json'
import Dark from '../mapStyles/Dark.json'
import Night from '../mapStyles/Night.json'
import Retro from '../mapStyles/Retro.json'
import * as locationActions from '../actions/location'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import LeavingButton from './LeavingButton'
import FindButton from './FindButton'
import ClearButton from './ClearButton'
import Marker from './Marker'
import Search from './Search'

class MapContainer extends Component {

  componentDidMount() {
    this.props.fetchLocation()
  }

  onRegionChange = (region) => {
    this.props.regionChange(region)
  }

  saveLocation = () => {
    this.props.sendData(this.props.current.latitude, this.props.current.longitude)
  }

  findParking = () => {
    this.props.getData(this.props.current)
  }

  clearMarkers = (e) => {
    if (!e.nativeEvent.action) {
      this.props.clearCoords()
    }
  }

  routeCoords = (e, coord) => {
    const start = `${this.props.userLoc.lat}, ${this.props.userLoc.lng}`
    const dest = `${coord.lat}, ${coord.lng}`
    this.props.getDirections(start, dest)
    this.props.setRoute(coord)
  }

  animate = (coords, duration) => {
    this.refs.map.animateToCoordinate(coords, duration)
  }

  handleLongPress = (e) => {
    this.props.dispatchlongPress(e.nativeEvent.coordinate)
    this.props.currentLocation(e.nativeEvent.coordinate)
  }

  render() {
    if (this.props.isLoading){
      return (
        <View><Text>LOADING!!</Text></View>
      )
    } else {
      // <MapView.Marker
      //   key={idx}
      //   coordinate={ {latitude: coord.lat, longitude: coord.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421} }
      //   onPress={() => this.animate({latitude: coord.lat, longitude: coord.lng}, 1) }
      //   >
      //     <MapView.Callout onPress={() => this.routeCoords(null, coord) } >
      //       <Text>Click to route here!</Text>
      //     </MapView.Callout>
      // </MapView.Marker>
      // <View style={ styles.button }>
      //   <LeavingButton saveLocation={ this.saveLocation } />
      //   <FindButton findParking={ this.findParking } />
      //   {this.props.coords.length > 0 ? <ClearButton style={ styles.clear } clearParking={ this.clearParking }/> : null}
      // </View>
      const markers = this.props.coords.map((coord, idx) => {
        return (
          <Marker key={idx} animate={this.animate} routeCoords={this.routeCoords} coord={coord} />
        )
      })
      return(
      <View>
        <MapView
          style={ styles.map }
          ref="map"
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={ true }
          showsMyLocationButton={ true }
          showsTraffic={ true }
          customMapStyle={ Silver }
          initialRegion={ this.props.region }
          onRegionChange={ this.onRegionChange }
          onPress={ this.clearMarkers }
          onLongPress={ this.handleLongPress }
          >
            {this.props.route.length > 0 ? <MapView.Polyline coordinates={this.props.route} strokeWidth={5} strokeColor="#232223" /> : null}
            {this.props.longPress.length > 0 ? <Marker animate={this.animate} routeCoords={this.routeCoords} coord={this.props.longPress[0]} /> : null }
            { markers }
        </MapView>
        <View style={ styles.container }>
          <Search animate={ this.animate }/>
          <View style={ styles.overlay }>
            <View style={ styles.overlaySize }>
              <Text style={ styles.text }>lat: {this.props.region.latitude}</Text>
              <Text style={ styles.text }>lng: {this.props.region.longitude}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionButton} >
          <ActionButton buttonColor="#2f3030">
            <ActionButton.Item buttonColor='#727272' title="Leaving" onPress={ this.saveLocation }>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item style={styles.actionButtonText} buttonColor='#727272' title="Find Parking" onPress={ this.findParking }>
              <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
      )
    }
  }
}
const dims = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  map: {
    width: dims.width,
    height: dims.height,
    zIndex: -1
  },
  overlay: {
    backgroundColor: '#2f3030',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    opacity: 0.5,
    marginTop: 37
  },
  text: {
    alignSelf: 'center',
    color: 'white'
  },
  overlaySize: {
    width: dims.width/2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButton: {
    position: 'absolute',
    bottom: 162,
    right: 36
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButtonText: {
    position: 'absolute',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#eee',
    backgroundColor: 'white',
    height: 22,
    top: 17,
    right: 153,
    shadowOpacity: 0.35,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5
  }
})

AppRegistry.registerComponent('MapContainer', () => MapContainer)


function mapStateToProps(state) {
  return {
    region: state.loader.region,
    current: state.loader.current,
    userLoc: state.loader.userLoc,
    coords: state.loader.coords,
    route: state.loader.route,
    marker: state.loader.marker,
    isLoading: state.loader.isLoading,
    longPress: state.loader.longPress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

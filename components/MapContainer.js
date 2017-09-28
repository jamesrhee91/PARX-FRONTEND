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
import ActionButtonContainer from './ActionButtonContainer'
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
    this.props.sendData(this.props.userLoc.latitude, this.props.userLoc.longitude)
  }

  findParking = () => {
    this.props.getData(this.props.search)
  }

  clearMarkers = (e) => {
    if (!e.nativeEvent.action) {
      this.props.clearCoords()
      this.props.clearPoint()
      this.props.dispatchSearchMarker({})
    }
  }

  routeCoords = (e, coord) => {
    const start = `${this.props.userLoc.latitude}, ${this.props.userLoc.longitude}`
    const dest = `${coord.lat}, ${coord.lng}`
    this.props.getDirections(start, dest)
    this.props.setRoute(coord)
    this.props.clearPoint()
    this.props.dispatchSearchMarker({})
  }

  animate = (coords, duration) => {
    this.refs.map.animateToCoordinate(coords, duration)
  }
  searchAnimate = (coords, duration) => {
    this.refs.map.animateToCoordinate(coords, duration)
    this.props.dispatchSearchMarker(coords)
  }

  handleLongPress = (e) => {
    this.props.dispatchLongPress(e.nativeEvent.coordinate)
    this.props.searchLocation(e.nativeEvent.coordinate)
    this.props.clearCoords()
    this.props.dispatchSearchMarker({})
  }

  render() {
    // const { navigate } = this.props.navigation

    if (this.props.isLoading){
      return (
        <View><Text>LOADING!!</Text></View>
      )
    } else {
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

            {this.props.longPress.latitude ? <MapView.Marker pinColor='#232223' coordinate={this.props.longPress} onPress={() => this.animate(this.props.longPress, 300)}></MapView.Marker> : null}

            {this.props.searchMarker.latitude ? <MapView.Marker pinColor='#232223' coordinate={this.props.searchMarker} onPress={() => this.animate(this.props.searchMarker, 300)}></MapView.Marker> : null}

            { markers }
        </MapView>
        <View style={ styles.container }>          
          <Search searchAnimate={ this.searchAnimate } onPress={() => navigate('Search')}/>
        </View>
        <ActionButtonContainer saveLocation={this.saveLocation} findParking={this.findParking} />
      </View>
      )
    }
  }
}
{/* <View style={ styles.textInput }>
  <Button title="SEARCH" onPress={() => navigate('Search')}/>
</View> */}

{/* <View style={ styles.overlay }>
  <View style={ styles.overlaySize }>
    <Text style={ styles.text }>lat: {this.props.region.latitude}</Text>
    <Text style={ styles.text }>lng: {this.props.region.longitude}</Text>
  </View>
</View> */}

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
  textInput: {
    marginTop: 25,
    marginLeft: 9,
    marginRight: 9,
    height: 42,
    color: '#5d5d5d',
    fontSize: 16,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    borderRadius: 0,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth:0,
    height: 67
  }
})

AppRegistry.registerComponent('MapContainer', () => MapContainer)


function mapStateToProps(state) {
  return {
    region: state.loader.region,
    search: state.loader.search,
    userLoc: state.loader.userLoc,
    searchMarker: state.loader.searchMarker,
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

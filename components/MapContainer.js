import React, { Component } from 'react'
import Silver from '../mapStyles/Silver.json'
import Dark from '../mapStyles/Dark.json'
import Night from '../mapStyles/Night.json'
import Retro from '../mapStyles/Retro.json'
import * as locationActions from '../actions/location'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button, Easing } from 'react-native'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Drawer from 'react-native-drawer-menu'
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

  openMenu = () => {
    this.refs.drawer.openLeftDrawer()
  }

  render() {
    const { navigate } = this.props.navigation

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
      var drawerContent = (<View style={styles.drawerContent}>
        <View style={styles.leftTop}/>
          <View style={styles.leftBottom}>
            <View style={{backgroundColor: 'white', height: '100%'}}><Text>Drawer Content</Text></View>
          </View>
        </View>);
      // customize drawer's style (Optional)
      var customStyles = {
        drawer: {
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10
        },
        mask: {}, // style of mask if it is enabled
        main: {} // style of main board
      }
      return(
        <Drawer
          ref="drawer"
          style={styles.container}
          drawerWidth={300}
          drawerContent={drawerContent}
          type={Drawer.types.Overlay}
          customStyles={{drawer: styles.drawer}}
          drawerPosition={Drawer.positions.Left}
          onDrawerOpen={() => {console.log('Drawer is opened');}}
          onDrawerClose={() => {console.log('Drawer is closed')}}
          easingFunc={Easing.ease}
        >
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
              <View style={ styles.searchBar }>
                <View style={ styles.menu }>
                  <Icon onPress={ this.openMenu } size={29} name="ios-menu-outline" style={ styles.icon } />
                </View>
                <View style={ styles.textContainer }>
                  <Text style={ styles.textInput } onPress={() => navigate('Search')}>Enter Location</Text>
                </View>
              </View>
            </View>
            <ActionButtonContainer saveLocation={this.saveLocation} findParking={this.findParking} />
          </View>
      </Drawer>
      )
    }
  }
}

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
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 33,
    marginLeft: 9,
    marginRight: 9,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    backgroundColor: 'white'
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%'
  },
  textInput: {
    color: '#a8a8a8',
    fontSize: 15,
    padding: 15
  },
  textContainer: {
    width: '85%'
  },
  icon: {
    paddingLeft: 22,
    paddingRight:10,
    paddingBottom: 7,
    paddingTop: 9
  },
  leftTop: {
    backgroundColor: 'white'
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

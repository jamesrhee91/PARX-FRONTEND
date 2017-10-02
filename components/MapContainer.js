import React, { Component } from 'react'
import Silver from '../mapStyles/Silver.json'
import Dark from '../mapStyles/Dark.json'
import Night from '../mapStyles/Night.json'
import Retro from '../mapStyles/Retro.json'
import * as locationActions from '../actions/location'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button, Easing, TouchableOpacity, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { bindActionCreators } from 'redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'
import Drawer from 'react-native-drawer-menu'
import ActionButtonContainer from './ActionButtonContainer'
import Marker from './Marker'
import CurrentLocationButton from './CurrentLocationButton'
import styles from '../styleSheet/styles'


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
      this.refs.search._onBlur()
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

  openMenu = () => {
    this.refs.drawer.openLeftDrawer()
  }

  currentLocation = () => {
    // this.props.fetchLocation()
    console.log("CURRENT LOCATION");
  }

  handleLongPress = (e) => {
    this.props.dispatchLongPress(e.nativeEvent.coordinate)
    this.props.searchLocation(e.nativeEvent.coordinate)
    this.props.clearCoords()
    this.props.dispatchSearchMarker({})
  }

  handleSearch = (details) => {
    const coords = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
    this.searchAnimate(coords, 1000)
    this.props.searchLocation(coords)
    this.props.clearCoords()
    this.props.clearPoint()
  }

  render() {
    // const { navigate } = this.props.navigation
    if (this.props.isLoading){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
          <Text>LOADING!!</Text>
        </View>
      )
    } else {
      const markers = this.props.coords.map((coord, idx) => {
        return (
          <Marker key={idx} animate={this.animate} routeCoords={this.routeCoords} coord={coord} />
        )
      })
      let drawerContent = (
        <View style={{backgroundColor: 'white', height: '100%'}}>

          {/* view for username */}
          <View style={ styles.drawerProfileView }>
            <View style={ styles.drawerLogo }>
              <Text style={ styles.drawerLogoText }>P A R X</Text>
            </View>

            <View style={ styles.drawerPicView }>
              <Image source={require('../assets/image/auggie.png')} style={ styles.drawerPic } />
            </View>
            <View style={ styles.drawerEmailView }>
              <Text style={ styles.drawerEmailText }>
                james.rhee@flatironschool.com
              </Text>
            </View>
          </View>

          {/* view for option 1 */}
          <TouchableOpacity onPress={() => console.log("RECENT WAS PRESSED")} style={ styles.drawerOptionCont }>
            <View style={ styles.drawerOptionView }>
              <Icon size={22} name="ios-download" />
            </View>
            <Text style={ styles.drawerOptionText }>Recent</Text>
          </TouchableOpacity>

          {/* view for option 2 */}
          <TouchableOpacity onPress={() => console.log("PLACES WAS PRESSED")} style={ styles.drawerOptionCont }>
            <View style={ styles.drawerOptionView }>
              <Icon size={22} name="md-pin" />
            </View>
            <Text style={ styles.drawerOptionText }>Your places</Text>
          </TouchableOpacity>

          {/* view for option 3 */}
          <TouchableOpacity onPress={() => console.log("EDIT WAS PRESSED")} style={ styles.drawerOptionCont }>
            <View style={ styles.drawerOptionView }>
              <Icon size={22} name="ios-create" />
            </View>
            <Text style={ styles.drawerOptionText }>Edit profile</Text>
          </TouchableOpacity>

          <View style={ styles.drawerLines }></View>

          <View style={ styles.drawerMenuCont }>
            <View style={ styles.drawerMenuView }>
              <TouchableOpacity onPress={() => console.log("SETTINGS WAS PRESSED")} style={ styles.drawerMenuTouch }>
                <Text style={ styles.drawerMenuText }>
                  Settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("LOGOUT WAS PRESSED")} style={ styles.drawerMenuTouch }>
                <Text style={ styles.drawerMenuText }>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.drawerLines }></View>

          <View>
            <View style={ styles.drawerTierView }>
              <Text style={ styles.drawerTierTitle }>Tier: </Text>
              <Text style={ styles.drawerTierDesc }>Platinum</Text>
            </View>
            <View style={ styles.drawerTierView }>
              <Text style={ styles.drawerTierTitle }>Karma: </Text>
              <Text style={ styles.drawerTierDesc }>3754</Text>
            </View>
          </View>
        </View>
      )
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
          drawerWidth={270}
          drawerContent={drawerContent}
          type={Drawer.types.Overlay}
          customStyles={{drawer: customStyles.drawer}}
          drawerPosition={Drawer.positions.Left}
          onDrawerOpen={() => {console.log('Drawer is opened');}}
          onDrawerClose={() => {console.log('Drawer is closed')}}
          easingFunc={Easing.ease}
        >

            <MapView
              style={ styles.map }
              ref="map"
              provider={ PROVIDER_GOOGLE }
              showsUserLocation={ true }
              showsMyLocationButton={ false }
              showsTraffic={ false }
              customMapStyle={ Silver }
              initialRegion={ this.props.region }
              onRegionChange={ this.onRegionChange }
              onPress={ this.clearMarkers }
              onLongPress={ this.handleLongPress }
              onFocus={() => console.log("FOCUSING")}
              >
                {this.props.route.length > 0 ? <MapView.Polyline coordinates={this.props.route} strokeWidth={5} strokeColor="#232223" /> : null}

                {this.props.longPress.latitude ? <MapView.Marker pinColor='#232223' coordinate={this.props.longPress} onPress={() => this.animate(this.props.longPress, 300)}></MapView.Marker> : null}

                {this.props.searchMarker.latitude ? <MapView.Marker pinColor='#232223' coordinate={this.props.searchMarker} onPress={() => this.animate(this.props.searchMarker, 300)}></MapView.Marker> : null}

                { markers }
            </MapView>
            <View style={ styles.container }>
              <View style={ styles.searchBar }>
                <GooglePlacesAutocomplete
                  ref='search'
                  placeholder='Enter Location'
                  minLength={3}
                  autoFocus={false}
                  listViewDisplayed='auto'
                  fetchDetails={true}
                  renderDescription={row => row.description}
                  onPress={(data, details = null) => {
                    this.handleSearch(details)
                  }}
                  query={{
                    key: 'AIzaSyB-cZIUj0WhKunsFb-hL_D_BRcDpi_ENlg',
                    language: 'en'
                  }}
                  styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView
                  }}
                  nearbyPlacesAPI='GoogleReverseGeocoding'
                  debounce={200}
                  renderLeftButton={() => {
                    return (
                      <TouchableOpacity onPress={ this.openMenu }>
                        <Icon size={29} name="ios-menu-outline" style={ styles.icon } />
                      </TouchableOpacity>
                  )}}
                />
              </View>
              {/* <Search searchAnimate={ this.searchAnimate } openMenu={ this.openMenu } /> */}
              {/* <View style={ styles.searchBar }>
                <View style={ styles.menu }>
                  <Icon onPress={ this.openMenu } size={29} name="ios-menu-outline" style={ styles.icon } />
                </View>
                <View style={ styles.textContainer }>
                  <Text style={ styles.textInput } onPress={() => navigate('Search')}>Enter Location</Text>
                </View>
              </View> */}
              <CurrentLocationButton currentLocation={ this.currentLocation } />
            </View>
            <ActionButtonContainer saveLocation={this.saveLocation} findParking={this.findParking} />
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

import React, { Component } from 'react'
import { Text, View, Dimensions, Easing, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Silver, Dark, Night, Retro } from '../mapStyles/customMapStyles'
import styles from '../styleSheet/styles'
import * as locationActions from '../actions/location'
import Icon from 'react-native-vector-icons/Ionicons'
import Drawer from 'react-native-drawer-menu'
import ActionButtonContainer from './ActionButtonContainer'
import CurrentLocationButton from './CurrentLocationButton'
import Marker from './Marker'


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

  routeCoords = (coord) => {
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
    this.refs.search._onBlur()
  }

  currentLocation = () => {
    this.refs.map.animateToCoordinate(this.props.userLoc, 500)
    this.props.searchLocation(this.props.userLoc)
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

  handleRecent = () => {
    this.refs.drawer.closeDrawer()
    this.props.recentlySaved()
    const {navigate} = this.props.navigation
    navigate('Recent')
  }

  handlePlaces = () => {
    console.log("Hitting Your places");
  }

  handleEdit = () => {
    console.log("Hitting Edit profile");
  }

  render() {
    if (this.props.isLoading){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'ArchivoBlack-Regular', color: 'black' }}>Loading...</Text>
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
              <Image source={require('../assets/image/user.png')} style={ styles.drawerPic } />
            </View>
            <View style={ styles.drawerEmailView }>
              <Text style={ styles.drawerEmailText }>
                james.rhee@domain.com
              </Text>
            </View>
          </View>

          <ScrollView>
            {/* view for option 1 */}
            <TouchableOpacity onPress={ this.handleRecent } style={ styles.drawerOptionCont }>
              <View style={ styles.drawerOptionView }>
                <Icon size={22} name="ios-download" />
              </View>
              <Text style={ styles.drawerOptionText }>Recent</Text>
            </TouchableOpacity>

            {/* view for option 2 */}
            <TouchableOpacity onPress={ this.handlePlaces } style={ styles.drawerOptionCont }>
              <View style={ styles.drawerOptionView }>
                <Icon size={22} name="md-pin" />
              </View>
              <Text style={ styles.drawerOptionText }>Your places</Text>
            </TouchableOpacity>

            {/* view for option 3 */}
            <TouchableOpacity onPress={ this.handleEdit } style={ styles.drawerOptionCont }>
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

            <View style={ styles.drawerTierView }>
              <Text style={ styles.drawerTierTitle }>Tier: </Text>
              <Text style={ styles.drawerTierDesc }>Platinum</Text>
            </View>
            <View style={ styles.drawerTierView }>
              <Text style={ styles.drawerTierTitle }>Karma: </Text>
              <Text style={ styles.drawerTierDesc }>3754</Text>
            </View>
          </ScrollView>
        </View>
      )
      return(
        <Drawer
          ref="drawer"
          drawerWidth={270}
          drawerContent={drawerContent}
          type={Drawer.types.Overlay}
          customStyles={{drawer: styles.drawer}}
          drawerPosition={Drawer.positions.Left}
          easingFunc={Easing.ease}
        >
          <MapView
            style={ styles.map }
            ref="map"
            provider={ PROVIDER_GOOGLE }
            showsUserLocation={ true }
            showsMyLocationButton={ false }
            showsTraffic={ true }
            customMapStyle={ Retro }
            initialRegion={ this.props.region }
            onRegionChange={ this.onRegionChange }
            onPress={ this.clearMarkers }
            onLongPress={ this.handleLongPress }
            onFocus={() => console.log("FOCUSING")}
            >
              {this.props.route.length > 0 ? <MapView.Polyline coordinates={this.props.route} strokeWidth={5} strokeColor="#232223" /> : null}

              {this.props.longPress.latitude ? <Marker mode={true} color="#232223" saveLocation={this.saveLocation} animate={this.animate} coord={ {lat: this.props.longPress.latitude, lng: this.props.longPress.longitude} } routeCoords={this.routeCoords}></Marker> : null}

              {this.props.searchMarker.latitude ? <Marker mode={true} color="#232223" saveLocation={this.saveLocation} animate={this.animate} coord={ {lat: this.props.searchMarker.latitude, lng: this.props.searchMarker.longitude} } routeCoords={this.routeCoords}></Marker> : null}

              { markers }
          </MapView>
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
                        <Icon size={29} name="ios-menu-outline" style={ styles.menuIcon } />
                      </TouchableOpacity>
                  )}}
                />
          </View>
          <CurrentLocationButton currentLocation={ this.currentLocation } />
          <ActionButtonContainer saveLocation={this.saveLocation} findParking={this.findParking} />
        </Drawer>
      )
    }
  }
}

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

import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as locationActions from '../actions/location'



class Search extends Component {

  handlePress = (details) => {
    const coords = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
    this.props.regionComplete(coords)
    this.props.animate(coords, 1000)
  }
  render() {
    // <SearchBar
    //   round
    //   onChangeText={ this.handleChange }
    //   placeholder='Search...' />
    const homePlace = { description: 'Home', geometry: { location: { lat: 40.763774, lng: -73.926112 } }};

    return (
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        this.handlePress(details)
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyB-cZIUj0WhKunsFb-hL_D_BRcDpi_ENlg',
        language: 'en', // language of the results
        types: '' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={[]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
    )
  }
}

function mapStateToProps(state) {
  return {
    current: state.loader.current
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

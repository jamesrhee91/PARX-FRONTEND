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
    this.props.searchLocation(coords)
    this.props.searchAnimate(coords, 1000)
    this.props.clearCoords()
    this.props.clearPoint()
  }
  render() {
    // const {navigate} = this.props.navigation
    // <Button title="GO TO MAP" onPress={() => navigate('Map')}/>
    return (
      <View>
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={3}
        autoFocus={false}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          this.handlePress(details)
        }}
        query={{
          key: 'AIzaSyB-cZIUj0WhKunsFb-hL_D_BRcDpi_ENlg',
          language: 'en'
        }}

        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
            height: 67
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
            borderRadius: 0
          },
          listView: {
            position: 'absolute',
            top: 67,
            left: 9,
            right: 9,
            backgroundColor: 'white',
            opacity: 0.8
          }
        }}

        nearbyPlacesAPI='GoogleReverseGeocoding'
        debounce={200}
      />
    </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Search)

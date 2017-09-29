import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import * as locationActions from '../actions/location'

class Search extends Component {

  handlePress = (details) => {
    console.log("DETAILS", details);
    const coords = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
    this.props.searchLocation(coords)
    this.props.searchAnimate(coords, 1000)
    this.props.clearCoords()
    this.props.clearPoint()
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={ styles.container }>
        <View style={ styles.searchBar }>
          <View>
            <Icon onPress={() => console.log("BACK ARROW PRESSED")} size={29} name="md-arrow-back" style={ styles.icon } />
          </View>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={3}
            autoFocus={true}
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
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.listView
            }}

            nearbyPlacesAPI='GoogleReverseGeocoding'
            debounce={200}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRadius: 0,
    flex: 1
  },
  textInput: {
    color: '#a8a8a8',
    fontSize: 15,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 9,
    marginLeft: 11,
    marginBottom: 10,
    padding: 15,
    alignSelf: 'center'
  },
  listView: {
    position: 'absolute',
    top: 49,
    left: -51,
    right: 1,
    backgroundColor: 'white',
    opacity: 0.8
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
  icon: {
    paddingLeft: 22,
    paddingRight:10,
    paddingBottom: 7,
    paddingTop: 9
  }
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Search)

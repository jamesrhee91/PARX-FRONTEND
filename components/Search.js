import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../styleSheet/styles'
import { Silver, Dark, Night, Retro } from '../mapStyles/customMapStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import * as locationActions from '../actions/location'


class Search extends Component {

  handlePress = (details) => {
    const coords = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
  }

  handleBlur = () => {
    this.refs.search.triggerBlur()
  }

  render() {
    return (
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
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Search)

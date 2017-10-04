import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Dimensions, Easing, TouchableOpacity, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import Location from './Location'



class LocationsList extends Component {

    render() {
      console.log("state", this.props.locations);
      return (
        <FlatList data={this.props.locations} renderItem={(loc, idx) => <Location key={idx} location={loc.item} /> } />
      )
    }
}

function mapStateToProps(state) {
  return {
    locations: state.loader.locations
  }
}

export default connect(mapStateToProps)(LocationsList)

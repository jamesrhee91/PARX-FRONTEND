import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Dimensions, Easing, TouchableOpacity, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import * as swipeActions from '../actions/swipe'
import { bindActionCreators } from 'redux'
import styles from '../styleSheet/styles'

class Location extends Component {

  delete = (id) => {
    this.refs.swipe.closeRow()
    this.props.deleteLocation(id)
  }

  render() {
    return (
      <SwipeRow
        ref="swipe"
        rightOpenValue={-75}
        disableRightSwipe={true}
        tension={50}
        >
        <TouchableOpacity onPress={() => this.delete(this.props.location.id)} style={ styles.deleteView }>
          <View style={ styles.deleteTrash }>
            <Icon color="white" size={35} name="ios-trash-outline" />
          </View>
        </TouchableOpacity>
        <View style={ styles.listContent }>
          <Text>Saved on {this.props.location.time}</Text>
          <Text>Latitude: {this.props.location.lat}, Longitude: {this.props.location.lng}</Text>
          {/* <Text>ID {this.props.location.id}</Text> */}
        </View>
      </SwipeRow>
    )
  }
}

// export default Location

// function mapStateToProps(state) {
//   return {
//     locations: state.loader.locations
//   }
// }
//
function mapDispatchToProps(dispatch) {
  return bindActionCreators(swipeActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Location)

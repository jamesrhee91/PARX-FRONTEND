import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from '../styleSheet/styles'

const CurrentLocationButton = ({ currentLocation }) => {
  return (
    <TouchableOpacity onPress={ currentLocation } style={ styles.currentButton } activeOpacity={0.8}>
      <Icon size={25} name="md-locate" style={{ color: '#2f3030'}} />
    </TouchableOpacity>
  )
}


export default CurrentLocationButton

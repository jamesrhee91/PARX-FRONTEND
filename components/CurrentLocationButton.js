import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CurrentLocationButton = ({ currentLocation }) => {
  return (
    <TouchableOpacity onPress={ currentLocation } style={{ height: 56, width: 56, backgroundColor: 'red', borderRadius: 30 }}>
    </TouchableOpacity>
  )
}


export default CurrentLocationButton

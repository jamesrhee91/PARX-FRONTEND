import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

const FindButton = ({ findParking }) => {

  const handlePress = () => {
    console.log('FIND PARKING WAS PRESSED')
    findParking()
  }

  return (
    <RectangleButton
      onPress={ handlePress }
      text="Find"
    >
    </RectangleButton>
  )
}

export default FindButton

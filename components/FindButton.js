import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

const FindButton = ({ findParking }) => {

  const handlePress = () => {
    console.log('FIND PARKING WAS PRESSED')
    findParking()
  }

  // <RectangleButton
  //   onPress={ handlePress }
  //   text="Find"
  //   >
  //   </RectangleButton>
  return (
    <ButtonComponent
      text="Find"
      type="primary"
      shape="rectangle"
      backgroundColors={['#2f3030', '#b8bcbc']}
      gradientStart={{ x: 0.5, y: 1 }}
      gradientEnd={{ x: 1, y: 1 }}
      onPress={ handlePress }
    >
    </ButtonComponent>
  )
}

export default FindButton

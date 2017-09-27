import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

const ClearButton = ({ clearParking }) => {

  const handlePress = () => {
    clearParking()
  }

  return (
    <RectangleButton
      text={ "Clear" }
      onPress={ handlePress }
      >
    </RectangleButton>
  )
}

export default ClearButton

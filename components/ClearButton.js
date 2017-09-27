import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

const ClearButton = ({ clearParking }) => {

  const handlePress = () => {
    clearParking()
  }

  // <RectangleButton
  //   text={ "Clear" }
  //   onPress={ handlePress }
  //   >
  //   </RectangleButton>
  return (
    <ButtonComponent
      text="Clear results"
      type="primary"
      shape="rectangle"
      backgroundColors={['#39d1e5', '#b8bcbc']}
      gradientStart={{ x: 0.5, y: 1 }}
      gradientEnd={{ x: 1, y: 1 }}
      onPress={ handlePress }
    >
    </ButtonComponent>
  )
}

export default ClearButton

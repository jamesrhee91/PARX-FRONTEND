import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

const LeavingButton = ({ saveLocation }) => {

  const handlePress = () => {
    console.log('LEAVING WAS PRESSED', saveLocation)
    saveLocation()
  }

  return (
    <RectangleButton
      onPress={ handlePress }
      text={ 'Leaving' }
    >
    </RectangleButton>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    height: 10,
    width: 100
  },
  button: {
    position: 'relative',
    top: 100
  }
})


export default LeavingButton

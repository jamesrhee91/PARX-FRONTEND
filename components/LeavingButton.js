import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'

const LeavingButton = ({ saveLocation }) => {

  const handlePress = () => {
    console.log('LEAVING WAS PRESSED', saveLocation)
    // saveLocation()
  }

  return (
    <View>
      <Button iconLeft onPress={ handlePress } >
        <Icon name='home' />
        <Text style={{color: 'white'}}>Home</Text>
      </Button>
    </View>
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
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end"
  }
})


export default LeavingButton

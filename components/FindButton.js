import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'

const FindButton = ({ findParking }) => {

  const handlePress = () => {
    console.log('FIND PARKING WAS PRESSED')
    findParking()
  }

  return (
    <View>
      <Button rounded success right onPress={ handlePress } >
        <Text style={{color: 'white'}}>Find Parking</Text>
      </Button>
    </View>
  )
}

export default FindButton

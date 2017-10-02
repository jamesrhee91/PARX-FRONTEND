import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'



const ActionButtonContainer = ({ saveLocation, findParking }) => {

  const handleLeaving = () => {
    console.log("LEAVING WAS PRESSED");
    saveLocation()
  }

  const handleFind = () => {
    console.log("FIND PARKING WAS PRESSED");
    findParking()
  }

  return (
    <View style={styles.actionButton} >
      <ActionButton buttonColor="#2f3030" degrees={135}>
        <ActionButton.Item buttonColor='#727272' title="Leaving" onPress={ handleLeaving }>
          <Icon name="md-car" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#727272' title="Find Parking" onPress={ handleFind }>
          <Icon name="md-search" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    position: 'relative',
    bottom: 162,
    right: -20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})


export default ActionButtonContainer

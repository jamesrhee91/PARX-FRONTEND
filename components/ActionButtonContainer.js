import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from '../styleSheet/styles'


const ActionButtonContainer = ({ saveLocation, findParking }) => {

  const handleLeaving = () => {
    saveLocation()
  }

  const handleFind = () => {
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


export default ActionButtonContainer

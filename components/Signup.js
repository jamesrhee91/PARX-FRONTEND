import React, { Component } from 'react'
import { Text, View, Dimensions, Easing, TouchableOpacity, Image, ScrollView, Link } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import styles from '../styleSheet/styles'

export default class Signup extends Component {

  constructor() {
    super()
    this.state = {
      error: false,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  handleFirstName = (input) => {
    this.setState({
      firstName: input
    })
  }

  handleLastName = (input) => {
    this.setState({
      lastName: input
    })
  }

  handleEmailChange = (input) => {
    this.setState({
      email: input
    })
  }

  handlePasswordChange = (input) => {
    this.setState({
      password: input
    })
  }

  handleSubmit = () => {
    let data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      })
    }
    // fetch('http://localhost:3000/api/v1/users', data)
    fetch('https://parx-api.herokuapp.com/api/v1/users', data)
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          this.setState({
            error: true
          })
        } else {
          this.setState({
            error: false
          })
          this.props.navigation.navigate('Map')
        }
      })
      .catch(error => console.log("Error at Signup Submit", error))
  }

  handleLogin = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
        <View style={{height: '100%', width: '80%', backgroundColor: 'white'}}>
          <View style={{height: '20%', width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 50, marginTop: 40, fontFamily: 'ArchivoBlack-Regular'}}>Signup</Text>
          </View>
          <View style={{height: '65%', width: '100%', backgroundColor: 'white'}}>
            <FormLabel>First Name</FormLabel>
            <FormInput onChangeText={this.handleFirstName} value={this.state.firstName} autoCorrect={false}/>
            <FormLabel>Last Name</FormLabel>
            <FormInput onChangeText={this.handleLastName} value={this.state.lastName} autoCorrect={false}/>
            <FormLabel>Email</FormLabel>
            <FormInput autoCapitalize="none" onChangeText={this.handleEmailChange} value={this.state.email} autoCorrect={false}/>
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={this.handlePasswordChange} value={this.state.password} autoCorrect={false}/>
            <FormValidationMessage>{this.state.error ? 'Email is already in use' : null}</FormValidationMessage>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity onPress={this.handleSubmit} style={ styles.loginButton }>
                <Text style={{color: 'white', fontSize: 16}}>Create an Account</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.handleLogin} style={{alignItems: 'center', marginTop: 10, height: 30}}>
              <Text>Already have an account? Login Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

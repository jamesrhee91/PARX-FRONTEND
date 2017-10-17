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

  handleEmailChange = (input) => {
    this.setState({
      email: input
    })
  }

  handlePasswordChange = (input) => {
    console.log(input);
    this.setState({
      password: input
    })
  }

  handleSubmit = () => {
    
  }

  handleLogin = () => {
    const {goBack} = this.props.navigation
    goBack()
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
            <FormLabel>Confirm Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={this.handlePasswordChange} value={this.state.password} autoCorrect={false}/>
            <FormValidationMessage>{this.state.error ? 'Username or Password is incorrect' : null}</FormValidationMessage>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity style={ styles.loginButton }>
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

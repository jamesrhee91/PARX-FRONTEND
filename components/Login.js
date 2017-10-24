import React, { Component } from 'react'
import { Text, View, Dimensions, Easing, TouchableOpacity, Image, ScrollView, Link } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import styles from '../styleSheet/styles'

export default class Login extends Component {

  constructor() {
    super()
    this.state = {
      error: false,
      email: '',
      password: ''
    }
  }

  navigate = (param) => {
    return this.props.navigation.navigate(param)
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
    // this.props.verifyLogin(this.state.email, this.state.password)
    let data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    }
    // fetch('http://localhost:3000/api/v1/login', data)
    fetch('https://parx-api.herokuapp.com/api/v1/login', data)
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
          this.navigate('Map')
        }
      })
      .catch(error => console.log("Error at Login Submit", error))
  }

  handleSignup = () => {
    this.navigate('Signup')
  }

  render() {
    return (
      <View style={{height: '100%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: '80%', width: '80%', backgroundColor: 'white'}}>
          <View style={{height: '35%', width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 50, marginTop: 40, fontFamily: 'ArchivoBlack-Regular'}}>P A R X</Text>
          </View>
          <View style={{height: '65%', width: '100%', backgroundColor: 'white'}}>
            <FormLabel>Email</FormLabel>
            <FormInput autoCapitalize="none" onChangeText={this.handleEmailChange} value={this.state.email} autoCorrect={false}/>
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={this.handlePasswordChange} value={this.state.password} autoCorrect={false}/>
            <FormValidationMessage>{this.state.error ? 'Email or Password is incorrect' : null}</FormValidationMessage>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity onPress={this.handleSubmit} style={ styles.loginButton }>
                <Text style={{color: 'white', fontSize: 16}}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.handleSignup} style={{alignItems: 'center', marginTop: 10, height: 30}}>
              <Text>New to us? Signup Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

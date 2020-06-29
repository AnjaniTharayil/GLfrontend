import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: ''

    }
  }

  onClickListener = (id) => {
    const url = "http://10.0.2.2:8000/api/auth/register/";
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        username: this.state.email,
        password:this.state.password ,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        this.props.navigation.navigate('Login')

      })
      .catch((error) => {
        console.error(error);
      });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <Text style={styles.titletext}>User Registration</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              ref='firstname'
              placeholder="First Name"
              keyboardType="default"
              underlineColorAndroid='transparent'
              autoFocus={true}
              onSubmitEditing={() => {
                this.refs.lastname.focus();
              }}
              onChangeText={(firstname) => this.setState({ firstname })} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              ref='lastname'
              placeholder="Last Name"
              keyboardType="default"
              underlineColorAndroid='transparent'
              autoFocus={true}
              onSubmitEditing={() => {
                this.refs.email.focus();
              }}
              onChangeText={(lastname) => this.setState({ lastname })} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              ref='email'
              placeholder="Email(Username)"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoFocus={true}
              onSubmitEditing={() => {
                this.refs.password.focus();
              }}
              onChangeText={(email) => this.setState({ email })} />
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              ref='password'
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              // autoFocus={true}
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('register')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableHighlight>
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3268a8',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height
  },
  title: {
    marginTop: Dimensions.get('window').height / 8,
    backgroundColor: '#fff',
    padding: 10,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3268a8',
    borderWidth: 5,
    borderRadius: 10,
    marginBottom: 50
  },
  titletext: {
    color: '#3268a8',
    fontSize: 20,
    fontWeight: 'bold'
  },

  inputContainer: {
    width: Dimensions.get('window').width - 100,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    borderBottomColor: '#3268a8',
    borderBottomWidth: 1,
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: Dimensions.get('window').width - 100,
},
 
  registerButton: {
    backgroundColor: '#3268a8',

  },
  registerText: {
    color: 'white',
  }
});

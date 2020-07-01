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
import { RNToasty } from 'react-native-toasty'


export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      emailerror: 'Email is Not Valid',
      passworderror: 'Password is Not Valid',
      email_error_status: false,
      password_error_status: false,
      fn_error: 'First Name is Not Valid',
      ln_error: 'Last Name is Not Valid',
      fn_error_status: false,
      ln_error_status: false

    }
  }

  onClickListener = (id) => {
    this.validatePassword(this.state.password)
    this.validateLastname(this.state.lastname)
    this.validateFirstname(this.state.firstname)
    this.validateEmail(this.state.email)
    if (this.state.emailerror == '' && this.state.passworderror == '', this.state.fn_error == '', this.state.ln_error == '') {

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
          password: this.state.password,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson);
          RNToasty.Success({
            title: 'Registered Successfully',
          });
          this.props.navigation.navigate('Login')

        })
        .catch((error) => {
          console.error(error);
          RNToasty.Error({
            title: 'Error',
          });
        });
    }
    else {
      RNToasty.Error({
        title: 'Inavlid',
      });

    }
  }

  validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (text === '') {
      this.setState({ email: text, emailerror: 'Email is Required', email_error_status: true })
    }
    else if (reg.test(text) === false) {
      this.setState({ email: text, emailerror: 'Email is Not Valid', email_error_status: true })
      return false;
    }
    else {
      this.setState({ email: text, emailerror: '', email_error_status: false })
    }
  }
  validatePassword = (text) => {
    if (text === '') {
      this.setState({ password: text, passworderror: "Password is Required", password_error_status: true })
      return false;
    }
    else {
      this.setState({ password: text, passworderror: '', password_error_status: false })
    }
  }
  validateFirstname = (text) => {
    let reg = /^[a-zA-Z_]{1,20}$/;
    if (text === '') {
      this.setState({ firstname: text, fn_error: "First Name is Required", fn_error_status: true })
      return false;
    }
    else if (reg.test(text) === false) {
      this.setState({ firstname: text, fn_error: 'First Name is Not Valid', fn_error_status: true })
      return false;
    }
    else {
      this.setState({ firstname: text, fn_error: '', fn_error_status: false })
    }
  }
  validateLastname = (text) => {
    let reg = /^[a-zA-Z_]{1,20}$/;
    if (text === '') {
      this.setState({ lastname: text, ln_error: "Last Name is Required", ln_error_status: true })
      return false;
    }
    else if (reg.test(text) === false) {
      this.setState({ lastname: text, ln_error: 'Last Name is Not Valid', ln_error_status: true })
      return false;
    }
    else {
      this.setState({ lastname: text, ln_error: '', ln_error_status: false })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.title}>
            <Text style={styles.titletext}>User Registration</Text>
          </View>
          <View style={styles.Container}>

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
                onChangeText={(firstname) => this.validateFirstname(firstname)} />
            </View>
            {this.state.fn_error_status == true ? (
              <Text style={styles.errorMessage}>
                {this.state.fn_error}
              </Text>
            ) : null}
          </View>
          <View style={styles.Container}>

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
                onChangeText={(lastname) => this.validateLastname(lastname)} />
            </View>
            {this.state.ln_error_status == true ? (
              <Text style={styles.errorMessage}>
                {this.state.ln_error}
              </Text>
            ) : null}
          </View>
          <View style={styles.Container}>
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
                onChangeText={(email) => this.validateEmail(email)} />
            </View>
            {this.state.email_error_status == true ? (
              <Text style={styles.errorMessage}>
                {this.state.emailerror}
              </Text>
            ) : null}
          </View>
          <View style={styles.Container}>

            <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                ref='password'
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                // autoFocus={true}
                onChangeText={(password) => this.validatePassword(password)} />
            </View>
            {this.state.password_error_status == true ? (
              <Text style={styles.errorMessage}>
                {this.state.passworderror}
              </Text>
            ) : null}
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
  Container: {
    marginBottom: 20
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
    fontWeight: 'bold',
    width: Dimensions.get('window').width / 2,
    textAlign: 'center'

  },

  inputContainer: {
    width: Dimensions.get('window').width - 100,
    height: 45,
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
    marginTop: 10,
    width: Dimensions.get('window').width - 100,
  },

  registerButton: {
    backgroundColor: '#3268a8',

  },
  registerText: {
    color: 'white',
  },
  errorMessage: {
    fontSize: 12,
    color: "red",
  },
});

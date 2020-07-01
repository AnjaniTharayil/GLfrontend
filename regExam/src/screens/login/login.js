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
    Dimensions,
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { RNToasty } from 'react-native-toasty'
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailerror: 'Email is Not Valid',
            passworderror: 'Password is Not Valid',
            is_valid: false,
            message: null,
            error_message: 'Invalid Credentials',
            email_error_status: false,
            password_error_status: false
        }
    }
    saveToken(token) {
        try {
            AsyncStorage.setItem('usertoken', token)
            this.props.navigation.navigate('Home')
            RNToasty.Success({
                title: 'Success',
            });
            this.setState({ password_error_status: false, email_error_status: false })


        } catch (e) {
            console.log(error)
        }
    }
    validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (text === '') {
           
            this.setState({ email: text, emailerror: 'Username Field is required', email_error_status: true })
            return false;
        }
        else
            if (reg.test(text) === false) {
                this.setState({ email: text, emailerror: 'Username is Not Valid', email_error_status: true })
                return false;
            }
            else {
                this.setState({ email: text, emailerror: '', email_error_status: false })
            }
    }
    validatePassword = (text) => {
        if (text === '') {
            this.setState({ password: text, passworderror: "Password Field is Required", password_error_status: true })
            return false;
        }
        else {
            this.setState({ password: text, passworderror: '', password_error_status: false })
        }
    }

    onClickListener() {
        this.validatePassword(this.state.password)
        this.validateEmail(this.state.email)
        if (this.state.emailerror == '' && this.state.passworderror == '') {
            this.setState({ error_message: '' })
            const url = "http://10.0.2.2:8000/api/auth/login/";
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res['token'])
                    if (res['token'] != null)
                        this.saveToken(res['token'])
                    else
                        RNToasty.Error({
                            title: 'Invalid Credentials',
                        });

                })
                .catch((error) => {
                    this.setState({ error_message: error })
                    console.error(error);
                    RNToasty.Error({
                        title: error,
                    });
                });
        }
        else {
            RNToasty.Error({
                title: this.state.error_message,
            });

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titletext}>GL Infotech</Text>
                    </View>
                    <View style={styles.Container}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                ref='email'
                                placeholder="Username"
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
                                onChangeText={(password) => this.validatePassword(password)}
                                onSubmitEditing={() => {
                                    this.refs.password.focus();
                                }} />
                        </View>
                        {this.state.password_error_status == true ? (
                            <Text style={styles.errorMessage}>
                                {this.state.passworderror}
                            </Text>
                        ) : null}
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.registerText}>New User? Register here</Text>
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
        marginBottom: 10
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

    },

    errorMessage: {
        fontSize: 12,
        color: "red",
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
        marginTop: 20,
        width: Dimensions.get('window').width - 100,
    },
    loginButton: {
        backgroundColor: '#3268a8',
    },
    loginText: {
        color: '#fff',
    },
    registerText: {
        color: '#3268a8',
        fontSize: 14

    }
});

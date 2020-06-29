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
import AsyncStorage from '@react-native-community/async-storage'
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            gender: ''

        }
    }
    saveToken(token) {
        try {
            AsyncStorage.setItem('usertoken', token)
            this.props.navigation.navigate('Home')
        } catch (e) {
            console.log(error)
        }
    }
    onClickListener = (viewId) => {

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
                this.saveToken(res['token'])
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
                        <Text style={styles.titletext}>GL Infotech</Text>
                    </View>
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

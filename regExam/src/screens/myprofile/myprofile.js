
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { RNToasty } from 'react-native-toasty'

export default class ProfileCardView extends Component {

    constructor(props) {
        super(props);
    }

    logout() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
        RNToasty.Success({
            title: 'Logout Successfully',
        });

    }
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Image style={styles.profileImage} source={require('../../assets/dummy_image.jpeg')} />
                        <Text style={styles.name}>User Name</Text>
                        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.logout()}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#3268a8'
    },
    container: {
        padding: 20,
    },
    box: {
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2,
        paddingTop: 10
    },
    profileImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    name: {
        fontSize: 35,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    button: {
        width: 60,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: .8,
        shadowOffset: {
            height: 2,
            width: -2
        },
        elevation: 4,
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
    logoutText: {
        color: '#3268a8',
        fontSize: 14

    }
}); 
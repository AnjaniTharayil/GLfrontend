import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Register from '../../src/screens/register/register';
import Login from '../../src/screens/login/login';
import Home from '../../src/screens/home/home';
import UserProfile from '../../src/screens/userprofile/userprofile';
import MyProfile from '../../src/screens/myprofile/myprofile';
import Icon from 'react-native-vector-icons/FontAwesome'
const profileIcon = ({ tintColor }) => (
    <Icon name='user' size={25} color={tintColor} />
)
const myIcon = ({ tintColor }) => (
    <Icon name='file-text' size={25} color={tintColor} />
)
const MyStack = createStackNavigator({
    Home,
    UserProfile,
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
})
const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: MyStack,
        navigationOptions: {
            tabBarIcon: myIcon
        }
    },

    MyProfile: {
        screen: MyProfile,
        navigationOptions: {
            tabBarIcon: profileIcon
        }
    },

}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray'
    }
})
export default createAppContainer(TabNavigator)
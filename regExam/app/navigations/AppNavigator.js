import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginStack from './HomeStack'
import TabNavigator from './TabNavigator'
const AppNavigator = createStackNavigator({
  HOME_STACK: {
    screen: LoginStack
  },
  TAB_NAVIGATION: {
    screen: TabNavigator
  }
}, {
  initialRouteName: 'HOME_STACK',
  headerMode: 'none'
})
export default createAppContainer(AppNavigator)
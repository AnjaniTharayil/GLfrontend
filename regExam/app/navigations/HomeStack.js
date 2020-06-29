
import { createStackNavigator } from 'react-navigation-stack';
import Register from '../../src/screens/register/register';
import Login from '../../src/screens/login/login';
import Home from '../../src/screens/home/home';
import UserProfile from '../../src/screens/userprofile/userprofile';
const HomeStack = createStackNavigator({
    Login,
    Register,
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
})


export default HomeStack

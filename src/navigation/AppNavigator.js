import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
}));

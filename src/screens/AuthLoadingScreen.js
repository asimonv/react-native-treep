import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('user');
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      const { navigation } = this.props;
      navigation.navigate(userToken ? 'App' : 'Auth');
    } catch (e) {
      console.log(e);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

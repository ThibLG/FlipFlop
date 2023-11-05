import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppRegistry} from 'react-native';

import HomeStackNavigator from './Navigation/HomeStack';

import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


const RootNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
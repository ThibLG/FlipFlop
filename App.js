// import { StatusBar } from 'expo-status-bar';

import RootNavigator from './Navigation/HomeStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
      {/* <RootNavigator /> */}
      <NavigationContainer>{ <RootNavigator/> }</NavigationContainer>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}
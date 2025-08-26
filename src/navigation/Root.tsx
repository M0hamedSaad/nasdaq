// In App.js in a new project

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NasdaqBrowser, Splash } from '@screens';
import * as React from 'react';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'NasdaqBrowser'} component={NasdaqBrowser} />
    </Stack.Navigator>
  );
}
export default RootStack;

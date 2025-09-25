import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';

export interface PropsRootStack {
  Home: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default Routes;

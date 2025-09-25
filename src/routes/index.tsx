import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import EnterExpenses from '../screens/EnterExpenses';
import DetailExpense from '../screens/DetailExpense';
import { ParamListBase } from '@react-navigation/native';
import { ExpenseItem } from '../services/data';

export interface PropsRootStack extends ParamListBase {
  Home: undefined;
  EnterExpenses: undefined;
  DetailExpense: { expense: ExpenseItem };
}

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />

      <Screen name="EnterExpenses" component={EnterExpenses} />
      <Screen name="DetailExpense" component={DetailExpense} />
    </Navigator>
  );
};

export default Routes;

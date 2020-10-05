import 'react-native-gesture-handler';
import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import History from './History';
import Calculator from './Calculator';

const MyApp = createStackNavigator({
  Calculator: {screen: Calculator},
  History: {screen: History},
})
const AppContainer = createAppContainer(MyApp);

export default function App() {
  return (
    <AppContainer />
  );
}

import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import{ createAppContainer } from "react-navigation";
import{ createStackNavigator } from "react-navigation-stack";
import{ Ionicons } from "@expo/vector-icons";


import Places from './Places';
import Maps from './Maps';

export default function App() {
  const AppNavigator = createStackNavigator({
    Places: {screen: Places},
    Map: {screen: Maps}
  });

    const AppContainer = createAppContainer(AppNavigator);

  return (
    <AppContainer/>
  );
}
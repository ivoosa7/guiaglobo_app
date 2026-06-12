import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="default" />
      <AppNavigator />
    </AppProvider>
  );
}
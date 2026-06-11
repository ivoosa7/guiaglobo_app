import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

// Importamos apenas o "Super Provider"
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="auto" />
      <AppNavigator />
    </AppProvider>
  );
}
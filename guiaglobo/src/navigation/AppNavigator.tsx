import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useAuth } from '../context/AppContext';

import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import LanguageDetailScreen from '../screens/LanguageDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { state: { colors } } = useTheme();
  const { state: authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        {!authState.isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen name="CountryDetail" component={CountryDetailScreen} />
            <Stack.Screen name="LanguageDetail" component={LanguageDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
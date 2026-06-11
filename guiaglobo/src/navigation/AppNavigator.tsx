import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useAuth } from '../context/AppContext';

// Importamos apenas o Drawer (que já carrega as abas inferiores com ele)
import DrawerNavigator from './DrawerNavigator'

// Importamos apenas as telas que ficam fora do menu de abas
import LoginScreen from '../screens/LoginScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import LanguageDetailScreen from '../screens/LanguageDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { state: { colors } } = useTheme();
  const { state: authState } = useAuth(); 

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { backgroundColor: colors.background } 
        }}
      >
        {!authState.isAuthenticated ? (
          // Fluxo Deslogado
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Fluxo Logado
          <>
            {/* A base do app logado é o Menu Lateral */}
            <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
            
            {/* Telas que abrem "por cima" de tudo */}
            <Stack.Screen name="CountryDetail" component={CountryDetailScreen} />
            <Stack.Screen name="LanguageDetail" component={LanguageDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
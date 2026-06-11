import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/AppContext';

// Importamos o navegador de abas que acabamos de separar!
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { state: { colors } } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, 
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textPrimary,
      }}
    >
      {/* O item principal do menu lateral é a nossa navegação de abas */}
      <Drawer.Screen 
        name="Navegação Principal" 
        component={BottomTabNavigator} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="apps-outline" size={22} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
}
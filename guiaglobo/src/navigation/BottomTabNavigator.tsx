import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/AppContext';

import HomeScreen from '../screens/HomeScreen';
import CountriesListScreen from '../screens/CountriesListScreen';
import LanguagesListScreen from '../screens/LanguagesListScreen';
import ShowcaseScreen from '../screens/ShowcaseScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { state: { colors } } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Países') iconName = 'earth-outline';
          else if (route.name === 'Idiomas') iconName = 'chatbubbles-outline';
          else if (route.name === 'Vitrine') iconName = 'color-palette-outline';

          if (route.name === 'Home' && color === colors.primary) iconName = 'home';
          if (route.name === 'Países' && color === colors.primary) iconName = 'earth';
          if (route.name === 'Idiomas' && color === colors.primary) iconName = 'chatbubbles';

          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Países" component={CountriesListScreen} />
      <Tab.Screen name="Idiomas" component={LanguagesListScreen} />
      <Tab.Screen name="Vitrine" component={ShowcaseScreen} />
    </Tab.Navigator>
  );
}
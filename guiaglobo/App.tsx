import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import ShowcaseScreen from './src/screens/ShowcaseScreen';

export default function App() {
  return (
    <ThemeProvider>
      {/* O SafeAreaView garante que os componentes não fiquem escondidos atrás do relógio/bateria do celular */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
        <ShowcaseScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}
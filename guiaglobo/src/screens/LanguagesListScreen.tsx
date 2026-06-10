import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Header, LanguageDashboard, LanguageCard } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function LanguagesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();

  const mockLanguages = [
    { id: '1', language: 'Inglês', count: 91, flag: 'https://flagcdn.com/w320/gb.png' },
    { id: '2', language: 'Português', count: 10, flag: 'https://flagcdn.com/w320/br.png' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Idiomas Globais" />
      
      <LanguageDashboard topLanguage="Inglês" countriesCount={91} />

      <FlatList
        data={mockLanguages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LanguageCard
            language={item.language}
            countriesCount={item.count}
            flagUrl={item.flag}
            onPress={() => navigation.navigate('LanguageDetail', { languageName: item.language })}
          />
        )}
      />
    </View>
  );
}
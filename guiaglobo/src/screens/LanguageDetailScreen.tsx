import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Header, CountryCard } from '../components';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function LanguageDetailScreen() {
  const { state: { colors } } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { languageName } = route.params || { languageName: 'Idioma' };

  const mockSpeakingCountries = [
    { id: '1', name: 'Brasil', capital: 'Brasília', population: 214000000, flag: 'https://flagcdn.com/w320/br.png' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={`Falam ${languageName}`} showBack={true} />
      
      <View style={styles.info}>
        <Text style={[styles.text, { color: colors.textPrimary }]}>Países mapeados que adotam o idioma:</Text>
      </View>

      <FlatList
        data={mockSpeakingCountries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CountryCard
            name={item.name}
            capital={item.capital}
            population={item.population}
            flagUrl={item.flag}
            onPress={() => navigation.navigate('CountryDetail', { countryName: item.name })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
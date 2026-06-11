import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/AppContext';
import { Header, CountryCard, LoadingView } from '../components';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCountries } from '../hooks/useCountries';

export default function LanguageDetailScreen() {
  const { state: { colors } } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { languageName } = route.params || { languageName: '' };

  const { allCountries, loading } = useCountries();

  if (loading) return <LoadingView message="Verificando falantes..." />;

  // Filtra todos os países que contêm o idioma selecionado
  const speakingCountries = allCountries.filter(country => 
    country.languages && Object.values(country.languages).includes(languageName)
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={languageName} showBack={true} />
      
      <View style={styles.info}>
        <Text style={[styles.text, { color: colors.textPrimary }]}>
          {speakingCountries.length} países mapeados que adotam o idioma:
        </Text>
      </View>

      <FlatList
        data={speakingCountries}
        keyExtractor={(item) => item.cca2}
        renderItem={({ item }) => (
          <CountryCard
            name={item.name.common}
            capital={item.capital?.[0] || 'N/A'}
            population={item.population}
            flagUrl={item.flags.png}
            onPress={() => navigation.navigate('CountryDetail', { countryName: item.name.common })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  info: { padding: 16 },
  text: { fontSize: 16, fontWeight: '500' },
});
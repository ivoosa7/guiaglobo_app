import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../context/AppContext';
import { Header, SearchBar, FilterChips, CountryCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useCountries } from '../hooks/useCountries';

export default function CountriesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  
  // Chamando o Hook!
  const { 
    countries, loading, error, refetch, 
    searchQuery, setSearch, 
    selectedContinent, setContinent 
  } = useCountries();

  if (loading) return <LoadingView message="Carregando mapa mundi..." />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Explorar Países" />
      
      <SearchBar value={searchQuery} onChangeText={setSearch} />
      
      <FilterChips 
        options={['Todos', 'Américas', 'Europa', 'Ásia', 'África', 'Oceania']} 
        selectedOption={selectedContinent} 
        onSelect={setContinent} 
      />

      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca2}
        initialNumToRender={10}
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
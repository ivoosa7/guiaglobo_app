import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../context/AppContext';
import { Header, SearchBar, FilterChips, CountryCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useCountries } from '../hooks/useCountries';

export default function CountriesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  
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
        // A API v5 mudou o cca2 para 'codes.alpha_2'. Colocamos o index como último recurso de segurança.
        keyExtractor={(item, index) => item['codes.alpha_2'] || item.cca2 || index.toString()}
        initialNumToRender={10}
        renderItem={({ item }) => {
          // Extraímos o nome de forma segura para usar tanto no card quanto na navegação
          const currentName = item['names.common'] || item.name?.common || 'Desconhecido';

          return (
            <CountryCard
              // Novas chaves mapeadas para a versão 5
              name={currentName}
              capital={item.capitals?.[0]?.name || item.capitals?.[0] || item.capital?.[0] || 'N/A'}
              population={item.population || 0}
              flagUrl={item['flag.url_png'] || item.flags?.png || 'https://via.placeholder.com/150'}
              
              // Passamos o currentName limpo para a tela de Detalhes não se perder
              onPress={() => navigation.navigate('CountryDetail', { countryName: currentName })}
            />
          );
        }}
      />
    </View>
  );
}
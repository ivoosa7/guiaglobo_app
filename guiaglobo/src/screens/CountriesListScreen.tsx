import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Header, SearchBar, FilterChips, CountryCard } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function CountriesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState('Todos');

  // Lista mockada apenas para visualização prévia da rolagem
  const mockCountries = [
    { id: '1', name: 'França', capital: 'Paris', population: 67390000, flag: 'https://flagcdn.com/w320/fr.png' },
    { id: '2', name: 'Alemanha', capital: 'Berlim', population: 83240000, flag: 'https://flagcdn.com/w320/de.png' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Explorar Países" />
      
      <SearchBar value={search} onChangeText={setSearch} />
      
      <FilterChips 
        options={['Todos', 'Américas', 'Europa', 'Ásia', 'África']} 
        selectedOption={continent} 
        onSelect={setContinent} 
      />

      <FlatList
        data={mockCountries}
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
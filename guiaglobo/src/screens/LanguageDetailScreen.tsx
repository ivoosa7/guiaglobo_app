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

  // Filtro de segurança atualizado para ler tanto a v3 quanto a v5 da API
  const speakingCountries = allCountries.filter(country => {
    if (!country.languages) return false;
    
    // Se a API mandar o novo formato (Array)
    if (Array.isArray(country.languages)) {
      return country.languages.some((l: any) => 
        l.name === languageName || l.native_name === languageName || l === languageName
      );
    }
    
    // Se a API mandar o formato antigo (Objeto)
    return Object.values(country.languages).includes(languageName);
  });

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
        // Atualizando o ID único da lista para o novo padrão de código da v5
        keyExtractor={(item, index) => item['codes.alpha_2'] || item.cca2 || index.toString()}
        renderItem={({ item }) => {
          // Extrai o nome de forma segura
          const currentName = item['names.common'] || item.name?.common || 'Desconhecido';
          
          return (
            <CountryCard
              // Propriedades blindadas contra quebras de tela
              name={currentName}
              capital={item.capitals?.[0]?.name || item.capitals?.[0] || item.capital?.[0] || 'N/A'}
              population={item.population || 0}
              flagUrl={item['flag.url_png'] || item.flags?.png || 'https://via.placeholder.com/150'}
              
              onPress={() => navigation.navigate('CountryDetail', { countryName: currentName })}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  info: { padding: 16 },
  text: { fontSize: 16, fontWeight: '500' },
});
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useFavorites } from '../context/AppContext';
import { Header, LoadingView } from '../components';
import { useRoute } from '@react-navigation/native';
import { useCountries } from '../hooks/useCountries';
import { Ionicons } from '@expo/vector-icons';

export default function CountryDetailScreen() {
  const { state: { colors } } = useTheme();
  const route = useRoute<any>();
  const { countryName } = route.params || { countryName: '' };
  
  const { allCountries, loading } = useCountries();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) return <LoadingView message="Carregando detalhes..." />;

  // 1. Busca o país exato usando a sintaxe segura da versão 5
  const country = allCountries.find(c => (c['names.common'] || c.name?.common) === countryName);

  if (!country) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.textPrimary }}>País não encontrado.</Text>
      </View>
    );
  }

  // 2. Extrai o nome de forma segura para usar nos favoritos e no Header
  const currentName = country['names.common'] || country.name?.common || 'Desconhecido';
  const favorite = isFavorite(currentName);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(currentName);
    } else {
      addFavorite(currentName);
    }
  };

  // 3. Funções auxiliares para blindar a leitura de objetos complexos (Idiomas e Moedas)
  const formatLanguages = (langs: any) => {
    if (!langs) return 'N/A';
    if (Array.isArray(langs)) return langs.map(l => l.name || l.native_name).join(', ');
    return Object.values(langs).join(', '); // Fallback para o formato antigo
  };

  const formatCurrencies = (currs: any) => {
    if (!currs) return 'N/A';
    if (Array.isArray(currs)) return currs.map(c => `${c.name} (${c.symbol || ''})`).join(', ');
    return Object.values(currs).map((c: any) => `${c.name} (${c.symbol || ''})`).join(', ');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={currentName} showBack={true} />
      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Nova chave para a bandeira da v5 */}
        <Image 
          source={{ uri: country['flag.url_png'] || country.flags?.png || 'https://via.placeholder.com/300x200' }} 
          style={styles.flag} 
        />
        
        <View style={styles.headerRow}>
          {/* Nova chave para o nome oficial da v5 */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {country['names.official'] || country.name?.official || currentName}
          </Text>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favButton}>
            <Ionicons 
              name={favorite ? "star" : "star-outline"} 
              size={32} 
              color={favorite ? "#FFD700" : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.detailsBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Capital: <Text style={styles.value}>{country.capitals?.[0]?.name || country.capitals?.[0] || country.capital?.[0] || 'N/A'}</Text>
          </Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Região: <Text style={styles.value}>{country.region || 'N/A'} {country.subregion ? `(${country.subregion})` : ''}</Text>
          </Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            População: <Text style={styles.value}>{(country.population || 0).toLocaleString('pt-BR')}</Text>
          </Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Área: <Text style={styles.value}>{(country['area.kilometers'] || country.area || 0).toLocaleString('pt-BR')} km²</Text>
          </Text>
          
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Idiomas: <Text style={styles.value}>{formatLanguages(country.languages)}</Text>
          </Text>
          
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Moedas: <Text style={styles.value}>{formatCurrencies(country.currencies)}</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  flag: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', flex: 1, flexWrap: 'wrap' },
  favButton: { padding: 8 },
  detailsBox: { width: '100%', padding: 16, borderRadius: 12, borderWidth: 1, gap: 12 },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontWeight: 'normal' },
});
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

  if (loading) return <LoadingView message="Carregando fronteiras..." />;

  // Busca o país exato na lista global
  const country = allCountries.find(c => c.name.common === countryName);

  if (!country) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.textPrimary }}>País não encontrado.</Text>
      </View>
    );
  }

  const favorite = isFavorite(country.name.common);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(country.name.common);
    } else {
      addFavorite(country.name.common);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={country.name.common} showBack={true} />
      
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: country.flags.png }} style={styles.flag} />
        
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{country.name.official}</Text>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favButton}>
            <Ionicons 
              name={favorite ? "star" : "star-outline"} 
              size={32} 
              color={favorite ? "#FFD700" : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.detailsBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Capital: <Text style={styles.value}>{country.capital?.[0] || 'N/A'}</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Região: <Text style={styles.value}>{country.region} {country.subregion ? `(${country.subregion})` : ''}</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>População: <Text style={styles.value}>{country.population.toLocaleString('pt-BR')}</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Área: <Text style={styles.value}>{country.area.toLocaleString('pt-BR')} km²</Text></Text>
          
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Idiomas: <Text style={styles.value}>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Text>
          </Text>
          
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Moedas: <Text style={styles.value}>
              {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}
            </Text>
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
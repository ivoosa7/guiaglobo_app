import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useTheme, useFavorites } from '../context/AppContext';
import { Header, CountryOfTheDay, FavoriteCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useCountryOfDay } from '../hooks/useCountryOfDay';

export default function HomeScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  const { state: favState } = useFavorites();
  
  // Chamando o Hook!
  const { countryOfDay, loading, error, refetch } = useCountryOfDay();

  if (loading) return <LoadingView message="Sorteando o País do Dia..." />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {countryOfDay && (
          <CountryOfTheDay
            name={countryOfDay.name.common}
            capital={countryOfDay.capital?.[0] || 'N/A'}
            continent={countryOfDay.region}
            language={countryOfDay.languages ? Object.values(countryOfDay.languages).join(', ') : 'N/A'}
            population={countryOfDay.population}
            flagUrl={countryOfDay.flags.png}
          />
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Meus Favoritos</Text>
          {favState.favoritesList.length === 0 ? (
            <Text style={{ color: colors.textSecondary, paddingHorizontal: 16 }}>Nenhum país favoritado ainda.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
              {favState.favoritesList.map(favName => (
                <FavoriteCard 
                  key={favName}
                  name={favName} 
                  // Para o card de favorito ficar perfeito, idealmente buscaríamos a bandeira salva, 
                  // mas aqui passamos um placeholder e o nome.
                  flagUrl="https://via.placeholder.com/150" 
                  onPress={() => navigation.navigate('CountryDetail', { countryName: favName })} 
                />
              ))}
            </ScrollView>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 8, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  favoritesScroll: { paddingBottom: 16 },
});
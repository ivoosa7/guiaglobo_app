import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useTheme, useFavorites } from '../context/AppContext';
import { Header, CountryOfTheDay, FavoriteCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useCountryOfDay } from '../hooks/useCountryOfDay';
import { useCountries, Country } from '../hooks/useCountries';
import SettingsModal from '../navigation/SettingsModal'; // 1. IMPORT DO MODAL

export default function HomeScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  const { state: favState } = useFavorites();
  const { allCountries } = useCountries();
  const { countryOfDay, loading, error, refetch } = useCountryOfDay();
  const [menuVisible, setMenuVisible] = useState(false);

  if (loading) return <LoadingView message="Sorteando o País do Dia..." />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  const formatLanguages = (langs: any) => {
    if (!langs) return 'N/A';
    if (Array.isArray(langs)) return langs.map(l => l.name || l.native_name).join(', ');
    return Object.values(langs).join(', ');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Dashboard" onMenuPress={() => setMenuVisible(true)} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {countryOfDay && (
          <CountryOfTheDay
            name={countryOfDay['names.common'] || 'Nome Indisponível'}
            capital={countryOfDay.capitals?.[0]?.name || countryOfDay.capitals?.[0] || 'N/A'}
            continent={countryOfDay.region || 'N/A'}
            language={formatLanguages(countryOfDay.languages)}
            population={countryOfDay.population || 0}
            flagUrl={countryOfDay['flag.url_png'] || countryOfDay.flags?.png || 'https://via.placeholder.com/150'}
          />
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Meus Favoritos</Text>
          {favState.favoritesList.length === 0 ? (
            <Text style={{ color: colors.textSecondary, paddingHorizontal: 16 }}>Nenhum país favoritado ainda.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
              {favState.favoritesList.map((favName) => {
                const countryData = allCountries.find((c: Country) => c['names.common'] === favName);
                const flagUrl = countryData?.['flag.url_png'] || 'https://via.placeholder.com/150';
                return (
                  <FavoriteCard 
                    key={favName}
                    name={favName} 
                    flagUrl={flagUrl?.replace('w320', 'w640')} 
                    onPress={() => navigation.navigate('CountryDetail', { countryName: favName })} 
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* 2. O MODAL ESTÁ FORA DO SCROLLVIEW, ISSO RESOLVE O ERRO DE PARENT ELEMENT */}
      <SettingsModal 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 8, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  favoritesScroll: { paddingBottom: 16 },
});
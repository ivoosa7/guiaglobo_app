import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Header, CountryOfTheDay, FavoriteCard } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Componente Vitrine do País do Dia */}
        <CountryOfTheDay
          name="Canadá"
          capital="Ottawa"
          continent="América do Norte"
          language="Inglês / Francês"
          population={38000000}
          flagUrl="https://flagcdn.com/w320/ca.png"
        />

        {/* Seção de Favoritos Globais */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Meus Favoritos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favoritesScroll}>
            <FavoriteCard 
              name="Canadá" 
              flagUrl="https://flagcdn.com/w320/ca.png" 
              onPress={() => navigation.navigate('CountryDetail', { countryName: 'Canada' })} 
            />
            <FavoriteCard 
              name="Japão" 
              flagUrl="https://flagcdn.com/w320/jp.png" 
              onPress={() => navigation.navigate('CountryDetail', { countryName: 'Japan' })} 
            />
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  favoritesScroll: {
    paddingBottom: 16,
  },
});
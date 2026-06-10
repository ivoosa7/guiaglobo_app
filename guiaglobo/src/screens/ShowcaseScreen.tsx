import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { 
  Header, SearchBar, FilterChips, CountryCard, FavoriteCard, 
  CountryOfTheDay, LanguageDashboard, LanguageCard 
} from '../components';
import { useTheme } from '../context/ThemeContext';

export default function ShowcaseScreen() {
  const { state: { colors, isDark }, toggleTheme } = useTheme();
  
  // Estados temporários apenas para a tela de showcase
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Dados falsos para testar o visual
  const mockFlag = "https://flagcdn.com/w320/br.png";

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      
      {/* 1. Header */}
      <Header title="Vitrine (Showcase)" onMenuPress={toggleTheme} />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Alternar Tema (Dark/Light)</Text>
          <Button 
            title={isDark ? "🌞 Mudar para Light Mode" : "🌙 Mudar para Dark Mode"} 
            onPress={toggleTheme} 
            color={colors.primary} 
          />
        </View>

        {/* 2. País do Dia */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>CountryOfTheDay</Text>
          <CountryOfTheDay 
            name="Brasil" 
            capital="Brasília" 
            continent="América do Sul" 
            language="Português" 
            population={214300000} 
            flagUrl={mockFlag} 
          />
        </View>

        {/* 3. Search Bar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>SearchBar</Text>
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </View>

        {/* 4. Filter Chips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>FilterChips</Text>
          <FilterChips 
            options={['Todos', 'Américas', 'Europa', 'Ásia', 'África', 'Oceania']} 
            selectedOption={selectedFilter} 
            onSelect={setSelectedFilter} 
          />
        </View>

        {/* 5. Country Card */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>CountryCard</Text>
          <CountryCard 
            name="Brasil" 
            capital="Brasília" 
            population={214300000} 
            flagUrl={mockFlag} 
            onPress={() => {}} 
          />
        </View>

        {/* 6. Favorite Card (Em uma ScrollView horizontal para simular a Home) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>FavoriteCard (Horizontal)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FavoriteCard name="Brasil" flagUrl={mockFlag} onPress={() => {}} />
            <FavoriteCard name="Brasil" flagUrl={mockFlag} onPress={() => {}} />
            <FavoriteCard name="Brasil" flagUrl={mockFlag} onPress={() => {}} />
          </ScrollView>
        </View>

        {/* 7. Language Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>LanguageDashboard</Text>
          <LanguageDashboard topLanguage="Inglês" countriesCount={91} />
        </View>

        {/* 8. Language Card */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>LanguageCard</Text>
          <LanguageCard 
            language="Português" 
            countriesCount={10} 
            flagUrl={mockFlag} 
            onPress={() => {}} 
          />
        </View>

        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  bottomPadding: {
    height: 40,
  }
});
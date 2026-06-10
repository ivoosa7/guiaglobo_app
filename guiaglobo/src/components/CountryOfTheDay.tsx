import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface CountryOfTheDayProps {
  name: string;
  flagUrl: string;
  language: string;
  population: number;
  continent: string;
  capital: string;
}

export default function CountryOfTheDay({ name, flagUrl, language, population, continent, capital }: CountryOfTheDayProps) {
  const { state: { colors } } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="sparkles" size={20} color={colors.primary} />
        <Text style={[styles.headerText, { color: colors.textPrimary }]}> País de Hoje</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <Image source={{ uri: flagUrl }} style={styles.flag} resizeMode="cover" />
        
        <View style={styles.infoBox}>
          <Text style={[styles.title, { color: colors.primary }]}>{name}</Text>
          <View style={styles.divider} />
          
          <Text style={[styles.infoText, { color: colors.textSecondary }]}><Text style={[styles.bold, { color: colors.textPrimary }]}>🗣 Idioma:</Text> {language}</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}><Text style={[styles.bold, { color: colors.textPrimary }]}>👥 Habitantes:</Text> {population.toLocaleString('pt-BR')}</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}><Text style={[styles.bold, { color: colors.textPrimary }]}>🌍 Continente:</Text> {continent}</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}><Text style={[styles.bold, { color: colors.textPrimary }]}>🏛 Capital:</Text> {capital}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  flag: {
    width: '100%',
    height: 180,
  },
  infoBox: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    opacity: 0.2,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 6,
  },
  bold: {
    fontWeight: '600',
  }
});
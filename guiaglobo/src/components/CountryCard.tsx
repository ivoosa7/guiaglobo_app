import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface CountryCardProps {
  name: string;
  capital: string;
  population: number;
  flagUrl: string;
  onPress: () => void;
}

export default function CountryCard({ name, capital, population, flagUrl, onPress }: CountryCardProps) {
  const { state: { colors } } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Image source={{ uri: flagUrl }} style={styles.flag} resizeMode="cover" />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>{name}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>🏛 Capital: {capital || 'N/A'}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>👥 População: {population.toLocaleString('pt-BR')}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  flag: {
    width: 90,
    height: 90,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    marginBottom: 2,
    fontWeight: '500',
  },
  chevron: {
    paddingRight: 16,
  }
});
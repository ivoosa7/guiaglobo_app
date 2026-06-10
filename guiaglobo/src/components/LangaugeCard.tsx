import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface LanguageCardProps {
  flagUrl: string;
  language: string;
  countriesCount: number;
  onPress: () => void;
}

export default function LanguageCard({ flagUrl, language, countriesCount, onPress }: LanguageCardProps) {
  const { state: { colors } } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.leftContent}>
        <Image source={{ uri: flagUrl }} style={styles.flag} resizeMode="cover" />
        <Text style={[styles.languageText, { color: colors.textPrimary }]}>{language}</Text>
      </View>

      <View style={[styles.tag, { backgroundColor: colors.primary + '20' }]}>
        <Text style={[styles.tagText, { color: colors.primary }]}>{countriesCount} Países</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 40,
    height: 28,
    borderRadius: 4,
    marginRight: 12,
  },
  languageText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 12,
  }
});
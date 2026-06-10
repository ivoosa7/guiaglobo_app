import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface LanguageDashboardProps {
  topLanguage: string;
  countriesCount: number;
}

export default function LanguageDashboard({ topLanguage, countriesCount }: LanguageDashboardProps) {
  const { state: { colors } } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Visão Geral</Text>
      
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.background }]}>
          <Ionicons name="chatbubbles-outline" size={28} color={colors.primary} />
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mais Falado</Text>
          <Text style={[styles.statValue, { color: colors.textPrimary }]}>{topLanguage}</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.background }]}>
          <Ionicons name="earth-outline" size={28} color={colors.primary} />
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Presença Global</Text>
          <Text style={[styles.statValue, { color: colors.textPrimary }]}>{countriesCount} Países</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
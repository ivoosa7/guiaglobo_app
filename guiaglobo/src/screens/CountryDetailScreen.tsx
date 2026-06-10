import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components';
import { useRoute } from '@react-navigation/native';

export default function CountryDetailScreen() {
  const { state: { colors } } = useTheme();
  const route = useRoute<any>();
  const { countryName } = route.params || { countryName: 'País Selecionado' };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={countryName} />
      
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: 'https://flagcdn.com/w320/fr.png' }} style={styles.flag} />
        
        <View style={[styles.detailsBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Nome Completo: <Text style={styles.value}>República Francesa</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Moeda: <Text style={styles.value}>Euro (€)</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Domínio de Internet: <Text style={styles.value}>.fr</Text></Text>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Região: <Text style={styles.value}>Europa Ocidental</Text></Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  flag: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailsBox: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
});
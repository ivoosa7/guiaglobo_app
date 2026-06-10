import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface FilterChipsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export default function FilterChips({ options, selectedOption, onSelect }: FilterChipsProps) {
  const { state: { colors } } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {options.map((option) => {
          const isActive = selectedOption === option;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              style={[
                styles.chip,
                { backgroundColor: isActive ? colors.primary : colors.cardBackground, borderColor: isActive ? colors.primary : colors.border }
              ]}
              onPress={() => onSelect(option)}
            >
              <Text style={[
                styles.chipText,
                { color: isActive ? '#FFFFFF' : colors.textPrimary }
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  chipText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
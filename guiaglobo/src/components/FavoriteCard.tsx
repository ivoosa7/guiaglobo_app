import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface FavoriteCardProps {
  name: string;
  flagUrl: string;
  onPress: () => void;
}

export default function FavoriteCard({ name, flagUrl, onPress }: FavoriteCardProps) {
  const { state: { colors } } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: flagUrl }} style={styles.flag} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={2}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  flag: {
    width: '100%',
    height: 80,
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
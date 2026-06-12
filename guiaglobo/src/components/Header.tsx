import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onMenuPress?: () => void; // Prop para disparar a abertura do modal
}

export default function Header({ 
  title = "GuiaGlobo", 
  showBack = false, 
  onMenuPress 
}: HeaderProps) {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.header, { 
      backgroundColor: colors.cardBackground, 
      borderBottomColor: colors.border 
    }]}>
      
      {/* Lado Esquerdo: Botão de Voltar ou Botão de Settings */}
      {showBack ? (
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.iconButton} 
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          onPress={onMenuPress} 
          style={styles.iconButton} 
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
      
      {/* Título Centralizado */}
      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>
      
      {/* Placeholder para manter o título perfeitamente centralizado */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: { 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 3 
      },
      android: { elevation: 3 },
    }),
  },
  iconButton: {
    padding: 4,
    width: 36, // Largura fixa para garantir alinhamento
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  placeholder: {
    width: 36, // Espaço vazio para manter o equilíbrio visual
  }
});
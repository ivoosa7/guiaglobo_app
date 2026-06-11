import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/AppContext';
import { useNavigation, DrawerActions } from '@react-navigation/native';

// Aqui está a solução: o TypeScript agora sabe que o showBack existe e é opcional!
interface HeaderProps {
  title?: string;
  showBack?: boolean; 
}

export default function Header({ title = "GuiaGlobo", showBack = false }: HeaderProps) {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
      
      {showBack ? (
        // Se showBack for true, exibe a seta de voltar
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        // Se for false, exibe o menu de hambúrguer para abrir a barra lateral
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="menu-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
      
      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>
      
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
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  }
});
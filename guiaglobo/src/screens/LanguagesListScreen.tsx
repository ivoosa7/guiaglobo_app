import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '../context/AppContext';
import { Header, LanguageDashboard, LanguageCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useLanguages } from '../hooks/useLanguages';

export default function LanguagesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  
  // Chamando o Hook!
  const { languages, loading, error, refetch } = useLanguages();

  if (loading) return <LoadingView message="Mapeando idiomas globais..." />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  const topLanguage = languages.length > 0 ? languages[0] : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Idiomas Globais" />
      
      {topLanguage && (
        <LanguageDashboard 
          topLanguage={topLanguage.language} 
          countriesCount={topLanguage.count} 
        />
      )}

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LanguageCard
            language={item.language}
            countriesCount={item.count}
            flagUrl={item.flagUrl}
            onPress={() => navigation.navigate('LanguageDetail', { languageName: item.language })}
          />
        )}
      />
    </View>
  );
}
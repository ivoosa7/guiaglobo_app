import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '../context/AppContext';
import { Header, LanguageDashboard, LanguageCard, LoadingView, ErrorView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useLanguages } from '../hooks/useLanguages';

export default function LanguagesListScreen() {
  const { state: { colors } } = useTheme();
  const navigation = useNavigation<any>();
  
  const { languages, loading, error, refetch } = useLanguages();

  if (loading) return <LoadingView message="Mapeando idiomas globais..." />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  // Trava de segurança para garantir que a lista não é nula antes de pegar o top 1
  const topLanguage = languages && languages.length > 0 ? languages[0] : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Idiomas Globais" />
      
      {topLanguage && (
        <LanguageDashboard 
          // Adicionando valores padrão de segurança
          topLanguage={topLanguage.language || 'Desconhecido'} 
          countriesCount={topLanguage.count || 0} 
        />
      )}

      <FlatList
        data={languages}
        // Usamos o index como plano B caso o hook não gere um ID único
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <LanguageCard
            // Blindagem das propriedades visuais do cartão
            language={item.language || 'Desconhecido'}
            countriesCount={item.count || 0}
            flagUrl={item.flagUrl || 'https://via.placeholder.com/150'}
            onPress={() => navigation.navigate('LanguageDetail', { languageName: item.language })}
          />
        )}
      />
    </View>
  );
}
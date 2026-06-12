import { useState, useEffect } from 'react';
import { useCountries } from './useCountries';

export interface LanguageStat {
  id: string;
  language: string;
  count: number;
  flagUrl: string; 
}

export function useLanguages() {
  const { allCountries, loading, error, refetch } = useCountries();
  const [languages, setLanguages] = useState<LanguageStat[]>([]);

  useEffect(() => {
    if (allCountries.length > 0) {
      const langMap: { [key: string]: { count: number; flag: string } } = {};

      allCountries.forEach(country => {
        if (country.languages) {
          
          // 1. Extração segura da bandeira (v5 e fallback para evitar crash)
          const currentFlag = country['flag.url_png'] || country.flags?.png || 'https://via.placeholder.com/150';

          // 2. Extração segura dos idiomas (Lida com o Array da v5 ou Objeto da v3)
          let langsArray: string[] = [];
          if (Array.isArray(country.languages)) {
            langsArray = country.languages.map((l: any) => l.name || l.native_name || String(l));
          } else {
            langsArray = Object.values(country.languages) as string[];
          }

          // 3. Contabiliza cada idioma com seu respectivo nome em string
          langsArray.forEach(lang => {
            if (!lang) return; 
            
            if (!langMap[lang]) {
              langMap[lang] = { count: 0, flag: currentFlag };
            }
            langMap[lang].count += 1;
          });
        }
      });

      // 4. Mapeia para o formato final e ordena do mais falado para o menos falado
      const stats: LanguageStat[] = Object.entries(langMap)
        .map(([language, data]) => ({
          id: language,
          language,
          count: data.count,
          flagUrl: data.flag,
        }))
        .sort((a, b) => b.count - a.count);

      setLanguages(stats);
    }
  }, [allCountries]);

  return { languages, loading, error, refetch };
}
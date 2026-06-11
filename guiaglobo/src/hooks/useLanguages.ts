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
          Object.values(country.languages).forEach(lang => {
            if (!langMap[lang]) {
              langMap[lang] = { count: 0, flag: country.flags.png };
            }
            langMap[lang].count += 1;
          });
        }
      });

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
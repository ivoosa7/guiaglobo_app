import { useState, useEffect } from 'react';
import { useCountries, Country } from './useCountries';

export function useCountryOfDay() {
  // Puxa a lista bruta (allCountries) para ignorar as buscas da tela de listagem
  const { allCountries, loading, error, refetch } = useCountries();
  const [countryOfDay, setCountryOfDay] = useState<Country | null>(null);

  useEffect(() => {
    if (allCountries.length > 0) {
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      
      const index = seed % allCountries.length;
      setCountryOfDay(allCountries[index]);
    }
  }, [allCountries]);

  return { countryOfDay, loading, error, refetch };
}
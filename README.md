# 🌍 GuiaGlobo

> Explore o mundo, país por país.

Aplicativo mobile desenvolvido com **React Native, Expo e TypeScript** que consome a [REST Countries API](https://restcountries.com) para exibir informações detalhadas sobre todos os países do mundo e os idiomas mais falados.

---

## 📱 Proposta e Escopo

O **GuiaGlobo** é um guia interativo de países voltado para curiosos e estudantes que desejam conhecer dados geográficos, culturais e populacionais de qualquer nação do mundo. O app apresenta um país diferente a cada dia, permite explorar e filtrar a lista completa de países, favoritar os preferidos e descobrir os idiomas mais falados no planeta.

---

## ✅ Funcionalidades Principais

- 🔐 **Tela de Login** simulada com validação de campos
- 🌍 **País do Dia** — exibido na Home, muda diariamente de forma determinística
- ⭐ **Favoritos** — salvar e remover países favoritos (persistente na sessão)
- 🌙 **Dark / Light Mode** — alternável direto na Home
- 🔍 **Lista de Países** — busca por nome + filtro por continente
- 📄 **Detalhe do País** — capital, idiomas, moeda, população, área, densidade, DDI, domínio e mais
- 🗣️ **Lista de Idiomas** — dashboard do idioma mais falado + lista completa ordenada por falantes
- 📊 **Detalhe do Idioma** — estatísticas e lista de países onde é falado

---

## 🔧 Requisitos Técnicos Implementados

| Requisito | Implementação |
|-----------|--------------|
| `useState` | Login (email/senha/showPass), loading states locais |
| `useEffect` | Disparo da chamada à API na montagem dos componentes |
| `useReducer` | Gerenciamento de filtros/busca em `useCountries.ts` e lista de favoritos em `AppContext.tsx` |
| **Context API** | `ThemeContext` (dark/light), `FavoritesContext` (favoritos globais), `AuthContext` (usuário logado) |
| **Stack Navigation** | Fluxo Login → Main → CountryDetail / LanguageDetail |
| **Bottom Tab Navigation** | Abas Home / Países / Idiomas |
| **Passagem de parâmetros** | País e idioma passados via `route.params` para telas de detalhe |
| **Consumo de API** | REST Countries API via `fetch` assíncrono com tipagem (Interfaces) |
| **Loading / Error states** | Componentes `<LoadingView>` e `<ErrorView>` com botão de retry |

---

## 🌐 API Utilizada

**REST Countries API v3.1**
- Documentação: [https://restcountries.com](https://restcountries.com)
- Gratuita, sem necessidade de chave de API
- Endpoint principal: `https://restcountries.com/v3.1/all`

---

## 🚀 Instruções de Execução

### Pré-requisitos
- [Node.js](https://nodejs.org) (v18 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Passo a passo

```bash
# 1. Clone o repositório
git clone [https://github.com/SEU_USUARIO/guiaglobo.git](https://github.com/SEU_USUARIO/guiaglobo.git)
cd guiaglobo

# 2. Instale as dependências
npm install

# 3. Instale as dependências de navegação
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# 4. Inicie o projeto
npx expo start

Após iniciar, escaneie o QR Code com o aplicativo Expo Go no seu celular ou pressione:

a para abrir no emulador Android

i para abrir no simulador iOS

🗂️ Estrutura do Projeto
Plaintext
GuiaGlobo/
├── App.tsx                       # Entry point + Providers
└── src/
    ├── context/
    │   └── AppContext.tsx        # ThemeContext, FavoritesContext, AuthContext
    ├── hooks/
    │   └── useCountries.ts       # useCountries, useCountryOfDay, useLanguages
    ├── components/
    │   └── index.ts              # CountryCard, LanguageCard, SearchBar, FilterChips, etc.
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── CountriesListScreen.tsx
    │   ├── CountryDetailScreen.tsx
    │   ├── LanguagesListScreen.tsx
    │   └── LanguageDetailScreen.tsx
    └── navigation/
        └── AppNavigator.tsx      # Stack + BottomTabs

👤 Autor
Desenvolvido como trabalho prático da disciplina de Desenvolvimento Mobile e Engenharia de Software.
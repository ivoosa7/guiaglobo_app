# 🌍 GuiaGlobo

> Explore o mundo, país por país.

O **GuiaGlobo** é um aplicativo mobile desenvolvido para a disciplina de **Desenvolvimento Mobile / Engenharia de Software da FATEC Itu**. O app oferece uma interface intuitiva para consultar dados geográficos, geopolíticos e culturais de todos os países do mundo, consumindo a **REST Countries API**.

---

## 📱 Proposta e Escopo
O projeto tem como objetivo consolidar a arquitetura de software mobile, utilizando **React Native, Expo e TypeScript**. O app resolve a dificuldade de centralizar informações geográficas e estatísticas globais em uma única plataforma, sendo útil para estudantes e entusiastas que buscam dados rápidos e confiáveis.

---

## 🚀 Funcionalidades Principais

- 🔐 **Tela de Login** simulada com validação de campos.
- 🌍 **País do Dia** — exibido na Home, sorteado de forma dinâmica.
- ⭐ **Favoritos** — salvar e remover países favoritos (persistente na sessão).
- 🌙 **Dark / Light Mode** — alternável via menu de configurações.
- 🔍 **Lista de Países** — busca por nome + filtro por continente.
- 📄 **Detalhe do País** — capital, idiomas, moeda, população, área, densidade, DDI e domínio.
- 🗣️ **Lista de Idiomas** — dashboard de idiomas com estatísticas e lista de países.

---

## 🏗️ Arquitetura e Requisitos Técnicos

O projeto foi estruturado seguindo princípios modernos de desenvolvimento:

* **Gerenciamento de Estado:**
    * **Context API:** Implementação de `ThemeContext` (UI), `FavoritesContext` (persistência global) e `AuthContext` (proteção de rotas).
    * **useReducer:** Centralização da lógica complexa de busca e filtragem no hook `useCountries.ts`, garantindo previsibilidade.
* **Consumo de Dados:** Requisições assíncronas tratadas com `fetch`, integrando tratamento de estados de `loading` e `error`.
* **Navegação:** Implementação de fluxo seguro utilizando `Stack` e `Bottom Tabs` (React Navigation).



---

## 🛠️ Tecnologias
- **Framework:** React Native + Expo
- **Linguagem:** TypeScript
- **Estilização:** StyleSheet (React Native)
- **API:** [REST Countries](https://restcountries.com)

---

## 🚀 Instruções de Execução

### 1. Clonar e Instalar
```bash
git clone [https://github.com/SEU_USUARIO/guiaglobo.git](https://github.com/SEU_USUARIO/guiaglobo.git)
cd guiaglobo
npm install
2. Rodar o Projeto
Bash
npx expo start -c
Siga as instruções no terminal (pressione a para Android ou i para iOS).

📂 Estrutura do Projeto
Plaintext
GuiaGlobo/
├── src/
│   ├── components/    # Componentes reutilizáveis (Header, Card, etc)
│   ├── context/       # Context API (Theme, Favorites, Auth)
│   ├── hooks/         # Lógica customizada (useCountries, useReducer)
│   ├── navigation/    # Stack e Bottom Tab Navigators
│   └── screens/       # Telas da aplicação
└── App.tsx            # Ponto de entrada


💡 Aprendizados e Conclusão
O desenvolvimento do GuiaGlobo permitiu aprofundar conhecimentos em:

Tipagem com TypeScript: Essencial para garantir a integridade dos dados vindos da API.

Ciclo de Vida de Componentes: Uso de useEffect para controle preciso das requisições.

Resiliência de Software: Implementação de mecanismos de fallback para garantir que o app não sofra crashes caso a API retorne dados ausentes.

👤 Autor
Ivo Araújo
Estudante de Análise e Desenvolvimento de Sistemas - FATEC Itu
<div align="center">

# 🌿 Ecoa — Moda Circular & Sustentável

> *"Quando você compra roupa usada, a história ecoa."*

Um e-commerce moderno e experiência imersiva de moda circular com curadoria vintage, storytelling espacial com **Anime.js**, métricas de impacto ambiental e design editorial sofisticado construído em **Vue 3**, **Vite** e **Tailwind CSS**.

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Anime.js](https://img.shields.io/badge/Anime.js-3.2-FF4B4B?style=for-the-badge)](https://animejs.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📖 Sobre o Projeto

A **Ecoa** é uma plataforma conceitual de moda circular que valoriza o reuso, o tempo e a história impregnada em cada peça de vestuário. O projeto combina um catálogo completo de e-commerce com uma narrativa interativa de conscientização ambiental, calculando economias reais de água, redução de pegada de carbono e compensação de impacto ecológico.

---

## ✨ Funcionalidades Principais

### 🛍️ E-Commerce & Curadoria
- **Curadorias por Época (Bento Grid):** Anos 90, Anos 70, Alfaiataria Nobre, Seda Pura & Linho Cru e Minimalismo Essencial.
- **Catálogo de Peças Únicas:** Filtros por categoria, época, faixa de preço, ordenação e busca em tempo real.
- **Página de Detalhes da Peça:** Fotos em alta resolução, histórico afetivo da peça (*StoryTag*), medidas detalhadas e cálculo de economia de recursos naturais.
- **Sacola Consciente & Checkout:** Gestão de itens em estado global (Pinia), cálculo de frete neutro em carbono e métricas de impacto ecológico da compra.
- **Perfil & Histórico de Sustentabilidade:** Painel do usuário com contador animado de litros de água poupados e kg de CO₂ evitados.

### 🌌 Experiência Imersiva de Filosofia (`/filosofia`)
- **Storytelling Espacial em 5 Momentos:**
  1. *A Fibra e o Solo:* Brotação orgânica de linho e economia de 7.500 L de água limpa por peça.
  2. *Arqueologia do Tempo:* Resgate e autenticação de cortes nobres e botões de época.
  3. *O Cuidado e a Cura:* Higienização ecológica por ozônio e restauração de fibras.
  4. *A Permanência Infinita:* Fita contínua em Möbius simbolizando o ciclo perpétuo da roupa.
  5. *O Manifesto Ecoa:* Totem de reverberação e portal de transição direto para o acervo.
- **Animações Vetoriais com Anime.js:** Ilustrações SVG táteis, interativas com mouse/touch e transições de página ultra-fluidas.
- **Suporte a Gestos:** Navegação com suporte a deslizar (*Swipe*) em dispositivos móveis e atalhos de teclado no desktop.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
| :--- | :--- |
| **[Vue 3](https://vuejs.org/)** (Composition API, `<script setup>`) | Framework reativo e componentização |
| **[Vite 5](https://vitejs.dev/)** | Bundler de alta performance e Hot Module Replacement (HMR) |
| **[Vue Router 4](https://router.vuejs.org/)** | Roteamento SPA com scroll suave e títulos dinâmicos |
| **[Pinia](https://pinia.vuejs.org/)** | Gerenciamento de estado global (sacola, cliente, catálogo) |
| **[Anime.js](https://animejs.com/)** | Animações cinéticas, caminhos SVG, *stagger* e microinterações |
| **[Tailwind CSS](https://tailwindcss.com/)** | Estilização utilitária com paleta terrosa e tipografia editorial |
| **[Docker & Docker Compose](https://www.docker.com/)** | Ambiente conteinerizado com live reload |

---

## 📂 Estrutura do Projeto

```text
ecoa/
├── docker/
│   └── Dockerfile              # Imagem Node.js otimizada para desenvolvimento
├── src/
│   ├── assets/                 # Imagens, logomarcas oficiais e estilos CSS
│   ├── components/
│   │   ├── animations/         # Contadores animados e ondas de reverberação
│   │   ├── checkout/           # Sumário de pedidos e métricas de impacto
│   │   ├── common/             # Header, Footer, BottomNav, Logo, Cards
│   │   ├── home/               # Hero Section, Bento Grid e Banners
│   │   └── philosophy/         # PhilosophyArtwork (Anime.js SVG interativo)
│   ├── data/                   # Base de dados mock (produtos, categorias, pedidos)
│   ├── router/                 # Configuração de rotas da aplicação
│   ├── stores/                 # Stores Pinia (cart, customer, products)
│   ├── views/                  # Views principais (Home, Filosofia, Catálogo, Checkout)
│   ├── App.vue                 # Layout mestre com transições de rota
│   └── main.js                 # Inicialização da aplicação
├── docker-compose.yml          # Orquestração do container de desenvolvimento
├── index.html                  # HTML base com fontes e metatags
├── package.json                # Dependências e scripts do projeto
├── tailwind.config.js          # Sistema de design tokens e cores terrosas
└── vite.config.js              # Configurações do Vite (HMR, polling, aliases)
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** >= 18.x e **npm** ou **Docker** / **Docker Compose**

---

### Opção 1: Com Docker (Recomendado)

```bash
# 1. Subir o container
docker compose up -d

# 2. Acessar a aplicação no navegador
http://localhost:8080
```

---

### Opção 2: Localmente via npm

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar a build de produção
npm run build
```

---

## 🌿 Identidade Visual & Design System

A identidade visual da Ecoa utiliza uma paleta de cores terrosa, inspirada em fibras naturais, solo fértil e pigmentos minerais:

- **Floresta Nobre (`#3A4D39`):** Representa permanência, sobriedade e preservação vegetal.
- **Terracota Viva (`#C86D51`):** Simboliza o solo fértil, o calor humano e o afeto.
- **Linho Cru (`#F4EFEA`):** Textura orgânica de fundo suave e luminosa.
- **Nogueira Profunda (`#2C221E`):** Tipografia nobre de alto contraste e legibilidade.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE).

<div align="center">

Desenvolvido com consciência & afeto sustentável 🌿

</div>

# Documentação Técnica - Projeto CJPNET

Esta documentação detalha a arquitetura, tecnologias, stack, configurações, design system (fontes e cores), funcionalidades e o modo de uso do projeto CJPNET.

---

## 1. Visão Geral
O projeto **CJPNET** é uma plataforma institucional corporativa com painel administrativo integrado. Desenvolvido para apresentar a empresa (soluções, segmentos, cases) e permitir a gestão dinâmica do conteúdo pela própria equipe, sem necessidade de alterações no código para mudanças de texto ou serviços.

---

## 2. Tecnologias e Stack (Tech Stack)

### Frontend
- **Framework Core**: Next.js 15 (React 19)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Componentes Base**: Shadcn/UI (construído sobre Radix UI)
- **Animações e Interações**: Framer Motion & Tailwind Animate
- **Ícones**: Lucide React
- **Gerenciamento de Estado**: Zustand
- **Data Fetching e Cache**: React Query (@tanstack/react-query)
- **Formulários e Validação**: React Hook Form com Zod

### Backend & API
- **Arquitetura**: Next.js API Routes (Serverless Functions)
- **Autenticação**: NextAuth.js utilizando JSON Web Tokens (JWT)
- **Criptografia**: Bcrypt (hash de senhas)

### Banco de Dados
- **Banco de Dados**: PostgreSQL (Hospedado no Neon)
- **ORM**: Prisma (v6.11.1) com tipagem estática e migrations seguras

### Infraestrutura e Deploy
- **Hospedagem**: Netlify
- **CI/CD**: GitHub (Deploy automático a cada push para a branch principal)
- **Gerenciador de Pacotes**: Bun / NPM

---

## 3. Design System: Cores e Fontes

O projeto possui uma identidade visual moderna (Tech Corporate), utilizando modos claro/escuro e efeitos de Glassmorphism (vidro fosco), gradientes e glows.

### Tipografia (Fontes)
Carregadas via `next/font/google` e Google Fonts, configuradas no `layout.tsx` e `globals.css`:
- **Fonte Primária (Headlines/Títulos)**: **Hanken Grotesk** (Pesos: 600, 700)
- **Fonte Secundária (Body/Texto base)**: **Inter** (Pesos: 400, 500, 600)
- **Fontes de Suporte**: Geist e Geist Mono.

### Paleta de Cores (Definida em `globals.css` e `tailwind.config.ts`)
As cores estão mapeadas no Tailwind (Primary, Secondary, Accent, etc.) e convertidas via variáveis CSS (`OKLCH` e Hexadecimais):
- **Primary (Azul Escuro Corporativo)**:
  - Base: `#0a1628`
  - Container: `#162744`
  - Inverse: `#8da4cc`
- **Secondary (Grafite)**:
  - Base: `#5c5f6e`
  - Container: `#e0e1f0`
- **Tertiary / Accent (Roxo / Tech Blue)** - Usado para destaques e botões:
  - Base: `#3d2fa0`
  - Destaque/Glow: `#5845cc` e `#7b6aff`
- **Backgrounds & Superfícies**:
  - Fundo padrão (Light): `#f5f6f8` e `#ffffff`
  - Fundo padrão (Dark): Tons muito profundos baseados em `#070d1a` a `#111f3c` (Aurora bg).
- **Destrutivo / Erro**: `#ba1a1a` (Tons de vermelho).

### Efeitos Globais Especiais
- `pulse-dot`: Efeito de pulsação suave.
- `aurora-bg`: Fundo animado (12s) misturando tons do azul marinho ao roxo escuro.
- `glass-card`: Efeito de vidro fosco (`backdrop-blur`).
- `glow-pulse` e `shimmer`: Utilizados para hover states e loading.

---

## 4. Estrutura e Configurações Principais

- `tailwind.config.ts`: Define variáveis CSS utilizando a estrutura do Shadcn, inclui extensões para o sistema de cores da marca e plugins como `tailwindcss-animate`. Configurado também para o `darkMode: "class"`.
- `package.json`: Scripts configurados para rodar com Next 15 e Prisma.
- `prisma/schema.prisma`: Contém a modelagem relacional de Usuários, Serviços, Segmentos e Cases.
- `src/app/globals.css`: Concentra toda a fundação visual da UI, variáveis de cores estáticas (`:root` e `.dark`), animações chave-frame exclusivas, além de padronizar scrollbars invisíveis e comportamentos de `focus`.

---

## 5. Funcionalidades do Sistema

### 1. Site Público Institucional (Front-end)
- **Home (`/`)**: Seções dinâmicas (Hero, Quem Somos, Diferenciais), galeria de imagens interativa (com lightbox), botão flutuante do WhatsApp animado e formulário de contato integrado.
- **Soluções (`/solucoes`)**: Listagem detalhada das soluções (SaaS, Governança, Integração).
- **Segmentos (`/segmentos`)**: Exploração de nichos de mercado atendidos (Saúde, Distribuição, Fiscal).
- **Cases de Sucesso (`/cases`)**: Demonstração de resultados práticos de clientes.
- **Outras Páginas**: Sobre (`/sobre`), Conteúdo (`/conteudo`) e Contato (`/contato`).

### 2. Painel Administrativo CMS (`/admin`)
- **Acesso Restrito**: Rota protegida via NextAuth.
- **Gestão de Conteúdo**: Permite criar, editar e excluir informações dinâmicas sem necessidade de editar o código fonte.
  - Textos institucionais (Missão, Visão).
  - Gestão de Serviços, Segmentos e Cases de Sucesso (com suporte a ordenação/reordenação).
  - Edição de Links de Navegação e Rodapé.
  - Alteração das configurações de Contato (Número do WhatsApp, LinkedIn, etc.).

### 3. Rotas de API (Backend)
- A pasta `src/app/api/` fornece todos os serviços REST para que o front-end se comunique de forma segura com o PostgreSQL.
- **`/api/seed`**: Rota responsável por popular o banco de dados inicial, criando o usuário admin padrão (`admin@cjpnet.com.br`) e preenchendo textos iniciais.

---

## 6. Como Usar e Rodar o Projeto

### Pré-requisitos
- Node.js versão 18+ (Preferencialmente v20+) ou **Bun** (Recomendado).
- Banco de Dados PostgreSQL (URL de Conexão).

### Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd CJPNET
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou com bun:
   bun install
   ```

### Configuração de Variáveis de Ambiente (`.env`)
Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
```env
DATABASE_URL="postgres://usuario:senha@host:porta/banco?schema=public"
NEXTAUTH_SECRET="chave_secreta_super_segura_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### Inicializando o Banco de Dados (Prisma)
Sincronize o schema e gere o cliente do Prisma:
```bash
npx prisma db push
npx prisma generate
```

### Rodando o Servidor de Desenvolvimento
Inicie a aplicação localmente na porta 3000:
```bash
npm run dev
# ou
bun run dev
```
Acesse `http://localhost:3000`.

### Primeiro Acesso / Seed
Com o servidor rodando e banco conectado, faça um `POST` para popular o CMS:
```bash
curl -X POST http://localhost:3000/api/seed
```
Isso criará o usuário `admin@cjpnet.com.br` com a senha `admin123`.

### Deploy e Manutenção
- A cada `git push` feito na branch principal do repositório no GitHub, a **Netlify** fará o build do projeto (script `npm run build`) e atualizará a aplicação na nuvem automaticamente de acordo com as configurações do `netlify.toml`.

# Documentação Técnica — CJPNET

> Referência técnica completa do projeto. Serve como base para replicar a arquitetura em outros projetos.

---

## 1. Visão Geral

Site institucional corporativo com **CMS embutido** (painel administrativo). O admin consegue editar textos, imagens, serviços, segmentos, cases, navegação e footer diretamente pelo navegador, sem tocar em código. Todas as alterações são salvas em banco de dados PostgreSQL e refletidas imediatamente no site.

**Stack resumida:**

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Animações | Framer Motion 12 |
| Banco de dados | PostgreSQL via Prisma ORM 6 |
| Autenticação admin | bcryptjs + sessionStorage |
| Deploy | Netlify (frontend + serverless functions) |
| Runtime local | Node 20 / Bun |

---

## 2. Estrutura de Diretórios

```
CJPNET/
├── prisma/
│   └── schema.prisma          # Definição do banco de dados
├── public/
│   ├── logo.png
│   └── gallery/               # Imagens estáticas de fallback
│       ├── dashboard.png
│       ├── network.png
│       ├── infrastructure.png
│       ├── team.png
│       ├── saas-platform.png
│       └── security.png
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fontes, metadata, Toaster)
│   │   ├── page.tsx            # Home page
│   │   ├── sobre/page.tsx      # Página Sobre
│   │   ├── solucoes/page.tsx   # Página Soluções
│   │   ├── segmentos/page.tsx  # Página Segmentos
│   │   ├── cases/page.tsx      # Página Cases
│   │   ├── contato/page.tsx    # Página Contato
│   │   ├── conteudo/page.tsx   # Página Conteúdo
│   │   ├── admin/
│   │   │   └── page.tsx        # Painel administrativo completo
│   │   └── api/
│   │       ├── content/route.ts
│   │       ├── services/route.ts
│   │       ├── segments/route.ts
│   │       ├── cases/route.ts
│   │       ├── navigation/route.ts
│   │       ├── footer/route.ts
│   │       ├── auth/login/route.ts
│   │       └── seed/route.ts
│   ├── components/
│   │   ├── shared/
│   │   │   ├── page-layout.tsx     # Wrapper com nav + footer
│   │   │   ├── navigation.tsx      # Header responsivo
│   │   │   ├── footer.tsx          # Footer
│   │   │   ├── image-gallery.tsx   # Galeria com lightbox
│   │   │   ├── animations.tsx      # Componentes animados reutilizáveis
│   │   │   └── whatsapp-button.tsx # Botão flutuante WhatsApp
│   │   └── ui/                     # shadcn/ui (button, input, etc.)
│   ├── hooks/
│   │   └── use-site-data.ts    # Hook central de dados do site
│   └── lib/
│       ├── db.ts               # Singleton do Prisma Client
│       └── types.ts            # Interfaces TypeScript + helpers
├── next.config.ts
└── netlify.toml
```

---

## 3. Banco de Dados

O banco usa **PostgreSQL** com Prisma ORM. A conexão é definida pela variável de ambiente `DATABASE_URL`.

### 3.1 Schema Completo

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hash bcrypt
  name      String?
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteContent {
  id        String   @id @default(cuid())
  key       String   @unique   // ex: "hero_title", "img_gallery_1"
  value     String             // texto ou URL de imagem
  type      String   @default("text")  // "text" | "image"
  group     String?            // "hero" | "sobre" | "imagens" | etc.
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  title       String
  description String
  icon        String             // nome do ícone lucide-react
  featured    Boolean  @default(false)
  sortOrder   Int      @default(0)
  ctaText     String?
  highlight   Boolean  @default(false)
  checkItems  String   @default("[]")  // JSON serializado: string[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Segment {
  id           String   @id @default(cuid())
  title        String
  subtitle     String
  description  String
  applications String   @default("[]")  // JSON serializado: string[]
  icon         String   @default("globe")
  sortOrder    Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model CaseStudy {
  id          String   @id @default(cuid())
  title       String
  segment     String
  description String
  highlights  String   @default("[]")  // JSON serializado: string[]
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model NavLink {
  id        String   @id @default(cuid())
  label     String
  href      String
  active    Boolean  @default(false)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model FooterLink {
  id        String   @id @default(cuid())
  label     String
  href      String
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3.2 Padrão para Campos de Array

Arrays (como `checkItems`, `applications`, `highlights`) são armazenados como **JSON serializado em String** no banco. Isso evita tabelas de relacionamento N:N desnecessárias para listas simples.

```typescript
// Ao salvar:
checkItems: JSON.stringify(["item1", "item2"])

// Ao ler (src/lib/types.ts):
export function parseCheckItems(str: string): string[] {
  try { return JSON.parse(str); } catch { return []; }
}
```

### 3.3 Comandos Prisma

```bash
npx prisma generate        # gera o client TypeScript
npx prisma db push         # aplica schema no banco (sem migration)
npx prisma migrate dev     # cria migration com histórico (alternativa)
npx prisma studio          # interface visual para inspecionar o banco
npx prisma migrate reset   # reseta e re-aplica tudo
```

---

## 4. Camada de Dados — `useSiteData`

**Arquivo:** `src/hooks/use-site-data.ts`

Hook central que todas as páginas usam para obter os dados do site. Ele:

1. Faz `fetch` paralelo de todos os 6 endpoints da API em `Promise.all`
2. Se o banco estiver vazio (primeiro acesso), chama automaticamente `/api/seed` para popular os dados padrão
3. Expõe `refetch()` para o admin disparar atualização manual após salvar

```typescript
// Exemplo de uso numa página
const { contents, services, loading } = useSiteData();
const heroTitle = getContentValue(contents, "hero_title");
```

**`getContentValue`** é um helper em `src/lib/types.ts`:

```typescript
export function getContentValue(contents: SiteContent[], key: string): string {
  return contents.find((c) => c.key === key)?.value || "";
}
```

**Padrão para todos os textos do site:** sempre usar `getContentValue(contents, "chave") || "fallback padrão"`. O fallback garante que o site funciona mesmo se a chave não existir no banco.

---

## 5. API Routes

Todas as rotas ficam em `src/app/api/`. Padrão REST com Next.js App Router — cada pasta tem um `route.ts` que exporta funções `GET`, `POST`, `PUT`, `DELETE`.

### 5.1 Mapa de Rotas e Métodos

| Rota | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/content` | Lista tudo | Cria (batch ou único) | Upsert por `key` ou atualiza por `id` | Por `?id=` |
| `/api/services` | Lista (ordenado) | Cria | Atualiza por `id` | Por `?id=` |
| `/api/segments` | Lista (ordenado) | Cria | Atualiza por `id` | Por `?id=` |
| `/api/cases` | Lista (ordenado) | Cria | Atualiza por `id` | Por `?id=` |
| `/api/navigation` | Lista (ordenado) | Cria | Atualiza por `id` | Por `?id=` |
| `/api/footer` | Lista (ordenado) | Cria | Atualiza por `id` | Por `?id=` |
| `/api/auth/login` | — | Login com bcrypt | — | — |
| `/api/seed` | — | Popula dados padrão | — | — |

### 5.2 Padrão Upsert (SiteContent)

O `PUT /api/content` usa `upsert` do Prisma — cria se não existe, atualiza se já existe. Isso torna o admin simples: sempre manda PUT sem precisar saber se o registro já está no banco.

```typescript
const upserted = await db.siteContent.upsert({
  where: { key },
  update: { value, type, group },
  create: { key, value, type, group },
});
```

### 5.3 Padrão de Rota CRUD (Exemplo)

```typescript
// src/app/api/services/route.ts

export async function GET() {
  const services = await db.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const service = await db.service.create({ data: { ...body } });
  return NextResponse.json(service);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  const service = await db.service.update({ where: { id }, data });
  return NextResponse.json(service);
}

export async function DELETE(request: NextRequest) {
  const id = new URL(request.url).searchParams.get("id");
  await db.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

### 5.4 Autenticação das Rotas de API

A rota `/api/auth/login` valida email/senha contra o banco usando `bcrypt.compare`. **As demais rotas de API não têm middleware de proteção** — qualquer cliente HTTP pode acessá-las. Aceitável para CMS de site institucional; para dados sensíveis, adicionar verificação de token.

---

## 6. Prisma Client — Singleton

**Arquivo:** `src/lib/db.ts`

Padrão obrigatório no Next.js para evitar múltiplas instâncias do Prisma em desenvolvimento (hot reload cria novas conexões a cada alteração de arquivo).

```typescript
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] })

// Reutiliza a instância em dev; em produção sempre cria nova
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

---

## 7. Painel Administrativo

**Arquivo:** `src/app/admin/page.tsx`  
**URL:** `/admin`

Todo o admin está num único arquivo (~1.200 linhas). É uma SPA completa dentro do Next.js — não usa rotas separadas para cada aba.

### 7.1 Autenticação

Fluxo sem JWT ou cookies — usa `sessionStorage`:

```
1. Usuário preenche email/senha no <LoginScreen>
2. Frontend faz POST /api/auth/login
3. API valida com bcrypt.compare contra o banco
4. Se OK → sessionStorage.setItem("cjp_admin_auth", "1")
5. Componente raiz lê via useSyncExternalStore → mostra dashboard
6. Logout → sessionStorage.removeItem("cjp_admin_auth") → volta ao login
```

```typescript
// Leitura reativa do sessionStorage
const isAuthenticated = useSyncExternalStore(
  subscribe,           // função que registra listener de storage
  () => sessionStorage.getItem("cjp_admin_auth") === "1",
  () => false          // snapshot do servidor (SSR)
);
```

**Característica:** `sessionStorage` é volátil — ao fechar o browser, a sessão é perdida. Não há remember-me nem refresh token.

### 7.2 Layout do Dashboard

```
AdminDashboard
├── <aside> Sidebar fixa (esquerda, w-64)
│   ├── Logo + subtítulo
│   ├── <nav> Botões de aba (7 abas)
│   └── Links "Ver Site" e "Sair"
└── <main> Conteúdo principal (flex-1, overflow-y-auto)
    └── AnimatePresence (transição entre abas)
        ├── ContentTab   — edita textos por key
        ├── ImagesTab    — gerencia URLs de imagens
        ├── ServicesTab  — CRUD de serviços/soluções
        ├── SegmentsTab  — CRUD de segmentos de mercado
        ├── CasesTab     — CRUD de cases
        ├── NavTab       — CRUD de links da navegação
        └── FooterTab    — CRUD de links + textos do footer
```

### 7.3 Fluxo de Dados no Admin

O `AdminDashboard` carrega todos os dados na montagem (`useRef` para garantir execução única) e mantém estado local em `useState`. Cada aba recebe os dados e callbacks como props:

```typescript
// Handler genérico de conteúdo
const updateContent = async (key: string, value: string) => {
  const isImage = key.startsWith("img_");
  await fetch("/api/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key,
      value,
      ...(isImage ? { type: "image", group: "imagens" } : {}),
    }),
  });
  fetchDataCb();  // re-fetch global atualiza o estado local
  toast({ title: "Salvo!" });
};
```

### 7.4 Aba de Imagens (ImagesTab)

Sistema baseado em **URL pública** — não faz upload de arquivo. O admin cola uma URL de qualquer CDN ou serviço de imagens.

**Slots predefinidos:**

| Chave | Onde aparece |
|---|---|
| `img_logo` | Navbar e footer |
| `img_favicon` | Aba do browser (não implementado dinamicamente) |
| `img_og_image` | Compartilhamento em redes sociais |
| `img_hero_bg` | Background da seção hero |
| `img_gallery_1` a `img_gallery_6` | Galeria de imagens da home |
| `img_about_joao` | Foto do fundador na página Sobre |
| `img_about_team` | Foto da equipe |

O admin também pode criar slots personalizados com qualquer chave no formato `img_*`.

Cada slot tem:
- Preview ao vivo (atualiza conforme digita)
- Fallback com ícone se URL inválida (`onError` no `<img>`)
- Botões Salvar e Limpar

### 7.5 Aba de Conteúdo (ContentTab)

Lista todos os registros `SiteContent` agrupados pela coluna `group`. Detecta automaticamente se o campo é longo (>100 chars) para usar `Textarea` vs `Input`.

### 7.6 Abas com CRUD Completo

`ServicesTab`, `SegmentsTab`, `CasesTab`, `NavTab` e `FooterTab` seguem o mesmo padrão:

1. **Listagem:** cards com botão Editar (lápis) e Excluir (lixeira)
2. **Formulário inline:** aparece acima da lista ao clicar Editar ou "+ Novo"
3. **Salvar:** `PUT` com `id` se editando, `POST` sem `id` se criando
4. **Excluir:** `confirm()` nativo do browser + `DELETE ?id=`

---

## 8. Componentes Compartilhados

### 8.1 `PageLayout`

Wrapper obrigatório para todas as páginas públicas. Centraliza o loading state, a navegação e o footer:

```typescript
export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { contents, navLinks, footerLinks, loading } = useSiteData();

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation navLinks={navLinks} contents={contents} />
      <main className="flex-grow pt-[72px]">{children}</main>
      <Footer footerLinks={footerLinks} contents={contents} />
      <WhatsAppButton />
    </div>
  );
}
```

### 8.2 `Navigation`

Header fixo com comportamento scroll-aware:

- `window.scrollY <= 20`: fundo transparente/escuro, texto branco
- `window.scrollY > 20`: fundo branco/95% opacidade + blur, texto escuro

Usa `layoutId="activeNavIndicator"` do Framer Motion para animação fluida do indicador de página ativa. Menu mobile com `AnimatePresence` para transição de entrada/saída.

### 8.3 `ImageGallery`

Grid 3 colunas responsivo + lightbox modal. Recebe `contents: SiteContent[]` e usa `img_gallery_1` a `img_gallery_6` do banco, com fallback para `/public/gallery/*.png`.

```typescript
function buildGalleryImages(contents: SiteContent[]): GalleryImage[] {
  return defaultGalleryImages.map((img, i) => {
    const key = `img_gallery_${i + 1}`;
    const dbValue = contents.find((c) => c.key === key)?.value;
    return dbValue ? { ...img, src: dbValue } : img;
  });
}

export default function ImageGallery({ contents = [] }: { contents?: SiteContent[] }) {
  const galleryImages = buildGalleryImages(contents);
  // ...
}
```

### 8.4 `animations.tsx` — Componentes Reutilizáveis

| Componente | Comportamento |
|---|---|
| `AnimatedSection` | `opacity: 0 → 1` + `y: 40 → 0` ao entrar na viewport (`whileInView`) |
| `StaggerContainer` | Container que dispara animação dos filhos em cascata (delay incremental) |
| `StaggerItem` | Item filho do StaggerContainer |
| `SectionTag` | Badge colorido de seção (ex: "Galeria", "Sobre") |
| `PageHero` | Cabeçalho padrão de páginas internas com gradiente |

Todos usam `viewport={{ once: true }}` — animam apenas na primeira vez que entram na tela.

---

## 9. Tipagem TypeScript

**Arquivo:** `src/lib/types.ts`

Todas as interfaces mapeiam diretamente os modelos do Prisma:

```typescript
export interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: string;
  group: string | null;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  sortOrder: number;
  ctaText: string | null;
  highlight: boolean;
  checkItems: string;  // JSON serializado
}

// Helpers de leitura
export function getContentValue(contents: SiteContent[], key: string): string
export function parseCheckItems(str: string): string[]
export function parseApplications(str: string): string[]
export function parseHighlights(str: string): string[]
```

---

## 10. Estilização

### 10.1 Sistema de Design

- **Tailwind CSS 4** — configuração via CSS variables no `globals.css` (sem `tailwind.config.js`)
- **shadcn/ui** — componentes de formulário e UI (Button, Input, Textarea, Label, Separator, Toast, etc.)
- **Radix UI** — base acessível (ARIA, keyboard navigation) para todos os componentes shadcn

### 10.2 Fontes

Duas fontes do Google Fonts carregadas diretamente no `<head>` do `layout.tsx`:

| Fonte | Pesos | Uso |
|---|---|---|
| Hanken Grotesk | 600, 700 | Títulos, cabeçalhos, CTAs |
| Inter | 400, 500, 600 | Corpo de texto geral |
| Geist / Geist Mono | variável | Variáveis CSS `--font-geist-sans` / `--font-geist-mono` |

```tsx
// layout.tsx
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

### 10.3 Cores Customizadas (CSS Variables)

Definidas em `src/app/globals.css`:

```css
--color-cjp-primary: #0a1628        /* azul marinho escuro */
--color-cjp-accent: #5845cc         /* roxo/violeta de destaque */
--color-cjp-accent-light: #7c6ee0   /* variação clara do accent */
```

Usadas via Tailwind: `text-cjp-primary`, `bg-cjp-accent`, `border-cjp-accent-light`.

### 10.4 Classes Utilitárias Importantes

```css
/* Efeito glass card usado nos cards flutuantes do hero */
.glass-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); }

/* Efeito shine no hover de cards */
.card-shine-hover { /* gradiente diagonal animado no hover */ }
```

---

## 11. Deploy — Netlify

### 11.1 Build Command

**Arquivo:** `netlify.toml`

```toml
[build]
  command = "npx prisma generate && npx prisma db push && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_TELEMETRY_DISABLED = "1"
```

O build executa **3 etapas em sequência**:
1. `prisma generate` — gera o TypeScript client a partir do schema
2. `prisma db push` — aplica o schema no banco de dados (sem criar migrations)
3. `npm run build` — build do Next.js

### 11.2 Modo Standalone

`next.config.ts` usa `output: "standalone"`. O script de build copia os estáticos manualmente para o diretório standalone:

```json
"build": "next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/"
```

### 11.3 Variáveis de Ambiente no Netlify

Configurar em: Netlify Dashboard → Site Settings → Environment Variables

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão PostgreSQL completa |

**Exemplo de connection string:**
```
postgresql://usuario:senha@host.supabase.co:5432/postgres
```

### 11.4 Estratégia de Banco — `db push` vs Migrations

O projeto usa `prisma db push` (sem histórico de migrations). Comparação:

| | `db push` | `migrate dev` |
|---|---|---|
| Histórico | Não | Sim |
| Rollback | Não | Sim |
| Adequado para | Projetos pequenos/evolução rápida | Projetos em produção com múltiplas pessoas |
| Risco | Pode perder dados em mudanças destrutivas | Controlado |

---

## 12. Seed Automático do Banco

**Arquivo:** `src/app/api/seed/route.ts`

Detectado e chamado pelo `useSiteData` na primeira vez que o banco está vazio:

```typescript
// No useSiteData:
if (contentData.length === 0 && !hasSeeded.current) {
  hasSeeded.current = true;
  await fetch("/api/seed", { method: "POST" });
  // re-fetch após seed...
}
```

O seed popula usando `upsert` (idempotente — pode rodar várias vezes sem duplicar):

- Usuário admin padrão: `admin@cjpnet.com.br` / `admin123` (senha hasheada com bcrypt)
- Todos os textos padrão do site (`SiteContent`) agrupados por seção
- 7 links de navegação (`NavLink`)
- 4 serviços (`Service`)
- 5 segmentos (`Segment`)
- 4 cases (`CaseStudy`)
- 6 links do footer (`FooterLink`)

---

## 13. Autenticação — Resumo Completo

O projeto tem **NextAuth instalado** mas não utilizado. O admin usa sistema próprio mais simples:

| Aspecto | Implementação |
|---|---|
| Hash de senha | `bcryptjs` com `saltRounds: 10` |
| Verificação | `bcrypt.compare(senhaDigitada, hashBanco)` |
| Armazenamento de sessão | `sessionStorage` (volátil, por aba) |
| Reatividade | `useSyncExternalStore` lendo o sessionStorage |
| Proteção de rotas | Verificação client-side apenas |
| Proteção da API | Nenhuma (rotas públicas) |

---

## 14. Fluxo Completo: Editar Conteúdo → Aparecer no Site

```
Admin acessa /admin
    ↓
POST /api/auth/login → bcrypt.compare → sessionStorage = "1"
    ↓
AdminDashboard monta → GET paralelo (6 APIs) → estado local
    ↓
Admin edita campo → clica Salvar
    ↓
PUT /api/content { key: "hero_title", value: "Novo título" }
    ↓
db.siteContent.upsert → PostgreSQL atualizado
    ↓
fetchDataCb() → re-fetch → estado local atualizado → toast
    ═══════════════════════════════
Usuário acessa o site público
    ↓
PageLayout → useSiteData → GET /api/content → PostgreSQL
    ↓
getContentValue(contents, "hero_title") → "Novo título"
    ↓
Renderiza o valor na página
```

---

## 15. Dependências Detalhadas

### Core
```json
"next": "^16.1.1"
"react": "^19.0.0"
"typescript": "^5"
```

### Banco de Dados
```json
"@prisma/client": "^6.11.1"
"prisma": "^6.11.1"
```

### UI e Estilização
```json
"tailwindcss": "^4"
"framer-motion": "^12.23.2"
"lucide-react": "^0.525.0"
"class-variance-authority": "^0.7.1"
"clsx": "^2.1.1"
"tailwind-merge": "^3.3.1"
// + todos os @radix-ui/* para shadcn
```

### Autenticação
```json
"bcryptjs": "^3.0.3"
"next-auth": "^4.24.11"  // instalado, não utilizado no admin
```

### Notificações / Feedback
```json
"sonner": "^2.0.6"      // alternativa de toast (instalado)
// shadcn/ui toaster é o utilizado efetivamente
```

### Utilitários Instalados (não todos em uso)
```json
"@tanstack/react-query": "^5.82.0"   // cache de dados (instalado, não usado para CMS)
"@tanstack/react-table": "^8.21.3"   // tabelas avançadas
"@dnd-kit/core": "^6.3.1"           // drag-and-drop (sortable)
"react-hook-form": "^7.60.0"        // formulários
"zod": "^4.0.2"                     // validação de schema
"zustand": "^5.0.6"                 // gerenciamento de estado global
"recharts": "^2.15.4"               // gráficos
"@mdxeditor/editor": "^3.39.1"     // editor rich text
"next-intl": "^4.3.4"              // internacionalização
```

---

## 16. Como Replicar em Outro Projeto

### Passo a Passo

**1. Banco de Dados**
- Criar instância PostgreSQL (Supabase, Railway, Neon, ou local)
- Obter `DATABASE_URL` no formato `postgresql://user:pass@host:port/db`

**2. Schema Prisma**
- Copiar `prisma/schema.prisma`
- Adaptar modelos conforme domínio (sempre manter `User` e `SiteContent`)
- Rodar `npx prisma generate && npx prisma db push`

**3. Prisma Singleton**
- Copiar `src/lib/db.ts` sem alterações

**4. Tipos e Helpers**
- Adaptar `src/lib/types.ts` com interfaces dos seus modelos
- Manter `getContentValue` e os helpers `parse*`

**5. API Routes**
- Para cada modelo, criar `src/app/api/[modelo]/route.ts`
- Seguir padrão: `GET` (findMany), `POST` (create), `PUT` (update), `DELETE` (?id=)
- Para conteúdo editável: usar padrão `upsert` como em `/api/content`

**6. Hook de Dados**
- Copiar `src/hooks/use-site-data.ts`
- Adaptar o `Promise.all` com seus endpoints
- Ajustar a lógica de seed automático

**7. Admin**
- Copiar estrutura `LoginScreen → AdminDashboard → Tabs`
- Adaptar as abas para os modelos do novo projeto
- A lógica de sessionStorage e o padrão de handlers são 100% reutilizáveis

**8. Seed**
- Criar `src/app/api/seed/route.ts` com dados padrão do novo projeto
- Usar `upsert` para idempotência

**9. PageLayout e Componentes Shared**
- `page-layout.tsx` — copiar, adaptar para o hook de dados do novo projeto
- `animations.tsx` — copiar sem alterações (genérico)
- `navigation.tsx` e `footer.tsx` — adaptar links e conteúdo

**10. Deploy**
- Criar `netlify.toml` com `prisma generate && prisma db push && npm run build`
- Configurar `DATABASE_URL` no painel do Netlify
- Adicionar `output: "standalone"` no `next.config.ts`

### Checklist de Variáveis de Ambiente

```env
# Obrigatório
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Se usar NextAuth no futuro
NEXTAUTH_SECRET="string-aleatoria-minimo-32-chars"
NEXTAUTH_URL="https://seu-dominio.com"
```

### Dependências Mínimas para Replicar

```bash
# Framework
npm install next react react-dom typescript

# Banco
npm install @prisma/client prisma

# Estilização
npm install tailwindcss @tailwindcss/postcss

# UI base
npm install lucide-react framer-motion
npm install class-variance-authority clsx tailwind-merge

# Admin auth
npm install bcryptjs
npm install -D @types/bcryptjs

# shadcn/ui (instalar via CLI)
npx shadcn@latest init
npx shadcn@latest add button input textarea label separator toast
```

---

## 17. Limitações e Pontos de Atenção

| Item | Situação | Recomendação |
|---|---|---|
| Proteção das rotas de API | Não implementada | Adicionar verificação de Bearer token para dados sensíveis |
| Upload de arquivos | Não suportado | Integrar Cloudinary ou AWS S3 para upload real |
| Sessão admin | sessionStorage volátil | Usar NextAuth com JWT para produção robusta |
| Migrations de banco | `db push` sem histórico | Migrar para `prisma migrate` em projetos com equipe |
| TypeScript strict | `ignoreBuildErrors: true` | Resolver erros e remover flag em projetos novos |
| i18n | `next-intl` instalado mas não configurado | Configurar se necessário |
| Cache de dados | Sem cache | Adicionar React Query ou SWR para melhor performance |
| Imagens: domínios externos | Não configurado no `next.config.ts` | Adicionar `images.remotePatterns` se usar `<Image />` do Next.js |

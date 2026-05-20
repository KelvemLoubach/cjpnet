# Prompt Base — Landing Page com CMS Embutido

> Cole este prompt no início de uma nova conversa para criar um site/landing page
> com painel administrativo. Preencha apenas a seção "Detalhes do projeto" no final.

---

## PROMPT PARA USAR EM NOVOS PROJETOS

```
Crie um site [TIPO DO SITE] para [NOME DA EMPRESA/PROJETO] usando exatamente
a arquitetura e os padrões descritos abaixo. Não improvise tecnologias ou
padrões diferentes — siga o que está especificado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Next.js 16 com App Router e TypeScript
- Tailwind CSS 4 + shadcn/ui (componentes via Radix UI)
- Framer Motion para animações
- Prisma ORM 6 + PostgreSQL (Neon)
- bcryptjs para hash de senha
- Autenticação de API via httpOnly cookie + HMAC-SHA256 (crypto nativo do Node)
- Deploy no Netlify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUTURA DE ARQUIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [paginas]/page.tsx
│   ├── admin/page.tsx              ← CMS completo em um arquivo
│   └── api/
│       ├── content/route.ts
│       ├── [entidades]/route.ts
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       └── seed/route.ts
├── components/
│   ├── shared/
│   │   ├── page-layout.tsx
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   └── animations.tsx
│   └── ui/                         ← shadcn/ui
├── hooks/
│   └── use-site-data.ts
└── lib/
    ├── db.ts
    ├── admin-auth.ts               ← helper de autenticação das rotas
    └── types.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BANCO DE DADOS — NEON POSTGRESQL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provedor: Neon (neon.tech) — PostgreSQL serverless.

O Neon fornece dois tipos de connection string:
  - Direct URL   → usado pelo Prisma para migrations e db push
  - Pooled URL   → usado pela aplicação em produção (via PgBouncer)

Configurar no .env:
  DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
  DIRECT_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"

No prisma/schema.prisma:

  datasource db {
    provider  = "postgresql"
    url       = env("DATABASE_URL")
    directUrl = env("DIRECT_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }

Modelos base obrigatórios:

  model User {
    id        String   @id @default(cuid())
    email     String   @unique
    password  String
    name      String?
    role      String   @default("admin")
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  model SiteContent {
    id        String   @id @default(cuid())
    key       String   @unique
    value     String
    type      String   @default("text")
    group     String?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

Adicionar modelos específicos do projeto conforme necessário.
Arrays simples → armazenar como JSON serializado em String:
  items String @default("[]")   // JSON.stringify(string[])

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRISMA SINGLETON — src/lib/db.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const db =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTENTICAÇÃO DE API — src/lib/admin-auth.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGRA: todas as rotas que modificam dados (POST, PUT, DELETE) e o GET do
/api/seed devem chamar verifyAdminRequest antes de executar qualquer lógica.
Somente GET de dados públicos (content, services, etc.) ficam abertos.

Implementação completa:

  import { cookies } from "next/headers"
  import { createHmac } from "crypto"

  const SECRET = process.env.ADMIN_SECRET!

  // Gera token assinado com HMAC-SHA256
  export function signAdminToken(userId: string): string {
    const payload = `${userId}:${Date.now()}`
    const sig = createHmac("sha256", SECRET).update(payload).digest("hex")
    return Buffer.from(`${payload}:${sig}`).toString("base64url")
  }

  // Verifica token — retorna userId ou null
  export function verifyAdminToken(token: string): string | null {
    try {
      const decoded = Buffer.from(token, "base64url").toString()
      const parts = decoded.split(":")
      if (parts.length < 3) return null
      const sig = parts.pop()!
      const payload = parts.join(":")
      const expected = createHmac("sha256", SECRET).update(payload).digest("hex")
      if (sig !== expected) return null
      // Expiração: 7 dias
      const timestamp = parseInt(parts[1])
      if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) return null
      return parts[0] // userId
    } catch {
      return null
    }
  }

  // Usar em todas as rotas protegidas
  export async function verifyAdminRequest(): Promise<boolean> {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value
    if (!token) return false
    return verifyAdminToken(token) !== null
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROTAS DE AUTENTICAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/app/api/auth/login/route.ts:

  export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    const user = await db.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })

    const token = signAdminToken(user.id)
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,   // 7 dias em segundos
      path: "/",
    })
    return response
  }

src/app/api/auth/logout/route.ts:

  export async function POST() {
    const response = NextResponse.json({ success: true })
    response.cookies.delete("admin_token")
    return response
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PADRÃO DE API ROUTE PROTEGIDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Toda rota que modifica dados começa com a verificação:

  import { verifyAdminRequest } from "@/lib/admin-auth"

  export async function POST(request: NextRequest) {
    if (!await verifyAdminRequest()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
    // ... lógica da rota
  }

  export async function PUT(request: NextRequest) {
    if (!await verifyAdminRequest()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
    // ... lógica da rota
  }

  export async function DELETE(request: NextRequest) {
    if (!await verifyAdminRequest()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
    // ... lógica da rota
  }

  // GET permanece público (dados do site são públicos)
  export async function GET() {
    const items = await db.modelo.findMany({ orderBy: { sortOrder: "asc" } })
    return NextResponse.json(items)
  }

Padrão completo para /api/content (mais complexo por ter upsert):

  export async function PUT(request: NextRequest) {
    if (!await verifyAdminRequest()) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
    const { id, key, value, type, group } = await request.json()
    if (key) {
      const result = await db.siteContent.upsert({
        where: { key },
        update: { value, type, group },
        create: { key, value, type, group },
      })
      return NextResponse.json(result)
    }
    return NextResponse.json({ error: "Missing key" }, { status: 400 })
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAINEL ADMINISTRATIVO — src/app/admin/page.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Todo o admin em um único arquivo "use client". Estrutura:

1. LoginScreen
   - Formulário email/senha
   - Chama POST /api/auth/login
   - Em caso de sucesso: sessionStorage.setItem("admin_auth", "1")
   - Fetch já inclui o cookie automaticamente (same-origin)

2. Detecção de sessão com useSyncExternalStore lendo sessionStorage

3. AdminDashboard com sidebar fixa (w-64) + conteúdo principal (flex-1)

4. Logout chama POST /api/auth/logout (limpa cookie no servidor)
   E também: sessionStorage.removeItem("admin_auth")

5. Abas com AnimatePresence para transição suave

Abas obrigatórias:
  - Conteúdo: lista SiteContent por group, edita com Input ou Textarea
  - Imagens: slots img_* com preview ao vivo, cola URL pública
  - [Entidades do projeto]: CRUD com formulário inline

Padrão de fetch no admin (cookies são enviados automaticamente same-origin):
  await fetch("/api/entidade", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    // credentials: "include" não necessário em same-origin
  })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOOK CENTRAL — src/hooks/use-site-data.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"use client"

O hook deve:
1. Fazer fetch paralelo de todos os endpoints públicos (GET) com Promise.all
2. Se o banco estiver vazio, chamar POST /api/seed uma única vez (via useRef hasSeeded)
3. Expor refetch() para o admin disparar após salvar
4. Expor loading: boolean para o PageLayout

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HELPERS — src/lib/types.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getContentValue(contents: SiteContent[], key: string): string {
  return contents.find((c) => c.key === key)?.value || ""
}

export function parseJsonList(str: string): string[] {
  try { return JSON.parse(str) } catch { return [] }
}

Todas as páginas usam:
  const valor = getContentValue(contents, "chave") || "fallback padrão"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGELAYOUT — src/components/shared/page-layout.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"use client" — wrapper obrigatório em todas as páginas públicas.
- Chama useSiteData internamente
- Mostra spinner enquanto loading === true
- Renderiza <Navigation> + <main> + <Footer>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAVIGATION — scroll-aware + responsiva
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- scrollY <= 20: fundo transparente escuro, texto branco
- scrollY > 20: bg-white/95 + backdrop-blur-xl + texto escuro
- Indicador de página ativa com Framer Motion layoutId
- Menu mobile com AnimatePresence

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMAÇÕES — src/components/shared/animations.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exportar sempre:
- AnimatedSection: fade + slide up ao entrar na viewport (whileInView, once: true)
- StaggerContainer + StaggerItem: animação em cascata nos filhos
- SectionTag: badge colorido de seção (ex: "Sobre", "Galeria")
- PageHero: cabeçalho padrão de páginas internas com gradiente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SISTEMA DE IMAGENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sem upload de arquivo. Admin cola URL pública (Cloudinary, Imgur, qualquer CDN).

Chaves padrão: img_logo, img_favicon, img_og_image, img_hero_bg,
               img_gallery_1..N, img_about_[nome], img_team

Padrão no componente:
  const photoUrl = getContentValue(contents, "img_about_joao")
  return photoUrl ? (
    <img src={photoUrl} alt="..." className="w-full h-full object-cover" />
  ) : (
    <div className="placeholder">{/* fallback visual */}</div>
  )

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTILIZAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fontes via Google Fonts no <head> do layout.tsx:
  - Título: peso 600/700 (ex: Hanken Grotesk, Plus Jakarta Sans, Space Grotesk)
  - Corpo: peso 400/500/600 (ex: Inter, DM Sans)

Cores como CSS variables no globals.css:
  --color-primary: [cor escura principal]
  --color-accent: [cor de destaque/CTA]
  --color-accent-light: [variação clara do accent]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEED — src/app/api/seed/route.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rota POST protegida por verifyAdminRequest (chamada apenas pelo useSiteData).
Usar upsert em tudo para ser idempotente.

Sempre criar:
- Usuário admin: email/senha configuráveis, senha hasheada com bcrypt (saltRounds: 10)
- SiteContent com todos os textos padrão do site
- Registros padrão de cada entidade
- Links de navegação e footer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPLOY — NETLIFY + NEON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

netlify.toml:

  [build]
    command = "npx prisma generate && npx prisma db push && npm run build"
    publish = ".next"

  [build.environment]
    NODE_VERSION = "20"
    NEXT_TELEMETRY_DISABLED = "1"

next.config.ts:

  const nextConfig = {
    output: "standalone",
    typescript: { ignoreBuildErrors: true },
  }

package.json scripts:

  "build": "next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/"

Variáveis de ambiente no painel Netlify (Site Settings → Environment Variables):

  DATABASE_URL   = pooled connection string do Neon (com ?sslmode=require)
  DIRECT_URL     = direct connection string do Neon (com ?sslmode=require)
  ADMIN_SECRET   = string aleatória longa (mínimo 32 chars) para assinar tokens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VARIÁVEIS DE AMBIENTE — .env local
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
ADMIN_SECRET="gere-uma-string-aleatoria-longa-aqui"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETALHES DO PROJETO A CRIAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome do site/empresa: [PREENCHER]
Tipo: [landing page / site institucional / portfólio / SaaS marketing / outro]
Páginas: [Home / Sobre / Serviços / Cases / Contato / etc.]
Entidades editáveis pelo admin: [Serviços, Depoimentos, FAQs, Produtos, etc.]
Imagens necessárias: [logo, hero, galeria, foto fundador, etc.]
Textos editáveis: [hero title, hero description, sobre, missão, etc.]
Paleta de cores: [cor principal, cor de destaque, cor de fundo]
Fonte de título: [nome]
Fonte de corpo: [nome]
WhatsApp/contato: [número]
Redes sociais: [Instagram, LinkedIn, etc.]
Email admin inicial: [email]
Senha admin inicial: [senha]
```

---

## Referência rápida — arquivos e responsabilidades

| Arquivo | O que faz |
|---|---|
| `prisma/schema.prisma` | Define tabelas; usa `url` (pooled) + `directUrl` (direto) do Neon |
| `src/lib/db.ts` | Singleton do Prisma (evita múltiplas conexões em hot reload) |
| `src/lib/admin-auth.ts` | `signAdminToken`, `verifyAdminToken`, `verifyAdminRequest` |
| `src/lib/types.ts` | Interfaces TypeScript + `getContentValue` + `parseJsonList` |
| `src/app/api/auth/login/route.ts` | Valida senha com bcrypt, seta cookie httpOnly |
| `src/app/api/auth/logout/route.ts` | Deleta cookie `admin_token` |
| `src/app/api/content/route.ts` | GET público; POST/PUT/DELETE protegidos |
| `src/app/api/seed/route.ts` | POST protegido; popula banco com dados padrão |
| `src/hooks/use-site-data.ts` | Fetch paralelo de todos os dados, dispara seed automático |
| `src/components/shared/page-layout.tsx` | Wrapper: spinner + Navigation + Footer |
| `src/components/shared/navigation.tsx` | Header fixo, scroll-aware, responsivo |
| `src/components/shared/animations.tsx` | AnimatedSection, StaggerContainer, SectionTag, PageHero |
| `src/app/admin/page.tsx` | CMS completo: Login + Dashboard + Abas |
| `netlify.toml` | Build: prisma generate → db push → next build |

---

## Fluxo de autenticação das rotas

```
Admin faz login
  → POST /api/auth/login
  → bcrypt.compare(senha, hash)
  → signAdminToken(userId) com HMAC-SHA256 + ADMIN_SECRET
  → Set-Cookie: admin_token=... (httpOnly, secure, sameSite=strict, 7 dias)
  → sessionStorage.setItem("admin_auth", "1")

Admin salva conteúdo
  → PUT /api/content { key, value }         ← cookie enviado automaticamente
  → verifyAdminRequest() lê cookie
  → verifyAdminToken() verifica assinatura HMAC + expiração
  → se inválido → 401 Não autorizado
  → se válido → db.siteContent.upsert → 200 OK

Admin faz logout
  → POST /api/auth/logout
  → response.cookies.delete("admin_token")  ← cookie removido no servidor
  → sessionStorage.removeItem("admin_auth")
```

---

## Fluxo de dados público (site visitante)

```
Visitante acessa o site
  → useSiteData → GET /api/content (sem autenticação)
  → getContentValue(contents, "hero_title")
  → valor do banco renderizado na página
```

---

## Neon — como obter as connection strings

1. Acessar console.neon.tech
2. Selecionar o projeto → aba "Connection Details"
3. Selecionar "Pooled connection" → copiar para DATABASE_URL
4. Selecionar "Direct connection" → copiar para DIRECT_URL
5. Ambas terminam com `?sslmode=require`

Para o `.env` local usar o **Direct URL** em ambas as variáveis (sem pooling em dev).
Para o Netlify usar a **Pooled** em DATABASE_URL e a **Direct** em DIRECT_URL.

---

## Netlify — configuração passo a passo

1. Conectar repositório GitHub no painel Netlify
2. Build settings são lidos do `netlify.toml` automaticamente
3. Site Settings → Environment Variables → adicionar:
   - `DATABASE_URL` (pooled do Neon)
   - `DIRECT_URL` (direct do Neon)
   - `ADMIN_SECRET` (string aleatória, gerar com: `openssl rand -base64 32`)
4. Fazer deploy (o `prisma db push` cria as tabelas automaticamente no primeiro build)
5. Após primeiro deploy, acessar `https://seu-site.netlify.app/admin`
   → banco vazio → useSiteData dispara seed → dados padrão criados

---

## Chaves SiteContent padrão por grupo

```
group: "general"
  site_name, whatsapp_number, instagram_url, linkedin_url

group: "hero"
  hero_tag, hero_title, hero_description, hero_cta_primary, hero_cta_secondary

group: "sobre"
  sobre_description, sobre_missao, sobre_visao
  sobre_valores        → separados por "|"

group: "conteudo"
  diferenciais_items   → separados por "|"
  problemas_items      → separados por "|"

group: "footer"
  footer_copyright, footer_cnpj

group: "imagens"
  img_logo, img_favicon, img_og_image, img_hero_bg
  img_gallery_1 ... img_gallery_N
  img_about_[nome], img_team
```

---

## Padrão de página pública

```tsx
"use client"
import { useSiteData } from "@/hooks/use-site-data"
import { getContentValue } from "@/lib/types"
import PageLayout from "@/components/shared/page-layout"

export default function MinhaPage() {
  const { contents } = useSiteData()
  const titulo = getContentValue(contents, "minha_chave") || "Fallback"

  return (
    <PageLayout>
      <section>
        <h1>{titulo}</h1>
      </section>
    </PageLayout>
  )
}
```

---

## Padrão de imagem com fallback

```tsx
const photoUrl = getContentValue(contents, "img_about_joao")

return photoUrl ? (
  <img src={photoUrl} alt="Descrição" className="w-full h-full object-cover" />
) : (
  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
    <span className="text-white/60 text-4xl font-bold">AB</span>
  </div>
)
```

---

## Dependências mínimas

```bash
# Framework
npm install next react react-dom typescript

# Banco
npm install @prisma/client prisma

# Estilização
npm install tailwindcss @tailwindcss/postcss framer-motion lucide-react
npm install class-variance-authority clsx tailwind-merge

# Auth
npm install bcryptjs
npm install -D @types/bcryptjs

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input textarea label separator toast
```

---

## Resumo de segurança das rotas

| Rota | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/content` | público | protegido | protegido | protegido |
| `/api/services` | público | protegido | protegido | protegido |
| `/api/segments` | público | protegido | protegido | protegido |
| `/api/cases` | público | protegido | protegido | protegido |
| `/api/navigation` | público | protegido | protegido | protegido |
| `/api/footer` | público | protegido | protegido | protegido |
| `/api/auth/login` | — | público | — | — |
| `/api/auth/logout` | — | público | — | — |
| `/api/seed` | — | protegido | — | — |

**"protegido"** = requer cookie `admin_token` válido (httpOnly, assinado com HMAC-SHA256).
**"público"** = sem autenticação (dados exibidos no site para visitantes).

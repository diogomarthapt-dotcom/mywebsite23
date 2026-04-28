# Clipping App — Documentação Completa

> App de curação de media construído em cima de um blog Astro, deployado em Cloudflare Workers. Inspirado no **Opus Clip** (curação + key moments + trending score) e **CapCut** (coleções + tipos de conteúdo + organização).

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Astro 5.x](https://astro.build) |
| Hosting | Cloudflare Workers (free tier) |
| Base de dados | Cloudflare KV (free tier) |
| Adapter | `@astrojs/cloudflare` v12 |
| Linguagem | TypeScript |
| Estilos | CSS puro (scoped Astro) |

---

## Estrutura de Ficheiros

```
src/
├── lib/
│   └── trending.ts          # Algoritmo de Trending Probability Score
├── pages/
│   ├── clips/
│   │   ├── index.astro      # Página pública (Lista / Pipeline / Calendário)
│   │   ├── admin.astro      # Painel de administração (password-protected)
│   │   └── dashboard.astro  # Analytics da biblioteca
│   └── api/
│       └── clips/
│           ├── index.ts     # GET (listar) / POST (criar) / PATCH (atualizar)
│           ├── [id].ts      # DELETE por ID
│           ├── auth.ts      # Verificação de palavra-passe
│           └── oembed.ts    # Proxy YouTube oEmbed (auto-fill metadata)
├── components/
│   ├── Header.astro         # Navegação (tem link Clipping + Dashboard)
│   ├── Footer.astro
│   ├── BaseHead.astro
│   ├── HeaderLink.astro
│   └── FormattedDate.astro
├── layouts/
│   └── BlogPost.astro
├── content/
│   └── blog/                # Posts do blog (MDX/Markdown)
├── styles/
│   └── global.css
└── env.d.ts                 # Tipos Cloudflare (CLIPS_KV, ADMIN_PASSWORD)
```

---

## Modelo de Dados — `Clip`

```typescript
interface Clip {
  id: string;                  // UUID gerado pelo crypto.randomUUID()
  url: string;                 // URL do vídeo/artigo *obrigatório*
  title: string;               // Título *obrigatório*
  description: string;         // Nota pessoal / resumo
  tags: string[];              // Array de tags
  date: string;                // ISO date (criação automática)
  scheduledDate?: string;      // YYYY-MM-DD (para o calendário)
  stage: 'to-watch' | 'watching' | 'watched';  // Estado do pipeline
  thumbnail?: string;          // URL da thumbnail (YouTube auto-fill)
  channel?: string;            // Nome do canal (YouTube auto-fill)
  duration?: string;           // Duração manual ex: "12:34"
  rating?: number;             // 1-5 estrelas
  moments?: Array<{            // Key moments (estilo Opus Clip)
    time: string;              //   ex: "02:45"
    note: string;              //   ex: "Melhor exemplo sobre X"
  }>;
  collection?: string;         // Pasta/projeto ex: "Trading", "TED"
  clipType?: 'tutorial' | 'inspiration' | 'research' |
             'entertainment' | 'news' | 'other';
}
```

---

## API Endpoints

### `GET /api/clips`
Retorna todos os clips como JSON array.
```bash
curl http://localhost:4321/api/clips
# → [{ id, url, title, ... }, ...]
```

### `POST /api/clips`
Cria um novo clip. Requer header `X-Admin-Password`.
```bash
curl -X POST http://localhost:4321/api/clips \
  -H "Content-Type: application/json" \
  -H "X-Admin-Password: localdev" \
  -d '{
    "url": "https://youtube.com/watch?v=...",
    "title": "Título do clip",
    "tags": ["trading", "IA"],
    "stage": "to-watch",
    "rating": 4,
    "collection": "Trading",
    "clipType": "tutorial",
    "moments": [{ "time": "02:45", "note": "Ponto chave" }]
  }'
# → 201: { id, url, title, date, ... }
```

### `PATCH /api/clips`
Atualiza campos de um clip existente. Requer `X-Admin-Password`.
```bash
curl -X PATCH http://localhost:4321/api/clips \
  -H "Content-Type: application/json" \
  -H "X-Admin-Password: localdev" \
  -d '{ "id": "uuid-do-clip", "stage": "watched", "rating": 5 }'
```

### `DELETE /api/clips/[id]`
Apaga um clip pelo ID. Requer `X-Admin-Password`.
```bash
curl -X DELETE http://localhost:4321/api/clips/uuid-do-clip \
  -H "X-Admin-Password: localdev"
```

### `POST /api/clips/auth`
Verifica a palavra-passe de admin.
```bash
curl -X POST http://localhost:4321/api/clips/auth \
  -H "Content-Type: application/json" \
  -d '{ "password": "localdev" }'
# → 200: { ok: true }   ou   401: { error: "..." }
```

### `GET /api/clips/oembed?url=...`
Proxy para o YouTube oEmbed API. Retorna metadata do vídeo.
```bash
curl "http://localhost:4321/api/clips/oembed?url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ"
# → { title, channel, thumbnail }
```
> ⚠️ Só funciona em produção (Cloudflare). YouTube bloqueado em dev local sandboxed.

---

## Páginas

### `/clips` — Biblioteca Pública
Três vistas seleccionáveis via tabs:

| Vista | Descrição |
|-------|-----------|
| **Lista** | Cards com thumbnail, título, descrição, tags, key moments preview, trending badge |
| **Pipeline** | Kanban 3 colunas (Para ver / A ver / Visto), ordenado por rating |
| **Calendário** | Grelha mensal, dots coloridos por stage, clica no dia para ver clips |

Filtros disponíveis:
- Por **tag** (query param `?tag=trading`)
- Por **coleção** (query param `?collection=Trading`)
- Por **vista** (query param `?view=list|pipeline|calendar`)
- **Pesquisa** instantânea client-side (título, descrição, canal, tags)

### `/clips/admin` — Administração
Protegido por palavra-passe (sessionStorage). Funcionalidades:

- **YouTube auto-fill**: ao sair do campo URL, vai buscar título, thumbnail e canal via oEmbed
- **Star rating**: widget de 1-5 estrelas com hover effect
- **Key Moments**: adicionar pares timestamp + nota dinamicamente
- **Coleção**: campo com autocomplete baseado nas coleções existentes
- **Tipo de conteúdo**: dropdown com emoji
- **Duração**: campo manual
- **Data no calendário**: date picker
- **Estado inline**: dropdown por clip para mudar stage sem recarregar
- **Filtro por stage**: Todos / Para ver / A ver / Visto
- **Apagar**: com confirmação

### `/clips/dashboard` — Analytics
Inspirado no Opus Clip:

- **8 stat cards**: Total, Para ver, A ver, Vistos, % Concluído, Rating médio, Esta semana, Coleções
- **Watch Next**: top 4 clips com melhor rating ainda não vistos
- **Coleções**: barra de progresso por coleção
- **Top Tags**: horizontal bars com contagem
- **Rating Distribution**: distribuição 1-5 estrelas
- **Tipos de Conteúdo**: breakdown por categoria

---

## Trending Probability Score

Algoritmo em `src/lib/trending.ts`. Score de **0–99** calculado por:

| Factor | Pontos |
|--------|--------|
| Rating (×5 por estrela) | 0–25 |
| Key moments (×5 cada, max) | 0–15 |
| Tem thumbnail (YouTube) | +8 |
| Duração < 3min | +20 |
| Duração < 10min | +12 |
| Duração < 30min | +6 |
| Tipo: `news` | +15 |
| Tipo: `inspiration` | +12 |
| Tipo: `entertainment` | +10 |
| Tipo: `tutorial` | +6 |
| Tags (×2 cada, max) | 0–10 |
| Tem coleção | +5 |
| Stage "watching" | +5 |
| Adicionado < 7 dias | +10 |
| Adicionado < 30 dias | +5 |

**Classificação:**

| Score | Label | Cor |
|-------|-------|-----|
| 70–99 | 🔥 Trending | Verde (#059669) |
| 40–69 | 📈 Rising | Âmbar (#D97706) |
| 0–39  | ◦ Low | Cinza (#9CA3AF) |

---

## Storage — Cloudflare KV

Todos os clips são guardados num único key KV:

```
Key:   "clips"
Value: JSON.stringify(Clip[])   // array completo, mais recente primeiro
```

Operações:
- **Read**: `await env.CLIPS_KV.get('clips')`
- **Write**: `await env.CLIPS_KV.put('clips', JSON.stringify(clips))`

> Adequado para uso pessoal (centenas de clips). Para milhares, considerar índices separados.

---

## Setup Local

```bash
# 1. Instalar dependências
npm install

# 2. Criar ficheiro de variáveis locais
cat > .dev.vars << EOF
ADMIN_PASSWORD=localdev
EOF

# 3. Arrancar servidor de desenvolvimento
npm run dev
# → http://localhost:4321
```

Páginas:
- `http://localhost:4321/clips` — biblioteca pública
- `http://localhost:4321/clips/admin` — admin (password: `localdev`)
- `http://localhost:4321/clips/dashboard` — analytics

---

## Deploy para Cloudflare (Produção)

```bash
# 1. Criar namespace KV
npx wrangler kv namespace create CLIPS_KV
# → Copia o ID gerado

# 2. Atualizar wrangler.json com o ID real
# Substituir "REPLACE_WITH_YOUR_KV_ID" pelo ID copiado

# 3. Definir password de admin em segredo
npx wrangler secret put ADMIN_PASSWORD
# → Introduz a password quando pedido

# 4. Deploy
npm run deploy
```

### `wrangler.json` (configuração atual)

```json
{
  "name": "mywebsite23",
  "compatibility_date": "2025-10-08",
  "compatibility_flags": ["nodejs_compat"],
  "kv_namespaces": [
    {
      "binding": "CLIPS_KV",
      "id": "REPLACE_WITH_YOUR_KV_ID",
      "preview_id": "00000000000000000000000000000001"
    }
  ]
}
```

---

## Variáveis de Ambiente

| Variável | Onde definir | Descrição |
|----------|-------------|-----------|
| `ADMIN_PASSWORD` | `.dev.vars` (local) / `wrangler secret` (produção) | Password do painel admin |
| `CLIPS_KV` | `wrangler.json` (binding KV) | Namespace KV para guardar clips |

---

## Navegação (Header)

```
Home | Blog | Clipping | Dashboard | About
```

---

## Histórico de Commits

| Hash | Descrição |
|------|-----------|
| `2ff52ea` | Upgrade: pipeline, calendar, YouTube auto-fill, Opus Clip/CapCut features |
| `06b6701` | Add puppeteer (dev dependency para screenshots) |
| `a3dcd88` | Upgrade inicial: pipeline + calendário + YouTube auto-fill |
| `bad86e4` | Clipping app v1: KV storage + admin + API |
| `a5bf2ba` | Source repo import (base Astro blog) |

---

## Próximos Passos Possíveis

- [ ] **Claude design system** — redesign visual com paleta warm (em progresso)
- [ ] **Trending score display** — mostrar score nos cards (em progresso)
- [ ] **Export** — exportar biblioteca como JSON / CSV / Markdown newsletter
- [ ] **Import em massa** — colar múltiplos URLs de uma vez
- [ ] **YouTube chapters** — importar capítulos automáticos como key moments (requer YouTube Data API key)
- [ ] **Partilha** — links públicos para coleções individuais
- [ ] **PWA** — instalar como app no telemóvel
- [ ] **Notificações** — lembrar de ver clips agendados no calendário

---

## Notas Técnicas

- O `output` do Astro está em modo `static` mas as páginas `/clips/**` e `/api/clips/**` têm `export const prerender = false` — são server-rendered pelo Cloudflare Worker
- O adapter `@astrojs/cloudflare` v12 activa automaticamente sessões Astro com binding `SESSION` KV — como não usamos sessões Astro, isso é inofensivo
- A `worker-configuration.d.ts` é gerada automaticamente pelo `wrangler types` — não editar manualmente
- O `crypto.randomUUID()` está disponível no runtime Cloudflare Workers sem imports adicionais

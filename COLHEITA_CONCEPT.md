# Colheita — Conceito & Documentação do Projecto

> **Da Quinta à Sua Mesa.** Marketplace hiperlocal que liga directamente agricultores de Cascais e Sintra aos consumidores locais, sem intermediários, sem comissões, sem complicações.

---

## 1. O Problema

Os agricultores locais do Mercado de Cascais e arredores enfrentam três problemas centrais:

- **Margens esmagadas por intermediários** — grande distribuição retém 40–60% do valor do produto
- **Desperdício por imprevisibilidade da procura** — colhem sem saber o que vai vender
- **Sem canal digital próprio** — dependem da presença física no mercado, limitada a sábados

Os consumidores, por sua vez:
- Não sabem o que está disponível antes de ir ao mercado
- Não têm forma de encomendar antecipadamente
- Não conseguem receber em casa de forma simples

---

## 2. A Solução — Colheita

Uma plataforma web simples (sem app para instalar) que permite:

1. **Consumidor** navega quintas, vê produtos disponíveis esta semana, adiciona ao carrinho
2. **Consumidor** escolhe recolha no mercado (grátis) ou entrega ao domicílio (€2,50–€3,50)
3. **Encomenda enviada directamente ao agricultor por WhatsApp** — sem plataformas de pagamento, sem comissões
4. **Pagamento no acto** — dinheiro ou MBWay, na entrega ou no levantamento
5. **Agricultor gere encomendas** num dashboard simples protegido por PIN

### O que torna isto diferente

| | Grande Distribuição | Mercado Físico | **Colheita** |
|---|---|---|---|
| Canal de venda | Supermercado | Presença sábado | Online 24/7 |
| Comissão | 40–60% | 0% (stand pago) | **0%** |
| Previsibilidade | Baixa | Baixa | **Alta (pré-encomenda)** |
| Raio de entrega | Nacional | Local | **Hiperlocal (Cascais/Sintra)** |
| Contacto com cliente | Nenhum | Directo | **Directo via WhatsApp** |

---

## 3. Modelo de Negócio (Fase Piloto)

### Para os agricultores
- **Custo zero** — sem setup, sem comissão, sem subscrição
- **Preços definidos pelo próprio** — transparência total
- **Pagamento directo** — sem intermediação financeira
- Apoio da equipa Colheita na configuração inicial

### Para os consumidores
- Taxa de entrega simbólica: **€2,50–€3,50** (cobre custo logístico real)
- Recolha no Mercado de Cascais: **gratuita**
- Sem registo obrigatório — encomenda por nome + telemóvel

### Sustentabilidade futura (pós-piloto)
- Subscrição mensal para agricultores (ex: €15–€29/mês) por funcionalidades premium
- Ou margem logística na entrega coordenada
- Sem nunca tocar nos preços que o agricultor define

---

## 4. As Quintas (Fase Piloto)

### Quinta da Serra de Sintra
- **Agricultores:** João & Maria Ferreira
- **Localização:** Almoçageme, Sintra
- **Especialidade:** Hortícolas biológicos, tomates, pepinos, feijão verde
- **Certificação:** Modo de Produção Biológico
- **Encomenda mínima:** €15
- **Entrega:** €3,50 | Cascais, Estoril, Sintra
- **Mercado:** Sáb 9h–13h, Dom 10h–13h
- **PIN dashboard:** 1234

### Quinta do Guincho
- **Agricultora:** Ana Sofia Pereira
- **Localização:** Malveira da Serra
- **Especialidade:** Saladas, aromáticas, morangos, abóbora
- **Certificação:** Produção Integrada
- **Encomenda mínima:** €12
- **Entrega:** €3,00 | Cascais, Estoril
- **Mercado:** Sáb 9h–13h
- **PIN dashboard:** 2345

### Horta da Carmen *(segunda vaga)*
- **Agricultora:** Carmen Rodrigues
- **Localização:** Alcabideche
- **Especialidade:** Mix de saladas, rúcula, espinafres, ervas aromáticas, flores comestíveis [Exclusivo]
- **Certificação:** Sem Pesticidas + Mercado Local
- **Encomenda mínima:** €10
- **Entrega:** €2,50 | Cascais, Estoril
- **Mercado:** Sáb 8h–14h
- **PIN dashboard:** 3456
- **Rating:** ⭐ 5.0 (23 avaliações)

### Ovos do Melo *(segunda vaga)*
- **Agricultores:** José & Ana Melo
- **Localização:** Tires, Cascais
- **Especialidade:** Ovos de gama livre, bio e pastoreados; frango do campo; galinha inteira
- **Certificação:** Sem Antibióticos + Em Liberdade
- **Encomenda mínima:** €8
- **Entrega:** €2,50 | Cascais, Estoril, Sintra
- **Mercado:** Sáb–Dom 9h–13h
- **PIN dashboard:** 4567
- **Rating:** ⭐ 4.9 (89 avaliações)

---

## 5. Fluxo Completo do Utilizador

### Consumidor

```
1. Entra em colheita.pt
2. Vê as quintas disponíveis (foto, rating, produtos, zonas de entrega)
3. Clica numa quinta → vê produtos com preços e disponibilidade
4. Clica "+ Adicionar" → produto entra no carrinho lateral
5. Vai ao carrinho → escolhe:
     a. Recolha gratuita no mercado
     b. Entrega (€2,50–3,50) → preenche morada
6. Confirma → app abre WhatsApp com mensagem pré-formatada para o agricultor
7. Agricultor confirma por WhatsApp/SMS
8. Pagamento no acto (dinheiro ou MBWay)
```

**Exemplo de mensagem WhatsApp gerada automaticamente:**
```
🌿 Nova encomenda - Colheita

👤 Maria Silva
📞 912 345 678
🚴 Entrega ao domicílio
📍 Rua das Flores 12, 2750-001 Cascais

🛒 Produtos:
• Ovos de Gama Livre (dz) x2 — €7,60
• Ovos Bio Certificados (dz) x1 — €5,50

💶 Subtotal: €13,10
🚴 Entrega: €2,50
💰 TOTAL: €15,60

💳 Pagamento: Na entrega (dinheiro/MBWay)
🔖 Ref: #A3K9X2M1P4QR58
```

### Agricultor

```
1. Recebe WhatsApp com encomenda formatada
2. Confirma disponibilidade e data via resposta WhatsApp
3. Acede ao dashboard (colheita.pt/dashboard/[quinta]) com PIN de 4 dígitos
4. Vê lista de encomendas com estado: Pendente → Confirmado → Entregue
5. Actualiza estado de cada encomenda com um clique
6. Responde ao cliente directamente via WhatsApp (botão rápido no dashboard)
```

---

## 6. Arquitectura Técnica

### Stack

| Camada | Tecnologia | Custo |
|--------|-----------|-------|
| Framework | Astro 5 (SSR + Static híbrido) | Grátis |
| Hosting | Cloudflare Pages + Workers | Grátis (free tier) |
| Base de dados | Cloudflare D1 (SQLite edge) | Grátis (5GB, 25M reads/mês) |
| Notificações | WhatsApp deep links | Grátis |
| Pagamento | Cash / MBWay (directo) | Grátis |
| Domínio | A definir | ~€10/ano |

**Custo total de operação: ~€0/mês** (apenas domínio anual)

### Páginas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Static | Landing page — hero, quintas, como funciona, CTA agricultor |
| `/quintas/[slug]` | Static | Página de cada quinta com produtos e carrinho |
| `/carrinho` | SSR | Checkout — tipo de entrega, contactos, confirmação |
| `/como-funciona` | Static | Guia para consumidores e agricultores |
| `/agricultor` | Static | Pitch page para recrutar novos agricultores |
| `/dashboard/[slug]` | SSR | Dashboard do agricultor (gate por PIN) |
| `/api/orders` | SSR API | POST — cria encomenda no D1 |
| `/api/orders/[slug]` | SSR API | GET — lista encomendas (auth por PIN); PATCH — actualiza estado |

### Base de dados (Cloudflare D1)

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,                    -- ex: A3K9X2M1P4QR58
  farm_slug TEXT NOT NULL,               -- ex: ovos-do-melo
  farm_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_type TEXT NOT NULL,           -- 'pickup' | 'delivery'
  address TEXT, postal TEXT, city TEXT,
  notes TEXT,
  items TEXT NOT NULL,                   -- JSON array
  subtotal REAL NOT NULL,
  delivery_fee REAL NOT NULL DEFAULT 0,
  total REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending|confirmed|delivered|cancelled
  created_at TEXT NOT NULL
);
```

### Carrinho (client-side)
- Guardado em `localStorage` como array de items
- Item: `{ id, quintaSlug, quintaName, productId, name, emoji, price, unit, quantity }`
- Sincronizado via `CustomEvent('colheita:cartUpdated')`
- Badge no header actualiza em tempo real

### Segurança do Dashboard
- PIN de 4 dígitos por quinta, definido em `src/data/quintas.ts`
- Validado server-side na API (`/api/orders/[slug]?pin=XXXX`)
- Guardado em `sessionStorage` no cliente após autenticação bem sucedida

---

## 7. Design System

### Paleta de Cores
```
--green-900: #0f2d1e   (fundo escuro, footer)
--green-800: #1a4731   (cor primária, headers)
--green-600: #2d6a4f   (botões, acentos)
--green-300: #74c69d   (bordas, separadores)
--green-100: #d8f3dc   (badges, labels)
--green-50:  #f0faf2   (fundos suaves)
--orange:    #e76f51   (CTA agricultor, destaques)
--cream:     #fefdf8   (fundo principal)
```

### Princípios de Design
- **Mobile-first** — carrinho fixo em baixo no mobile, sidebar no desktop
- **Sem app para instalar** — PWA web, funciona em qualquer browser
- **WhatsApp-native** — os agricultores já usam, sem curva de aprendizagem
- **Confiança visual** — fotos reais, ratings, certificações, nome do agricultor

---

## 8. Roadmap

### Fase 0 — Conceito ✅
- [x] Definição do modelo de negócio
- [x] Identificação do mercado (Cascais/Sintra)
- [x] Validação com agricultores do mercado

### Fase 1 — Piloto (actual) ✅
- [x] 4 quintas (2 fictícias + 2 reais: Carmen, Melo)
- [x] Catálogo de produtos por quinta
- [x] Carrinho funcional (localStorage)
- [x] Checkout com WhatsApp
- [x] Dashboard do agricultor com PIN
- [x] Base de dados D1 para histórico de encomendas
- [x] Páginas: Home, Quinta, Carrinho, Como Funciona, Agricultor

### Fase 2 — Validação (próximos 60 dias)
- [ ] Deploy em produção (Cloudflare Pages)
- [ ] Domínio colheita.pt
- [ ] Onboarding das 4 quintas reais
- [ ] Primeiras 50 encomendas
- [ ] Recolha de feedback (NPS consumidores + agricultores)

### Fase 3 — Expansão
- [ ] Carrinho multi-quinta
- [ ] Sistema de avaliações reais
- [ ] Notificações de novos produtos (WhatsApp opt-in)
- [ ] Calendário de disponibilidade por quinta
- [ ] Painel de analytics para agricultores
- [ ] Expansão para Oeiras, Sintra, Setúbal

### Fase 4 — Monetização
- [ ] Subscrição premium agricultores (€15–29/mês)
- [ ] Logística coordenada própria (estafeta parceiro)
- [ ] API aberta para outros mercados regionais

---

## 9. Como Fazer Deploy em Produção

### Pré-requisitos
- Conta Cloudflare (grátis)
- Wrangler CLI: `npm install -g wrangler`

### Passos

```bash
# 1. Autenticar no Cloudflare
wrangler login

# 2. Criar a base de dados D1
wrangler d1 create colheita-pilot
# → Copiar o database_id para wrangler.json

# 3. Aplicar o schema
wrangler d1 execute colheita-pilot --remote --file=schema.sql

# 4. Build e deploy
wrangler deploy
# → App disponível em https://colheita.pages.dev (ou domínio próprio)
```

### wrangler.json (configuração actual)
```json
{
  "name": "colheita",
  "compatibility_date": "2024-01-01",
  "d1_databases": [{
    "binding": "DB",
    "database_name": "colheita-pilot",
    "database_id": "YOUR_D1_DATABASE_ID"
  }]
}
```

---

## 10. Desenvolver Localmente

```bash
git clone https://github.com/diogomarthapt-dotcom/mywebsite23.git
cd mywebsite23
git checkout claude/farm-delivery-app-pilot-2QIoo
npm install
npm run dev
# → http://localhost:4321
```

**Quintas disponíveis localmente:**

| Quinta | Slug | Dashboard PIN |
|--------|------|--------------|
| Quinta da Serra de Sintra | `quinta-da-serra` | `1234` |
| Quinta do Guincho | `quinta-do-guincho` | `2345` |
| Horta da Carmen | `horta-da-carmen` | `3456` |
| Ovos do Melo | `ovos-do-melo` | `4567` |

---

## 11. Pitch em 30 Segundos

> A Colheita é um marketplace hiperlocal que liga agricultores de Cascais e Sintra directamente aos consumidores.
> Os agricultores listam o que têm disponível esta semana. Os consumidores encomendam online e recebem em casa ou levantam no mercado. A comunicação e o pagamento é feito directamente — sem intermediários, sem comissões.
> **Para os agricultores: mais margem, mais previsibilidade. Para os consumidores: mais frescura, mais proximidade.**
> Custo de operação zero. Lançamos o piloto com 4 quintas do Mercado de Cascais.

---

*Documento gerado em Abril 2026 · Versão piloto · Cascais*

# Prompt — Catálogo Ecoa: 30 produtos brasileiros com galerias de imagem coerentes

> Execute este prompt no Antigravity, na raiz do projeto `ecoa`.

---

## Contexto

Este é um e-commerce conceitual de moda circular vintage (Vue 3 + Vite + Pinia + Tailwind). O catálogo vive em `src/data/products.json` (mock data, sem backend) e as categorias em `src/data/categories.json`. As imagens atuais dos 8 produtos são URLs `aida-public` geradas por IA numa sessão anterior — o estilo delas é a referência visual da marca.

**Paleta da marca:** Floresta Nobre `#3A4D39` · Terracota `#C86D51` · Linho Cru `#F4EFEA` · Nogueira `#2C221E`.

## Objetivo

1. **Adaptar os 8 produtos existentes** (origens estrangeiras viram brasileiras; refine nome/material/história quando necessário).
2. **Criar 22 produtos novos**, totalizando **exatamente 30 produtos**, distribuídos **6 por categoria**:
   - `alfaiataria` (Alfaiataria Vintage) · `anos-70` (Anos 70) · `anos-90` (Anos 90) · `seda-linho` (Seda & Linho) · `minimalista` (Minimalismo Poético)
3. Gerar as imagens dos produtos novos e **complementar as galerias dos existentes**.

---

## REGRA CRÍTICA DE IMAGEM — coerência por produto

- Cada produto tem **uma galeria de 3 a 4 imagens da MESMA peça**. É inaceitável que duas fotos de um mesmo produto mostrem peças diferentes (cor, modelo ou estampa distintas).
- Técnica: gere **uma imagem-mãe da peça** e produza as demais **usando-a como referência** (mesma peça, outro enquadramento). Nunca gere variações "do zero".
- **Ordem obrigatória da galeria** (`gallery[]` no JSON):
  1. Foto principal: **modelo vestindo a peça**, corpo inteiro
  2. Peça sozinha (flat lay ou em cabide)
  3. Detalhe de tecido, botão, estampa ou costura
  4. (opcional) Outro ângulo no corpo ou no cabide
- `image` = sempre `gallery[0]`.
- **Salvar localmente** em `public/products/` com o padrão `prod-{n}-{k}.jpg` (ex.: `prod-12-1.jpg`), referenciadas como `/products/prod-12-1.jpg`. Não usar URLs externas para as novas.
- Proporção **3:4 (retrato)**, resolução alta, sem texto/branding/watermark nas fotos.
- Para os **8 produtos existentes**: mantenha a imagem atual (URL aida-public) como `gallery[0]` e **use-a como referência** para gerar as fotos 2 e 3 da mesma peça (salvas localmente).

---

## Tom das imagens

**Tom geral (todas as categorias):** fotografia editorial de moda vintage, e-commerce, luz de estúdio suave e difusa, fundo neutro (bege/areia/off-white), tons terrosos, estética sustentável e artesanal — reproduza o clima das imagens já existentes no projeto.

**Particularidades por categoria:**

| Categoria | Direção de imagem |
|---|---|
| **Alfaiataria Vintage** | Luz mais formal e direcional, fundo off-white acinzentado elegante; sobriedade, estrutura de ombros, caimento pesado; modelo em pose clássica de lookbook |
| **Anos 70** | Luz dourada e quente, fundo terroso (terracota desbotada); estampas botânicas, veludo, tricô; vibe boho e livre, pose relaxada |
| **Anos 90** | Contraste um pouco mais alto, fundo concreto claro/bege urbano; denim pesado, grunge, camisetas estampadas; atitude casual, pose despojada |
| **Seda & Linho** | Luz difusa e etérea, fundo areia claro; fluidez do tecido ao vento ou em movimento, sombras leves; frescor e leveza |
| **Minimalismo Poético** | Fundo linho cru uniforme, composição minimalista com espaço negativo; silhueta limpa, sombras geométricas suaves; tons neutros |

---

## Dados dos produtos (schema obrigatório)

Mantenha **exatamente** o schema atual do `products.json`. Regras por campo:

| Campo | Regra |
|---|---|
| `id` / `slug` | `prod-1` … `prod-30`; slug em pt-br derivado do nome |
| `categorySlug` | uma das 5 categorias, 6 produtos cada |
| `era` | somente `"Anos 70"`, `"Anos 80"` ou `"Anos 90"` (valores usados pelo filtro do catálogo) — coerente com a categoria |
| `stock` | **sempre `1`** (peça única, filosofia da loja) |
| `origin` | **cidade/região do Brasil** com sabor local (ex.: "Vila Madalena, São Paulo — SP", "Olinda — PE", "Sabará — MG", "Blumenau — SC"). 30 origens variadas, cobrindo Norte/Nordeste/Centro-Oeste/Sudeste/Sul |
| `size` | `PP`/`P`/`M`/`G`/`GG`, variado entre produtos |
| `condition` | um destes, exatamente: `"Excelente (Sem avarias)"`, `"Muito boa (Mínimos sinais de uso)"`, `"Boa (Marcas leves do tempo)"`, `"Impecável (Como nova)"` |
| `material` | tecido plausível para a peça e categoria (ex.: "100% Lã Fria", "Seda Pura", "Linho Cru", "Denim Pesado") |
| `price` / `originalPrice` | preço realista de brechó brasileiro (R$ 90–460 conforme tipo); `originalPrice` ≈ 2–3× o preço |
| `story` | 1–2 frases com narrativa de garimpo brasileiro coerente com a peça e a origem (brechó de bairro, feira, herança de família) |
| `measurements` | `{bust, waist, length}` + `sleeve` quando fizer sentido; valores em cm plausíveis para o `size` |
| `impact` | `waterSavedLiters` 1800–5500 e `co2AvoidedKg` 4–9, proporcionais ao peso da peça (casacos > vestidos > camisetas) |
| `hasStoryBadge` | `true` |

**Sobre os 8 produtos existentes:** preserve peça e foto principal (ex.: Trench Coat, Jaqueta Jeans 90s…), mas reescreva origem/história para o Brasil (a foto continua válida — a narrativa muda).

---

## Entregáveis

1. `src/data/products.json` regenerado: 30 produtos, schema idêntico, JSON válido.
2. `src/data/categories.json`: `itemCount` atualizado para 6 em cada categoria (imagens de categoria podem permanecer as atuais).
3. Novas imagens em `public/products/` conforme regras acima (3–4 por produto; ~90–100 arquivos novos).
4. **Não modifique** stores, componentes, views ou rotas — apenas dados e imagens.
5. Ao final: rode `npm run build`, confirme que passou, e verifique para cada produto: `gallery.length >= 3`, `image === gallery[0]`, `stock === 1`, era válida. Reporte a lista final (id, nome, categoria, origem, nº de fotos).

Não commite sem minha confirmação.

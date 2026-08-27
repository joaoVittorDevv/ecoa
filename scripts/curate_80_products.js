import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

if (!fs.existsSync(PRODUCTS_IMG_DIR)) {
  fs.mkdirSync(PRODUCTS_IMG_DIR, { recursive: true });
}

// Definição dos critérios de busca e curadoria para as 5 categorias do ECOA
const CATEGORY_RULES = {
  'alfaiataria': {
    target: 16,
    keywords: ['blazer', 'trench coat', 'wool coat', 'suit jacket', 'tailored', 'double-breasted', 'peacoat', 'waistcoat', 'trousers in woven fabric'],
    era: 'Anos 80',
    origins: ['Londres, Reino Unido', 'Milão, Itália', 'Paris, França', 'Porto, Portugal', 'Berlim, Alemanha'],
    materials: ['100% Lã Fria e Forro de Cupro', '100% Gabardine de Algodão Nobre', 'Alfaiataria Estruturada em Sarja de Lã', 'Lã Pura Inglesa com Ombreiras Suaves']
  },
  'anos-90': {
    target: 16,
    keywords: ['denim jacket', 'oversized denim', 'leather jacket', 'bomber jacket', 'slip dress', 'dungarees', 'flannel', 'biker jacket', 'straight jeans'],
    era: 'Anos 90',
    origins: ['São Paulo, Brasil', 'Seattle, EUA', 'Nova York, EUA', 'Londres, Reino Unido', 'Berlim, Alemanha'],
    materials: ['100% Algodão Denim Encorpado 14oz', 'Couro Legítimo Vintage com Pátina', 'Flanela Pura de Algodão Escovado', 'Seda Sintética Acetinada Anos 90']
  },
  'anos-70': {
    target: 16,
    keywords: ['knit sweater', 'cardigan', 'jacquard', 'patterned blouse', 'corduroy', 'ribbed jumper', 'floral dress', 'wide-leg trousers', 'cable-knit'],
    era: 'Anos 70',
    origins: ['Minas Gerais, Brasil', 'Lisboa, Portugal', 'Florença, Itália', 'São Francisco, EUA', 'Amsterdã, Holanda'],
    materials: ['100% Lã Natural Tinta com Pigmento Orgânico', 'Veludo Cotelê 100% Algodão Puro', 'Tricô Artesanal Ponto Fang Encorpado', 'Crepe Floral Estampado com Pigmento Botânico']
  },
  'seda-linho': {
    target: 16,
    keywords: ['silk blouse', 'linen shirt', 'satin dress', 'silk dress', 'linen trousers', 'viscose blouse', 'crepe shirt', 'linen tunic'],
    era: 'Anos 90',
    origins: ['Florença, Itália', 'Paris, França', 'Porto, Portugal', 'Kyoto, Japão', 'Rio de Janeiro, Brasil'],
    materials: ['100% Seda Pura com Toque Acetinado', '100% Linho Europeu Rústico Puro', 'Crepe da China em Seda Natural', 'Linho Puro Lavado com Amaciamento Natural']
  },
  'minimalista': {
    target: 16,
    keywords: ['turtleneck', 'clean cut coat', 'cashmere jumper', 'merino wool', 'minimalist dress', 'straight coat', 'sleeveless top', 'fine-knit sweater'],
    era: 'Atemporal',
    origins: ['Copenhague, Dinamarca', 'Estocolmo, Suécia', 'Tóquio, Japão', 'Zurique, Suíça', 'São Paulo, Brasil'],
    materials: ['100% Lã Merino Ultrafina Sem Tingimento Químico', '100% Cashmere Puro Penteado', 'Algodão Pima Orgânico Certificado', 'Crepe Encorpado Monocromático']
  }
};

// Histórias poéticas para o verso da tag ECOA
const STORY_TEMPLATES = [
  "Garimpado em um acervo particular, esta peça preserva cortes clássicos e acabamentos artesanais impecáveis de sua época.",
  "Peça icônica resgatada em brechó de curadoria especializada. Suas fibras nobres ganharam maciez única com o passar das décadas.",
  "Atravessou gerações mantendo sua estrutura e caimento original. Uma relíquia preservada pronta para um novo ciclo sustentável.",
  "Encontrada em uma viagem de garimpo consciente, destaca-se pelo trabalho têxtil refinado e botões originais preservados.",
  "Exemplar raro com modelagem atemporal que transcende tendências passageiras e valoriza o consumo circular consciente.",
  "Resgatada com todo o carinho e higienizada com métodos ecológicos à base de vapor e óleos essenciais naturais."
];

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`Erro ao baixar imagem ${url}:`, err.message);
    return false;
  }
}

function generateMeasurements(size, category) {
  const baseBust = size === 'PP' ? 84 : size === 'P' ? 90 : size === 'M' ? 98 : size === 'G' ? 108 : 116;
  const baseWaist = size === 'PP' ? 68 : size === 'P' ? 74 : size === 'M' ? 82 : size === 'G' ? 92 : 100;
  const baseLength = category === 'alfaiataria' ? 76 : category === 'anos-90' ? 66 : 70;
  const baseSleeve = size === 'G' || size === 'GG' ? 64 : 60;

  return {
    bust: `${baseBust + Math.floor(Math.random() * 4 - 2)} cm`,
    waist: `${baseWaist + Math.floor(Math.random() * 4 - 2)} cm`,
    length: `${baseLength + Math.floor(Math.random() * 6 - 3)} cm`,
    sleeve: `${baseSleeve + Math.floor(Math.random() * 4 - 2)} cm`
  };
}

function translateAndFormatTitle(englishText, category) {
  let title = englishText
    .replace(/^solid\s+/i, '')
    .replace(/^patterned\s+/i, 'Estampado ')
    .replace(/^melange\s+/i, 'Mescla ')
    .replace(/^dark\s+/i, 'Escuro ')
    .replace(/^light\s+/i, 'Claro ')
    .replace(/^fine-knit\s+/i, 'Tricô Fino ')
    .trim();

  // Traduções de peças comuns
  const translations = [
    { en: /blazer/i, pt: 'Blazer Estruturado' },
    { en: /trench coat/i, pt: 'Trench Coat Clássico' },
    { en: /wool coat/i, pt: 'Sobretudo de Lã Pura' },
    { en: /suit jacket/i, pt: 'Paletó Alfaiataria' },
    { en: /denim jacket/i, pt: 'Jaqueta Jeans Vintage' },
    { en: /leather jacket/i, pt: 'Jaqueta de Couro Pátina' },
    { en: /bomber jacket/i, pt: 'Jaqueta Bomber Vintage' },
    { en: /slip dress/i, pt: 'Vestido Slip Minimalista' },
    { en: /knit sweater/i, pt: 'Suéter Tricô Encorpado' },
    { en: /cardigan/i, pt: 'Cardigã Artesanal' },
    { en: /silk blouse/i, pt: 'Camisa de Seda Pura' },
    { en: /linen shirt/i, pt: 'Camisa de Linho Rústico' },
    { en: /satin dress/i, pt: 'Vestido Acetinado Fluido' },
    { en: /turtleneck/i, pt: 'Suéter Gola Alta' },
    { en: /corduroy/i, pt: 'Calça Veludo Cotelê' },
    { en: /trousers/i, pt: 'Calça de Alfaiataria' }
  ];

  for (const t of translations) {
    if (t.en.test(title)) {
      title = title.replace(t.en, t.pt);
      break;
    }
  }

  // Capitaliza primeira letra de cada palavra
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  console.log('🚀 Iniciando extração e curadoria dos 80 produtos com fotos de modelos...');

  const curatedProducts = [];
  const categoryCounts = {
    'alfaiataria': 0,
    'anos-90': 0,
    'anos-70': 0,
    'seda-linho': 0,
    'minimalista': 0
  };

  let offset = 0;
  const limit = 100;
  let totalProcessed = 0;
  let currentId = 1;

  while (curatedProducts.length < 80 && offset < 5000) {
    console.log(`📡 Consultando lote no Hugging Face (offset: ${offset})...`);
    const url = `https://datasets-server.huggingface.co/rows?dataset=tomytjandra/h-and-m-fashion-caption&config=default&split=train&offset=${offset}&limit=${limit}`;
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Aviso: falha no offset ${offset}, status ${res.status}`);
        offset += limit;
        continue;
      }

      const data = await res.json();
      if (!data.rows || data.rows.length === 0) break;

      for (const item of data.rows) {
        if (curatedProducts.length >= 80) break;

        const text = (item.row.text || '').toLowerCase();
        const imageUrl = item.row.image?.src;
        if (!imageUrl || !text) continue;

        // Tenta encontrar uma categoria compatível que ainda precise de produtos
        for (const [catSlug, rule] of Object.entries(CATEGORY_RULES)) {
          if (categoryCounts[catSlug] >= rule.target) continue;

          const matches = rule.keywords.some(kw => text.includes(kw));
          if (matches) {
            const prodIndex = currentId;
            const imgFilename = `prod-${prodIndex}.jpg`;
            const localImgPath = path.join(PRODUCTS_IMG_DIR, imgFilename);
            const publicImgPath = `/products/${imgFilename}`;

            console.log(`📥 [${catSlug.toUpperCase()} #${categoryCounts[catSlug] + 1}/16] Baixando foto para prod-${prodIndex}...`);
            const downloaded = await downloadImage(imageUrl, localImgPath);
            if (!downloaded) continue;

            const name = translateAndFormatTitle(item.row.text, catSlug);
            const slug = `${slugify(name)}-${prodIndex}`;
            const origin = rule.origins[categoryCounts[catSlug] % rule.origins.length];
            const material = rule.materials[categoryCounts[catSlug] % rule.materials.length];
            const sizes = ['P', 'M', 'G', 'M', 'P', 'G', 'PP', 'GG'];
            const size = sizes[categoryCounts[catSlug] % sizes.length];
            const story = STORY_TEMPLATES[categoryCounts[catSlug] % STORY_TEMPLATES.length];

            const basePrice = catSlug === 'alfaiataria' ? 320 : catSlug === 'seda-linho' ? 280 : catSlug === 'minimalista' ? 260 : catSlug === 'anos-70' ? 220 : 190;
            const priceVariance = (categoryCounts[catSlug] % 5) * 20;
            const price = basePrice + priceVariance;
            const originalPrice = Math.round(price * 2.4);

            const waterSaved = 1800 + Math.floor(Math.random() * 2200);
            const co2Avoided = Number((3.8 + Math.random() * 5.0).toFixed(1));

            curatedProducts.push({
              id: `prod-${prodIndex}`,
              name,
              slug,
              categorySlug: catSlug,
              era: rule.era,
              price,
              originalPrice,
              stock: 1,
              size,
              condition: 'Excelente (Sem avarias)',
              origin,
              material,
              image: publicImgPath,
              gallery: [publicImgPath, publicImgPath],
              hasStoryBadge: true,
              story: `${story} Encontrada em ${origin}, esta peça em ${material} é um exemplar exclusivo do acervo ECOA.`,
              measurements: generateMeasurements(size, catSlug),
              impact: {
                waterSavedLiters: waterSaved,
                co2AvoidedKg: co2Avoided
              }
            });

            categoryCounts[catSlug]++;
            currentId++;
            break;
          }
        }
      }

      offset += limit;
    } catch (e) {
      console.error('Erro na requisição:', e.message);
      offset += limit;
    }
  }

  console.log('✅ Curadoria concluída!');
  console.log('📊 Distribuição por categoria:', categoryCounts);
  console.log(`📦 Total de produtos curados: ${curatedProducts.length}`);

  // Grava products.json
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(curatedProducts, null, 2), 'utf-8');
  console.log(`💾 Salvo com sucesso em: ${PRODUCTS_JSON_PATH}`);

  // Atualiza categories.json
  if (fs.existsSync(CATEGORIES_JSON_PATH)) {
    const rawCat = fs.readFileSync(CATEGORIES_JSON_PATH, 'utf-8');
    const categories = JSON.parse(rawCat);
    categories.forEach(cat => {
      cat.itemCount = categoryCounts[cat.slug] || 16;
    });
    fs.writeFileSync(CATEGORIES_JSON_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    console.log(`💾 Categorias atualizadas com os novos contadores em: ${CATEGORIES_JSON_PATH}`);
  }
}

run();

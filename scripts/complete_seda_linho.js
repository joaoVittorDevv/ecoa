import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

const rawProducts = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
const products = JSON.parse(rawProducts);

const sedaLinhoCount = products.filter(p => p.categorySlug === 'seda-linho').length;
const needed = 16 - sedaLinhoCount;
console.log(`Atualmente temos ${sedaLinhoCount} produtos de Seda & Linho. Buscando ${needed} produtos adicionais para fechar 16 por categoria (80 no total)...`);

const SEDA_KEYWORDS = [
  'satin', 'silk', 'linen', 'crepe', 'viscose', 'wrap dress', 'flounce dress', 
  'blouse with a collar', 'woven blouse', 'chiffon', 'camisole', 'flowing dress', 'sleeveless blouse'
];

const ORIGINS = ['Florença, Itália', 'Paris, França', 'Porto, Portugal', 'Kyoto, Japão', 'Rio de Janeiro, Brasil', 'Lisboa, Portugal'];
const MATERIALS = [
  '100% Seda Pura com Toque Acetinado', 
  '100% Linho Europeu Rústico Puro', 
  'Crepe da China em Seda Natural', 
  'Linho Puro Lavado com Amaciamento Natural',
  'Crepe de Seda Acetinada com Caimento Fluido',
  'Cambraia de Linho e Seda Nobre'
];

const STORY_TEMPLATES = [
  "Peça nobre garimpada em ateliê tradicional, com caimento fluido e toque incrivelmente sedoso.",
  "Confeccionada em fibras puras de seda natural que respiram e proporcionam conforto térmico superior.",
  "Relíquia preservada que atravessou décadas mantendo seu brilho acetinado natural e costuras impecáveis.",
  "Encontrada em feira de antiguidades têxteis, perfeita para compor visuais sofisticados e atemporais."
];

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`Erro ao baixar imagem:`, err.message);
    return false;
  }
}

function generateMeasurements(size) {
  const baseBust = size === 'PP' ? 86 : size === 'P' ? 90 : size === 'M' ? 98 : size === 'G' ? 106 : 114;
  const baseWaist = size === 'PP' ? 70 : size === 'P' ? 76 : size === 'M' ? 84 : size === 'G' ? 92 : 100;
  return {
    bust: `${baseBust} cm`,
    waist: `${baseWaist} cm`,
    length: `68 cm`,
    sleeve: `58 cm`
  };
}

function translateAndFormatTitle(englishText) {
  let title = englishText
    .replace(/^solid\s+/i, '')
    .replace(/^patterned\s+/i, 'Estampada ')
    .replace(/^dark\s+/i, 'Escuro ')
    .replace(/^light\s+/i, 'Claro ')
    .trim();

  const translations = [
    { en: /satin dress/i, pt: 'Vestido de Cetim de Seda Fluido' },
    { en: /silk blouse/i, pt: 'Camisa de Seda Pura com Botões' },
    { en: /linen shirt/i, pt: 'Camisa de Linho Rústico Europeu' },
    { en: /crepe blouse/i, pt: 'Blusa Crepe de Seda Nobre' },
    { en: /wrap dress/i, pt: 'Vestido Envelope em Seda' },
    { en: /flounce dress/i, pt: 'Vestido Fluido com Babados' },
    { en: /blouse/i, pt: 'Camisa de Seda com Gola Clássica' },
    { en: /dress/i, pt: 'Vestido Midi em Fibras Naturais' }
  ];

  for (const t of translations) {
    if (t.en.test(title)) {
      title = title.replace(t.en, t.pt);
      break;
    }
  }

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
  let added = 0;
  let offset = 5000;
  const limit = 100;
  let currentId = products.length + 1;

  while (added < needed && offset < 15000) {
    console.log(`📡 Consultando lote no Hugging Face (offset: ${offset})...`);
    const url = `https://datasets-server.huggingface.co/rows?dataset=tomytjandra/h-and-m-fashion-caption&config=default&split=train&offset=${offset}&limit=${limit}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        offset += limit;
        continue;
      }

      const data = await res.json();
      if (!data.rows || data.rows.length === 0) break;

      for (const item of data.rows) {
        if (added >= needed) break;

        const text = (item.row.text || '').toLowerCase();
        const imageUrl = item.row.image?.src;
        if (!imageUrl || !text) continue;

        const matches = SEDA_KEYWORDS.some(kw => text.includes(kw));
        if (matches) {
          const prodIndex = currentId;
          const imgFilename = `prod-${prodIndex}.jpg`;
          const localImgPath = path.join(PRODUCTS_IMG_DIR, imgFilename);
          const publicImgPath = `/products/${imgFilename}`;

          console.log(`📥 [SEDA-LINHO #${sedaLinhoCount + added + 1}/16] Baixando foto para prod-${prodIndex}...`);
          const downloaded = await downloadImage(imageUrl, localImgPath);
          if (!downloaded) continue;

          const name = translateAndFormatTitle(item.row.text);
          const slug = `${slugify(name)}-${prodIndex}`;
          const origin = ORIGINS[added % ORIGINS.length];
          const material = MATERIALS[added % MATERIALS.length];
          const sizes = ['P', 'M', 'G', 'PP', 'M', 'G', 'GG'];
          const size = sizes[added % sizes.length];
          const story = STORY_TEMPLATES[added % STORY_TEMPLATES.length];

          const price = 260 + (added % 4) * 20;
          const originalPrice = Math.round(price * 2.3);

          products.push({
            id: `prod-${prodIndex}`,
            name,
            slug,
            categorySlug: 'seda-linho',
            era: 'Anos 90',
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
            story: `${story} Garimpada em ${origin}, esta peça exclusiva em ${material} resgata a poesia dos tecidos naturais.`,
            measurements: generateMeasurements(size),
            impact: {
              waterSavedLiters: 1900 + Math.floor(Math.random() * 800),
              co2AvoidedKg: Number((4.1 + Math.random() * 2.5).toFixed(1))
            }
          });

          added++;
          currentId++;
        }
      }

      offset += limit;
    } catch (e) {
      console.error('Erro na requisição:', e.message);
      offset += limit;
    }
  }

  console.log(`✅ Total final de produtos: ${products.length}`);
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8');

  // Atualiza categories.json com 16 em cada
  if (fs.existsSync(CATEGORIES_JSON_PATH)) {
    const rawCat = fs.readFileSync(CATEGORIES_JSON_PATH, 'utf-8');
    const categories = JSON.parse(rawCat);
    categories.forEach(cat => {
      cat.itemCount = 16;
    });
    fs.writeFileSync(CATEGORIES_JSON_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    console.log('💾 categories.json atualizado com 16 itens em cada categoria.');
  }
}

run();

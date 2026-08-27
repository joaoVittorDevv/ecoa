import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');

const rawProducts = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
const products = JSON.parse(rawProducts);

// Queries específicas para buscar a foto da "peça em si" (produto isolado, cabide, flatlay ou corte frontal)
const GARMENT_QUERIES = [
  // 1-6: Alfaiataria
  'trench coat beige clothing product flatlay',
  'wool blazer gray suit jacket product hanger',
  'tweed jacket vintage clothing product',
  'navy blue peacoat wool coat clothing product',
  'tailored vest waistcoat clothing product',
  'pinstripe blazer suit jacket flatlay product',

  // 7-12: Anos 90
  'vintage denim jacket blue jeans product flatlay',
  'flannel plaid shirt grunge clothing product',
  'silk slip dress green draped clothing product',
  'leather biker jacket black vintage product flatlay',
  'blue jeans vintage denim pants product flatlay',
  'vintage bomber jacket streetwear clothing product',

  // 13-18: Anos 70
  'orange knit sweater handmade wool clothing product',
  'floral vintage silk shirt clothing product flatlay',
  'brown corduroy pants clothing product flatlay',
  'boucle wool cardigan sweater product clothing',
  'vintage boho dress embroidered clothing product',
  'shearling vest corduroy vintage clothing product',

  // 19-24: Seda & Linho
  'white silk blouse clothing product on hanger',
  'white linen shirt natural fabric clothing product',
  'yellow gold silk wrap dress clothing product',
  'beige raw linen tunic blouse clothing product',
  'black silk shirt blouse clothing product flatlay',
  'linen midi skirt clothing product flatlay',

  // 25-30: Minimalista
  'beige linen blazer clothing product flatlay',
  'black turtleneck sweater merino wool clothing product',
  'beige cashmere cardigan clothing product on hanger',
  'minimalist wool coat long clothing product',
  'black minimalist dress clothing product flatlay',
  'white cotton poplin shirt minimalist clothing product'
];

async function fetchUnsplashPhoto(query) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=3`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    console.error(`Erro ao buscar foto para "${query}":`, err.message);
    return null;
  }
}

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

async function run() {
  console.log('🌿 Buscando e baixando fotos da peça em si para compor a galeria completa (3 fotos por produto)...');

  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    const prodIndex = i + 1;
    const garmentFilename = `prod-${prodIndex}-garment.jpg`;
    const localGarmentPath = path.join(PRODUCTS_IMG_DIR, garmentFilename);
    const query = GARMENT_QUERIES[i] || `${prod.name} vintage clothing product flatlay`;

    console.log(`📸 [${prodIndex}/${products.length}] Buscando foto da peça em si para "${prod.name}"...`);
    const garmentUrl = await fetchUnsplashPhoto(query);

    let garmentOk = false;
    if (garmentUrl) {
      garmentOk = await downloadImage(garmentUrl, localGarmentPath);
    }

    const modelPath = `/products/prod-${prodIndex}-model.jpg`;
    const garmentPath = garmentOk ? `/products/${garmentFilename}` : `/products/prod-${prodIndex}-detail.jpg`;
    const detailPath = `/products/prod-${prodIndex}-detail.jpg`;

    // Atualiza a galeria com as 3 fotos ricas e distintas:
    // 1. Look com o modelo
    // 2. A peça em si
    // 3. O detalhe da textura/acabamento
    prod.image = modelPath;
    prod.gallery = [modelPath, garmentPath, detailPath];
  }

  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8');
  console.log('✨ Galerias atualizadas com sucesso com 3 fotos completas (Modelo + Peça em si + Detalhe têxtil) para todos os produtos!');
}

run();
